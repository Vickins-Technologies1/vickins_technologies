package usecase

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/vickins-technologies/v-guard/backend/internal/domain"
	"golang.org/x/crypto/bcrypt"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AuthService struct {
	users         UserRepository
	sessions      SessionRepository
	accessSecret  []byte
	refreshSecret []byte
	accessTTL     time.Duration
	refreshTTL    time.Duration
	clock         Clock
}

func NewAuthService(users UserRepository, sessions SessionRepository, accessSecret, refreshSecret string, accessTTL, refreshTTL time.Duration, clock Clock) *AuthService {
	return &AuthService{
		users:         users,
		sessions:      sessions,
		accessSecret:  []byte(accessSecret),
		refreshSecret: []byte(refreshSecret),
		accessTTL:     accessTTL,
		refreshTTL:    refreshTTL,
		clock:         clock,
	}
}

type RegisterInput struct {
	Email       string
	Password    string
	DisplayName string
}

type LoginResult struct {
	AccessToken  string         `json:"accessToken"`
	RefreshToken string         `json:"refreshToken"`
	User         domain.User    `json:"user"`
	ExpiresIn    int64          `json:"expiresIn"`
}

func (s *AuthService) Register(ctx context.Context, in RegisterInput) (*LoginResult, error) {
	email := strings.ToLower(strings.TrimSpace(in.Email))
	if email == "" || len(in.Password) < 8 {
		return nil, domain.ErrInvalidInput
	}
	if _, err := s.users.FindByEmail(ctx, email); err != nil {
		if err != domain.ErrNotFound {
			return nil, err
		}
	} else {
		return nil, errors.New("email already exists")
	}

	pwHash, err := bcrypt.GenerateFromPassword([]byte(in.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	now := s.clock.Now()
	user := &domain.User{
		Email:         email,
		PasswordHash:  string(pwHash),
		DisplayName:   strings.TrimSpace(in.DisplayName),
		Role:          domain.RoleUser,
		Credits:       0,
		RateLimitBytes: 1024 * 1024,
		Active:        true,
		CreatedAt:     now,
		UpdatedAt:     now,
	}
	if user.DisplayName == "" {
		user.DisplayName = strings.Split(email, "@")[0]
	}
	if err := s.users.Create(ctx, user); err != nil {
		return nil, err
	}
	return s.issueTokens(ctx, user)
}

func (s *AuthService) Login(ctx context.Context, email, password string) (*LoginResult, error) {
	user, err := s.users.FindByEmail(ctx, strings.ToLower(strings.TrimSpace(email)))
	if err != nil {
		if err == domain.ErrNotFound {
			return nil, domain.ErrUnauthorized
		}
		return nil, err
	}
	if bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password)) != nil {
		return nil, domain.ErrUnauthorized
	}
	return s.issueTokens(ctx, user)
}

func (s *AuthService) Refresh(ctx context.Context, refreshToken string) (*LoginResult, error) {
	claims, err := s.parseRefresh(refreshToken)
	if err != nil {
		return nil, domain.ErrUnauthorized
	}

	tokenHash := hashToken(refreshToken)
	session, err := s.sessions.FindByTokenHash(ctx, tokenHash)
	if err != nil || session.Revoked || session.ExpiresAt.Before(s.clock.Now()) {
		return nil, domain.ErrUnauthorized
	}

	user, err := s.users.FindByID(ctx, session.UserID)
	if err != nil {
		return nil, domain.ErrUnauthorized
	}
	_ = claims
	return s.issueTokens(ctx, user)
}

func (s *AuthService) issueTokens(ctx context.Context, user *domain.User) (*LoginResult, error) {
	now := s.clock.Now()
	accessToken, err := s.signAccess(user, now)
	if err != nil {
		return nil, err
	}
	refreshToken, err := s.signRefresh(user, now)
	if err != nil {
		return nil, err
	}

	session := &domain.RefreshSession{
		UserID:     user.ID,
		TokenHash:  hashToken(refreshToken),
		ExpiresAt:  now.Add(s.refreshTTL),
		Revoked:    false,
		CreatedAt:  now,
		LastUsedAt: now,
	}
	if err := s.sessions.Create(ctx, session); err != nil {
		return nil, err
	}

	return &LoginResult{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		User:         *user,
		ExpiresIn:    int64(s.accessTTL.Seconds()),
	}, nil
}

func (s *AuthService) signAccess(user *domain.User, now time.Time) (string, error) {
	claims := jwt.MapClaims{
		"sub":   user.ID.Hex(),
		"email": user.Email,
		"role":  user.Role,
		"typ":   "access",
		"iat":   now.Unix(),
		"exp":   now.Add(s.accessTTL).Unix(),
		"jti":   uuid.NewString(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(s.accessSecret)
}

func (s *AuthService) signRefresh(user *domain.User, now time.Time) (string, error) {
	claims := jwt.MapClaims{
		"sub":  user.ID.Hex(),
		"typ":  "refresh",
		"iat":  now.Unix(),
		"exp":  now.Add(s.refreshTTL).Unix(),
		"jti":  uuid.NewString(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(s.refreshSecret)
}

func (s *AuthService) parseRefresh(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (any, error) {
		return s.refreshSecret, nil
	}, jwt.WithValidMethods([]string{jwt.SigningMethodHS256.Alg()}))
	if err != nil || !token.Valid {
		return nil, errors.New("invalid refresh token")
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, errors.New("invalid claims")
	}
	if claims["typ"] != "refresh" {
		return nil, errors.New("wrong token type")
	}
	return claims, nil
}

func hashToken(token string) string {
	sum := sha256.Sum256([]byte(token))
	return hex.EncodeToString(sum[:])
}

func ParseObjectID(id string) (primitive.ObjectID, error) {
	return primitive.ObjectIDFromHex(id)
}
