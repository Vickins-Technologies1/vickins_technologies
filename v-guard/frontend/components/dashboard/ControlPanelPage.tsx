"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowPathIcon, BellIcon, ChartBarIcon, CheckCircleIcon, CreditCardIcon, GlobeAltIcon, KeyIcon, LockClosedIcon, MapPinIcon, PlusIcon, QuestionMarkCircleIcon, SignalIcon, ShieldCheckIcon, UserCircleIcon, UsersIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { AppShell } from "./DashboardShell";
import { ApiError, loadDashboard, loadProxyCapabilities, loadProxyInventory, loadProxyLocations } from "../../lib/api";
import { readSession } from "../../lib/session";
import type { DashboardData, ProxyCapabilities, ProxyLocation, ProxyNode, ProxyProviderCapabilities } from "../../lib/types";

type PanelPage = "proxies" | "locations" | "sessions" | "usage" | "api" | "keys" | "credentials" | "notifications" | "settings" | "profile" | "support";

const proxyTypes = [
  { key: "datacenter", label: "Datacenter", description: "Stable infrastructure endpoints for controlled workloads." },
  { key: "isp", label: "ISP", description: "Provider-backed ISP routes when connected and authorized." },
  { key: "residential", label: "Residential", description: "Residential provider inventory with location targeting." },
  { key: "mobile", label: "Mobile", description: "Mobile carrier infrastructure when a provider is configured." },
];

function formatGB(value: number | null | undefined) { return typeof value === "number" && Number.isFinite(value) ? `${value.toFixed(2)} GB` : "—"; }
function errorMessage(error: unknown) {
  if (error instanceof ApiError && error.status === 401) return "Your secure session has expired. Sign in again to continue.";
  if (error instanceof ApiError && error.status === 403) return "You do not have permission to view this resource.";
  if (error instanceof ApiError && error.code === "PROVIDER_NOT_CONNECTED") return "Provider infrastructure is not connected yet.";
  return "Unable to load this VornShield resource. Try again.";
}

function EmptyState({ title, text, icon: Icon = ShieldCheckIcon, action }: { title: string; text: string; icon?: typeof ShieldCheckIcon; action?: React.ReactNode }) {
  return <div className="resource-state"><span className="resource-state-icon"><Icon /></span><p className="eyebrow-blue">CONTROL PLANE</p><h2>{title}</h2><p>{text}</p>{action}</div>;
}

function ErrorState({ onRetry, message }: { onRetry: () => void; message: string }) {
  return <div className="resource-state error-state"><span className="resource-state-icon"><XCircleIcon /></span><p className="eyebrow-blue">REQUEST FAILED</p><h2>We couldn’t load this view.</h2><p>{message}</p><button className="primary-button" onClick={onRetry}>Try again</button></div>;
}

function PageIntro({ eyebrow, title, text, action }: { eyebrow: string; title: string; text: string; action?: React.ReactNode }) {
  return <section className="resource-intro"><div><p className="eyebrow-blue">{eyebrow}</p><h1>{title}</h1><p className="subtle">{text}</p></div>{action}</section>;
}

function CapabilityPill({ available }: { available: boolean }) {
  return <span className={`availability-pill ${available ? "available" : "unavailable"}`}><i />{available ? "Supported" : "Not connected"}</span>;
}

function ProviderWaitingState({ title = "Provider infrastructure is not connected yet." }: { title?: string }) {
  return <EmptyState title={title} text="VornShield is configured and waiting for an authorized proxy provider to be connected. No inventory or health metrics are being fabricated." icon={SignalIcon} />;
}

export default function ControlPanelPage({ page, proxyType }: { page: PanelPage; proxyType?: string }) {
  const router = useRouter();
  const [sessionReady, setSessionReady] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [provider, setProvider] = useState<ProxyProviderCapabilities | null>(null);
  const [locations, setLocations] = useState<ProxyLocation[]>([]);
  const [inventory, setInventory] = useState<ProxyNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [range, setRange] = useState("30D");

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      if (!readSession()) { router.replace("/login"); return; }
      if (page === "proxies" || page === "locations" || page === "sessions" || proxyType) {
        const capabilityData = await loadProxyCapabilities(); setProvider(capabilityData);
      }
      if (page === "locations") setLocations(await loadProxyLocations());
      if (proxyType) setInventory(await loadProxyInventory({ type: proxyType }));
      if (["usage", "credentials", "profile", "settings"].includes(page)) setData(await loadDashboard());
    } catch (caught) { setError(errorMessage(caught)); }
    finally { setLoading(false); setSessionReady(true); }
  }, [page, proxyType, router]);

  useEffect(() => { void load(); }, [load]);

  if (!sessionReady) return <div className="auth-redirect"><div className="preloader-orbit small-orbit" /><span>Restoring secure session…</span></div>;
  const userName = data?.user.displayName || data?.user.email || "Account";
  return <AppShell userName={userName} role={data?.user.role} onRefresh={() => void load()} refreshing={loading}>
    <div className="resource-page">
      {loading ? <div className="skeleton-page"><div className="skeleton-line wide" /><div className="skeleton-card tall" /></div> : error ? <ErrorState message={error} onRetry={() => void load()} /> : proxyType ? <ProxyTypeView type={proxyType} provider={provider} inventory={inventory} /> : page === "proxies" ? <ProxyNetworkView provider={provider} /> : page === "locations" ? <LocationsView locations={locations} query={query} setQuery={setQuery} /> : page === "usage" ? <UsageView data={data} range={range} setRange={setRange} /> : page === "credentials" ? <CredentialsView data={data} /> : page === "profile" ? <ProfileView data={data} /> : page === "settings" ? <SettingsView data={data} /> : <UnavailableResource page={page} />}
    </div>
  </AppShell>;
}

