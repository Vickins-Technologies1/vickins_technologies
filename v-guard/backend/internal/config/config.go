package config

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	Env                    string
	HTTPAddr               string
	AppName                string
	FrontendURL            string
	JWTAccessSecret        string
	JWTRefreshSecret       string
	JWTAccessTTL           time.Duration
	JWTRefreshTTL          time.Duration
	MongoURI               string
	MongoDatabase          string
	FlutterwaveSecretKey   string
	FlutterwaveWebhookHash string
	FlutterwaveBaseURL     string
	ProxyHTTPPort          int
	ProxySOCKSPort         int
	ProxyRateBytesPerSec   int64
	CreditPerGB            float64
	ProxyRuntimeDir        string
	ProxyUsersPath         string
	ProxyHTTPConfigPath    string
	ProxySOCKSConfigPath   string
	ProxyHTTPReloadCommand string
	ProxySOCKSReloadCommand string
	ProxyPublicHost        string
	BootstrapAdminEmail    string
	BootstrapAdminPassword string
	BootstrapAdminName     string
}

func Load() (Config, error) {
	_ = godotenv.Load()

	cfg := Config{
		Env:                    getString("APP_ENV", "development"),
		HTTPAddr:               getString("HTTP_ADDR", ":8080"),
		AppName:                getString("APP_NAME", "V-Guard"),
		FrontendURL:            getString("FRONTEND_URL", "http://localhost:3000"),
		JWTAccessSecret:        os.Getenv("JWT_ACCESS_SECRET"),
		JWTRefreshSecret:       os.Getenv("JWT_REFRESH_SECRET"),
		MongoURI:               os.Getenv("MONGO_URI"),
		MongoDatabase:          getString("MONGO_DATABASE", "vguard"),
		FlutterwaveSecretKey:   os.Getenv("FLUTTERWAVE_SECRET_KEY"),
		FlutterwaveWebhookHash: os.Getenv("FLUTTERWAVE_WEBHOOK_HASH"),
		FlutterwaveBaseURL:     getString("FLUTTERWAVE_BASE_URL", "https://api.flutterwave.com"),
		ProxyHTTPPort:          getInt("PROXY_HTTP_PORT", 3128),
		ProxySOCKSPort:         getInt("PROXY_SOCKS_PORT", 1080),
		ProxyRateBytesPerSec:   getInt64("PROXY_RATE_BYTES_PER_SEC", 1048576),
		CreditPerGB:            getFloat64("CREDIT_PER_GB", 1),
		ProxyRuntimeDir:         getString("PROXY_RUNTIME_DIR", "/opt/v-guard/runtime/proxy"),
		ProxyUsersPath:          getString("PROXY_USERS_PATH", "/opt/v-guard/runtime/proxy/users.txt"),
		ProxyHTTPConfigPath:     getString("PROXY_HTTP_CONFIG_PATH", "/opt/v-guard/runtime/proxy/3proxy.cfg"),
		ProxySOCKSConfigPath:    getString("PROXY_SOCKS_CONFIG_PATH", "/opt/v-guard/runtime/proxy/danted.conf"),
		ProxyHTTPReloadCommand:  getString("PROXY_HTTP_RELOAD_COMMAND", "sudo systemctl reload 3proxy"),
		ProxySOCKSReloadCommand: getString("PROXY_SOCKS_RELOAD_COMMAND", "sudo systemctl reload danted"),
		ProxyPublicHost:         getString("PROXY_PUBLIC_HOST", "v-guard.vickinstechnologies.com"),
		BootstrapAdminEmail:     strings.ToLower(strings.TrimSpace(os.Getenv("BOOTSTRAP_ADMIN_EMAIL"))),
		BootstrapAdminPassword:  os.Getenv("BOOTSTRAP_ADMIN_PASSWORD"),
		BootstrapAdminName:      getString("BOOTSTRAP_ADMIN_NAME", "V-Guard Admin"),
	}

	cfg.JWTAccessTTL = getDuration("JWT_ACCESS_TTL", 15*time.Minute)
	cfg.JWTRefreshTTL = getDuration("JWT_REFRESH_TTL", 30*24*time.Hour)

	if cfg.JWTAccessSecret == "" || cfg.JWTRefreshSecret == "" || cfg.MongoURI == "" {
		return Config{}, fmt.Errorf("missing required config: JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, MONGO_URI")
	}

	return cfg, nil
}

func getString(key, fallback string) string {
	if v := strings.TrimSpace(os.Getenv(key)); v != "" {
		return v
	}
	return fallback
}

func getInt(key string, fallback int) int {
	if v := strings.TrimSpace(os.Getenv(key)); v != "" {
		if parsed, err := strconv.Atoi(v); err == nil {
			return parsed
		}
	}
	return fallback
}

func getInt64(key string, fallback int64) int64 {
	if v := strings.TrimSpace(os.Getenv(key)); v != "" {
		if parsed, err := strconv.ParseInt(v, 10, 64); err == nil {
			return parsed
		}
	}
	return fallback
}

func getFloat64(key string, fallback float64) float64 {
	if v := strings.TrimSpace(os.Getenv(key)); v != "" {
		if parsed, err := strconv.ParseFloat(v, 64); err == nil {
			return parsed
		}
	}
	return fallback
}

func getDuration(key string, fallback time.Duration) time.Duration {
	if v := strings.TrimSpace(os.Getenv(key)); v != "" {
		if parsed, err := time.ParseDuration(v); err == nil {
			return parsed
		}
	}
	return fallback
}
