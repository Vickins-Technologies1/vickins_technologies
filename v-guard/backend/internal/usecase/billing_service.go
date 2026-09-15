package usecase

import (
	"context"
	"fmt"
	"math/big"
	"strconv"

	"github.com/google/uuid"
	"github.com/vickins-technologies/v-guard/backend/internal/domain"
	"github.com/vickins-technologies/v-guard/backend/internal/pricing"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type BillingService struct {
	plans        PlanRepository
	payments     PaymentRepository
	gateway      PaymentGateway
	users        UserRepository
	clock        Clock
	frontendURL  string
	creditsPerGB float64
}

func NewBillingService(plans PlanRepository, payments PaymentRepository, gateway PaymentGateway, users UserRepository, clock Clock, frontendURL string, creditsPerGB float64) *BillingService {
	return &BillingService{plans: plans, payments: payments, gateway: gateway, users: users, clock: clock, frontendURL: frontendURL, creditsPerGB: creditsPerGB}
}

func (s *BillingService) ListPlans(ctx context.Context) ([]domain.ProxyPlan, error) {
	plans, err := s.plans.ListActive(ctx)
	if err != nil {
		return nil, err
	}
	for i := range plans {
		normalizePlan(&plans[i])
	}
	return plans, nil
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
	normalizePlan(plan)
	return s.CreateCheckout(ctx, user, plan)
}

// CreateCheckoutForTraffic provides a custom traffic purchase without trusting a client amount.
func (s *BillingService) CreateCheckoutForTraffic(ctx context.Context, userID, trafficGB string) (*domain.PaymentIntent, error) {
	userOID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, domain.ErrInvalidInput
	}
	user, err := s.users.FindByID(ctx, userOID)
	if err != nil {
		return nil, err
	}
	traffic, err := pricing.ParseTrafficGB(trafficGB)
	if err != nil {
		return nil, domain.ErrInvalidInput
	}
	if traffic.Cmp(new(big.Rat).SetFloat64(pricing.MaxTrafficGB)) > 0 {
		return nil, domain.ErrInvalidInput
	}
	trafficValue, _ := traffic.Float64()
	return s.createCheckout(ctx, user, trafficValue, pricing.USDCentsForGB(traffic), "USD")
}

func (s *BillingService) CreateCheckout(ctx context.Context, user *domain.User, plan *domain.ProxyPlan) (*domain.PaymentIntent, error) {
	amount := plan.PriceMinorUnits
	if plan.Currency == "USD" {
		amount = pricing.USDCentsForGB(new(big.Rat).SetFloat64(plan.TrafficGB))
	}
	return s.createCheckout(ctx, user, plan.TrafficGB, amount, string(plan.Currency))
}

func (s *BillingService) createCheckout(ctx context.Context, user *domain.User, trafficGB float64, amount int64, currency string) (*domain.PaymentIntent, error) {
	ref := fmt.Sprintf("vguard_%s", uuid.NewString())
	linkResp, err := s.gateway.CreateCheckout(ctx, CreateCheckoutRequest{
		Reference: ref, AmountMinorUnits: amount, Currency: currency, Email: user.Email, CustomerName: user.DisplayName,
		RedirectURL: s.frontendURL + "/billing?status=success",
		Metadata:    map[string]string{"userId": user.ID.Hex(), "trafficGB": strconv.FormatFloat(trafficGB, 'f', 6, 64), "pricePerGBUSD": fmt.Sprintf("%d", pricing.PricePerGBUSDCents)},
	})
	if err != nil {
		return nil, err
	}
	credits := trafficGB
	if s.creditsPerGB > 0 {
		credits = trafficGB * s.creditsPerGB
	}
	intent := &domain.PaymentIntent{UserID: user.ID, Reference: ref, FlutterwaveLink: linkResp.Link, Currency: domain.Currency(currency), AmountMinorUnits: amount, Credits: credits, TrafficGB: trafficGB, PricePerGBUSDCents: pricing.PricePerGBUSDCents, Status: "pending", CreatedAt: s.clock.Now()}
	if err := s.payments.CreateIntent(ctx, intent); err != nil {
		return nil, err
	}
	return intent, nil
}

func (s *BillingService) HandleSuccessfulPayment(ctx context.Context, reference string) error {
	intent, err := s.payments.FindByReference(ctx, reference)
	if err != nil {
		return err
	}
	if intent.Status == "paid" {
		return nil
	}
	marked, err := s.payments.MarkPaidIfPending(ctx, reference, s.clock.Now())
	if err != nil || !marked {
		return err
	}
	return s.users.AddCredits(ctx, intent.UserID, intent.Credits)
}

func (s *BillingService) WebhookSignatureOK(rawBody, signature, secretHash string) bool {
	return s.gateway.VerifyWebhookSignature(rawBody, signature, secretHash)
}

func normalizePlan(plan *domain.ProxyPlan) {
	if plan.TrafficGB <= 0 {
		if plan.BandwidthBytes > 0 {
			plan.TrafficGB = pricing.GBFromBytes(plan.BandwidthBytes)
		} else {
			plan.TrafficGB = plan.Credits
		}
	}
	// Legacy plans may still carry NGN/KES and credit fields in Mongo. Project
	// them into the canonical customer-facing USD/GB model without rewriting
	// historical plan or payment records.
	plan.Currency = domain.Currency("USD")
	plan.PriceMinorUnits = pricing.USDCentsForGB(new(big.Rat).SetFloat64(plan.TrafficGB))
}
