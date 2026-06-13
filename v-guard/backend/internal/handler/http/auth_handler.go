package http

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/vickins-technologies/v-guard/backend/internal/domain"
	"github.com/vickins-technologies/v-guard/backend/internal/usecase"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func handleRegister(c *gin.Context, auth *usecase.AuthService) {
	var input struct {
		Email       string `json:"email"`
		Password    string `json:"password"`
		DisplayName string `json:"displayName"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid payload"})
		return
	}
	res, err := auth.Register(c.Request.Context(), usecase.RegisterInput{
		Email:       input.Email,
		Password:    input.Password,
		DisplayName: input.DisplayName,
	})
	if err != nil {
		if err == domain.ErrInvalidInput {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err.Error() == "email already exists" {
			c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "registration service unavailable"})
		return
	}
	c.JSON(http.StatusCreated, res)
}

func handleLogin(c *gin.Context, auth *usecase.AuthService) {
	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid payload"})
		return
	}
	res, err := auth.Login(c.Request.Context(), input.Email, input.Password)
	if err != nil {
		if err == domain.ErrUnauthorized {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "authentication service unavailable"})
		return
	}
	c.JSON(http.StatusOK, res)
}

func handleRefresh(c *gin.Context, auth *usecase.AuthService) {
	var input struct {
		RefreshToken string `json:"refreshToken"`
	}
	if err := c.ShouldBindJSON(&input); err != nil || strings.TrimSpace(input.RefreshToken) == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid payload"})
		return
	}
	res, err := auth.Refresh(c.Request.Context(), input.RefreshToken)
	if err != nil {
		if err == domain.ErrUnauthorized {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid refresh token"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "authentication service unavailable"})
		return
	}
	c.JSON(http.StatusOK, res)
}

func handleMe(c *gin.Context, auth *usecase.AuthService) {
	userIDStr, ok := c.Get("userID")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "missing user context"})
		return
	}
	if _, err := primitive.ObjectIDFromHex(userIDStr.(string)); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user id"})
		return
	}
	_ = auth
	c.JSON(http.StatusOK, gin.H{"userId": userIDStr, "role": c.GetString("role")})
}

func handlePlans(c *gin.Context, billing *usecase.BillingService) {
	plans, err := billing.ListPlans(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to list plans"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": plans})
}
