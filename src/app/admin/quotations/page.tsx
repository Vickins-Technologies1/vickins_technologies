'use client';

import { useEffect, useState } from 'react';
import { Download, FileText, Plus, Send } from 'lucide-react';
import Modal from '@/components/Modal';

interface Item {
  description: string;
  quantity: number;
  price: number;
}

type SavedQuotation = {
  id: string;
  quoteNumber: string;
  status: 'draft' | 'sent' | 'failed';
  clientName: string;
  clientEmail: string;
  currency: string;
  total: number;
  issuedAt: string;
  sentAt: string | null;
  createdAt: string;
  pdfFileName?: string;
  lastError?: string;
};

export default function Quotations() {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [currency, setCurrency] = useState('KES');
  const [items, setItems] = useState<Item[]>([{ description: '', quantity: 1, price: 0 }]);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [saved, setSaved] = useState<SavedQuotation[]>([]);
  const [savedLoading, setSavedLoading] = useState(true);
  const [savedError, setSavedError] = useState('');

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  const updateItem = (index: number, field: keyof Item, value: string | number) => {
    const newItems = [...items];
    newItems[index][field] = value as never;
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const formatMoney = (amount: number, currencyOverride?: string) => {
    const targetCurrency = currencyOverride || currency;
    try {
      return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: targetCurrency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch {
      return `${targetCurrency} ${amount.toFixed(2)}`;
    }
  };

  const loadSaved = async () => {
    setSavedLoading(true);
    setSavedError('');
    try {
      const response = await fetch('/api/admin/quotations', { cache: 'no-store' });
      const data = (await response.json().catch(() => null)) as { quotations?: SavedQuotation[]; error?: string } | null;
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to load saved quotations.');
      }
      setSaved(data?.quotations ?? []);
    } catch (err) {
      setSavedError(err instanceof Error ? err.message : 'Unable to load saved quotations.');
    } finally {
      setSavedLoading(false);
    }
  };

  useEffect(() => {
    loadSaved();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/generate-quotation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientEmail,
          currency,
          items,
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate and send quotation');
      }

      const data = (await response.json().catch(() => null)) as { quoteNumber?: string } | null;
      setMessage(
        data?.quoteNumber
          ? `Quotation ${data.quoteNumber} generated and sent successfully!`
          : 'Quotation generated and sent successfully!'
      );
      await loadSaved();
      // Optionally reset form or redirect
    } catch (error) {
      setMessage('Error: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "glass-input";

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 sm:p-8">
        <div className="flex items-center gap-3 text-[var(--button-bg)] text-xs sm:text-sm uppercase tracking-[0.3em]">
          <FileText size={16} />
          Quotations
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold mt-3 text-[var(--foreground)]">
          Create premium quotations.
        </h1>
        <p className="text-sm text-[var(--muted)] mt-2">
          Build client-ready quotes with clean formatting and polished totals.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
          >
            <Plus size={16} />
            New quotation
          </button>
          <div className="glass-chip px-4 py-2 text-xs text-[var(--foreground)]/80">
            Total preview: {formatMoney(calculateTotal())}
          </div>
        </div>
        {message && <p className="mt-4 text-sm text-[var(--foreground)]">{message}</p>}
      </div>

      <section className="glass-panel p-6 sm:p-7">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Sent quotations</h2>
          <button
            type="button"
            onClick={loadSaved}
            className="px-4 py-2 rounded-full border border-[var(--glass-border)] bg-white/70 text-xs font-semibold"
          >
            Refresh
          </button>
        </div>
        {savedError && <p className="mb-4 text-sm text-rose-500">{savedError}</p>}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[var(--muted)]">
              <tr>
                <th className="pb-3">Quotation</th>
                <th className="pb-3">Client</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {savedLoading &&
                [0, 1, 2].map((row) => (
                  <tr key={row}>
                    <td className="py-3">Loading…</td>
                    <td className="py-3" />
                    <td className="py-3" />
                    <td className="py-3" />
                    <td className="py-3" />
                    <td className="py-3" />
                  </tr>
                ))}
              {!savedLoading &&
                saved.map((q) => (
                  <tr key={q.id}>
                    <td className="py-3 font-medium">{q.quoteNumber}</td>
                    <td className="py-3 text-[var(--muted)]">
                      <div className="flex flex-col">
                        <span className="text-[var(--foreground)]">{q.clientName}</span>
                        <span className="text-xs">{q.clientEmail}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span
                        className={
                          q.status === 'sent'
                            ? 'inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700'
                            : q.status === 'failed'
                              ? 'inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700'
                              : 'inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-slate-50 text-slate-700'
                        }
                        title={q.lastError || undefined}
                      >
                        {q.status}
                      </span>
                    </td>
                    <td className="py-3">{formatMoney(q.total, q.currency)}</td>
                    <td className="py-3 text-[var(--muted)]">
                      {new Date(q.issuedAt || q.createdAt).toLocaleDateString('en-KE', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="py-3 text-right">
                      <a
                        href={`/api/admin/quotations/${q.id}/download`}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--button-bg)]"
                      >
                        <Download size={14} />
                        PDF
                      </a>
                    </td>
                  </tr>
                ))}
              {!savedLoading && saved.length === 0 && !savedError && (
                <tr>
                  <td className="py-4 text-[var(--muted)]" colSpan={6}>
                    No quotations yet. Generate one to see it saved here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create quotation"
        subtitle="Add client details and itemized pricing."
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Client Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Client Email</label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={inputClass}
              >
                <option value="KES">KES</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Items</label>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-[1fr_120px_140px_auto] gap-3 items-center"
                >
                  <input
                    type="text"
                    placeholder="Product / Equipment / Task"
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    className={inputClass}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                    className={inputClass}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                    className={inputClass}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="w-full md:w-auto px-3 py-2 rounded-full border border-rose-200 text-rose-500 text-sm font-semibold hover:bg-rose-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addItem}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
            >
              <Plus size={16} />
              Add Item
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={inputClass}
              rows={4}
            />
          </div>
          <div className="text-left sm:text-right">
            <p className="text-lg font-semibold">Total: {formatMoney(calculateTotal())}</p>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--button-bg)] text-white font-semibold disabled:opacity-50"
          >
            <Send size={16} />
            {isLoading ? 'Processing...' : 'Generate & Send Quotation'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
