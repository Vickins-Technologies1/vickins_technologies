package http

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/vickins-technologies/v-guard/backend/internal/infrastructure/proxy"
)

func handleProxyCapabilities(c *gin.Context, provider proxy.ProxySourceProvider) {
	c.JSON(http.StatusOK, gin.H{"data": gin.H{
		"provider":     provider.Name(),
		"capabilities": provider.Capabilities(),
	}})
}

func handleProxyLocations(c *gin.Context, provider proxy.ProxySourceProvider) {
	locations, err := provider.GetLocations(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "unable to load proxy locations"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": locations})
}
