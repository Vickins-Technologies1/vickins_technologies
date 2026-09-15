package proxy

import (
	"context"
	"errors"

	"github.com/vickins-technologies/v-guard/backend/internal/domain"
)

var ErrCapabilityUnsupported = errors.New("proxy source capability is unsupported")

// ProviderCapabilities are the only capabilities that the control plane may expose
// to customers. A capability is true only when the backing source can enforce it.
type ProviderCapabilities struct {
	HTTP             bool `json:"http"`
	HTTPSConnect     bool `json:"httpsConnect"`
	SOCKS5           bool `json:"socks5"`
	CountryTargeting bool `json:"countryTargeting"`
	RegionTargeting  bool `json:"regionTargeting"`
	CityTargeting    bool `json:"cityTargeting"`
	ISPTargeting     bool `json:"ispTargeting"`
	Rotation         bool `json:"rotation"`
	StickySessions   bool `json:"stickySessions"`
	HealthChecks     bool `json:"healthChecks"`
	Failover         bool `json:"failover"`
}

type ProxySourceProvider interface {
	Name() string
	Type() domain.ProxyType
	Capabilities() ProviderCapabilities
	GetLocations(context.Context) ([]domain.ProxyLocation, error)
	GetInventory(context.Context, domain.ProxyLocation) ([]domain.ProxyNode, error)
	Allocate(context.Context, domain.ProxyAllocationRequest) (*domain.ProxyNode, error)
	Release(context.Context, string) error
	Rotate(context.Context, string) (*domain.ProxyNode, error)
	HealthCheck(context.Context, string) (domain.ProxyHealth, error)
}

// ExistingSharedProvider is the adapter around the current 3proxy/Dante-backed
// shared endpoint. It deliberately reports no location, rotation, sticky-session,
// or failover capabilities because the current infrastructure cannot enforce them.
type ExistingSharedProvider struct {
	provisioner *Provisioner
}

func NewExistingSharedProvider(provisioner *Provisioner) *ExistingSharedProvider {
	return &ExistingSharedProvider{provisioner: provisioner}
}

func (p *ExistingSharedProvider) Name() string           { return "existing-shared" }
func (p *ExistingSharedProvider) Type() domain.ProxyType { return domain.ProxyTypeHTTP }
func (p *ExistingSharedProvider) Capabilities() ProviderCapabilities {
	return ProviderCapabilities{HTTP: true, HTTPSConnect: true, SOCKS5: true}
}
func (p *ExistingSharedProvider) GetLocations(context.Context) ([]domain.ProxyLocation, error) {
	return []domain.ProxyLocation{}, nil
}
func (p *ExistingSharedProvider) GetInventory(context.Context, domain.ProxyLocation) ([]domain.ProxyNode, error) {
	return []domain.ProxyNode{}, nil
}
func (p *ExistingSharedProvider) Allocate(context.Context, domain.ProxyAllocationRequest) (*domain.ProxyNode, error) {
	return nil, ErrCapabilityUnsupported
}
func (p *ExistingSharedProvider) Release(context.Context, string) error {
	return ErrCapabilityUnsupported
}
func (p *ExistingSharedProvider) Rotate(context.Context, string) (*domain.ProxyNode, error) {
	return nil, ErrCapabilityUnsupported
}
func (p *ExistingSharedProvider) HealthCheck(context.Context, string) (domain.ProxyHealth, error) {
	return domain.ProxyHealth{}, ErrCapabilityUnsupported
}
