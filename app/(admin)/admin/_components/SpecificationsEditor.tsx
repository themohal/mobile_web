'use client';

import { useState } from 'react';

export default function SpecificationsEditor({
  defaultValue = {},
  name = 'specifications',
}: {
  defaultValue?: Record<string, string>;
  name?: string;
}) {
  const [pairs, setPairs] = useState<{ key: string; value: string }[]>(
    Object.entries(defaultValue).length > 0
      ? Object.entries(defaultValue).map(([key, value]) => ({ key, value }))
      : [{ key: '', value: '' }]
  );

  function addPair() {
    setPairs([...pairs, { key: '', value: '' }]);
  }

  function removePair(index: number) {
    setPairs(pairs.filter((_, i) => i !== index));
  }

  function updatePair(index: number, field: 'key' | 'value', val: string) {
    const updated = [...pairs];
    updated[index][field] = val;
    setPairs(updated);
  }

  // Serialize to JSON in a hidden field
  const specsObj: Record<string, string> = {};
  pairs.forEach((p) => {
    if (p.key.trim()) specsObj[p.key.trim()] = p.value;
  });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
      <input type="hidden" name={name} value={JSON.stringify(specsObj)} />

      <div className="space-y-2">
        {pairs.map((pair, i) => (
          <div key={i} className="flex gap-2 items-start">
            <input
              type="text"
              value={pair.key}
              onChange={(e) => updatePair(i, 'key', e.target.value)}
              placeholder="Key (e.g. RAM)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <input
              type="text"
              value={pair.value}
              onChange={(e) => updatePair(i, 'value', e.target.value)}
              placeholder="Value (e.g. 8GB)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => removePair(i)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addPair}
        className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
      >
        + Add specification
      </button>
    </div>
  );
}
