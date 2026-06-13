package payments

import (
	"bytes"
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/vickins-technologies/v-guard/backend/internal/usecase"
)

type Client struct {
	baseURL    string
	secretKey  string
	httpClient *http.Client
}

func New(baseURL, secretKey string) *Client {
	return &Client{
		baseURL:   baseURL,
		secretKey: secretKey,
		httpClient: &http.Client{Timeout: 20 * time.Second},
	}
}

type createPaymentRequest struct {
	TxRef        string            `json:"tx_ref"`
	Amount       int64             `json:"amount"`
	Currency     string            `json:"currency"`
	RedirectURL  string            `json:"redirect_url"`
	Customer     map[string]string  `json:"customer"`
	Customization map[string]string `json:"customizations,omitempty"`
	Meta         map[string]string  `json:"meta,omitempty"`
}

type createPaymentResponse struct {
	Status string `json:"status"`
	Data   struct {
		Link string `json:"link"`
	} `json:"data"`
}

func (c *Client) CreateCheckout(ctx context.Context, req usecase.CreateCheckoutRequest) (usecase.CreateCheckoutResponse, error) {
	body, err := json.Marshal(createPaymentRequest{
		TxRef:    req.Reference,
		Amount:   req.AmountMinorUnits,
		Currency: req.Currency,
		RedirectURL: req.RedirectURL,
		Customer: map[string]string{
			"email": req.Email,
			"name":  req.CustomerName,
		},
		Meta: req.Metadata,
	})
	if err != nil {
		return usecase.CreateCheckoutResponse{}, err
	}

	httpReq, err := http.NewRequestWithContext(ctx, http.MethodPost, c.baseURL+"/v3/payments", bytes.NewReader(body))
	if err != nil {
		return usecase.CreateCheckoutResponse{}, err
	}
	httpReq.Header.Set("Authorization", "Bearer "+c.secretKey)
	httpReq.Header.Set("Content-Type", "application/json")

	resp, err := c.httpClient.Do(httpReq)
	if err != nil {
		return usecase.CreateCheckoutResponse{}, err
	}
	defer resp.Body.Close()
	if resp.StatusCode >= 300 {
		return usecase.CreateCheckoutResponse{}, fmt.Errorf("flutterwave checkout failed: %s", resp.Status)
	}

	var decoded createPaymentResponse
	if err := json.NewDecoder(resp.Body).Decode(&decoded); err != nil {
		return usecase.CreateCheckoutResponse{}, err
	}
	return usecase.CreateCheckoutResponse{Link: decoded.Data.Link}, nil
}

func (c *Client) VerifyWebhookSignature(rawBody, signature, secretHash string) bool {
	mac := hmac.New(sha256.New, []byte(secretHash))
	mac.Write([]byte(rawBody))
	expected := base64.StdEncoding.EncodeToString(mac.Sum(nil))
	return hmac.Equal([]byte(expected), []byte(signature))
}
