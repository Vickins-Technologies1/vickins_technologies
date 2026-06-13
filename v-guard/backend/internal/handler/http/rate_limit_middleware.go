package http

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/vickins-technologies/v-guard/backend/internal/infrastructure/ratelimit"
)

func RateLimitMiddleware(manager *ratelimit.Manager) gin.HandlerFunc {
	return func(c *gin.Context) {
		key := c.GetString("userID")
		if key == "" {
			key = c.ClientIP()
		}
		if !manager.Allow(key) {
			c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{"error": "rate limit exceeded"})
			return
		}
		c.Next()
	}
}
