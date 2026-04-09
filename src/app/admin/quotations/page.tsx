'use client';

import { useState } from 'react';
import { FileText, Plus, Send } from 'lucide-react';
import Modal from '@/components/Modal';

interface Item {
  description: string;
  quantity: number;
  price: number;
}

export default function Quotations() {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [items, setItems] = useState<Item[]>([{ description: '', quantity: 1, price: 0 }]);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);
  };

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
          items,
          notes,
          total: calculateTotal(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate and send quotation');
      }

      setMessage('Quotation generated and sent successfully!');
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
            Total preview: ${calculateTotal()}
          </div>
        </div>
        {message && <p className="mt-4 text-sm text-[var(--foreground)]">{message}</p>}
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create quotation"
        subtitle="Add client details and itemized pricing."
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    placeholder="Description"
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
            <p className="text-lg font-semibold">Total: ${calculateTotal()}</p>
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
