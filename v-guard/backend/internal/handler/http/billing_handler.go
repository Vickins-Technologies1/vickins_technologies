package http

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/vickins-technologies/v-guard/backend/internal/config"
	"github.com/vickins-technologies/v-guard/backend/internal/usecase"
)

func handleCheckout(c *gin.Context, billing *usecase.BillingService) {
	var input struct {
		PlanID string `json:"planId"`
	}
	if err := c.ShouldBindJSON(&input); err != nil || input.PlanID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid payload"})
		return
	}
	userID := c.GetString("userID")
	intent, err := billing.CreateCheckoutForPlan(c.Request.Context(), userID, input.PlanID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": intent})
}

func handleFlutterwaveWebhook(c *gin.Context, billing *usecase.BillingService, cfg config.Config) {
	raw, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	signature := c.GetHeader("flutterwave-signature")
	if !securityWebhookVerify(raw, signature, cfg.FlutterwaveWebhookHash) {
		c.Status(http.StatusUnauthorized)
		return
	}

	var payload struct {
		Type string `json:"type"`
		Data struct {
			Reference string `json:"reference"`
			Meta      struct {
				UserID string `json:"userId"`
			} `json:"meta"`
			Status string `json:"status"`
		} `json:"data"`
	}
	if err := json.Unmarshal(raw, &payload); err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	if payload.Type == "charge.completed" && payload.Data.Status == "succeeded" {
		_ = billing.HandleSuccessfulPayment(c.Request.Context(), payload.Data.Reference)
	}
	c.Status(http.StatusOK)
}

func securityWebhookVerify(raw []byte, signature, secret string) bool {
	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write(raw)
	expected := base64.StdEncoding.EncodeToString(mac.Sum(nil))
	return hmac.Equal([]byte(expected), []byte(signature))
}
