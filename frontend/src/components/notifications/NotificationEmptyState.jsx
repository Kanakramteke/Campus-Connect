import React from 'react'
import { BellOff, FilterX, Sparkles } from 'lucide-react'

export default function NotificationEmptyState({ isFilter, onClearFilters, onExplore }) {
  if (isFilter) {
    return (
      <div className="bg-[#FFFCF5] rounded-3xl p-8 sm:p-12 border border-[#BABDE2]/60 text-center space-y-4 max-w-md mx-auto my-8">
        <div className="w-14 h-14 rounded-2xl bg-[#DFAEA1]/40 text-[#895159] flex items-center justify-center mx-auto text-2xl font-black">
          <FilterX className="w-7 h-7 text-[#374375]" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-lg font-black text-[#374375]">No notifications found</h3>
          <p className="text-xs sm:text-sm text-[#374375]/75 font-semibold leading-relaxed">
            Try choosing another filter category or clear your search term.
          </p>
        </div>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="py-2.5 px-5 rounded-2xl bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs transition-colors cursor-pointer"
          >
            Clear Filters & Search
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="bg-[#FFFCF5] rounded-3xl p-8 sm:p-12 border border-[#BABDE2]/60 text-center space-y-4 max-w-md mx-auto my-8">
      <div className="w-14 h-14 rounded-2xl bg-[#BABDE2]/40 text-[#374375] flex items-center justify-center mx-auto font-black">
        <BellOff className="w-7 h-7 text-[#895159]" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-xl font-black text-[#374375]">You're all caught up!</h3>
        <p className="text-xs sm:text-sm text-[#374375]/75 font-semibold leading-relaxed">
          You don't have any notifications right now. Check back later after registering for events or joining communities.
        </p>
      </div>
      {onExplore && (
        <button
          onClick={onExplore}
          className="py-2.5 px-5 rounded-2xl bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs transition-colors cursor-pointer inline-flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Explore Campus Connect</span>
        </button>
      )}
    </div>
  )
}
