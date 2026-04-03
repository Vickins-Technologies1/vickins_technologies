"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  Landmark,
  Wallet,
  Plus,
  Receipt,
} from "lucide-react";

type Hustle = {
  id: string;
  name: string;
};

type CashAccount = {
  id: string;
  name: string;
  type: string;
  openingBalance: number;
};

type CashEntry = {
  id: string;
  hustleId: string;
  accountId: string;
  direction: "in" | "out";
  amount: number;
  note: string;
  date: string;
};

type Expense = {
  id: string;
  hustleId: string;
  category: string;
  vendor: string;
  amount: number;
  accountId: string;
  date: string;
  status: "paid" | "pending";
};

type FinanceState = {
  hustles: Hustle[];
  accounts: CashAccount[];
  entries: CashEntry[];
  expenses: Expense[];
};

const STORAGE_KEY = "vt_admin_finance_v1";
const INVENTORY_KEY = "vt_admin_inventory_v1";

const defaultState: FinanceState = {
  hustles: [
    { id: "h1", name: "Creative Studio" },
    { id: "h2", name: "Retail Corner" },
    { id: "h3", name: "Consulting Desk" },
  ],
  accounts: [
    { id: "a1", name: "Cash", type: "Cash", openingBalance: 500 },
    { id: "a2", name: "Bank", type: "Bank", openingBalance: 2200 },
    { id: "a3", name: "M-Pesa", type: "Mobile", openingBalance: 650 },
  ],
  entries: [],
  expenses: [],
};

const createId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `id_${Date.now()}`);

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white/70 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)]/40";

