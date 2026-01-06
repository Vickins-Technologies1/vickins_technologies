'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

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

  return (
    <div className="bg-[var(--card-bg)] p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Create Quotation</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Client Name</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Client Email</label>
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Items</label>
          {items.map((item, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Description"
                value={item.description}
                onChange={(e) => updateItem(index, 'description', e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                className="w-24 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                className="w-32 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
                required
              />
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="px-3 py-2 bg-red-600 text-white rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Add Item
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
            rows={4}
          />
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">Total: ${calculateTotal()}</p>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-green-600 text-white rounded-lg disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Generate & Send Quotation'}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-[var(--foreground)]">{message}</p>}
    </div>
  );
}