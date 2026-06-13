package http

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/vickins-technologies/v-guard/backend/internal/domain"
	"github.com/vickins-technologies/v-guard/backend/internal/infrastructure/proxy"
	"github.com/vickins-technologies/v-guard/backend/internal/usecase"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func handleDashboard(c *gin.Context, dashboard *usecase.DashboardService, proxySvc *usecase.ProxyService) {
	userID, ok := c.Get("userID")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "missing user context"})
		return
	}
	oid, err := primitive.ObjectIDFromHex(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user id"})
		return
	}
	resp, err := dashboard.Get(c.Request.Context(), oid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	httpProxy, err := proxySvc.ProvisionCredential(c.Request.Context(), oid, domain.ProxyTypeHTTP)
	if err == nil {
		resp.HTTPProxy = httpProxy
	}
	socksProxy, err := proxySvc.ProvisionCredential(c.Request.Context(), oid, domain.ProxyTypeSOCKS5)
	if err == nil {
		resp.SOCKS5Proxy = socksProxy
	}
	c.JSON(http.StatusOK, gin.H{"data": resp})
}

func handlePayments(c *gin.Context, billing *usecase.BillingService) {
	userID, ok := c.Get("userID")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "missing user context"})
		return
	}
	payments, err := billing.RecentPayments(c.Request.Context(), userID.(string), 8)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to load payments"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payments})
}

func handleProxySync(c *gin.Context, daemon *proxy.DaemonManager) {
	if daemon == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "proxy manager unavailable"})
		return
	}
	result, err := daemon.Sync(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": result})
}
