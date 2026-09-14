import React from 'react'
import { ArrowUpDown } from 'lucide-react'

export default function SortDropdown({ value, onChange }) {
  const sortOptions = [
    { id: 'soonest', label: 'Soonest First' },
    { id: 'latest', label: 'Latest First' },
    { id: 'fee-low', label: 'Lowest Fee' },
    { id: 'fee-high', label: 'Highest Fee' },
    { id: 'popular', label: 'Most Popular' }
  ]

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-[#895159] shrink-0" />
      <select
        value={value || 'soonest'}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 rounded-2xl bg-[#FFFCF5] border border-[#BABDE2] text-[#374375] font-extrabold text-xs shadow-xs focus:outline-none focus:ring-2 focus:ring-[#BABDE2] cursor-pointer"
        aria-label="Sort events"
      >
        {sortOptions.map((opt) => (
          <option key={opt.id} value={opt.id}>
            Sort: {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
