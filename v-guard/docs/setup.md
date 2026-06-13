# V-Guard Setup Guide

## 1. Prepare the droplet

1. Create an Ubuntu 24.04 DigitalOcean droplet.
2. Point `v-guard.vickinstechnologies.com` to the droplet IP.
3. Install packages:
   - `nginx`
   - `mongodb` or connect to MongoDB Atlas
   - `certbot`
   - `git`
4. Create a service account:
   - `sudo useradd --system --create-home --shell /usr/sbin/nologin vguard`

## 2. Configure backend

1. Copy `v-guard/backend/.env.example` to `/etc/v-guard/backend.env`.
2. Fill in:
   - `MONGO_URI`
   - `JWT_ACCESS_SECRET`
   - `JWT_REFRESH_SECRET`
   - `FLUTTERWAVE_SECRET_KEY`
   - `FLUTTERWAVE_WEBHOOK_HASH`
   - Optional bootstrap admin credentials for first login
3. Build the backend binary from `v-guard/backend`.
4. Install the systemd unit from `v-guard/deploy/systemd/v-guard.service`.
5. Reload systemd:
   - `sudo systemctl daemon-reload`
   - `sudo systemctl enable --now v-guard`

## 3. Configure frontend

1. Build `v-guard/frontend` with `npm run build`.
2. Copy the `out/` directory to `/var/www/v-guard/current`.
3. Ensure Nginx serves the static export.

## 4. Configure Nginx and SSL

1. Copy `v-guard/deploy/nginx/v-guard.conf` to `/etc/nginx/sites-available/v-guard.conf`.
2. Symlink it into `sites-enabled`.
3. Run `sudo nginx -t`.
4. Issue a certificate:
   - `sudo certbot --nginx -d v-guard.vickinstechnologies.com`

## 5. Configure Flutterwave

1. Add the webhook URL in Flutterwave dashboard:
   - `https://v-guard.vickinstechnologies.com/api/v1/webhooks/flutterwave`
2. Set the secret hash to match `FLUTTERWAVE_WEBHOOK_HASH`.
3. Enable webhook retries in the Flutterwave dashboard.
4. In production, always re-verify critical transaction data before crediting balances.

## 6. GitHub Actions

1. Add repository secrets:
   - `DROPLET_HOST`
   - `DROPLET_USER`
   - `DROPLET_SSH_KEY`
2. Push to `main`.
3. The workflow builds the frontend export, compiles the Go backend, and deploys both to the droplet.

## 7. Proxy reload permissions

1. Allow the `vguard` service account to reload proxy daemons without a password.
2. Add a restricted sudoers rule, for example:
   - `vguard ALL=NOPASSWD: /bin/systemctl reload 3proxy, /bin/systemctl reload danted`
3. Keep the proxy config paths under `/opt/v-guard/runtime/proxy` so the generator can write them directly.
4. The generator also writes a plain users file at `PROXY_USERS_PATH` for auditing and daemon integration.

## 8. Proxy core notes

- HTTP proxies can be backed by 3proxy.
- SOCKS5 proxies can be backed by Dante.
- V-Guard generates the active user config set under `PROXY_RUNTIME_DIR`, writes the daemon configs, and reloads them via the configured commands.
- Bandwidth usage should be captured from proxy telemetry, written as usage snapshots, then translated into prepaid credit deductions.
