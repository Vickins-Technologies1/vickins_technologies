export type Role = "admin" | "user";

export type ProxyType = "http" | "socks5";

export type User = {
  id: string;
  email: string;
  role: Role;
  displayName: string;
  trafficBalanceGB: number;
  trafficUsedGB: number;
  totalUsedBytes: number;
  proxyUsername: string;
  rateLimitBytes: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProxyPlan = {
  id: string;
  name: string;
  description: string;
  proxyType: ProxyType;
  currency: string;
  priceMinorUnits: number;
  trafficGB: number;
  bandwidthBytes: number;
  durationDays: number;
  isPopular: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PaymentIntent = {
  id: string;
  userId: string;
  reference: string;
  flutterwaveLink: string;
  currency: string;
  amountMinorUnits: number;
  trafficGB: number;
  pricePerGBUSDCents: number;
  status: string;
  createdAt: string;
  paidAt?: string | null;
};

export type CheckoutResponse = {
  data: PaymentIntent;
};

export type ProxySyncResult = {
  httpConfigPath: string;
  socksConfigPath: string;
  usersPath: string;
  userCount: number;
};

export type UsageSnapshot = {
  id: string;
  userId: string;
  source: string;
  bytesIn: number;
  bytesOut: number;
  totalBytes: number;
  deltaBytes: number;
  trafficUsedGB: number;
  recordedAt: string;
};

export type ProxyCredential = {
  username: string;
  password: string;
  host: string;
  port: number;
  type: ProxyType;
};

export type DashboardStats = {
  trafficBalanceGB: number;
  trafficUsedGB: number;
  trafficTotalGB: number;
  usagePercent: number;
  availablePlans: number;
  recentPayments: number;
  recentUsageItems: number;
  totalUsedBytes: number;
  proxyTypeCount: number;
  serverTime: string;
};

export type DashboardData = {
  user: User;
  stats: DashboardStats;
  plans: ProxyPlan[];
  payments: PaymentIntent[];
  usage: UsageSnapshot[];
  httpProxy: ProxyCredential;
  socks5Proxy: ProxyCredential;
  proxySync?: ProxySyncResult | null;
};

export type ProxyCapabilities = {
  http: boolean;
  httpsConnect: boolean;
  socks5: boolean;
  countryTargeting: boolean;
  regionTargeting: boolean;
  cityTargeting: boolean;
  ispTargeting: boolean;
  rotation: boolean;
  stickySessions: boolean;
  healthChecks: boolean;
  failover: boolean;
};

export type ProxyProviderCapabilities = {
  provider: string;
  capabilities: ProxyCapabilities;
};

export type ProxyLocation = {
  continent?: string;
  country?: string;
  region?: string;
  city?: string;
  isp?: string;
  asn?: string;
};

export type ProxyNode = {
  id: string;
  type: string;
  ip?: string;
  port?: number;
  protocol?: string;
  provider: string;
  location: ProxyLocation;
  status: string;
  healthStatus: string;
  supportsRotation: boolean;
  supportsStickySessions: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
};
