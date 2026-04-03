export type Hustle = {
  id: string;
  name: string;
  color?: string;
};

export type Item = {
  id: string;
  hustleId: string;
  name: string;
  sku: string;
  unit: string;
  price: number;
  stock: number;
  reorderLevel: number;
};

export type Sale = {
  id: string;
  hustleId: string;
  itemId: string;
  quantity: number;
  price: number;
  channel: string;
  date: string;
};

export type StockMove = {
  id: string;
  hustleId: string;
  itemId: string;
  quantity: number;
  direction: "in" | "out";
  note: string;
  date: string;
};

export type InventoryState = {
  hustles: Hustle[];
  items: Item[];
  sales: Sale[];
  stockMoves: StockMove[];
};

export type CashAccount = {
  id: string;
  name: string;
  type: string;
  openingBalance: number;
};

export type CashEntry = {
  id: string;
  hustleId: string;
  accountId: string;
  direction: "in" | "out";
  amount: number;
  note: string;
  date: string;
};

export type Expense = {
  id: string;
  hustleId: string;
  category: string;
  vendor: string;
  amount: number;
  accountId: string;
  date: string;
  status: "paid" | "pending";
};

export type FinanceState = {
  hustles: Hustle[];
  accounts: CashAccount[];
  entries: CashEntry[];
  expenses: Expense[];
};

export const getDefaultInventoryState = (): InventoryState => ({
  hustles: [
    { id: "h1", name: "Creative Studio", color: "#38bdf8" },
    { id: "h2", name: "Retail Corner", color: "#22c55e" },
    { id: "h3", name: "Consulting Desk", color: "#a855f7" },
  ],
  items: [
    {
      id: "i1",
      hustleId: "h1",
      name: "Brand Strategy Session",
      sku: "CS-STRAT-01",
      unit: "session",
      price: 250,
      stock: 6,
      reorderLevel: 2,
    },
    {
      id: "i2",
      hustleId: "h2",
      name: "Wireless Headset",
      sku: "RC-WH-21",
      unit: "pcs",
      price: 48,
      stock: 32,
      reorderLevel: 10,
    },
  ],
  sales: [],
  stockMoves: [],
});

export const getDefaultFinanceState = (hustlesOverride?: Hustle[]): FinanceState => ({
  hustles:
    hustlesOverride && hustlesOverride.length
      ? hustlesOverride
      : [
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
});
