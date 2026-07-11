package usecase

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"github.com/vickins-technologies/v-guard/backend/internal/domain"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type BillingService struct {
	plans       PlanRepository
	payments    PaymentRepository
	gateway     PaymentGateway
	users       UserRepository
	clock       Clock
	frontendURL string
}

func NewBillingService(plans PlanRepository, payments PaymentRepository, gateway PaymentGateway, users UserRepository, clock Clock, frontendURL string) *BillingService {
	return &BillingService{plans: plans, payments: payments, gateway: gateway, users: users, clock: clock, frontendURL: frontendURL}
}

type CheckoutInput struct {
	UserID   string
	PlanID   string
	Currency string
}

func (s *BillingService) ListPlans(ctx context.Context) ([]domain.ProxyPlan, error) {
	return s.plans.ListActive(ctx)
}

func (s *BillingService) RecentPayments(ctx context.Context, userID string, limit int) ([]domain.PaymentIntent, error) {
	oid, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, domain.ErrInvalidInput
	}
	if limit <= 0 {
		limit = 5
	}
	return s.payments.ListRecentByUser(ctx, oid, limit)
}

func (s *BillingService) CreateCheckoutForPlan(ctx context.Context, userID, planID string) (*domain.PaymentIntent, error) {
	userOID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, domain.ErrInvalidInput
	}
	planOID, err := primitive.ObjectIDFromHex(planID)
	if err != nil {
		return nil, domain.ErrInvalidInput
	}
	user, err := s.users.FindByID(ctx, userOID)
	if err != nil {
		return nil, err
	}
	plan, err := s.plans.FindByID(ctx, planOID)
	if err != nil {
		return nil, err
	}
	return s.CreateCheckout(ctx, user, plan)
}

func (s *BillingService) CreateCheckout(ctx context.Context, user *domain.User, plan *domain.ProxyPlan) (*domain.PaymentIntent, error) {
	ref := fmt.Sprintf("vguard_%s", uuid.NewString())
	linkResp, err := s.gateway.CreateCheckout(ctx, CreateCheckoutRequest{
		Reference:        ref,
		AmountMinorUnits: plan.PriceMinorUnits,
		Currency:         string(plan.Currency),
		Email:            user.Email,
		CustomerName:     user.DisplayName,
		RedirectURL:      s.frontendURL + "/billing?status=success",
		Metadata: map[string]string{
			"userId": user.ID.Hex(),
			"planId": plan.ID.Hex(),
			"credits": fmt.Sprintf("%.2f", plan.Credits),
		},
	})
	if err != nil {
		return nil, err
	}

	intent := &domain.PaymentIntent{
		UserID:           user.ID,
		Reference:        ref,
		FlutterwaveLink:  linkResp.Link,
		Currency:         plan.Currency,
		AmountMinorUnits: plan.PriceMinorUnits,
		Credits:          plan.Credits,
		Status:           "pending",
		CreatedAt:        s.clock.Now(),
	}
	if err := s.payments.CreateIntent(ctx, intent); err != nil {
		return nil, err
	}
	return intent, nil
}

func (s *BillingService) HandleSuccessfulPayment(ctx context.Context, reference string) error {
	intent, err := s.payments.FindByReference(ctx, reference)
	if err != nil || intent.Status == "paid" {
		return err
	}
	now := s.clock.Now()
	if err := s.payments.MarkPaid(ctx, reference, now); err != nil {
		return err
	}
	return s.users.AddCredits(ctx, intent.UserID, intent.Credits)
}

func (s *BillingService) WebhookSignatureOK(rawBody, signature, secretHash string) bool {
	return s.gateway.VerifyWebhookSignature(rawBody, signature, secretHash)
}
