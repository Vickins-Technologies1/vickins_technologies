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
  metric: "activeHustles" | "stockItems" | "totalCash";
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
    tagline: "",
    title: "",
    subtitle: "",
    ctas: [],
    quickLinks: [],
    stats: [],
  },
  settings: {
    cards: [],
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
