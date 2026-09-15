# VornShield Proxy Gateway architecture

VornShield currently has a Go/Gin control plane backed by MongoDB, JWT authentication, Flutterwave billing, and a shared 3proxy/Dante HTTP/SOCKS5 data plane. The control plane does not proxy every packet or perform MongoDB work per packet.

## Provider boundary

`internal/infrastructure/proxy.ProxySourceProvider` is the provider adapter contract. It exposes capabilities, locations, inventory, allocation, release, rotation, and health checks without requiring every provider to support every operation.

The current shared implementation is wrapped by `ExistingSharedProvider`. It truthfully advertises only:

- HTTP
- HTTPS CONNECT
- SOCKS5

It returns an empty location inventory and rejects allocation, rotation, release, and health operations because the current shared 3proxy/Dante setup has no real upstream location pool or session engine.

Future adapters can be added for authorized datacenter, ISP, residential, or mobile providers without changing the control-plane routes. Provider capabilities must be checked before exposing a feature to customers.

## Current API capability surface

- `GET /api/v1/proxy/capabilities` — authenticated provider capability matrix
- `GET /api/v1/proxy/locations` — authenticated real location inventory; currently empty
- Existing credential and usage routes remain unchanged

No fake locations, nodes, IPs, health scores, latency, rotation, sticky sessions, or failover claims are seeded.

## Migration path

The existing shared provider remains operational. A production gateway migration should add real provider adapters and an optimized data-plane router in front of them, with Redis or equivalent short-lived state for sessions, health cache, distributed locks, and rate limiting. Permanent billing and traffic records remain in MongoDB.
