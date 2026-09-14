import React from 'react'
import { Filter } from 'lucide-react'
import SortDropdown from './SortDropdown'

export default function ResultsCount({ count = 0, sortValue, onSortChange, onOpenMobileFilter }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 pb-1 border-b border-[#BABDE2]/30">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <span className="text-xs sm:text-sm font-black text-[#374375] tracking-tight">
          {count} {count === 1 ? 'event found' : 'events found'}
        </span>

        {/* Mobile Filter Button */}
        {onOpenMobileFilter && (
          <button
            onClick={onOpenMobileFilter}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#BABDE2]/40 text-[#374375] font-extrabold text-xs border border-[#BABDE2]"
          >
            <Filter className="w-3.5 h-3.5 text-[#895159]" />
            <span>Filters</span>
          </button>
        )}
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3">
        <SortDropdown value={sortValue} onChange={onSortChange} />
      </div>
    </div>
  )
}
