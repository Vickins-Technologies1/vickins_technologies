# V-Guard Backend Cloud Run Deployment

## Audit Summary

The backend at `v-guard/backend` is a Go API service using Gin, MongoDB, JWT auth, Flutterwave payments, and a proxy-control workflow that generates `3proxy` and Dante configuration files. The root repository also contains a separate Next.js application, and `v-guard/frontend` contains the V-Guard UI. This guide is for the Go backend only.

The backend can be packaged and started on Cloud Run as an API service. The current proxy daemon design is not fully Cloud Run-native because Cloud Run exposes one request port and does not provide systemd, sudo, or long-lived auxiliary proxy daemons for ports `3128` and `1080`.

## Runtime

Cloud Run sets `PORT`; the backend now listens on `0.0.0.0:$PORT` when `HTTP_ADDR` is not set. The default port is `8080`.

Use `APP_ENV=production` in Cloud Run. Do not set `HTTP_ADDR` unless you intentionally need to override the listener address.

## Build Strategy

Use a GitHub-connected Cloud Build or Cloud Run source deployment with source directory:

```text
v-guard/backend
```

The backend includes a production Dockerfile because the repository has multiple apps and the Go service lives in a subdirectory. The image is built in a Go builder stage and runs as a non-root user in a distroless runtime image. No `.env` files or secrets are copied into the image.

## Required Environment Variables

Set these in Cloud Run environment variables or Secret Manager references:

```text
APP_ENV=production
PORT=8080
FRONTEND_URL=https://your-frontend-domain
CORS_ALLOWED_ORIGINS=https://your-frontend-domain
MONGO_URI=<Secret Manager value>
MONGO_DATABASE=vguard
JWT_ACCESS_SECRET=<Secret Manager value>
JWT_REFRESH_SECRET=<Secret Manager value>
FLUTTERWAVE_SECRET_KEY=<Secret Manager value>
FLUTTERWAVE_WEBHOOK_HASH=<Secret Manager value>
FLUTTERWAVE_BASE_URL=https://api.flutterwave.com
PROXY_PUBLIC_HOST=<proxy-hostname>
PROXY_HTTP_PORT=3128
PROXY_SOCKS_PORT=1080
PROXY_RATE_BYTES_PER_SEC=1048576
CREDIT_PER_GB=1
```

Optional bootstrap variables:

```text
BOOTSTRAP_ADMIN_EMAIL=
BOOTSTRAP_ADMIN_PASSWORD=
BOOTSTRAP_ADMIN_NAME=V-Guard Admin
```

Only set bootstrap credentials for the first deployment, then remove them after the admin exists.

## Proxy Daemon Variables

For Cloud Run API-only deployment, leave reload commands empty:

```text
PROXY_RUNTIME_DIR=/tmp/v-guard/proxy
PROXY_USERS_PATH=/tmp/v-guard/proxy/users.txt
PROXY_HTTP_CONFIG_PATH=/tmp/v-guard/proxy/3proxy.cfg
PROXY_SOCKS_CONFIG_PATH=/tmp/v-guard/proxy/danted.conf
PROXY_HTTP_RELOAD_COMMAND=
PROXY_SOCKS_RELOAD_COMMAND=
```

This prevents the admin sync endpoint from attempting `sudo systemctl reload ...`, which is not available in Cloud Run. Files written under `/tmp` are ephemeral and instance-local.

## Health Check

Use either endpoint for Cloud Run health or uptime checks:

```text
GET /health
GET /api/v1/health
```

Both return HTTP `200` with `{"status":"ok"}`.

## Database

Use MongoDB Atlas or another externally reachable MongoDB service. Configure network access so Cloud Run can reach it. The application reuses a single MongoDB client for the process lifetime and disconnects it during graceful shutdown.

## CORS

Set `CORS_ALLOWED_ORIGINS` to a comma-separated list of browser origins allowed to call the API. Example:

```text
CORS_ALLOWED_ORIGINS=https://v-guard.vickinstechnologies.com,https://admin.example.com
```

Avoid `*` when using browser credentials. Bearer-token requests from known origins should use explicit origins.

## GitHub and Cloud Build

Recommended path:

1. Connect the GitHub repository to Cloud Run or Cloud Build.
2. Select source directory `v-guard/backend`.
3. Let Cloud Build build the checked-in Dockerfile.
4. Deploy the image to Cloud Run with runtime secrets from Secret Manager.

The existing `.github/workflows/vguard-deploy.yml` still targets the droplet deployment and was not replaced. `.github/workflows/vguard-backend-ci.yml` only validates backend tests and image build on GitHub; it does not deploy.

## Security Notes

Do not commit `.env`, `.env.local`, service account JSON, private keys, or real payment/JWT/MongoDB secrets. The repository ignores `.env*`, and the backend Docker ignore file excludes local env files from the build context.

If any real secrets were ever committed, rotate them in MongoDB Atlas, Flutterwave, Google Cloud, and any email/auth provider. Removing a secret from a later commit does not remove it from Git history.

## Current Cloud Run Limitation

The API can run on Cloud Run, but the actual HTTP/SOCKS proxy daemons cannot be hosted by this service unchanged. Cloud Run is request-oriented, exposes one app port, and does not run systemd-managed `3proxy`/Dante services on ports `3128` and `1080`.

To preserve full V-Guard proxy functionality, keep the proxy daemons on a VM/GCE instance/droplet or redesign them as a separate Cloud Run-compatible service. Point `PROXY_PUBLIC_HOST` at that proxy host.

## Local Validation

From `v-guard/backend`:

```text
go test ./...
docker build -t v-guard-backend:local .
```

For local API startup, provide the required env vars and run:

```text
go run ./cmd/v-guard
```

Then check:

```text
curl http://localhost:8080/health
```
