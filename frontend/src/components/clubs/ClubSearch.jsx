import React from 'react'
import { Search, X } from 'lucide-react'

const ClubSearch = ({ value, onChange }) => {
  return (
    <div className="relative w-full">
      <Search className="w-4 h-4 text-[#895159] absolute left-3.5 top-3.5 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search clubs by name, college, category, interests..."
        className="w-full pl-10 pr-9 py-2.5 bg-[#FFFCF5] border border-[#BABDE2] rounded-2xl text-xs font-semibold text-[#374375] placeholder-[#374375]/50 focus:outline-none focus:ring-2 focus:ring-[#BABDE2] transition-all shadow-xs"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-3 text-[#374375]/60 hover:text-[#374375]"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export default ClubSearch
