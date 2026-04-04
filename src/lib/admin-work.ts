export type WorkCategory = "Software Development" | "Graphic Design" | "Business";

export type WorkTask = {
  id: string;
  title: string;
  category: WorkCategory;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
  dueDate: string;
  estimateHours: number;
  projectId?: string;
  notes?: string;
};

export type WorkProject = {
  id: string;
  name: string;
  category: WorkCategory;
  client: string;
  status: "prospect" | "active" | "blocked" | "paused" | "completed";
  budget: number;
  startDate: string;
  dueDate: string;
  nextMilestone: string;
  description: string;
  tags: string[];
};

export type Reminder = {
  id: string;
  title: string;
  date: string;
  time?: string;
  status: "open" | "done";
  relatedTaskId?: string;
  notes?: string;
};

export type Client = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  category: WorkCategory;
  status: "active" | "lead" | "dormant";
  notes: string;
};

export type Lead = {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: "new" | "contacted" | "proposal" | "negotiation" | "won" | "lost";
  nextStep: string;
  lastContacted: string;
  category: WorkCategory;
};

export type WorkState = {
  focusCategories: WorkCategory[];
  tasks: WorkTask[];
  projects: WorkProject[];
  reminders: Reminder[];
  clients: Client[];
  leads: Lead[];
};

const today = () => new Date().toISOString().slice(0, 10);

export const getDefaultWorkState = (): WorkState => ({
  focusCategories: ["Software Development", "Graphic Design", "Business"],
  tasks: [
    {
      id: "task-dev-01",
      title: "Ship the client dashboard improvements",
      category: "Software Development",
      priority: "high",
      status: "in-progress",
      dueDate: today(),
      estimateHours: 6,
      projectId: "project-dev-01",
      notes: "Focus on performance and onboarding polish.",
    },
    {
      id: "task-design-01",
      title: "Refresh brand moodboard for new campaign",
      category: "Graphic Design",
      priority: "medium",
      status: "todo",
      dueDate: today(),
      estimateHours: 3,
      projectId: "project-design-01",
      notes: "Collect type, palette, and layout references.",
    },
    {
      id: "task-biz-01",
      title: "Send retainer proposal to three leads",
      category: "Business",
      priority: "high",
      status: "todo",
      dueDate: today(),
      estimateHours: 2,
      projectId: "project-biz-01",
      notes: "Include new pricing bundles.",
    },
  ],
  projects: [
    {
      id: "project-dev-01",
      name: "SaaS Admin Rebuild",
      category: "Software Development",
      client: "Nimbus Labs",
      status: "active",
      budget: 12000,
      startDate: today(),
      dueDate: today(),
      nextMilestone: "Performance optimization sprint",
      description: "Refactor the admin panel and add analytics views.",
      tags: ["Next.js", "Dashboard", "Performance"],
    },
    {
      id: "project-design-01",
      name: "Brand Identity System",
      category: "Graphic Design",
      client: "Kora Wellness",
      status: "active",
      budget: 4500,
      startDate: today(),
      dueDate: today(),
      nextMilestone: "Logo lockup options",
      description: "Develop visual identity and social templates.",
      tags: ["Branding", "Design System"],
    },
    {
      id: "project-biz-01",
      name: "Strategic Growth Sprint",
      category: "Business",
      client: "Internal",
      status: "prospect",
      budget: 8000,
      startDate: today(),
      dueDate: today(),
      nextMilestone: "Partnership outreach plan",
      description: "Package services and grow recurring revenue.",
      tags: ["Sales", "Operations", "Growth"],
    },
  ],
  reminders: [
    {
      id: "reminder-01",
      title: "Send proposal follow-up email",
      date: today(),
      time: "10:00",
      status: "open",
      notes: "Business pipeline follow-up.",
    },
  ],
  clients: [
    {
      id: "client-01",
      name: "Amina K.",
      company: "Nimbus Labs",
      email: "amina@nimbuslabs.com",
      phone: "+254700000000",
      category: "Software Development",
      status: "active",
      notes: "Prefers weekly progress updates.",
    },
  ],
  leads: [
    {
      id: "lead-01",
      name: "Leo M.",
      company: "Kora Wellness",
      value: 3200,
      stage: "proposal",
      nextStep: "Send 2 concept options",
      lastContacted: today(),
      category: "Graphic Design",
    },
  ],
});

export const mergeWorkState = (state?: WorkState | null): WorkState => {
  const defaults = getDefaultWorkState();
  if (!state) return defaults;
  return {
    ...defaults,
    ...state,
    focusCategories: state.focusCategories?.length
      ? state.focusCategories
      : defaults.focusCategories,
    tasks: state.tasks ?? defaults.tasks,
    projects: state.projects ?? defaults.projects,
    reminders: state.reminders ?? defaults.reminders,
    clients: state.clients ?? defaults.clients,
    leads: state.leads ?? defaults.leads,
  };
};
