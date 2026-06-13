package domain

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Role string

const (
	RoleAdmin Role = "admin"
	RoleUser  Role = "user"
)

type ProxyType string

const (
	ProxyTypeHTTP   ProxyType = "http"
	ProxyTypeSOCKS5 ProxyType = "socks5"
)

type Currency string

type User struct {
	ID              primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Email           string             `bson:"email" json:"email"`
	PasswordHash    string             `bson:"passwordHash" json:"-"`
	Role            Role               `bson:"role" json:"role"`
	DisplayName     string             `bson:"displayName" json:"displayName"`
	Credits         float64            `bson:"credits" json:"credits"`
	TotalUsedBytes  int64              `bson:"totalUsedBytes" json:"totalUsedBytes"`
	ProxyUsername   string             `bson:"proxyUsername" json:"proxyUsername"`
	ProxyPassword   string             `bson:"proxyPassword" json:"-"`
	RateLimitBytes  int64              `bson:"rateLimitBytes" json:"rateLimitBytes"`
	Active          bool               `bson:"active" json:"active"`
	CreatedAt       time.Time          `bson:"createdAt" json:"createdAt"`
	UpdatedAt       time.Time          `bson:"updatedAt" json:"updatedAt"`
}

type RefreshSession struct {
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID       primitive.ObjectID `bson:"userId" json:"userId"`
	TokenHash    string             `bson:"tokenHash" json:"-"`
	ExpiresAt    time.Time          `bson:"expiresAt" json:"expiresAt"`
	Revoked      bool               `bson:"revoked" json:"revoked"`
	CreatedAt    time.Time          `bson:"createdAt" json:"createdAt"`
	LastUsedAt   time.Time          `bson:"lastUsedAt" json:"lastUsedAt"`
}

type ProxyPlan struct {
	ID                primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name              string             `bson:"name" json:"name"`
	Description       string             `bson:"description" json:"description"`
	ProxyType         ProxyType          `bson:"proxyType" json:"proxyType"`
	Currency          Currency           `bson:"currency" json:"currency"`
	PriceMinorUnits   int64              `bson:"priceMinorUnits" json:"priceMinorUnits"`
	Credits           float64            `bson:"credits" json:"credits"`
	BandwidthBytes    int64              `bson:"bandwidthBytes" json:"bandwidthBytes"`
	DurationDays      int                `bson:"durationDays" json:"durationDays"`
	IsPopular         bool               `bson:"isPopular" json:"isPopular"`
	Active            bool               `bson:"active" json:"active"`
	CreatedAt         time.Time          `bson:"createdAt" json:"createdAt"`
	UpdatedAt         time.Time          `bson:"updatedAt" json:"updatedAt"`
}

type PaymentIntent struct {
	ID                primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID            primitive.ObjectID `bson:"userId" json:"userId"`
	Reference         string             `bson:"reference" json:"reference"`
	FlutterwaveLink   string             `bson:"flutterwaveLink" json:"flutterwaveLink"`
	Currency          Currency           `bson:"currency" json:"currency"`
	AmountMinorUnits  int64              `bson:"amountMinorUnits" json:"amountMinorUnits"`
	Credits           float64            `bson:"credits" json:"credits"`
	Status            string             `bson:"status" json:"status"`
	CreatedAt         time.Time          `bson:"createdAt" json:"createdAt"`
	PaidAt            *time.Time         `bson:"paidAt,omitempty" json:"paidAt,omitempty"`
}

type UsageSnapshot struct {
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID       primitive.ObjectID `bson:"userId" json:"userId"`
	Source       string             `bson:"source" json:"source"`
	BytesIn      int64              `bson:"bytesIn" json:"bytesIn"`
	BytesOut     int64              `bson:"bytesOut" json:"bytesOut"`
	TotalBytes   int64              `bson:"totalBytes" json:"totalBytes"`
	DeltaBytes   int64              `bson:"deltaBytes" json:"deltaBytes"`
	CreditsUsed  float64            `bson:"creditsUsed" json:"creditsUsed"`
	RecordedAt   time.Time          `bson:"recordedAt" json:"recordedAt"`
}

type ProxyCredential struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Host     string `json:"host"`
	Port     int    `json:"port"`
	Type     ProxyType `json:"type"`
}
