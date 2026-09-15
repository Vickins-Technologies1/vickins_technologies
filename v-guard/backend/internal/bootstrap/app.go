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
	mongoinfra "github.com/vickins-technologies/v-guard/backend/internal/infrastructure/mongo"
	"github.com/vickins-technologies/v-guard/backend/internal/infrastructure/payments"
	"github.com/vickins-technologies/v-guard/backend/internal/infrastructure/proxy"
	"github.com/vickins-technologies/v-guard/backend/internal/infrastructure/security"
	"github.com/vickins-technologies/v-guard/backend/internal/pricing"
	mongorepo "github.com/vickins-technologies/v-guard/backend/internal/repository/mongo"
	"github.com/vickins-technologies/v-guard/backend/internal/usecase"
	mongodriver "go.mongodb.org/mongo-driver/mongo"
)

type App struct {
	server      *http.Server
	mongoClient *mongodriver.Client
}

func NewApp(ctx context.Context, cfg config.Config) (*App, error) {
	client, err := mongoinfra.Connect(ctx, cfg.MongoURI)
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
		_ = client.Disconnect(context.Background())
		return nil, err
	}

	clock := usecase.SystemClock{}
	gateway := payments.New(cfg.FlutterwaveBaseURL, cfg.FlutterwaveSecretKey)
	proxyProvisioner := proxy.NewProvisioner(cfg.ProxyPublicHost, cfg.ProxyHTTPPort, cfg.ProxyPublicHost, cfg.ProxySOCKSPort)
	proxyProvider := proxy.NewExistingSharedProvider(proxyProvisioner)
	daemonManager := proxy.NewDaemonManager(userRepo, cfg)

	authSvc := usecase.NewAuthService(userRepo, sessionRepo, cfg.JWTAccessSecret, cfg.JWTRefreshSecret, cfg.JWTAccessTTL, cfg.JWTRefreshTTL, clock)
	billingSvc := usecase.NewBillingService(planRepo, paymentRepo, gateway, userRepo, clock, cfg.FrontendURL, cfg.CreditPerGB)
	proxySvc := usecase.NewProxyService(userRepo, usageRepo, clock, cfg.CreditPerGB, cfg.ProxyPublicHost, cfg.ProxyHTTPPort, cfg.ProxySOCKSPort)
	dashboardSvc := usecase.NewDashboardService(userRepo, planRepo, paymentRepo, usageRepo, proxyProvisioner, clock, cfg.CreditPerGB)

	router := httpHandler.NewRouter(cfg, authSvc, billingSvc, dashboardSvc, proxySvc, daemonManager, proxyProvider)

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

	return &App{server: app, mongoClient: client}, nil
}

func (a *App) Run() error {
	err := a.server.ListenAndServe()
	if errors.Is(err, http.ErrServerClosed) {
		return nil
	}
	return err
}

func (a *App) Shutdown(ctx context.Context) error {
	serverErr := a.server.Shutdown(ctx)
	dbErr := a.mongoClient.Disconnect(ctx)
	if serverErr != nil {
		return serverErr
	}
	return dbErr
}

func seedPlans(ctx context.Context, repo *mongorepo.PlanRepository) error {
	existing, err := repo.ListActive(ctx)
	if err == nil && len(existing) > 0 {
		return nil
	}

	now := time.Now().UTC()
	plans := []struct {
		name      string
		desc      string
		trafficGB float64
		days      int
		popular   bool
	}{
		{"Starter", "For individuals who need secure private proxy access.", 1, 30, false},
		{"Growth", "For teams with recurring proxy workloads.", 5, 30, true},
		{"Business", "For recurring proxy workloads and larger campaigns.", 10, 30, false},
		{"Pro", "For high-volume proxy workloads.", 25, 30, false},
	}

	for _, plan := range plans {
		err := repo.Create(ctx, &domain.ProxyPlan{
			Name:            plan.name,
			Description:     plan.desc,
			ProxyType:       domain.ProxyTypeHTTP,
			Currency:        domain.Currency("USD"),
			PriceMinorUnits: pricing.PricePerGBUSDCents * int64(plan.trafficGB),
			Credits:         plan.trafficGB,
			TrafficGB:       plan.trafficGB,
			BandwidthBytes:  int64(plan.trafficGB) * pricing.BytesPerGB,
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
		Email:          cfg.BootstrapAdminEmail,
		PasswordHash:   hash,
		Role:           domain.RoleAdmin,
		DisplayName:    cfg.BootstrapAdminName,
		Credits:        0,
		RateLimitBytes: 0,
		Active:         true,
		CreatedAt:      now,
		UpdatedAt:      now,
	})
}
