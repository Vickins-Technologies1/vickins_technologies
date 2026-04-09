export type DashboardCta = {
  href: string;
  label: string;
  variant: "primary" | "secondary";
};

export type DashboardQuickLink = {
  id: string;
  href: string;
  title: string;
  description: string;
  icon: string;
};

export type DashboardStat = {
  id: string;
  label: string;
  metric:
    | "activeHustles"
    | "stockItems"
    | "totalCash"
    | "openTasks"
    | "activeProjects"
    | "weeklyHours"
    | "monthRevenue"
    | "overdueInvoices";
  format: "number" | "currency";
  icon: string;
};

export type DashboardContent = {
  tagline: string;
  title: string;
  subtitle: string;
  ctas: DashboardCta[];
  quickLinks: DashboardQuickLink[];
  stats: DashboardStat[];
};

export type SettingsCard = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type AdminConfig = {
  key: string;
  dashboard: DashboardContent;
  settings: {
    cards: SettingsCard[];
  };
};

export const getDefaultAdminConfig = (): AdminConfig => ({
  key: "default",
  dashboard: {
    tagline: "Vickins Admin Command Center",
    title: "Welcome back",
    subtitle: "Manage company operations, teams, finances, and platform modules from one command center.",
    ctas: [
      { href: "/admin/chamahub", label: "Platform Analytics", variant: "primary" },
      { href: "/admin/work", label: "Open Work Hub", variant: "secondary" },
    ],
    quickLinks: [
      {
        id: "chamahub-overview",
        href: "/admin/chamahub",
        title: "ChamaHub overview",
        description: "Review group leases, members, and payout flow.",
        icon: "Sparkles",
      },
      {
        id: "work-tasks",
        href: "/admin/work?tab=tasks",
        title: "Manage tasks",
        description: "Prioritize today’s work and due dates.",
        icon: "ListChecks",
      },
      {
        id: "work-projects",
        href: "/admin/work?tab=projects",
        title: "Track projects",
        description: "Keep milestones and delivery on schedule.",
        icon: "Briefcase",
      },
      {
        id: "work-earnings",
        href: "/admin/work?tab=earnings",
        title: "Track earnings",
        description: "Record invoices, retainers, and paid revenue.",
        icon: "DollarSign",
      },
    ],
    stats: [
      {
        id: "openTasks",
        label: "Open Tasks",
        metric: "openTasks",
        format: "number",
        icon: "ListChecks",
      },
      {
        id: "activeProjects",
        label: "Active Projects",
        metric: "activeProjects",
        format: "number",
        icon: "Briefcase",
      },
      {
        id: "monthRevenue",
        label: "Monthly Earnings",
        metric: "monthRevenue",
        format: "currency",
        icon: "DollarSign",
      },
    ],
  },
  settings: {
    cards: [
      {
        id: "focus",
        title: "Focus Blocks",
        description: "Define weekly deep-work sessions for coding, design, and business.",
        icon: "Sparkles",
      },
      {
        id: "rates",
        title: "Rates & Retainers",
        description: "Set default pricing, payment terms, and renewal reminders.",
        icon: "Wallet",
      },
      {
        id: "brand",
        title: "Brand Assets",
        description: "Keep design systems, fonts, and templates easy to access.",
        icon: "Palette",
      },
      {
        id: "ops",
        title: "Business Operations",
        description: "Track legal docs, vendors, and operational checklists.",
        icon: "Briefcase",
      },
    ],
  },
});

export const mergeAdminConfig = (config?: AdminConfig | null): AdminConfig => {
  const defaults = getDefaultAdminConfig();
  if (!config) return defaults;
  return {
    ...defaults,
    ...config,
    dashboard: {
      ...defaults.dashboard,
      ...config.dashboard,
      ctas: config.dashboard?.ctas ?? defaults.dashboard.ctas,
      quickLinks: config.dashboard?.quickLinks ?? defaults.dashboard.quickLinks,
      stats: config.dashboard?.stats ?? defaults.dashboard.stats,
    },
    settings: {
      ...defaults.settings,
      ...config.settings,
      cards: config.settings?.cards ?? defaults.settings.cards,
    },
  };
};
