import React from 'react'
import { ArrowUpDown } from 'lucide-react'

const CommunitySort = ({ value, onChange }) => {
  const options = [
    { id: 'relevant', label: 'Most Relevant' },
    { id: 'members', label: 'Most Members' },
    { id: 'recent', label: 'Recently Active' },
    { id: 'newest', label: 'Newest First' }
  ]

  return (
    <div className="relative inline-flex items-center gap-2">
      <ArrowUpDown className="w-3.5 h-3.5 text-[#895159] pointer-events-none absolute left-3 top-3" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8 pr-4 py-2 bg-[#FFFCF5] border border-[#BABDE2] rounded-xl text-xs font-bold text-[#374375] focus:outline-none focus:ring-2 focus:ring-[#BABDE2] cursor-pointer shadow-xs"
      >
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CommunitySort
