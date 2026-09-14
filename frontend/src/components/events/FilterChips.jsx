import React from 'react'
import { X, RotateCcw } from 'lucide-react'

export default function FilterChips({ chips = [], onRemoveChip, onClearAll }) {
  if (!chips || chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2 animate-in fade-in duration-200">
      <span className="text-[11px] font-extrabold text-[#374375]/70 uppercase tracking-wider mr-1">
        Active Filters:
      </span>

      {chips.map((chip) => (
        <span
          key={chip.id}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#BABDE2]/40 text-[#374375] text-xs font-bold border border-[#BABDE2] shadow-xs"
        >
          <span>{chip.label}</span>
          <button
            onClick={() => onRemoveChip(chip.id)}
            className="p-0.5 rounded-full hover:bg-[#374375]/15 transition-colors focus:outline-none"
            aria-label={`Remove filter ${chip.label}`}
          >
            <X className="w-3.5 h-3.5 text-[#374375]" />
          </button>
        </span>
      ))}

      <button
        onClick={onClearAll}
        className="ml-2 text-xs font-black text-[#895159] hover:text-[#374375] transition-colors flex items-center gap-1 underline"
      >
        <RotateCcw className="w-3 h-3" /> Clear All
      </button>
    </div>
  )
}
