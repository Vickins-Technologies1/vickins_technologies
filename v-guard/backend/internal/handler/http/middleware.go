package http

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/vickins-technologies/v-guard/backend/internal/domain"
	"github.com/vickins-technologies/v-guard/backend/internal/infrastructure/security"
)

func AuthMiddleware(secret []byte) gin.HandlerFunc {
	return func(c *gin.Context) {
		token := security.BearerToken(c)
		if token == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing bearer token"})
			return
		}
		claims, err := security.ParseAccessToken(token, secret)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			return
		}
		c.Set("userID", claims.UserID)
		c.Set("role", claims.Role)
		c.Next()
	}
}

func RoleMiddleware(roles ...domain.Role) gin.HandlerFunc {
	allowed := make(map[domain.Role]struct{}, len(roles))
	for _, role := range roles {
		allowed[role] = struct{}{}
	}
	return func(c *gin.Context) {
		raw, ok := c.Get("role")
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing role"})
			return
		}
		role, _ := raw.(domain.Role)
		if _, ok := allowed[role]; !ok {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "forbidden"})
			return
		}
		c.Next()
	}
}

func RequireJSON(c *gin.Context) {
	if !strings.Contains(c.GetHeader("Content-Type"), "application/json") {
		c.AbortWithStatusJSON(http.StatusUnsupportedMediaType, gin.H{"error": "content-type must be application/json"})
		return
	}
	c.Next()
}
