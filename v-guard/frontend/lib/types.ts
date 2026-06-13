export type Role = "admin" | "user";

export type ProxyType = "http" | "socks5";

export type User = {
  id: string;
  email: string;
  role: Role;
  displayName: string;
  credits: number;
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
  credits: number;
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
  credits: number;
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
  creditsUsed: number;
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
  balanceCredits: number;
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

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
};
