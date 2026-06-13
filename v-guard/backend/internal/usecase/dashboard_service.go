package usecase

import (
	"context"
	"time"

	"github.com/vickins-technologies/v-guard/backend/internal/domain"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DashboardService struct {
	users   UserRepository
	plans   PlanRepository
	payments PaymentRepository
	usage   UsageRepository
	proxy   ProxyProvisioner
	clock   Clock
}

func NewDashboardService(users UserRepository, plans PlanRepository, payments PaymentRepository, usage UsageRepository, proxy ProxyProvisioner, clock Clock) *DashboardService {
	return &DashboardService{users: users, plans: plans, payments: payments, usage: usage, proxy: proxy, clock: clock}
}

type DashboardStats struct {
	BalanceCredits   float64 `json:"balanceCredits"`
	AvailablePlans   int     `json:"availablePlans"`
	RecentPayments   int     `json:"recentPayments"`
	RecentUsageItems  int     `json:"recentUsageItems"`
	TotalUsedBytes   int64   `json:"totalUsedBytes"`
	ProxyTypeCount   int     `json:"proxyTypeCount"`
	ServerTime       time.Time `json:"serverTime"`
}

type DashboardResponse struct {
	User           domain.User            `json:"user"`
	Stats          DashboardStats         `json:"stats"`
	Plans          []domain.ProxyPlan     `json:"plans"`
	Payments       []domain.PaymentIntent `json:"payments"`
	Usage          []domain.UsageSnapshot `json:"usage"`
	HTTPProxy      domain.ProxyCredential `json:"httpProxy"`
	SOCKS5Proxy    domain.ProxyCredential `json:"socks5Proxy"`
}

func (s *DashboardService) Get(ctx context.Context, userID primitive.ObjectID) (*DashboardResponse, error) {
	user, err := s.users.FindByID(ctx, userID)
	if err != nil {
		return nil, err
	}

	plans, err := s.plans.ListActive(ctx)
	if err != nil {
		return nil, err
	}

	payments, err := s.payments.ListRecentByUser(ctx, userID, 5)
	if err != nil {
		return nil, err
	}

	usage, err := s.usage.ListRecentByUser(ctx, userID, 10)
	if err != nil {
		return nil, err
	}

	var usedBytes int64
	for _, item := range usage {
		usedBytes += item.DeltaBytes
	}

	httpProxy := s.proxy.BuildHTTPCredential(*user)
	socksProxy := s.proxy.BuildSOCKS5Credential(*user)

	return &DashboardResponse{
		User:      *user,
		Stats: DashboardStats{
			BalanceCredits:  user.Credits,
			AvailablePlans:  len(plans),
			RecentPayments:  len(payments),
			RecentUsageItems: len(usage),
			TotalUsedBytes:  usedBytes,
			ProxyTypeCount:  2,
			ServerTime:      s.clock.Now(),
		},
		Plans:     plans,
		Payments:   payments,
		Usage:      usage,
		HTTPProxy:  httpProxy,
		SOCKS5Proxy: socksProxy,
	}, nil
}