function ProxyNetworkView({ provider }: { provider: ProxyProviderCapabilities | null }) {
  const caps = provider?.capabilities;
  return <><PageIntro eyebrow="PROXY NETWORK" title="Proxy Network" text="Manage your available proxy infrastructure and connection sources." action={<button className="secondary-button" disabled title="Provider inventory is not connected"><ArrowPathIcon /> Refresh inventory</button>} /><section className="provider-banner"><div><p className="eyebrow-blue">CONTROL PLANE / READY</p><h2>{provider?.provider || "Provider layer"}</h2><p>Gateway protocols reflect the connected VornShield gateway. Proxy inventory appears only when a provider adapter returns real endpoints.</p></div><div className="provider-status-grid"><span><b>Gateway</b><strong>Operational</strong></span><span><b>Provider</b><strong className="warning-text">Not connected</strong></span><span><b>Inventory</b><strong>—</strong></span></div></section><div className="proxy-type-grid">{proxyTypes.map((item) => <article className="proxy-type-card" key={item.key}><div className="resource-card-top"><span className="resource-icon"><SignalIcon /></span><CapabilityPill available={false} /></div><h2>{item.label}</h2><p>{item.description}</p><div className="proxy-type-facts"><span><small>Locations</small><b>—</b></span><span><small>Sessions</small><b>—</b></span><span><small>Health</small><b>—</b></span></div><a className="secondary-button full" href={`/proxies/${item.key}`}>Open {item.label}</a></article>)}</div><section className="panel-card protocol-panel"><div className="panel-heading"><div><p className="eyebrow-blue">CURRENT GATEWAY</p><h2>Supported protocols</h2></div><span className="secure-badge"><ShieldCheckIcon /> Backend reported</span></div><div className="protocol-list"><Protocol label="HTTP" available={Boolean(caps?.http)} /><Protocol label="HTTPS CONNECT" available={Boolean(caps?.httpsConnect)} /><Protocol label="SOCKS5" available={Boolean(caps?.socks5)} /><Protocol label="Rotation" available={Boolean(caps?.rotation)} /></div></section></>;
}

function Protocol({ label, available }: { label: string; available: boolean }) { return <div className="protocol-row"><span>{label}</span><CapabilityPill available={available} /></div>; }

function ProxyTypeView({ type, provider, inventory }: { type: string; provider: ProxyProviderCapabilities | null; inventory: ProxyNode[] }) {
  const label = proxyTypes.find((item) => item.key === type)?.label || type;
  return <><PageIntro eyebrow={`PROXY NETWORK / ${label.toUpperCase()}`} title={`${label} infrastructure`} text={`Unified ${label.toLowerCase()} inventory from authorized VornShield providers.`} action={<button className="secondary-button" disabled title="No provider actions are connected"><PlusIcon /> Create session</button>} />{inventory.length === 0 ? <ProviderWaitingState title={`${label} provider not connected`} /> : <section className="panel-card"><div className="panel-heading"><div><p className="eyebrow-blue">LIVE INVENTORY</p><h2>{inventory.length} endpoint{inventory.length === 1 ? "" : "s"}</h2></div><CapabilityPill available /></div><div className="resource-table">{inventory.map((node) => <div className="resource-table-row" key={node.id}><span><b>{node.ip || "—"}</b><small>{node.location.city || "—"}, {node.location.country || "—"}</small></span><span>{node.protocol || "—"}</span><span>{node.status || "—"}</span><span>{node.healthStatus || "—"}</span></div>)}</div></section>}{provider && <section className="capability-note"><ShieldCheckIcon /><span>Provider capabilities are reported by the Go API. Rotation and session actions remain disabled unless the connected adapter advertises them.</span></section>}</>;
}

