package proxy

import (
	"bytes"
	"context"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/vickins-technologies/v-guard/backend/internal/config"
	"github.com/vickins-technologies/v-guard/backend/internal/domain"
	"github.com/vickins-technologies/v-guard/backend/internal/usecase"
)

type DaemonManager struct {
	users usecase.UserRepository
	cfg   config.Config
}

type DaemonSyncResult struct {
	HTTPConfigPath  string `json:"httpConfigPath"`
	SOCKSConfigPath string `json:"socksConfigPath"`
	UsersPath       string `json:"usersPath"`
	UserCount       int    `json:"userCount"`
}

func NewDaemonManager(users usecase.UserRepository, cfg config.Config) *DaemonManager {
	return &DaemonManager{users: users, cfg: cfg}
}

func (m *DaemonManager) Sync(ctx context.Context) (*DaemonSyncResult, error) {
	active, err := m.users.ListActive(ctx)
	if err != nil {
		return nil, err
	}

	if err := os.MkdirAll(m.cfg.ProxyRuntimeDir, 0o750); err != nil {
		return nil, err
	}

	httpConfig, err := m.renderHTTPConfig(active)
	if err != nil {
		return nil, err
	}
	socksConfig, err := m.renderSOCKSConfig(active)
	if err != nil {
		return nil, err
	}

	if err := os.MkdirAll(filepath.Dir(m.cfg.ProxyHTTPConfigPath), 0o750); err != nil {
		return nil, err
	}
	if err := os.MkdirAll(filepath.Dir(m.cfg.ProxySOCKSConfigPath), 0o750); err != nil {
		return nil, err
	}
	if err := os.MkdirAll(filepath.Dir(m.cfg.ProxyUsersPath), 0o750); err != nil {
		return nil, err
	}

	if err := os.WriteFile(m.cfg.ProxyHTTPConfigPath, []byte(httpConfig), 0o640); err != nil {
		return nil, err
	}
	if err := os.WriteFile(m.cfg.ProxySOCKSConfigPath, []byte(socksConfig), 0o640); err != nil {
		return nil, err
	}
	if err := os.WriteFile(m.cfg.ProxyUsersPath, []byte(m.renderUsersFile(active)), 0o640); err != nil {
		return nil, err
	}

	if err := m.reload(ctx, m.cfg.ProxyHTTPReloadCommand); err != nil {
		return nil, err
	}
	if err := m.reload(ctx, m.cfg.ProxySOCKSReloadCommand); err != nil {
		return nil, err
	}

	return &DaemonSyncResult{
		HTTPConfigPath:  m.cfg.ProxyHTTPConfigPath,
		SOCKSConfigPath: m.cfg.ProxySOCKSConfigPath,
		UsersPath:       m.cfg.ProxyUsersPath,
		UserCount:       len(active),
	}, nil
}

func (m *DaemonManager) renderHTTPConfig(users []domain.User) (string, error) {
	var b bytes.Buffer
	b.WriteString("daemon\n")
	b.WriteString("auth strong\n")
	var entries []string
	for _, user := range users {
		if user.ProxyUsername == "" || user.ProxyPassword == "" {
			continue
		}
		entries = append(entries, fmt.Sprintf("%s:CL:%s", user.ProxyUsername, user.ProxyPassword))
	}
	if len(entries) > 0 {
		b.WriteString("users ")
		b.WriteString(strings.Join(entries, " "))
		b.WriteByte('\n')
	}
	b.WriteString("allow *\n")
	b.WriteString(fmt.Sprintf("proxy -p%d -a\n", m.cfg.ProxyHTTPPort))
	b.WriteString("flush\n")
	return b.String(), nil
}

func (m *DaemonManager) renderSOCKSConfig(users []domain.User) (string, error) {
	var b strings.Builder
	b.WriteString("logoutput: stderr\n")
	b.WriteString("internal: 0.0.0.0 port = ")
	b.WriteString(fmt.Sprintf("%d\n", m.cfg.ProxySOCKSPort))
	b.WriteString("external: 0.0.0.0\n")
	b.WriteString("socksmethod: username\n")
	b.WriteString("clientmethod: none\n")
	b.WriteString("user.privileged: root\n")
	b.WriteString("user.notprivileged: nobody\n")
	b.WriteString("pass {\n")
	b.WriteString("  from: 0.0.0.0/0 to: 0.0.0.0/0\n")
	b.WriteString("  log: connect disconnect error\n")
	b.WriteString("  protocol: tcp udp\n")
	b.WriteString("}\n")
	b.WriteString("# generated users\n")
	for _, user := range users {
		if user.ProxyUsername == "" || user.ProxyPassword == "" {
			continue
		}
		b.WriteString(fmt.Sprintf("# %s:%s\n", user.ProxyUsername, user.ProxyPassword))
	}
	return b.String(), nil
}

func (m *DaemonManager) renderUsersFile(users []domain.User) string {
	var b strings.Builder
	for _, user := range users {
		if user.ProxyUsername == "" || user.ProxyPassword == "" {
			continue
		}
		b.WriteString(user.ProxyUsername)
		b.WriteByte(':')
		b.WriteString(user.ProxyPassword)
		b.WriteByte('\n')
	}
	return b.String()
}

func (m *DaemonManager) reload(ctx context.Context, command string) error {
	fields := strings.Fields(command)
	if len(fields) == 0 {
		return nil
	}
	cmd := exec.CommandContext(ctx, fields[0], fields[1:]...)
	out, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("reload %s: %w (%s)", command, err, strings.TrimSpace(string(out)))
	}
	return nil
}
