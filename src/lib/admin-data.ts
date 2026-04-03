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
  hustles: [],
  items: [],
  sales: [],
  stockMoves: [],
});

export const getDefaultFinanceState = (hustlesOverride?: Hustle[]): FinanceState => ({
  hustles:
    hustlesOverride && hustlesOverride.length ? hustlesOverride : [],
  accounts: [],
  entries: [],
  expenses: [],
});
