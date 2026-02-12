'use client';

import { useState } from 'react';

export default function DeleteButton({
  action,
  label = 'Delete',
  confirmMessage = 'Are you sure you want to delete this item? This action cannot be undone.',
}: {
  action: () => Promise<void | { error: string }>;
  label?: string;
  confirmMessage?: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await action();
    setLoading(false);
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <p className="text-sm text-red-600">{confirmMessage}</p>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Deleting...' : 'Confirm'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
    >
      {label}
    </button>
  );
}
