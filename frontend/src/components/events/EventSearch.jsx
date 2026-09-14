import React from 'react'
import { Search, X } from 'lucide-react'

export default function EventSearch({ value, onChange, onClear }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#374375]/60">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search events, colleges or keywords..."
        className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-[#FFFCF5] border border-[#BABDE2] text-[#374375] font-semibold text-sm placeholder-[#374375]/50 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#BABDE2] focus:border-[#374375] transition-all"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#374375]/60 hover:text-[#374375] transition-colors"
          aria-label="Clear search query"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
