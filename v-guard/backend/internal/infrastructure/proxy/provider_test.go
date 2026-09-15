package proxy

import "testing"

func TestExistingSharedProviderDoesNotAdvertiseUnsupportedFeatures(t *testing.T) {
	provider := NewExistingSharedProvider(NewProvisioner("proxy.example", 3128, "proxy.example", 1080))
	caps := provider.Capabilities()
	if !caps.HTTP || !caps.HTTPSConnect || !caps.SOCKS5 {
		t.Fatal("shared provider must expose its existing protocols")
	}
	if caps.CountryTargeting || caps.CityTargeting || caps.Rotation || caps.StickySessions || caps.Failover {
		t.Fatal("shared provider advertised unsupported infrastructure")
	}
	locations, err := provider.GetLocations(nil)
	if err != nil || len(locations) != 0 {
		t.Fatalf("expected no fabricated locations, got %v %v", locations, err)
	}
}
