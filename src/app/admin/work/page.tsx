"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Briefcase,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  DollarSign,
  Flag,
  ListChecks,
  Plus,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "@/components/Modal";
import {
  getDefaultWorkState,
  mergeWorkState,
  type Client,
  type Lead,
  type Reminder,
  type WorkCategory,
  type WorkProject,
  type WorkState,
  type WorkTask,
} from "@/lib/admin-work";
import {
  getDefaultFinanceState,
  mergeFinanceState,
  type FinanceState,
  type IncomeEntry,
} from "@/lib/admin-data";

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id_${Date.now()}`;

const inputClass =
  "glass-input";

const categories: WorkCategory[] = [
  "Software Development",
  "Graphic Design",
  "Business",
];

const leadStages = ["new", "contacted", "proposal", "negotiation", "won", "lost"] as const;

const tabs = [
  { id: "tasks", label: "Tasks", icon: ListChecks },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "earnings", label: "Earnings", icon: DollarSign },
  { id: "calendar", label: "Calendar", icon: CalendarCheck },
  { id: "crm", label: "CRM", icon: Users },
];

export default function WorkHubPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const tabParam = searchParams.get("tab");
  const activeTab = tabs.some((tab) => tab.id === tabParam) ? (tabParam as string) : "tasks";

  const [workState, setWorkState] = useState<WorkState>(() => getDefaultWorkState());
  const [financeState, setFinanceState] = useState<FinanceState>(() => getDefaultFinanceState());
  const [isWorkHydrated, setIsWorkHydrated] = useState(false);
  const [isFinanceHydrated, setIsFinanceHydrated] = useState(false);
  const [message, setMessage] = useState("");
  const [loadError, setLoadError] = useState("");

  const [taskForm, setTaskForm] = useState({
    title: "",
    category: categories[0],
    priority: "medium",
    status: "todo",
    dueDate: today,
    estimateHours: "2",
    projectId: "",
    notes: "",
  });

  const [projectForm, setProjectForm] = useState({
    name: "",
    category: categories[0],
    client: "",
    status: "active",
    budget: "",
    dueDate: today,
    nextMilestone: "",
    description: "",
    tags: "",
  });

  const [incomeForm, setIncomeForm] = useState({
    client: "",
    projectId: "",
    amount: "",
    date: today,
    status: "invoiced",
    method: "Invoice",
    notes: "",
  });

  const [reminderForm, setReminderForm] = useState({
    title: "",
    date: today,
    time: "09:00",
    relatedTaskId: "",
    notes: "",
  });

  const [clientForm, setClientForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    category: categories[0],
    status: "active",
    notes: "",
  });

  const [leadForm, setLeadForm] = useState({
    name: "",
    company: "",
    value: "",
    stage: "new",
    nextStep: "",
    lastContacted: today,
    category: categories[0],
  });

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  const setTab = (tabId: string) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set("tab", tabId);
    router.replace(`/admin/work?${next.toString()}`);
  };

  useEffect(() => {
    let isMounted = true;
    const loadWork = async () => {
      try {
        const response = await fetch("/api/admin/work", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Failed to load work data.");
        }
        if (isMounted && data?.state) {
          setWorkState(mergeWorkState(data.state as WorkState));
        }
      } catch (error) {
        if (isMounted) {
          setLoadError(error instanceof Error ? error.message : "Unable to load work data.");
        }
      } finally {
        if (isMounted) {
          setIsWorkHydrated(true);
        }
      }
    };

    loadWork();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadFinance = async () => {
      try {
        const response = await fetch("/api/admin/finance", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Failed to load finance data.");
        }
        if (isMounted && data?.state) {
          setFinanceState(mergeFinanceState(data.state as FinanceState));
        }
      } catch (error) {
        if (isMounted) {
          setLoadError(error instanceof Error ? error.message : "Unable to load finance data.");
        }
      } finally {
        if (isMounted) {
          setIsFinanceHydrated(true);
        }
      }
    };

    loadFinance();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isWorkHydrated) return;
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        await fetch("/api/admin/work", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state: workState }),
          signal: controller.signal,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setMessage("Unable to sync work updates.");
        }
      }
    }, 600);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [workState, isWorkHydrated]);

  useEffect(() => {
    if (!isFinanceHydrated) return;
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        await fetch("/api/admin/finance", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state: financeState }),
          signal: controller.signal,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setMessage("Unable to sync earnings updates.");
        }
      }
    }, 600);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [financeState, isFinanceHydrated]);

  useEffect(() => {
    if (workState.projects.length === 0) {
      setTaskForm((prev) => ({ ...prev, projectId: "" }));
      setIncomeForm((prev) => ({ ...prev, projectId: "" }));
      return;
    }

    const firstProjectId = workState.projects[0]?.id ?? "";
    if (taskForm.projectId && workState.projects.some((p) => p.id === taskForm.projectId)) return;
    setTaskForm((prev) => ({ ...prev, projectId: firstProjectId }));

    if (incomeForm.projectId && workState.projects.some((p) => p.id === incomeForm.projectId)) return;
    setIncomeForm((prev) => ({ ...prev, projectId: firstProjectId }));
  }, [workState.projects, taskForm.projectId, incomeForm.projectId]);

  const openTasks = useMemo(
    () => workState.tasks.filter((task) => task.status !== "done"),
    [workState.tasks]
  );
  const activeProjects = useMemo(
    () => workState.projects.filter((project) => project.status === "active"),
    [workState.projects]
  );
  const tasksDueToday = useMemo(
    () => workState.tasks.filter((task) => task.dueDate === today),
    [workState.tasks, today]
  );
  const remindersDueToday = useMemo(
    () => workState.reminders.filter((reminder) => reminder.date === today && reminder.status === "open"),
    [workState.reminders, today]
  );

  const monthKey = today.slice(0, 7);
  const monthRevenue = useMemo(() => {
    return financeState.income.reduce((sum, entry) => {
      if (!entry.date || entry.status !== "paid") return sum;
      if (entry.date.slice(0, 7) === monthKey) {
        return sum + entry.amount;
      }
      return sum;
    }, 0);
  }, [financeState.income, monthKey]);
  const overdueInvoices = useMemo(
    () => financeState.income.filter((entry) => entry.status === "overdue"),
    [financeState.income]
  );

  const upcomingItems = useMemo(() => {
    const todayDate = new Date(today);
    const weekEnd = new Date(todayDate);
    weekEnd.setDate(todayDate.getDate() + 6);

    const taskItems = workState.tasks
      .filter((task) => task.dueDate)
      .map((task) => ({
        id: task.id,
        type: "task" as const,
        title: task.title,
        date: task.dueDate,
        meta: task.category,
      }));

    const reminderItems = workState.reminders.map((reminder) => ({
      id: reminder.id,
      type: "reminder" as const,
      title: reminder.title,
      date: reminder.date,
      meta: reminder.time || "",
    }));

    return [...taskItems, ...reminderItems]
      .filter((item) => {
        const itemDate = new Date(item.date);
        if (Number.isNaN(itemDate.getTime())) return false;
        return itemDate >= todayDate && itemDate <= weekEnd;
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [workState.tasks, workState.reminders, today]);

  const leadsByStage = useMemo(() => {
    return leadStages.reduce<Record<string, Lead[]>>((acc, stage) => {
      acc[stage] = workState.leads.filter((lead) => lead.stage === stage);
      return acc;
    }, {});
  }, [workState.leads]);

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  const addTask = () => {
    if (!taskForm.title.trim()) return;
    const newTask: WorkTask = {
      id: createId(),
      title: taskForm.title.trim(),
      category: taskForm.category as WorkCategory,
      priority: taskForm.priority as "low" | "medium" | "high",
      status: taskForm.status as "todo" | "in-progress" | "done",
      dueDate: taskForm.dueDate,
      estimateHours: Number(taskForm.estimateHours) || 0,
      projectId: taskForm.projectId || undefined,
      notes: taskForm.notes.trim() || undefined,
    };
    setWorkState((prev) => ({ ...prev, tasks: [newTask, ...prev.tasks] }));
    setTaskForm((prev) => ({ ...prev, title: "", notes: "" }));
    setMessage("Task added to your list.");
    setIsTaskModalOpen(false);
  };

  const toggleTaskStatus = (taskId: string) => {
    setWorkState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) => {
        if (task.id !== taskId) return task;
        const nextStatus = task.status === "done" ? "todo" : "done";
        return { ...task, status: nextStatus };
      }),
    }));
  };

  const addProject = () => {
    if (!projectForm.name.trim() || !projectForm.client.trim()) return;
    const newProject: WorkProject = {
      id: createId(),
      name: projectForm.name.trim(),
      category: projectForm.category as WorkCategory,
      client: projectForm.client.trim(),
      status: projectForm.status as WorkProject["status"],
      budget: Number(projectForm.budget) || 0,
      startDate: today,
      dueDate: projectForm.dueDate,
      nextMilestone: projectForm.nextMilestone.trim() || "Next milestone",
      description: projectForm.description.trim() || "",
      tags: projectForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
    setWorkState((prev) => ({ ...prev, projects: [newProject, ...prev.projects] }));
    setProjectForm((prev) => ({ ...prev, name: "", client: "", budget: "", tags: "" }));
    setMessage("Project added to your pipeline.");
    setIsProjectModalOpen(false);
  };

  const addIncomeEntry = () => {
    if (!incomeForm.amount || !incomeForm.client.trim()) return;
    const entry: IncomeEntry = {
      id: createId(),
      client: incomeForm.client.trim(),
      projectId: incomeForm.projectId || undefined,
      amount: Number(incomeForm.amount) || 0,
      date: incomeForm.date,
      status: incomeForm.status as IncomeEntry["status"],
      method: incomeForm.method.trim(),
      notes: incomeForm.notes.trim(),
    };
    setFinanceState((prev) => ({ ...prev, income: [entry, ...prev.income] }));
    setIncomeForm((prev) => ({ ...prev, amount: "", client: "", notes: "" }));
    setMessage("Earnings entry saved to Finance.");
    setIsIncomeModalOpen(false);
  };

  const addReminder = () => {
    if (!reminderForm.title.trim()) return;
    const reminder: Reminder = {
      id: createId(),
      title: reminderForm.title.trim(),
      date: reminderForm.date,
      time: reminderForm.time,
      status: "open",
      relatedTaskId: reminderForm.relatedTaskId || undefined,
      notes: reminderForm.notes.trim() || undefined,
    };
    setWorkState((prev) => ({ ...prev, reminders: [reminder, ...prev.reminders] }));
    setReminderForm((prev) => ({ ...prev, title: "", notes: "" }));
    setMessage("Reminder added.");
    setIsReminderModalOpen(false);
  };

  const toggleReminderStatus = (reminderId: string) => {
    setWorkState((prev) => ({
      ...prev,
      reminders: prev.reminders.map((reminder) => {
        if (reminder.id !== reminderId) return reminder;
        const nextStatus = reminder.status === "done" ? "open" : "done";
        return { ...reminder, status: nextStatus };
      }),
    }));
  };

  const addClient = () => {
    if (!clientForm.name.trim()) return;
    const client: Client = {
      id: createId(),
      name: clientForm.name.trim(),
      company: clientForm.company.trim(),
      email: clientForm.email.trim(),
      phone: clientForm.phone.trim(),
      category: clientForm.category as WorkCategory,
      status: clientForm.status as Client["status"],
      notes: clientForm.notes.trim(),
    };
    setWorkState((prev) => ({ ...prev, clients: [client, ...prev.clients] }));
    setClientForm((prev) => ({ ...prev, name: "", company: "", email: "", phone: "", notes: "" }));
    setMessage("Client saved.");
    setIsClientModalOpen(false);
  };

  const addLead = () => {
    if (!leadForm.name.trim()) return;
    const lead: Lead = {
      id: createId(),
      name: leadForm.name.trim(),
      company: leadForm.company.trim(),
      value: Number(leadForm.value) || 0,
      stage: leadForm.stage as Lead["stage"],
      nextStep: leadForm.nextStep.trim(),
      lastContacted: leadForm.lastContacted,
      category: leadForm.category as WorkCategory,
    };
    setWorkState((prev) => ({ ...prev, leads: [lead, ...prev.leads] }));
    setLeadForm((prev) => ({ ...prev, name: "", company: "", value: "", nextStep: "" }));
    setMessage("Lead added to pipeline.");
    setIsLeadModalOpen(false);
  };

  const updateLeadStage = (leadId: string, stage: Lead["stage"]) => {
    setWorkState((prev) => ({
      ...prev,
      leads: prev.leads.map((lead) => (lead.id === leadId ? { ...lead, stage } : lead)),
    }));
  };

  return (
    <div className="space-y-8">
      <section className="glass-panel p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--button-bg)] flex items-center gap-2">
              <Sparkles size={16} />
              Work Hub
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold mt-2">
              Organize software, design, and business operations in one place.
            </h1>
            <p className="text-sm text-[var(--muted)] mt-3 max-w-2xl">
              Track tasks, projects, earnings, reminders, and your pipeline without switching tools.
            </p>
            {loadError && (
              <p className="mt-3 text-sm text-rose-500">
                {loadError}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {workState.focusCategories.map((category) => (
              <span
                key={category}
                className="glass-chip px-4 py-2 text-xs sm:text-sm text-[var(--foreground)]/80"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition ${
                  isActive
                    ? "bg-[var(--button-bg)] text-white shadow"
                    : "border border-[var(--glass-border)] bg-white/70 text-[var(--foreground)] hover:bg-[var(--hover-bg)]"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {message && (
        <div className="glass-panel p-4 sm:p-5 text-sm text-[var(--foreground)]">
          {message}
        </div>
      )}

      {activeTab === "tasks" && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: "Open Tasks", value: openTasks.length, icon: ListChecks },
              { label: "Due Today", value: tasksDueToday.length, icon: CalendarCheck },
              {
                label: "High Priority",
                value: workState.tasks.filter((task) => task.priority === "high" && task.status !== "done").length,
                icon: Flag,
              },
              { label: "Active Projects", value: activeProjects.length, icon: Briefcase },
            ].map((stat) => (
              <div key={stat.label} className="glass-panel p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{stat.label}</p>
                  <stat.icon size={18} className="text-[var(--button-bg)]" />
                </div>
                <p className="text-2xl sm:text-3xl font-semibold mt-3">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="glass-panel p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Daily Planner</p>
                <h2 className="text-xl font-semibold mt-2">Today's focus tasks</h2>
              </div>
              {message && (
                <span className="px-4 py-2 rounded-full bg-[var(--button-bg)]/10 text-xs text-[var(--button-bg)]">
                  {message}
                </span>
              )}
            </div>

            <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">Add a task</p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Capture priorities, due dates, and notes in a focused modal.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsTaskModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
              >
                <Plus size={16} />
                New task
              </button>
            </div>

            <div className="space-y-3">
              {[...workState.tasks]
                .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
                .slice(0, 8)
                .map((task) => {
                  const project = workState.projects.find((proj) => proj.id === task.projectId);
                  return (
                    <div
                      key={task.id}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleTaskStatus(task.id)}
                          className="w-10 h-10 rounded-full border border-[var(--glass-border)] flex items-center justify-center text-[var(--button-bg)] bg-white/70"
                          aria-label="Toggle task status"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <div>
                          <p className={`font-semibold ${task.status === "done" ? "line-through text-[var(--muted)]" : ""}`}>
                            {task.title}
                          </p>
                          <p className="text-xs text-[var(--muted)]">
                            {task.category} • {task.priority} priority • Due {task.dueDate}
                            {project ? ` • ${project.name}` : ""}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                        {task.status}
                      </span>
                    </div>
                  );
                })}
              {workState.tasks.length === 0 && (
                <p className="text-sm text-[var(--muted)]">No tasks yet. Add your first task above.</p>
              )}
            </div>
          </div>
        </section>
      )}

      {activeTab === "projects" && (
        <section className="space-y-6">
          <div className="glass-panel p-6 sm:p-7 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Projects</p>
              <h2 className="text-xl font-semibold mt-2">Active workstreams</h2>
            </div>

            <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">Add a project</p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Capture client, budget, and milestones in a clean modal flow.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsProjectModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
              >
                <Plus size={16} />
                New project
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {workState.projects.map((project) => {
                const projectTasks = workState.tasks.filter((task) => task.projectId === project.id);
                const doneTasks = projectTasks.filter((task) => task.status === "done").length;
                const progress = projectTasks.length
                  ? Math.round((doneTasks / projectTasks.length) * 100)
                  : 0;

                return (
                  <div
                    key={project.id}
                    className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{project.name}</p>
                        <p className="text-xs text-[var(--muted)]">
                          {project.client} • {project.category} • {project.status}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-[var(--button-bg)]">
                        {formatCurrency(project.budget)}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[var(--border)]/60 overflow-hidden">
                      <div
                        className="h-full bg-[var(--button-bg)]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                      <span>Next: {project.nextMilestone}</span>
                      <span>{progress}% tasks complete</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-[var(--button-bg)]/10 text-xs text-[var(--button-bg)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {activeTab === "earnings" && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Monthly Earnings", value: formatCurrency(monthRevenue), icon: DollarSign },
              {
                label: "Invoiced",
                value: formatCurrency(
                  financeState.income
                    .filter((entry) => entry.status !== "paid")
                    .reduce((sum, entry) => sum + entry.amount, 0)
                ),
                icon: ClipboardList,
              },
              { label: "Overdue", value: overdueInvoices.length, icon: Flag },
            ].map((stat) => (
              <div key={stat.label} className="glass-panel p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{stat.label}</p>
                  <stat.icon size={18} className="text-[var(--button-bg)]" />
                </div>
                <p className="text-2xl sm:text-3xl font-semibold mt-3">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="glass-panel p-6 sm:p-7 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Earnings</p>
              <h2 className="text-xl font-semibold mt-2">Track invoices and payments</h2>
              <p className="text-sm text-[var(--muted)] mt-2">
                Earnings are stored in Finance to avoid duplication.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">Log earnings</p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Capture invoices, payment method, and status in a modal.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsIncomeModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
              >
                <Plus size={16} />
                Add earnings
              </button>
            </div>

            <div className="space-y-3">
              {financeState.income.slice(0, 8).map((entry) => {
                const project = workState.projects.find((proj) => proj.id === entry.projectId);
                const statusColor =
                  entry.status === "paid"
                    ? "text-emerald-600"
                    : entry.status === "overdue"
                    ? "text-rose-500"
                    : "text-amber-600";
                return (
                  <div key={entry.id} className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{entry.client}</p>
                      <span className={`text-sm font-semibold ${statusColor}`}>
                        {formatCurrency(entry.amount)}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--muted)] mt-1">
                      {entry.date} • {entry.status} • {project?.name ?? "No project"}
                    </p>
                  </div>
                );
              })}
              {financeState.income.length === 0 && (
                <p className="text-sm text-[var(--muted)]">No earnings entries yet.</p>
              )}
            </div>
          </div>
        </section>
      )}

      {activeTab === "calendar" && (
        <section className="space-y-6">
          <div className="glass-panel p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Due Today</p>
                <h2 className="text-xl font-semibold mt-2">Alerts and reminders</h2>
              </div>
              <span className="px-4 py-2 rounded-full bg-[var(--button-bg)]/10 text-xs text-[var(--button-bg)]">
                {tasksDueToday.length + remindersDueToday.length} due today
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4">
                <div className="flex items-center gap-2">
                  <ListChecks size={18} />
                  <h3 className="font-semibold">Tasks due</h3>
                </div>
                <div className="space-y-3 mt-3">
                  {tasksDueToday.map((task) => (
                    <div key={task.id} className="text-sm text-[var(--muted)]">
                      {task.title} • {task.category}
                    </div>
                  ))}
                  {tasksDueToday.length === 0 && (
                    <p className="text-sm text-[var(--muted)]">No tasks due today.</p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4">
                <div className="flex items-center gap-2">
                  <Bell size={18} />
                  <h3 className="font-semibold">Reminders due</h3>
                </div>
                <div className="space-y-3 mt-3">
                  {remindersDueToday.map((reminder) => (
                    <div key={reminder.id} className="text-sm text-[var(--muted)]">
                      {reminder.title} {reminder.time ? `• ${reminder.time}` : ""}
                    </div>
                  ))}
                  {remindersDueToday.length === 0 && (
                    <p className="text-sm text-[var(--muted)]">No reminders due today.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6">
            <div className="glass-panel p-6 sm:p-7 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Upcoming</p>
                <h3 className="text-lg font-semibold mt-2">Next 7 days</h3>
              </div>
              <div className="space-y-3">
                {upcomingItems.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{item.title}</p>
                      <span className="text-xs text-[var(--muted)]">{item.date}</span>
                    </div>
                    <p className="text-xs text-[var(--muted)] mt-1">
                      {item.type === "task" ? "Task" : "Reminder"} {item.meta ? `• ${item.meta}` : ""}
                    </p>
                  </div>
                ))}
                {upcomingItems.length === 0 && (
                  <p className="text-sm text-[var(--muted)]">No upcoming tasks or reminders.</p>
                )}
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-7 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Add Reminder</p>
                <h3 className="text-lg font-semibold mt-2">Schedule a follow-up</h3>
              </div>
              <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Add a reminder</p>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Schedule follow-ups and sync with tasks in a modal.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsReminderModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
                >
                  <Plus size={16} />
                  Add reminder
                </button>
              </div>

              <div className="space-y-3">
                {workState.reminders.slice(0, 6).map((reminder) => (
                  <div key={reminder.id} className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{reminder.title}</p>
                      <button
                        type="button"
                        onClick={() => toggleReminderStatus(reminder.id)}
                        className="text-xs uppercase tracking-[0.2em] text-[var(--button-bg)]"
                      >
                        {reminder.status}
                      </button>
                    </div>
                    <p className="text-xs text-[var(--muted)] mt-1">
                      {reminder.date} {reminder.time ? `• ${reminder.time}` : ""}
                    </p>
                  </div>
                ))}
                {workState.reminders.length === 0 && (
                  <p className="text-sm text-[var(--muted)]">No reminders added yet.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === "crm" && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
            <div className="glass-panel p-6 sm:p-7 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Lead Pipeline</p>
                <h2 className="text-xl font-semibold mt-2">Move deals across stages</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {leadStages.map((stage) => (
                  <div key={stage} className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold capitalize">{stage}</p>
                      <span className="text-xs text-[var(--muted)]">{leadsByStage[stage]?.length ?? 0}</span>
                    </div>
                    <div className="space-y-3">
                      {(leadsByStage[stage] ?? []).map((lead) => (
                        <div key={lead.id} className="rounded-2xl border border-[var(--glass-border)] bg-white/70 p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold">{lead.name}</p>
                            <span className="text-xs text-[var(--muted)]">{formatCurrency(lead.value)}</span>
                          </div>
                          <p className="text-xs text-[var(--muted)] mt-1">
                            {lead.company} • {lead.category}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                              {lead.lastContacted}
                            </span>
                            <select
                              className="text-xs border border-[var(--glass-border)] rounded-full px-2 py-1 bg-white/70"
                              value={lead.stage}
                              onChange={(event) => updateLeadStage(lead.id, event.target.value as Lead["stage"])}
                            >
                              {leadStages.map((stageOption) => (
                                <option key={stageOption} value={stageOption}>
                                  {stageOption}
                                </option>
                              ))}
                            </select>
                          </div>
                          {lead.nextStep && (
                            <p className="text-xs text-[var(--muted)] mt-2">Next: {lead.nextStep}</p>
                          )}
                        </div>
                      ))}
                      {(leadsByStage[stage] ?? []).length === 0 && (
                        <p className="text-xs text-[var(--muted)]">No leads in this stage.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <UserPlus size={18} />
                  <div>
                    <h3 className="font-semibold text-lg">Add a lead</h3>
                    <p className="text-xs text-[var(--muted)] mt-1">
                      Capture deal value, stage, and next step in a modal.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
                >
                  <Plus size={16} />
                  New lead
                </button>
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-7 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Clients</p>
                <h2 className="text-xl font-semibold mt-2">Client relationships</h2>
              </div>

              <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Add a client</p>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Store client contacts, status, and notes in one modal.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsClientModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
                >
                  <Plus size={16} />
                  Save client
                </button>
              </div>

              <div className="space-y-3">
                {workState.clients.slice(0, 6).map((client) => (
                  <div key={client.id} className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{client.name}</p>
                      <span className="text-xs text-[var(--muted)]">{client.status}</span>
                    </div>
                    <p className="text-xs text-[var(--muted)] mt-1">
                      {client.company} • {client.category}
                    </p>
                  </div>
                ))}
                {workState.clients.length === 0 && (
                  <p className="text-sm text-[var(--muted)]">No clients saved yet.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <Modal
        open={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="Add task"
        subtitle="Capture priority, due date, and notes."
        size="lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className={inputClass}
            placeholder="Task title"
            value={taskForm.title}
            onChange={(event) => setTaskForm((prev) => ({ ...prev, title: event.target.value }))}
          />
          <select
            className={inputClass}
            value={taskForm.category}
            onChange={(event) =>
              setTaskForm((prev) => ({ ...prev, category: event.target.value as WorkCategory }))
            }
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            className={inputClass}
            value={taskForm.priority}
            onChange={(event) => setTaskForm((prev) => ({ ...prev, priority: event.target.value }))}
          >
            {"low,medium,high".split(",").map((priority) => (
              <option key={priority} value={priority}>
                Priority: {priority}
              </option>
            ))}
          </select>
          <select
            className={inputClass}
            value={taskForm.status}
            onChange={(event) => setTaskForm((prev) => ({ ...prev, status: event.target.value }))}
          >
            {"todo,in-progress,done".split(",").map((status) => (
              <option key={status} value={status}>
                Status: {status}
              </option>
            ))}
          </select>
          <input
            className={inputClass}
            type="date"
            value={taskForm.dueDate}
            onChange={(event) => setTaskForm((prev) => ({ ...prev, dueDate: event.target.value }))}
          />
          <input
            className={inputClass}
            type="number"
            placeholder="Estimated hours"
            value={taskForm.estimateHours}
            onChange={(event) => setTaskForm((prev) => ({ ...prev, estimateHours: event.target.value }))}
          />
          <select
            className={inputClass}
            value={taskForm.projectId}
            onChange={(event) => setTaskForm((prev) => ({ ...prev, projectId: event.target.value }))}
          >
            <option value="">No project</option>
            {workState.projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          <input
            className={inputClass}
            placeholder="Notes (optional)"
            value={taskForm.notes}
            onChange={(event) => setTaskForm((prev) => ({ ...prev, notes: event.target.value }))}
          />
        </div>
        <button
          type="button"
          onClick={addTask}
          className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
        >
          <Plus size={16} />
          Add task
        </button>
      </Modal>

      <Modal
        open={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        title="Add project"
        subtitle="Define scope, milestones, and budget."
        size="lg"
      >
        <div className="grid grid-cols-1 gap-4">
          <input
            className={inputClass}
            placeholder="Project name"
            value={projectForm.name}
            onChange={(event) => setProjectForm((prev) => ({ ...prev, name: event.target.value }))}
          />
          <input
            className={inputClass}
            placeholder="Client or brand"
            value={projectForm.client}
            onChange={(event) => setProjectForm((prev) => ({ ...prev, client: event.target.value }))}
          />
          <select
            className={inputClass}
            value={projectForm.category}
            onChange={(event) =>
              setProjectForm((prev) => ({ ...prev, category: event.target.value as WorkCategory }))
            }
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            className={inputClass}
            value={projectForm.status}
            onChange={(event) => setProjectForm((prev) => ({ ...prev, status: event.target.value }))}
          >
            {"active,prospect,blocked,paused,completed".split(",").map((status) => (
              <option key={status} value={status}>
                Status: {status}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className={inputClass}
              type="number"
              placeholder="Budget"
              value={projectForm.budget}
              onChange={(event) => setProjectForm((prev) => ({ ...prev, budget: event.target.value }))}
            />
            <input
              className={inputClass}
              type="date"
              value={projectForm.dueDate}
              onChange={(event) => setProjectForm((prev) => ({ ...prev, dueDate: event.target.value }))}
            />
          </div>
          <input
            className={inputClass}
            placeholder="Next milestone"
            value={projectForm.nextMilestone}
            onChange={(event) => setProjectForm((prev) => ({ ...prev, nextMilestone: event.target.value }))}
          />
          <textarea
            className={inputClass}
            placeholder="Project description"
            rows={3}
            value={projectForm.description}
            onChange={(event) => setProjectForm((prev) => ({ ...prev, description: event.target.value }))}
          />
          <input
            className={inputClass}
            placeholder="Tags (comma separated)"
            value={projectForm.tags}
            onChange={(event) => setProjectForm((prev) => ({ ...prev, tags: event.target.value }))}
          />
        </div>
        <button
          type="button"
          onClick={addProject}
          className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
        >
          <Plus size={16} />
          Add project
        </button>
      </Modal>

      <Modal
        open={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
        title="Log earnings"
        subtitle="Track invoices, payments, and status."
        size="lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className={inputClass}
            placeholder="Client"
            value={incomeForm.client}
            onChange={(event) => setIncomeForm((prev) => ({ ...prev, client: event.target.value }))}
          />
          <select
            className={inputClass}
            value={incomeForm.projectId}
            onChange={(event) => setIncomeForm((prev) => ({ ...prev, projectId: event.target.value }))}
          >
            <option value="">No project</option>
            {workState.projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          <input
            className={inputClass}
            type="number"
            placeholder="Amount"
            value={incomeForm.amount}
            onChange={(event) => setIncomeForm((prev) => ({ ...prev, amount: event.target.value }))}
          />
          <input
            className={inputClass}
            type="date"
            value={incomeForm.date}
            onChange={(event) => setIncomeForm((prev) => ({ ...prev, date: event.target.value }))}
          />
          <select
            className={inputClass}
            value={incomeForm.status}
            onChange={(event) => setIncomeForm((prev) => ({ ...prev, status: event.target.value }))}
          >
            {"invoiced,paid,overdue".split(",").map((status) => (
              <option key={status} value={status}>
                Status: {status}
              </option>
            ))}
          </select>
          <input
            className={inputClass}
            placeholder="Payment method"
            value={incomeForm.method}
            onChange={(event) => setIncomeForm((prev) => ({ ...prev, method: event.target.value }))}
          />
          <input
            className={inputClass}
            placeholder="Notes"
            value={incomeForm.notes}
            onChange={(event) => setIncomeForm((prev) => ({ ...prev, notes: event.target.value }))}
          />
        </div>
        <button
          type="button"
          onClick={addIncomeEntry}
          className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
        >
          <Plus size={16} />
          Save earnings
        </button>
      </Modal>

      <Modal
        open={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        title="Add reminder"
        subtitle="Schedule a follow-up with time and notes."
        size="lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className={inputClass}
            placeholder="Reminder title"
            value={reminderForm.title}
            onChange={(event) => setReminderForm((prev) => ({ ...prev, title: event.target.value }))}
          />
          <select
            className={inputClass}
            value={reminderForm.relatedTaskId}
            onChange={(event) => setReminderForm((prev) => ({ ...prev, relatedTaskId: event.target.value }))}
          >
            <option value="">No task</option>
            {workState.tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>
          <input
            className={inputClass}
            type="date"
            value={reminderForm.date}
            onChange={(event) => setReminderForm((prev) => ({ ...prev, date: event.target.value }))}
          />
          <input
            className={inputClass}
            type="time"
            value={reminderForm.time}
            onChange={(event) => setReminderForm((prev) => ({ ...prev, time: event.target.value }))}
          />
          <input
            className={inputClass}
            placeholder="Notes"
            value={reminderForm.notes}
            onChange={(event) => setReminderForm((prev) => ({ ...prev, notes: event.target.value }))}
          />
        </div>
        <button
          type="button"
          onClick={addReminder}
          className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
        >
          <Plus size={16} />
          Add reminder
        </button>
      </Modal>

      <Modal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        title="Add lead"
        subtitle="Capture pipeline stage and next step."
        size="lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className={inputClass}
            placeholder="Lead name"
            value={leadForm.name}
            onChange={(event) => setLeadForm((prev) => ({ ...prev, name: event.target.value }))}
          />
          <input
            className={inputClass}
            placeholder="Company"
            value={leadForm.company}
            onChange={(event) => setLeadForm((prev) => ({ ...prev, company: event.target.value }))}
          />
          <input
            className={inputClass}
            type="number"
            placeholder="Estimated value"
            value={leadForm.value}
            onChange={(event) => setLeadForm((prev) => ({ ...prev, value: event.target.value }))}
          />
          <select
            className={inputClass}
            value={leadForm.stage}
            onChange={(event) => setLeadForm((prev) => ({ ...prev, stage: event.target.value }))}
          >
            {leadStages.map((stage) => (
              <option key={stage} value={stage}>
                Stage: {stage}
              </option>
            ))}
          </select>
          <input
            className={inputClass}
            placeholder="Next step"
            value={leadForm.nextStep}
            onChange={(event) => setLeadForm((prev) => ({ ...prev, nextStep: event.target.value }))}
          />
          <input
            className={inputClass}
            type="date"
            value={leadForm.lastContacted}
            onChange={(event) => setLeadForm((prev) => ({ ...prev, lastContacted: event.target.value }))}
          />
          <select
            className={inputClass}
            value={leadForm.category}
            onChange={(event) =>
              setLeadForm((prev) => ({ ...prev, category: event.target.value as WorkCategory }))
            }
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={addLead}
          className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
        >
          <Plus size={16} />
          Add lead
        </button>
      </Modal>

      <Modal
        open={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        title="Add client"
        subtitle="Store contacts and engagement status."
        size="lg"
      >
        <div className="grid grid-cols-1 gap-4">
          <input
            className={inputClass}
            placeholder="Client name"
            value={clientForm.name}
            onChange={(event) => setClientForm((prev) => ({ ...prev, name: event.target.value }))}
          />
          <input
            className={inputClass}
            placeholder="Company"
            value={clientForm.company}
            onChange={(event) => setClientForm((prev) => ({ ...prev, company: event.target.value }))}
          />
          <input
            className={inputClass}
            placeholder="Email"
            value={clientForm.email}
            onChange={(event) => setClientForm((prev) => ({ ...prev, email: event.target.value }))}
          />
          <input
            className={inputClass}
            placeholder="Phone"
            value={clientForm.phone}
            onChange={(event) => setClientForm((prev) => ({ ...prev, phone: event.target.value }))}
          />
          <select
            className={inputClass}
            value={clientForm.category}
            onChange={(event) =>
              setClientForm((prev) => ({ ...prev, category: event.target.value as WorkCategory }))
            }
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            className={inputClass}
            value={clientForm.status}
            onChange={(event) => setClientForm((prev) => ({ ...prev, status: event.target.value }))}
          >
            {"active,lead,dormant".split(",").map((status) => (
              <option key={status} value={status}>
                Status: {status}
              </option>
            ))}
          </select>
          <input
            className={inputClass}
            placeholder="Notes"
            value={clientForm.notes}
            onChange={(event) => setClientForm((prev) => ({ ...prev, notes: event.target.value }))}
          />
        </div>
        <button
          type="button"
          onClick={addClient}
          className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
        >
          <Plus size={16} />
          Save client
        </button>
      </Modal>
    </div>
  );
}
