package proxy

import (
	"fmt"

	"github.com/vickins-technologies/v-guard/backend/internal/domain"
)

type Provisioner struct {
	httpHost  string
	httpPort  int
	socksHost string
	socksPort int
}

func NewProvisioner(httpHost string, httpPort int, socksHost string, socksPort int) *Provisioner {
	return &Provisioner{httpHost: httpHost, httpPort: httpPort, socksHost: socksHost, socksPort: socksPort}
}

func (p *Provisioner) BuildHTTPCredential(user domain.User) domain.ProxyCredential {
	return domain.ProxyCredential{
		Username: user.ProxyUsername,
		Password: user.ProxyPassword,
		Host:     p.httpHost,
		Port:     p.httpPort,
		Type:     domain.ProxyTypeHTTP,
	}
}

func (p *Provisioner) BuildSOCKS5Credential(user domain.User) domain.ProxyCredential {
	return domain.ProxyCredential{
		Username: user.ProxyUsername,
		Password: user.ProxyPassword,
		Host:     p.socksHost,
		Port:     p.socksPort,
		Type:     domain.ProxyTypeSOCKS5,
	}
}

func (p *Provisioner) SquidEntry(cred domain.ProxyCredential) string {
	return fmt.Sprintf("%s:%s", cred.Username, cred.Password)
}

func (p *Provisioner) DanteEntry(cred domain.ProxyCredential) string {
	return fmt.Sprintf("socksmethod: username\nclientmethod: none\nuser.notprivileged: %s", cred.Username)
}
