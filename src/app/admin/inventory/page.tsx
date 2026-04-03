"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Boxes,
  Plus,
  TrendingUp,
  Package,
  ArrowDownRight,
  ArrowUpRight,
  BadgeDollarSign,
} from "lucide-react";

type Hustle = {
  id: string;
  name: string;
  color: string;
};

type Item = {
  id: string;
  hustleId: string;
  name: string;
  sku: string;
  unit: string;
  price: number;
  stock: number;
  reorderLevel: number;
};

type Sale = {
  id: string;
  hustleId: string;
  itemId: string;
  quantity: number;
  price: number;
  channel: string;
  date: string;
};

type StockMove = {
  id: string;
  hustleId: string;
  itemId: string;
  quantity: number;
  direction: "in" | "out";
  note: string;
  date: string;
};

type InventoryState = {
  hustles: Hustle[];
  items: Item[];
  sales: Sale[];
  stockMoves: StockMove[];
};

const STORAGE_KEY = "vt_admin_inventory_v1";

const defaultState: InventoryState = {
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
};

const createId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `id_${Date.now()}`);

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white/70 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)]/40";

export default function InventoryPage() {
  const [state, setState] = useState<InventoryState>(defaultState);
  const [activeHustleId, setActiveHustleId] = useState(defaultState.hustles[0]?.id ?? "");
  const [newHustle, setNewHustle] = useState("");
  const [message, setMessage] = useState("");

  const [productForm, setProductForm] = useState({
    name: "",
    sku: "",
    unit: "pcs",
    price: "",
    stock: "",
    reorder: "",
  });

  const [saleForm, setSaleForm] = useState({
    itemId: "",
    quantity: "1",
    price: "",
    channel: "In person",
    date: new Date().toISOString().slice(0, 10),
  });

  const [stockForm, setStockForm] = useState({
    itemId: "",
    quantity: "1",
    direction: "in",
    note: "Restock",
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as InventoryState;
      setState(parsed);
      setActiveHustleId(parsed.hustles[0]?.id ?? "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const activeHustle = state.hustles.find((h) => h.id === activeHustleId) ?? state.hustles[0];
  const filteredItems = state.items.filter((item) => item.hustleId === activeHustleId);

  const summary = useMemo(() => {
    const stockValue = filteredItems.reduce((sum, item) => sum + item.price * item.stock, 0);
    const lowStock = filteredItems.filter((item) => item.stock <= item.reorderLevel).length;
    const revenue = state.sales
      .filter((sale) => sale.hustleId === activeHustleId)
      .reduce((sum, sale) => sum + sale.quantity * sale.price, 0);
    return { stockValue, lowStock, revenue };
  }, [filteredItems, state.sales, activeHustleId]);

  useEffect(() => {
    const selected = filteredItems.find((item) => item.id === saleForm.itemId);
    if (!selected && filteredItems[0]) {
      setSaleForm((prev) => ({
        ...prev,
        itemId: filteredItems[0].id,
        price: String(filteredItems[0].price),
      }));
    }
  }, [filteredItems, saleForm.itemId]);

  useEffect(() => {
    const selected = filteredItems.find((item) => item.id === stockForm.itemId);
    if (!selected && filteredItems[0]) {
      setStockForm((prev) => ({ ...prev, itemId: filteredItems[0].id }));
    }
  }, [filteredItems, stockForm.itemId]);

  const addHustle = () => {
    if (!newHustle.trim()) return;
    const hustle: Hustle = {
      id: createId(),
      name: newHustle.trim(),
      color: "#38bdf8",
    };
    setState((prev) => ({ ...prev, hustles: [...prev.hustles, hustle] }));
    setActiveHustleId(hustle.id);
    setNewHustle("");
  };

  const addProduct = () => {
    if (!productForm.name.trim()) return;
    const item: Item = {
      id: createId(),
      hustleId: activeHustleId,
      name: productForm.name.trim(),
      sku: productForm.sku.trim() || `SKU-${Date.now()}`,
      unit: productForm.unit.trim() || "pcs",
      price: Number(productForm.price) || 0,
      stock: Number(productForm.stock) || 0,
      reorderLevel: Number(productForm.reorder) || 0,
    };
    setState((prev) => ({ ...prev, items: [...prev.items, item] }));
    setProductForm({ name: "", sku: "", unit: "pcs", price: "", stock: "", reorder: "" });
  };

  const recordSale = () => {
    const quantity = Number(saleForm.quantity);
    const price = Number(saleForm.price);
    const item = state.items.find((entry) => entry.id === saleForm.itemId);
    if (!item || quantity <= 0) return;
    if (quantity > item.stock) {
      setMessage("Not enough stock for that sale.");
      return;
    }

    const sale: Sale = {
      id: createId(),
      hustleId: activeHustleId,
      itemId: item.id,
      quantity,
      price: price || item.price,
      channel: saleForm.channel,
      date: saleForm.date,
    };

    setState((prev) => ({
      ...prev,
      sales: [sale, ...prev.sales],
      items: prev.items.map((entry) =>
        entry.id === item.id ? { ...entry, stock: entry.stock - quantity } : entry
      ),
    }));
    setMessage("Sale recorded.");
  };

  const recordStock = () => {
    const quantity = Number(stockForm.quantity);
    const item = state.items.find((entry) => entry.id === stockForm.itemId);
    if (!item || quantity <= 0) return;
    const delta = stockForm.direction === "in" ? quantity : -quantity;

    const move: StockMove = {
      id: createId(),
      hustleId: activeHustleId,
      itemId: item.id,
      quantity,
      direction: stockForm.direction as "in" | "out",
      note: stockForm.note,
      date: stockForm.date,
    };

    setState((prev) => ({
      ...prev,
      stockMoves: [move, ...prev.stockMoves],
      items: prev.items.map((entry) =>
        entry.id === item.id ? { ...entry, stock: Math.max(0, entry.stock + delta) } : entry
      ),
    }));
    setMessage("Stock updated.");
  };

  return (
    <div className="space-y-8">
      <section className="glass-panel p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--button-bg)]">Inventory</p>
            <h1 className="text-2xl sm:text-3xl font-semibold mt-2">
              Track stock and sales for every hustle.
            </h1>
            <p className="text-sm text-[var(--muted)] mt-3 max-w-2xl">
              Record sales, update stock, and keep visibility on reorder levels so every hustle stays profitable.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="glass-chip px-4 py-2 text-xs sm:text-sm text-[var(--foreground)]/80">
              {state.items.length} items tracked
            </div>
            <div className="glass-chip px-4 py-2 text-xs sm:text-sm text-[var(--foreground)]/80">
              {state.sales.length} total sales logged
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="glass-panel p-6 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Active Hustle</p>
              <h2 className="text-xl font-semibold mt-2">{activeHustle?.name ?? "Select a hustle"}</h2>
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
              {
                label: "Stock Value",
                value: `$${summary.stockValue.toFixed(2)}`,
                icon: BadgeDollarSign,
              },
              {
                label: "Low Stock",
                value: `${summary.lowStock} items`,
                icon: ArrowDownRight,
              },
              {
                label: "Sales Revenue",
                value: `$${summary.revenue.toFixed(2)}`,
                icon: TrendingUp,
              },
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

          <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-5">
            <h3 className="font-semibold text-lg">Add New Product</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <input
                className={inputClass}
                placeholder="Product name"
                value={productForm.name}
                onChange={(event) => setProductForm((prev) => ({ ...prev, name: event.target.value }))}
              />
              <input
                className={inputClass}
                placeholder="SKU (optional)"
                value={productForm.sku}
                onChange={(event) => setProductForm((prev) => ({ ...prev, sku: event.target.value }))}
              />
              <input
                className={inputClass}
                placeholder="Unit (pcs, kg, session)"
                value={productForm.unit}
                onChange={(event) => setProductForm((prev) => ({ ...prev, unit: event.target.value }))}
              />
              <input
                className={inputClass}
                type="number"
                placeholder="Selling price"
                value={productForm.price}
                onChange={(event) => setProductForm((prev) => ({ ...prev, price: event.target.value }))}
              />
              <input
                className={inputClass}
                type="number"
                placeholder="Opening stock"
                value={productForm.stock}
                onChange={(event) => setProductForm((prev) => ({ ...prev, stock: event.target.value }))}
              />
              <input
                className={inputClass}
                type="number"
                placeholder="Reorder level"
                value={productForm.reorder}
                onChange={(event) => setProductForm((prev) => ({ ...prev, reorder: event.target.value }))}
              />
            </div>
            <button
              type="button"
              onClick={addProduct}
              className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
            >
              <Plus size={16} />
              Add product
            </button>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-7 space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Add Hustle</p>
            <h3 className="text-lg font-semibold mt-2">Organize your side hustles</h3>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <input
                className={inputClass}
                placeholder="New hustle name"
                value={newHustle}
                onChange={(event) => setNewHustle(event.target.value)}
              />
              <button
                type="button"
                onClick={addHustle}
                className="px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
              >
                Add hustle
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-5 space-y-4">
            <h3 className="font-semibold text-lg">Record a Sale</h3>
            <select
              className={inputClass}
              value={saleForm.itemId}
              onChange={(event) => {
                const selected = filteredItems.find((item) => item.id === event.target.value);
                setSaleForm((prev) => ({
                  ...prev,
                  itemId: event.target.value,
                  price: selected ? String(selected.price) : prev.price,
                }));
              }}
            >
              {filteredItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-3">
              <input
                className={inputClass}
                type="number"
                min="1"
                placeholder="Qty"
                value={saleForm.quantity}
                onChange={(event) => setSaleForm((prev) => ({ ...prev, quantity: event.target.value }))}
              />
              <input
                className={inputClass}
                type="number"
                min="0"
                placeholder="Price"
                value={saleForm.price}
                onChange={(event) => setSaleForm((prev) => ({ ...prev, price: event.target.value }))}
              />
            </div>
            <input
              className={inputClass}
              placeholder="Channel (In person, Online)"
              value={saleForm.channel}
              onChange={(event) => setSaleForm((prev) => ({ ...prev, channel: event.target.value }))}
            />
            <input
              className={inputClass}
              type="date"
              value={saleForm.date}
              onChange={(event) => setSaleForm((prev) => ({ ...prev, date: event.target.value }))}
            />
            <button
              type="button"
              onClick={recordSale}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
            >
              <ArrowUpRight size={16} />
              Record sale
            </button>
          </div>

          <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-5 space-y-4">
            <h3 className="font-semibold text-lg">Update Stock</h3>
            <select
              className={inputClass}
              value={stockForm.itemId}
              onChange={(event) => setStockForm((prev) => ({ ...prev, itemId: event.target.value }))}
            >
              {filteredItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-3">
              <input
                className={inputClass}
                type="number"
                min="1"
                placeholder="Qty"
                value={stockForm.quantity}
                onChange={(event) => setStockForm((prev) => ({ ...prev, quantity: event.target.value }))}
              />
              <select
                className={inputClass}
                value={stockForm.direction}
                onChange={(event) => setStockForm((prev) => ({ ...prev, direction: event.target.value }))}
              >
                <option value="in">Restock (add)</option>
                <option value="out">Stock out (remove)</option>
              </select>
            </div>
            <input
              className={inputClass}
              placeholder="Note"
              value={stockForm.note}
              onChange={(event) => setStockForm((prev) => ({ ...prev, note: event.target.value }))}
            />
            <input
              className={inputClass}
              type="date"
              value={stockForm.date}
              onChange={(event) => setStockForm((prev) => ({ ...prev, date: event.target.value }))}
            />
            <button
              type="button"
              onClick={recordStock}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
            >
              <ArrowDownRight size={16} />
              Save stock update
            </button>
          </div>
        </div>
      </section>

      <section className="glass-panel p-6 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Inventory List</p>
            <h3 className="text-lg font-semibold mt-2">Current stock for {activeHustle?.name}</h3>
          </div>
          {message && (
            <div className="px-4 py-2 rounded-full bg-[var(--button-bg)]/10 text-sm text-[var(--button-bg)]">
              {message}
            </div>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[var(--muted)]">
              <tr>
                <th className="pb-3">Item</th>
                <th className="pb-3">SKU</th>
                <th className="pb-3">Stock</th>
                <th className="pb-3">Reorder</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 font-medium">{item.name}</td>
                  <td className="py-3 text-[var(--muted)]">{item.sku}</td>
                  <td className="py-3">{item.stock}</td>
                  <td className="py-3">{item.reorderLevel}</td>
                  <td className="py-3">${item.price.toFixed(2)}</td>
                  <td className="py-3">${(item.price * item.stock).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 sm:p-7">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Package size={18} />
              Recent Stock Updates
            </h3>
          </div>
          <div className="space-y-4 mt-4">
            {state.stockMoves
              .filter((move) => move.hustleId === activeHustleId)
              .slice(0, 5)
              .map((move) => {
              const item = state.items.find((entry) => entry.id === move.itemId);
              return (
                <div
                  key={move.id}
                  className="flex items-center justify-between rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4"
                >
                  <div>
                    <p className="font-medium">{item?.name ?? "Item"}</p>
                    <p className="text-xs text-[var(--muted)]">
                      {move.note} • {move.date}
                    </p>
                  </div>
                  <span className={`text-sm font-semibold ${move.direction === "in" ? "text-emerald-600" : "text-rose-500"}`}>
                    {move.direction === "in" ? "+" : "-"}
                    {move.quantity}
                  </span>
                </div>
              );
            })}
            {state.stockMoves.filter((move) => move.hustleId === activeHustleId).length === 0 && (
              <p className="text-sm text-[var(--muted)]">No stock updates yet.</p>
            )}
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-7">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BadgeDollarSign size={18} />
              Recent Sales
            </h3>
          </div>
          <div className="space-y-4 mt-4">
            {state.sales
              .filter((sale) => sale.hustleId === activeHustleId)
              .slice(0, 5)
              .map((sale) => {
              const item = state.items.find((entry) => entry.id === sale.itemId);
              return (
                <div
                  key={sale.id}
                  className="flex items-center justify-between rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4"
                >
                  <div>
                    <p className="font-medium">{item?.name ?? "Item"}</p>
                    <p className="text-xs text-[var(--muted)]">
                      {sale.channel} • {sale.date}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600">
                    +${(sale.quantity * sale.price).toFixed(2)}
                  </span>
                </div>
              );
            })}
            {state.sales.filter((sale) => sale.hustleId === activeHustleId).length === 0 && (
              <p className="text-sm text-[var(--muted)]">No sales recorded yet.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
