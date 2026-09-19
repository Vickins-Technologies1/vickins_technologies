package http

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/vickins-technologies/v-guard/backend/internal/domain"
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
	if locations == nil {
		locations = []domain.ProxyLocation{}
	}
	c.JSON(http.StatusOK, gin.H{"data": locations})
}

func handleProxyInventory(c *gin.Context, provider proxy.ProxySourceProvider) {
	location := domain.ProxyLocation{
		Country: strings.TrimSpace(c.Query("country")),
		Region:  strings.TrimSpace(c.Query("region")),
		City:    strings.TrimSpace(c.Query("city")),
		ISP:     strings.TrimSpace(c.Query("isp")),
		ASN:     strings.TrimSpace(c.Query("asn")),
	}
	inventory, err := provider.GetInventory(c.Request.Context(), location)
	if err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "unable to load proxy inventory", "code": "PROVIDER_NOT_CONNECTED"})
		return
	}
	if inventory == nil {
		inventory = []domain.ProxyNode{}
	}
	if requestedType := strings.TrimSpace(c.Query("type")); requestedType != "" {
		filtered := make([]domain.ProxyNode, 0, len(inventory))
		for _, node := range inventory {
			if strings.EqualFold(node.Type, requestedType) {
				filtered = append(filtered, node)
			}
		}
		inventory = filtered
	}
	c.JSON(http.StatusOK, gin.H{"data": inventory, "provider": provider.Name()})
}
