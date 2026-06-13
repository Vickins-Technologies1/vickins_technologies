package usecase

import (
	"context"
	"time"

	"github.com/vickins-technologies/v-guard/backend/internal/domain"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Clock interface {
	Now() time.Time
}

type UserRepository interface {
	Create(context.Context, *domain.User) error
	FindByEmail(context.Context, string) (*domain.User, error)
	FindByID(context.Context, primitive.ObjectID) (*domain.User, error)
	Update(context.Context, *domain.User) error
	DeductCredits(context.Context, primitive.ObjectID, float64) error
	AddCredits(context.Context, primitive.ObjectID, float64) error
	ListActive(context.Context) ([]domain.User, error)
}

type SessionRepository interface {
	Create(context.Context, *domain.RefreshSession) error
	FindByTokenHash(context.Context, string) (*domain.RefreshSession, error)
	Revoke(context.Context, primitive.ObjectID) error
	RevokeByUserID(context.Context, primitive.ObjectID) error
}

type PlanRepository interface {
	Create(context.Context, *domain.ProxyPlan) error
	ListActive(context.Context) ([]domain.ProxyPlan, error)
	FindByID(context.Context, primitive.ObjectID) (*domain.ProxyPlan, error)
}

type PaymentRepository interface {
	CreateIntent(context.Context, *domain.PaymentIntent) error
	FindByReference(context.Context, string) (*domain.PaymentIntent, error)
	MarkPaid(context.Context, string, time.Time) error
	ListRecentByUser(context.Context, primitive.ObjectID, int) ([]domain.PaymentIntent, error)
}

type UsageRepository interface {
	CreateSnapshot(context.Context, *domain.UsageSnapshot) error
	FindLatestSnapshot(context.Context, primitive.ObjectID, string) (*domain.UsageSnapshot, error)
	ListRecentByUser(context.Context, primitive.ObjectID, int) ([]domain.UsageSnapshot, error)
}

type PaymentGateway interface {
	CreateCheckout(context.Context, CreateCheckoutRequest) (CreateCheckoutResponse, error)
	VerifyWebhookSignature(rawBody, signature, secretHash string) bool
}

type ProxyProvisioner interface {
	BuildHTTPCredential(domain.User) domain.ProxyCredential
	BuildSOCKS5Credential(domain.User) domain.ProxyCredential
}

type CreateCheckoutRequest struct {
	Reference        string
	AmountMinorUnits int64
	Currency         string
	Email            string
	CustomerName     string
	RedirectURL      string
	Metadata         map[string]string
}

type CreateCheckoutResponse struct {
	Link string
}
