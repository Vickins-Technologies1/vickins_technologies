package usecase

import (
	"context"
	"crypto/rand"
	"encoding/base32"
	"strings"

	"github.com/vickins-technologies/v-guard/backend/internal/domain"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ProxyService struct {
	users        UserRepository
	usage        UsageRepository
	clock        Clock
	creditsPerGB float64
}

func NewProxyService(users UserRepository, usage UsageRepository, clock Clock, creditsPerGB float64) *ProxyService {
	return &ProxyService{users: users, usage: usage, clock: clock, creditsPerGB: creditsPerGB}
}

func (s *ProxyService) ProvisionCredential(ctx context.Context, userID primitive.ObjectID, proxyType domain.ProxyType) (domain.ProxyCredential, error) {
	user, err := s.users.FindByID(ctx, userID)
	if err != nil {
		return domain.ProxyCredential{}, err
	}
	if user.ProxyUsername == "" || user.ProxyPassword == "" {
		cred := s.BuildCredential(user.Email)
		user.ProxyUsername = cred.Username
		user.ProxyPassword = cred.Password
		if err := s.users.Update(ctx, user); err != nil {
			return domain.ProxyCredential{}, err
		}
	}
	if proxyType == domain.ProxyTypeSOCKS5 {
		return s.BuildSOCKS5Credential(*user), nil
	}
	return s.BuildHTTPCredential(*user), nil
}

func (s *ProxyService) BuildHTTPCredential(user domain.User) domain.ProxyCredential {
	return domain.ProxyCredential{
		Username: user.ProxyUsername,
		Password: user.ProxyPassword,
		Host:     "v-guard.vickinstechnologies.com",
		Port:     3128,
		Type:     domain.ProxyTypeHTTP,
	}
}

func (s *ProxyService) BuildSOCKS5Credential(user domain.User) domain.ProxyCredential {
	return domain.ProxyCredential{
		Username: user.ProxyUsername,
		Password: user.ProxyPassword,
		Host:     "v-guard.vickinstechnologies.com",
		Port:     1080,
		Type:     domain.ProxyTypeSOCKS5,
	}
}

func (s *ProxyService) BuildCredential(seed string) domain.ProxyCredential {
	token := randomBase32(10)
	username := strings.ToLower(strings.Split(seed, "@")[0]) + "_" + token
	return domain.ProxyCredential{
		Username: username,
		Password: randomBase32(18),
	}
}

func (s *ProxyService) RecordUsage(ctx context.Context, userID primitive.ObjectID, source string, bytesIn, bytesOut int64) (*domain.UsageSnapshot, error) {
	total := bytesIn + bytesOut
	latest, err := s.usage.FindLatestSnapshot(ctx, userID, source)
	if err != nil && err != domain.ErrNotFound {
		return nil, err
	}
	var delta int64 = total
	if latest != nil && total > latest.TotalBytes {
		delta = total - latest.TotalBytes
	}
	credits := float64(delta) / float64(1024*1024*1024) * s.creditsPerGB
	snapshot := &domain.UsageSnapshot{
		UserID:      userID,
		Source:      source,
		BytesIn:     bytesIn,
		BytesOut:    bytesOut,
		TotalBytes:  total,
		DeltaBytes:  delta,
		CreditsUsed: credits,
		RecordedAt:  s.clock.Now(),
	}
	if err := s.usage.CreateSnapshot(ctx, snapshot); err != nil {
		return nil, err
	}
	if credits > 0 {
		_ = s.users.DeductCredits(ctx, userID, credits)
	}
	return snapshot, nil
}

func randomBase32(n int) string {
	b := make([]byte, n)
	_, _ = rand.Read(b)
	enc := base32.StdEncoding.WithPadding(base32.NoPadding)
	return strings.ToLower(enc.EncodeToString(b))
}