function LocationsView({ locations, query, setQuery }: { locations: ProxyLocation[]; query: string; setQuery: (value: string) => void }) {
  const filtered = useMemo(() => { const needle = query.toLowerCase().trim(); return locations.filter((item) => !needle || Object.values(item).some((value) => String(value).toLowerCase().includes(needle))); }, [locations, query]);
  return <><PageIntro eyebrow="LOCATION EXPLORER" title="Locations" text="Explore only locations returned by connected provider inventory." action={<div className="search-field"><MapPinIcon /><input placeholder="Search country, city, ISP or ASN" value={query} onChange={(event) => setQuery(event.target.value)} /></div>} />{filtered.length === 0 ? <EmptyState title="No proxy locations available yet." text="Connected provider inventory will appear here with country, region, city, ISP and ASN details." icon={GlobeAltIcon} /> : <section className="panel-card"><div className="panel-heading"><div><p className="eyebrow-blue">AVAILABLE INVENTORY</p><h2>{filtered.length} location{filtered.length === 1 ? "" : "s"}</h2></div></div><div className="location-grid">{filtered.map((item, index) => <article className="location-card" key={`${item.country}-${item.city}-${index}`}><MapPinIcon /><strong>{item.city || "City unavailable"}</strong><span>{[item.region, item.country].filter(Boolean).join(", ") || "Location unavailable"}</span><small>{item.isp || "ISP unavailable"} · {item.asn || "ASN unavailable"}</small></article>)}</div></section>}</>;
}

