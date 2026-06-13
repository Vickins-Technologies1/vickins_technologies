package http

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/vickins-technologies/v-guard/backend/internal/domain"
	"github.com/vickins-technologies/v-guard/backend/internal/usecase"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func handleCredentials(c *gin.Context, proxySvc *usecase.ProxyService) {
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
	cred, err := proxySvc.ProvisionCredential(c.Request.Context(), oid, domain.ProxyTypeHTTP)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to provision credential"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cred})
}

func handleUsage(c *gin.Context, proxySvc *usecase.ProxyService) {
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
	var input struct {
		Source    string `json:"source"`
		BytesIn   int64  `json:"bytesIn"`
		BytesOut  int64  `json:"bytesOut"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid payload"})
		return
	}
	snap, err := proxySvc.RecordUsage(c.Request.Context(), oid, input.Source, input.BytesIn, input.BytesOut)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to record usage"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": snap})
}
