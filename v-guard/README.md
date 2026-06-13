# V-Guard

Production-grade proxy management platform built for Vickins Technologies.

## Folder Structure

```text
v-guard/
  backend/
    cmd/v-guard/main.go
    internal/
      bootstrap/
      config/
      domain/
      handler/http/
      infrastructure/
      repository/mongo/
      usecase/
  frontend/
    app/
    components/
    lib/
    public/
    package.json
    next.config.ts
    tailwind.config.* (optional)
  deploy/
    nginx/v-guard.conf
    systemd/v-guard.service
  docs/
    setup.md
```

## Architecture

- Domain layer: core entities and errors.
- Use case layer: auth, billing, proxy provisioning, usage tracking.
- Repository layer: MongoDB-backed persistence.
- Handler layer: Gin HTTP API, middleware, and webhooks.
- Infrastructure layer: JWT, password hashing, Flutterwave client, proxy credential helpers.

## Backend Highlights

- JWT access + refresh token auth.
- Role-based authorization for `admin` and `user`.
- MongoDB official driver.
- Flutterwave checkout creation and webhook verification.
- Usage snapshots for efficient bandwidth tracking and prepaid credit deduction.
- Proxy credential generation for HTTP and SOCKS5 workflows.

## Frontend Highlights

- Next.js 15 App Router.
- Static export for Nginx delivery.
- Glassy premium dashboard visual language.
- Tailwind-first layout with reusable panels and stat cards.

## Deployment Model

- Backend runs as a single Go binary under systemd.
- Frontend is exported to static files and served by Nginx.
- Nginx reverse proxies `/api/` to the Go backend.
- GitHub Actions builds and ships artifacts to the droplet on push to `main`.