function UsageView({ data, range, setRange }: { data: DashboardData | null; range: string; setRange: (value: string) => void }) {
  const usage = data?.usage || []; const max = Math.max(...usage.map((item) => item.trafficUsedGB), 0.01);
  return <><PageIntro eyebrow="TRAFFIC USAGE" title="Usage" text="Review backend-recorded traffic usage. Customer-facing units are GB." action={<div className="range-tabs">{["24H", "7D", "30D", "90D"].map((item) => <button className={range === item ? "active" : ""} key={item} onClick={() => setRange(item)}>{item}</button>)}</div>} /><div className="metric-grid"><article className="metric-card"><span className="metric-label">Traffic used</span><strong>{formatGB(data?.stats.trafficUsedGB)}</strong><small>Backend total</small></article><article className="metric-card"><span className="metric-label">Traffic remaining</span><strong>{formatGB(data?.stats.trafficBalanceGB)}</strong><small>Available balance</small></article><article className="metric-card"><span className="metric-label">Estimated rate</span><strong>$6 / GB</strong><small>Canonical backend price</small></article><article className="metric-card"><span className="metric-label">Usage records</span><strong>{usage.length || "—"}</strong><small>Returned for this account</small></article></div><section className="panel-card usage-detail-panel"><div className="panel-heading"><div><p className="eyebrow-blue">{range} / RECORDED USAGE</p><h2>Traffic over time</h2></div><span className="panel-meta">GB</span></div>{usage.length ? <div className="usage-chart large-chart">{usage.map((item) => <div className="bar-wrap" key={item.id}><div className="usage-bar" style={{ height: `${Math.max(8, (item.trafficUsedGB / max) * 100)}%` }} title={`${item.source}: ${formatGB(item.trafficUsedGB)}`} /><span>{new Date(item.recordedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span></div>)}</div> : <EmptyState title="No usage data yet." text="Traffic usage will appear after the backend records an authenticated gateway measurement." icon={ChartBarIcon} />}</section><section className="split-resource-grid"><article className="panel-card"><div className="panel-heading"><h2>By proxy type</h2><span className="panel-meta">Backend data</span></div><EmptyState title="No type breakdown" text="Type-level usage is not returned by the current API." /></article><article className="panel-card"><div className="panel-heading"><h2>By location</h2><span className="panel-meta">Backend data</span></div><EmptyState title="No location breakdown" text="Location-level usage is not returned by the current API." /></article></section></>;
}

function CredentialsView({ data }: { data: DashboardData | null }) {
  const credentials = [data?.httpProxy, data?.socks5Proxy].filter(Boolean);
  return <><PageIntro eyebrow="PROXY ACCESS" title="Credentials" text="Authenticated gateway credentials for the protocols currently exposed by VornShield." /><section className="panel-card"><div className="panel-heading"><div><p className="eyebrow-blue">SECURE ACCESS</p><h2>Connection credentials</h2></div><span className="secure-badge"><LockClosedIcon /> Passwords masked</span></div><div className="credential-table">{credentials.map((credential) => credential && <div className="credential-table-row" key={credential.type}><span><b>{credential.type.toUpperCase()}</b><small>{credential.host}:{credential.port}</small></span><span>{credential.username}</span><span>••••••••••••</span><span className="status-tag">Active</span></div>)}</div><div className="capability-note"><LockClosedIcon /><span>Credentials are loaded from the authenticated Go API. Passwords are never placed in URLs or rendered in logs.</span></div></section></>;
}

function ProfileView({ data }: { data: DashboardData | null }) { const user = data?.user; return <><PageIntro eyebrow="ACCOUNT PROFILE" title="Profile" text="Account identity and status returned by the VornShield API." /><section className="profile-grid"><article className="panel-card profile-card"><span className="avatar large">{(user?.displayName || "A").slice(0, 1).toUpperCase()}</span><h2>{user?.displayName || "—"}</h2><p>{user?.email || "—"}</p><span className="status-tag">{user?.active ? "Active account" : "Inactive account"}</span></article><article className="panel-card detail-list"><Detail label="Name" value={user?.displayName} /><Detail label="Email" value={user?.email} /><Detail label="Phone" value="—" /><Detail label="Company" value="—" /><Detail label="Created" value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"} /><Detail label="Role" value={user?.role} /></article></section><div className="capability-note"><LockClosedIcon /><span>Profile editing and password changes require backend endpoints that are not currently exposed by the Go API.</span></div></>; }
function Detail({ label, value }: { label: string; value?: string }) { return <div><span>{label}</span><strong>{value || "—"}</strong></div>; }
function SettingsView({ data }: { data: DashboardData | null }) { return <><PageIntro eyebrow="ACCOUNT SETTINGS" title="Settings" text="Manage account preferences without exposing infrastructure secrets." /><section className="settings-grid"><article className="panel-card"><div className="panel-heading"><h2>Preferences</h2><span className="panel-meta">Local</span></div><div className="setting-row"><span><b>Theme</b><small>Use the header switch to change dark or light mode.</small></span><CheckCircleIcon /></div><div className="setting-row"><span><b>Timezone</b><small>Account timezone is not returned by the current API.</small></span><strong>—</strong></div><div className="setting-row"><span><b>Language</b><small>Language preferences are not returned by the current API.</small></span><strong>—</strong></div></article><article className="panel-card"><div className="panel-heading"><h2>Security</h2><span className="secure-badge"><ShieldCheckIcon /> Protected</span></div><div className="setting-row"><span><b>Account</b><small>{data?.user.email || "Authenticated account"}</small></span><span className="status-tag">{data?.user.active ? "Active" : "Inactive"}</span></div><button className="secondary-button full" disabled title="Change password endpoint is not available"><LockClosedIcon /> Change password unavailable</button></article></section></>; }

function UnavailableResource({ page }: { page: PanelPage }) {
  const copy: Record<PanelPage, { title: string; text: string; icon: typeof KeyIcon }> = {
    sessions: { title: "No proxy sessions available yet.", text: "The current Go API does not expose proxy-session records or lifecycle actions. This view is ready for the unified session service.", icon: UsersIcon },
    api: { title: "API management is not connected yet.", text: "API usage and key management require a dedicated backend key service. No secrets or fabricated keys are shown.", icon: KeyIcon },
    keys: { title: "No API keys available.", text: "Create, revoke and one-time secret display will appear after the backend API-key service is connected.", icon: KeyIcon },
    notifications: { title: "No notifications yet.", text: "The current Go API does not expose notification records. System, billing, proxy and security events will appear here when connected.", icon: BellIcon },
    support: { title: "Support center", text: "Review product guidance or contact Vickins Technologies directly. Ticket creation is not exposed by the current API.", icon: QuestionMarkCircleIcon },
    proxies: { title: "Provider infrastructure is not connected yet.", text: "Connect an authorized provider to begin provisioning proxy infrastructure.", icon: SignalIcon },
    locations: { title: "No proxy locations available yet.", text: "Connected provider inventory will appear here.", icon: GlobeAltIcon },
    usage: { title: "No usage data yet.", text: "Usage will appear here when recorded by the backend.", icon: ChartBarIcon },
    credentials: { title: "No credentials available.", text: "Credentials will appear here after authenticated provisioning.", icon: LockClosedIcon },
    profile: { title: "Profile unavailable.", text: "Profile data is not available from the current API.", icon: UserCircleIcon },
    settings: { title: "Settings unavailable.", text: "Account settings are not available from the current API.", icon: LockClosedIcon },
  };
  const item = copy[page];
  return <><PageIntro eyebrow={page.toUpperCase()} title={page === "support" ? "Support" : item.title} text={item.text} />{page === "support" ? <section className="support-grid"><a className="panel-card support-card" href="mailto:support@vickinstechnologies.com"><QuestionMarkCircleIcon /><h2>Contact support</h2><p>support@vickinstechnologies.com</p></a><a className="panel-card support-card" href="/"><ShieldCheckIcon /><h2>Product overview</h2><p>Review the VornShield platform and supported gateway capabilities.</p></a></section> : <EmptyState title={item.title} text={item.text} icon={item.icon} />}</>;
}
