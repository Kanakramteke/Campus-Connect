import React from 'react'
import { Globe, RotateCcw, Compass } from 'lucide-react'

const CommunityEmptyState = ({ type = 'no_matches', onReset }) => {
  const isJoinedEmpty = type === 'no_joined'

  return (
    <div className="bg-[#FFFCF5] rounded-3xl p-8 sm:p-12 border border-[#BABDE2]/60 text-center space-y-5 max-w-md mx-auto shadow-xs my-6">
      <div className="w-20 h-20 rounded-full bg-[#BABDE2]/30 text-[#374375] flex items-center justify-center mx-auto ring-8 ring-[#BABDE2]/15">
        <Globe className="w-10 h-10 text-[#374375]" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xl font-black text-[#374375]">
          {isJoinedEmpty ? "You haven't joined any communities yet" : "No communities found"}
        </h3>
        <p className="text-xs text-slate-500 max-w-xs mx-auto font-medium leading-relaxed">
          {isJoinedEmpty
            ? "Connect with student networks, share project ideas, and discuss technology and culture across Nagpur."
            : "No communities match your current filter selections or search query."}
        </p>
      </div>

      <div className="pt-2">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#374375] hover:bg-[#895159] text-white font-bold text-xs rounded-xl shadow-md transition-all duration-200 cursor-pointer"
        >
          {isJoinedEmpty ? (
            <>
              <Compass className="w-4 h-4 text-[#DFAEA1]" />
              <span>Explore All Communities</span>
            </>
          ) : (
            <>
              <RotateCcw className="w-4 h-4 text-[#DFAEA1]" />
              <span>Clear Filters & Search</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default CommunityEmptyState
