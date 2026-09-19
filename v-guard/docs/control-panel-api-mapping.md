# VornShield control-panel API mapping

The control panel consumes the Go API as the source of truth. Empty provider inventory is represented as an empty response or a provider-unavailable state; the frontend does not synthesize endpoints, locations, sessions, health, usage, or keys.

| Control-panel surface | Frontend client | Go endpoint | Current backend state |
| --- | --- | --- | --- |
| Dashboard | `loadDashboard`, `loadProxyInventory` | `GET /api/v1/dashboard`, `GET /api/v1/proxy/inventory` | Account, billing and usage data; inventory empty with the current shared adapter |
| Proxy network | `loadProxyCapabilities` | `GET /api/v1/proxy/capabilities` | HTTP, HTTPS CONNECT and SOCKS5 gateway capability only |
| Proxy type pages | `loadProxyInventory` | `GET /api/v1/proxy/inventory` | Unified inventory contract; empty until a provider adapter returns endpoints |
| Locations | `loadProxyLocations` | `GET /api/v1/proxy/locations` | Empty with the current provider |
| Usage | `loadDashboard` | `GET /api/v1/dashboard` | Recent backend-recorded usage snapshots |
| Billing | existing checkout client | `GET /api/v1/plans`, `POST /api/v1/checkout`, `GET /api/v1/payments` | Existing backend-confirmed checkout and payment history |
| Credentials | `loadDashboard` | `GET /api/v1/dashboard` | Existing authenticated HTTP/SOCKS5 gateway credentials; passwords masked in UI |
| Admin proxy sync | existing client | `POST /api/v1/admin/proxy/sync` | Existing admin-only operation |

The following routes exist in the UI as architecture-ready surfaces but are intentionally marked unavailable because the current Go API does not expose the corresponding resource service: proxy sessions, API keys, notifications, profile mutations, settings mutations, password changes, provider administration, rotation, allocation, and endpoint testing.

The new inventory endpoint delegates to the existing `ProxySourceProvider` abstraction. It does not know provider-specific API structures and returns `PROVIDER_NOT_CONNECTED` only when the adapter cannot serve inventory.