export default function FinancePage() {
  const [state, setState] = useState<FinanceState>(defaultState);
  const [activeHustleId, setActiveHustleId] = useState(defaultState.hustles[0]?.id ?? "");
  const [message, setMessage] = useState("");

  const [expenseForm, setExpenseForm] = useState({
    category: "Supplies",
    vendor: "",
    amount: "",
    accountId: defaultState.accounts[0]?.id ?? "",
    date: new Date().toISOString().slice(0, 10),
    status: "paid",
  });

  const [cashForm, setCashForm] = useState({
    accountId: defaultState.accounts[0]?.id ?? "",
    direction: "in",
    amount: "",
    note: "Sales deposit",
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as FinanceState;
      setState(parsed);
      setActiveHustleId(parsed.hustles[0]?.id ?? "");
      return;
    }
    const inventoryData = localStorage.getItem(INVENTORY_KEY);
    if (inventoryData) {
      const parsedInventory = JSON.parse(inventoryData) as { hustles?: Hustle[] };
      const hustles = parsedInventory.hustles ?? [];
      if (hustles.length) {
        setState((prev) => ({ ...prev, hustles }));
        setActiveHustleId(hustles[0].id);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const balances = useMemo(() => {
    return state.accounts.map((account) => {
      const flow = state.entries.reduce((sum, entry) => {
        if (entry.accountId !== account.id) return sum;
        return sum + (entry.direction === "in" ? entry.amount : -entry.amount);
      }, 0);
      return { ...account, balance: account.openingBalance + flow };
    });
  }, [state.entries, state.accounts]);

  const activeEntries = state.entries.filter((entry) => entry.hustleId === activeHustleId);
  const activeExpenses = state.expenses.filter((expense) => expense.hustleId === activeHustleId);

  const summary = useMemo(() => {
    const totalCash = balances.reduce((sum, account) => sum + account.balance, 0);
    const netFlow = activeEntries.reduce(
      (sum, entry) => sum + (entry.direction === "in" ? entry.amount : -entry.amount),
      0
    );
    const monthExpenses = activeExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    return { totalCash, netFlow, monthExpenses };
  }, [balances, activeEntries, activeExpenses]);

  const addExpense = () => {
    if (!expenseForm.vendor.trim() || !expenseForm.amount) return;
    const expense: Expense = {
      id: createId(),
      hustleId: activeHustleId,
      category: expenseForm.category,
      vendor: expenseForm.vendor.trim(),
      amount: Number(expenseForm.amount),
      accountId: expenseForm.accountId,
      date: expenseForm.date,
      status: expenseForm.status as "paid" | "pending",
    };
    setState((prev) => ({ ...prev, expenses: [expense, ...prev.expenses] }));
    setMessage("Expense recorded.");
  };

  const addCashEntry = () => {
    if (!cashForm.amount) return;
    const entry: CashEntry = {
      id: createId(),
      hustleId: activeHustleId,
      accountId: cashForm.accountId,
      direction: cashForm.direction as "in" | "out",
      amount: Number(cashForm.amount),
      note: cashForm.note,
      date: cashForm.date,
    };
    setState((prev) => ({ ...prev, entries: [entry, ...prev.entries] }));
    setMessage("Cash entry saved.");
  };

  return (
    <div className="space-y-8">
      <section className="glass-panel p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--button-bg)]">Expenses & Cash</p>
            <h1 className="text-2xl sm:text-3xl font-semibold mt-2">
              Manage expenses and cash flow with confidence.
            </h1>
            <p className="text-sm text-[var(--muted)] mt-3 max-w-2xl">
              Capture every expense, payout, and deposit so you always know your exact cash position.
            </p>
          </div>
          <div className="glass-chip px-4 py-2 text-xs sm:text-sm text-[var(--foreground)]/80">
            {state.expenses.length} expenses logged
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="glass-panel p-6 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Active Hustle</p>
              <h2 className="text-xl font-semibold mt-2">
                {state.hustles.find((h) => h.id === activeHustleId)?.name ?? "Select hustle"}
              </h2>
            </div>
            <select
              value={activeHustleId}
              onChange={(event) => setActiveHustleId(event.target.value)}
              className={inputClass}
            >
              {state.hustles.map((hustle) => (
                <option key={hustle.id} value={hustle.id}>
                  {hustle.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Total Cash", value: `$${summary.totalCash.toFixed(2)}`, icon: Wallet },
              { label: "Net Cash Flow", value: `$${summary.netFlow.toFixed(2)}`, icon: ArrowUpRight },
              { label: "Total Expenses", value: `$${summary.monthExpenses.toFixed(2)}`, icon: ArrowDownRight },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{stat.label}</p>
                  <stat.icon size={18} className="text-[var(--button-bg)]" />
                </div>
                <p className="text-lg font-semibold mt-3">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Receipt size={18} />
              <h3 className="font-semibold text-lg">Log an Expense</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                className={inputClass}
                value={expenseForm.category}
                onChange={(event) => setExpenseForm((prev) => ({ ...prev, category: event.target.value }))}
              >
                {["Supplies", "Marketing", "Transport", "Utilities", "Subscriptions", "Other"].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <input
                className={inputClass}
                placeholder="Vendor or payee"
                value={expenseForm.vendor}
                onChange={(event) => setExpenseForm((prev) => ({ ...prev, vendor: event.target.value }))}
              />
              <input
                className={inputClass}
                type="number"
                placeholder="Amount"
                value={expenseForm.amount}
                onChange={(event) => setExpenseForm((prev) => ({ ...prev, amount: event.target.value }))}
              />
              <select
                className={inputClass}
                value={expenseForm.accountId}
                onChange={(event) => setExpenseForm((prev) => ({ ...prev, accountId: event.target.value }))}
              >
                {state.accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name}
                  </option>
                ))}
              </select>
              <input
                className={inputClass}
                type="date"
                value={expenseForm.date}
                onChange={(event) => setExpenseForm((prev) => ({ ...prev, date: event.target.value }))}
              />
              <select
                className={inputClass}
                value={expenseForm.status}
                onChange={(event) => setExpenseForm((prev) => ({ ...prev, status: event.target.value }))}
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <button
              type="button"
              onClick={addExpense}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
            >
              <Plus size={16} />
              Save expense
            </button>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-7 space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Cash Management</p>
            <h3 className="text-lg font-semibold mt-2">Cash accounts & movements</h3>
          </div>

          <div className="space-y-3">
            {balances.map((account) => (
              <div key={account.id} className="flex items-center justify-between rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4">
                <div className="flex items-center gap-3">
                  {account.type === "Bank" ? <Landmark size={18} /> : <CreditCard size={18} />}
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-xs text-[var(--muted)]">{account.type}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold">${account.balance.toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Wallet size={18} />
              <h3 className="font-semibold text-lg">Record Cash Movement</h3>
            </div>
            <select
              className={inputClass}
              value={cashForm.accountId}
              onChange={(event) => setCashForm((prev) => ({ ...prev, accountId: event.target.value }))}
            >
              {state.accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-3">
              <select
                className={inputClass}
                value={cashForm.direction}
                onChange={(event) => setCashForm((prev) => ({ ...prev, direction: event.target.value }))}
              >
                <option value="in">Cash in</option>
                <option value="out">Cash out</option>
              </select>
              <input
                className={inputClass}
                type="number"
                placeholder="Amount"
                value={cashForm.amount}
                onChange={(event) => setCashForm((prev) => ({ ...prev, amount: event.target.value }))}
              />
            </div>
            <input
              className={inputClass}
              placeholder="Note"
              value={cashForm.note}
              onChange={(event) => setCashForm((prev) => ({ ...prev, note: event.target.value }))}
            />
            <input
              className={inputClass}
              type="date"
              value={cashForm.date}
              onChange={(event) => setCashForm((prev) => ({ ...prev, date: event.target.value }))}
            />
            <button
              type="button"
              onClick={addCashEntry}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
            >
              <Plus size={16} />
              Save cash entry
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 sm:p-7">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Expenses</h3>
            {message && (
              <div className="px-4 py-2 rounded-full bg-[var(--button-bg)]/10 text-sm text-[var(--button-bg)]">
                {message}
              </div>
            )}
          </div>
          <div className="space-y-4">
            {activeExpenses.slice(0, 5).map((expense) => {
              const account = state.accounts.find((acc) => acc.id === expense.accountId);
              return (
                <div key={expense.id} className="flex items-center justify-between rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4">
                  <div>
                    <p className="font-medium">{expense.vendor}</p>
                    <p className="text-xs text-[var(--muted)]">
                      {expense.category} • {account?.name ?? "Account"} • {expense.date}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-rose-500">
                    -${expense.amount.toFixed(2)}
                  </span>
                </div>
              );
            })}
            {activeExpenses.length === 0 && (
              <p className="text-sm text-[var(--muted)]">No expenses recorded yet.</p>
            )}
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-7">
          <h3 className="text-lg font-semibold mb-4">Recent Cash Activity</h3>
          <div className="space-y-4">
            {activeEntries.slice(0, 5).map((entry) => {
              const account = state.accounts.find((acc) => acc.id === entry.accountId);
              return (
                <div key={entry.id} className="flex items-center justify-between rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4">
                  <div>
                    <p className="font-medium">{entry.note}</p>
                    <p className="text-xs text-[var(--muted)]">
                      {account?.name ?? "Account"} • {entry.date}
                    </p>
                  </div>
                  <span className={`text-sm font-semibold ${entry.direction === "in" ? "text-emerald-600" : "text-rose-500"}`}>
                    {entry.direction === "in" ? "+" : "-"}${entry.amount.toFixed(2)}
                  </span>
                </div>
              );
            })}
            {activeEntries.length === 0 && (
              <p className="text-sm text-[var(--muted)]">No cash movements yet.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
