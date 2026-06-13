package bootstrap

import (
	"context"
	"errors"
	"log"
	"net/http"
	"time"

	"github.com/vickins-technologies/v-guard/backend/internal/config"
	"github.com/vickins-technologies/v-guard/backend/internal/domain"
	httpHandler "github.com/vickins-technologies/v-guard/backend/internal/handler/http"
	"github.com/vickins-technologies/v-guard/backend/internal/infrastructure/mongo"
	"github.com/vickins-technologies/v-guard/backend/internal/infrastructure/payments"
	"github.com/vickins-technologies/v-guard/backend/internal/infrastructure/proxy"
	"github.com/vickins-technologies/v-guard/backend/internal/infrastructure/security"
	mongorepo "github.com/vickins-technologies/v-guard/backend/internal/repository/mongo"
	"github.com/vickins-technologies/v-guard/backend/internal/usecase"
)

type App struct {
	server *http.Server
}

func NewApp(ctx context.Context, cfg config.Config) (*App, error) {
	client, err := mongo.Connect(ctx, cfg.MongoURI)
	if err != nil {
		return nil, err
	}

	db := client.Database(cfg.MongoDatabase)
	userRepo := mongorepo.NewUserRepository(db)
	sessionRepo := mongorepo.NewSessionRepository(db)
	planRepo := mongorepo.NewPlanRepository(db)
	paymentRepo := mongorepo.NewPaymentRepository(db)
	usageRepo := mongorepo.NewUsageRepository(db)

	if err := ensureIndexes(ctx, db); err != nil {
		return nil, err
	}

	clock := usecase.SystemClock{}
	gateway := payments.New(cfg.FlutterwaveBaseURL, cfg.FlutterwaveSecretKey)
	proxyProvisioner := proxy.NewProvisioner(cfg.ProxyPublicHost, cfg.ProxyHTTPPort, cfg.ProxyPublicHost, cfg.ProxySOCKSPort)
	daemonManager := proxy.NewDaemonManager(userRepo, cfg)

	authSvc := usecase.NewAuthService(userRepo, sessionRepo, cfg.JWTAccessSecret, cfg.JWTRefreshSecret, cfg.JWTAccessTTL, cfg.JWTRefreshTTL, clock)
	billingSvc := usecase.NewBillingService(planRepo, paymentRepo, gateway, userRepo, clock, cfg.FrontendURL)
	proxySvc := usecase.NewProxyService(userRepo, usageRepo, clock, cfg.CreditPerGB)
	dashboardSvc := usecase.NewDashboardService(userRepo, planRepo, paymentRepo, usageRepo, proxyProvisioner, clock)

	router := httpHandler.NewRouter(cfg, authSvc, billingSvc, dashboardSvc, proxySvc, daemonManager)

	app := &http.Server{
		Addr:              cfg.HTTPAddr,
		Handler:           router.Engine(),
		ReadHeaderTimeout: 10 * time.Second,
	}

	if err := seedPlans(ctx, planRepo); err != nil {
		log.Printf("plan seed skipped: %v", err)
	}
	if err := seedAdmin(ctx, cfg, userRepo); err != nil {
		log.Printf("admin seed skipped: %v", err)
	}

	return &App{server: app}, nil
}

func (a *App) Run() error {
	err := a.server.ListenAndServe()
	if errors.Is(err, http.ErrServerClosed) {
		return nil
	}
	return err
}

func (a *App) Shutdown(ctx context.Context) error {
	return a.server.Shutdown(ctx)
}

func seedPlans(ctx context.Context, repo *mongorepo.PlanRepository) error {
	existing, err := repo.ListActive(ctx)
	if err == nil && len(existing) > 0 {
		return nil
	}

	now := time.Now().UTC()
	plans := []struct {
		name        string
		desc        string
		currency    string
		price       int64
		credits     float64
		bandwidth   int64
		days        int
		popular     bool
	}{
		{"Starter", "For individuals who need secure private proxy access.", "NGN", 25000, 15, 50 * 1024 * 1024 * 1024, 30, false},
		{"Growth", "For teams with recurring proxy workloads.", "KES", 6000, 60, 200 * 1024 * 1024 * 1024, 30, true},
		{"Enterprise", "For high-volume proxy pools and custom SLAs.", "USD", 12000, 180, 750 * 1024 * 1024 * 1024, 30, false},
	}

	for _, plan := range plans {
		err := repo.Create(ctx, &domain.ProxyPlan{
			Name:            plan.name,
			Description:     plan.desc,
			ProxyType:       domain.ProxyTypeHTTP,
			Currency:        domain.Currency(plan.currency),
			PriceMinorUnits: plan.price,
			Credits:         plan.credits,
			BandwidthBytes:  plan.bandwidth,
			DurationDays:    plan.days,
			IsPopular:       plan.popular,
			Active:          true,
			CreatedAt:       now,
			UpdatedAt:       now,
		})
		if err != nil {
			return err
		}
	}
	return nil
}

func seedAdmin(ctx context.Context, cfg config.Config, repo *mongorepo.UserRepository) error {
	if cfg.BootstrapAdminEmail == "" || cfg.BootstrapAdminPassword == "" {
		return nil
	}
	if _, err := repo.FindByEmail(ctx, cfg.BootstrapAdminEmail); err != nil {
		if err != domain.ErrNotFound {
			return err
		}
	} else {
		return nil
	}

	hash, err := security.HashPassword(cfg.BootstrapAdminPassword)
	if err != nil {
		return err
	}
	now := time.Now().UTC()
	return repo.Create(ctx, &domain.User{
		Email:         cfg.BootstrapAdminEmail,
		PasswordHash:  hash,
		Role:          domain.RoleAdmin,
		DisplayName:   cfg.BootstrapAdminName,
		Credits:       0,
		RateLimitBytes: 0,
		Active:        true,
		CreatedAt:     now,
		UpdatedAt:     now,
	})
}
