package http

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/vickins-technologies/v-guard/backend/internal/config"
	"github.com/vickins-technologies/v-guard/backend/internal/domain"
	"github.com/vickins-technologies/v-guard/backend/internal/infrastructure/ratelimit"
	"github.com/vickins-technologies/v-guard/backend/internal/infrastructure/proxy"
	"github.com/vickins-technologies/v-guard/backend/internal/usecase"
)

type Router struct {
	engine *gin.Engine
}

func NewRouter(cfg config.Config, auth *usecase.AuthService, billing *usecase.BillingService, dashboard *usecase.DashboardService, proxySvc *usecase.ProxyService, daemon *proxy.DaemonManager) *Router {
	gin.SetMode(mode(cfg.Env))
	r := gin.New()
	r.Use(gin.Recovery(), gin.Logger())
	limiter := ratelimit.New(10, 20)

	api := r.Group("/api/v1")
	{
		api.GET("/health", func(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"status": "ok"}) })
		api.POST("/auth/register", func(c *gin.Context) { handleRegister(c, auth) })
		api.POST("/auth/login", func(c *gin.Context) { handleLogin(c, auth) })
		api.POST("/auth/refresh", func(c *gin.Context) { handleRefresh(c, auth) })

		secured := api.Group("")
		secured.Use(AuthMiddleware([]byte(cfg.JWTAccessSecret)))
		secured.Use(RateLimitMiddleware(limiter))
		{
			secured.GET("/me", func(c *gin.Context) { handleMe(c, auth) })
			secured.GET("/plans", func(c *gin.Context) { handlePlans(c, billing) })
			secured.GET("/dashboard", func(c *gin.Context) { handleDashboard(c, dashboard, proxySvc) })
			secured.GET("/payments", func(c *gin.Context) { handlePayments(c, billing) })
			secured.POST("/checkout", func(c *gin.Context) { handleCheckout(c, billing) })
			secured.GET("/proxy/credentials", func(c *gin.Context) { handleCredentials(c, proxySvc) })
			secured.POST("/proxy/usage", func(c *gin.Context) { handleUsage(c, proxySvc) })
		}

		admin := secured.Group("/admin")
		admin.Use(RoleMiddleware(domain.RoleAdmin))
		{
			admin.GET("/users", func(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"ok": true}) })
			admin.POST("/proxy/sync", func(c *gin.Context) { handleProxySync(c, daemon) })
		}

		api.POST("/webhooks/flutterwave", func(c *gin.Context) { handleFlutterwaveWebhook(c, billing, cfg) })
	}

	return &Router{engine: r}
}

func (r *Router) Engine() *gin.Engine { return r.engine }

func mode(env string) string {
	if env == "production" {
		return gin.ReleaseMode
	}
	return gin.DebugMode
}
