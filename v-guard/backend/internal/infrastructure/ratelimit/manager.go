package ratelimit

import (
	"sync"
	"time"

	"golang.org/x/time/rate"
)

type Manager struct {
	limiters map[string]*rate.Limiter
	mu       sync.Mutex
	limit    rate.Limit
	burst    int
}

func New(limit rate.Limit, burst int) *Manager {
	m := &Manager{
		limiters: make(map[string]*rate.Limiter),
		limit:    limit,
		burst:    burst,
	}
	go m.cleanupLoop()
	return m
}

func (m *Manager) Allow(key string) bool {
	m.mu.Lock()
	limiter, ok := m.limiters[key]
	if !ok {
		limiter = rate.NewLimiter(m.limit, m.burst)
		m.limiters[key] = limiter
	}
	m.mu.Unlock()
	return limiter.Allow()
}

func (m *Manager) cleanupLoop() {
	ticker := time.NewTicker(15 * time.Minute)
	defer ticker.Stop()
	for range ticker.C {
		m.mu.Lock()
		for key, limiter := range m.limiters {
			if limiter.AllowN(time.Now(), 0) {
				delete(m.limiters, key)
			}
		}
		m.mu.Unlock()
	}
}
