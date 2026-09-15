package domain

import "time"

type ProxyLocation struct {
	Continent string `json:"continent,omitempty"`
	Country   string `json:"country,omitempty"`
	Region    string `json:"region,omitempty"`
	City      string `json:"city,omitempty"`
	ISP       string `json:"isp,omitempty"`
	ASN       string `json:"asn,omitempty"`
}

type ProxyNode struct {
	ID                     string        `json:"id"`
	Type                   string        `json:"type"`
	IP                     string        `json:"ip,omitempty"`
	Port                   int           `json:"port,omitempty"`
	Protocol               string        `json:"protocol,omitempty"`
	Provider               string        `json:"provider"`
	Location               ProxyLocation `json:"location"`
	Status                 string        `json:"status"`
	HealthStatus           string        `json:"healthStatus"`
	SupportsRotation       bool          `json:"supportsRotation"`
	SupportsStickySessions bool          `json:"supportsStickySessions"`
	CreatedAt              time.Time     `json:"createdAt,omitempty"`
	UpdatedAt              time.Time     `json:"updatedAt,omitempty"`
}

type ProxyAllocationRequest struct {
	UserID        string        `json:"userId"`
	Type          string        `json:"type"`
	Location      ProxyLocation `json:"location"`
	SessionID     string        `json:"sessionId,omitempty"`
	AllowFallback bool          `json:"allowFallback"`
}

type ProxyHealth struct {
	Status    string    `json:"status"`
	LatencyMS int64     `json:"latencyMs,omitempty"`
	Protocol  string    `json:"protocol,omitempty"`
	CheckedAt time.Time `json:"checkedAt,omitempty"`
}
