import React from 'react'

export default function NotificationSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((idx) => (
        <div
          key={idx}
          className="bg-[#FFFCF5] rounded-3xl p-5 sm:p-6 border border-[#BABDE2]/40 animate-pulse flex items-start gap-4 shadow-2xs"
        >
          {/* Left Column: Icon */}
          <div className="w-11 h-11 rounded-2xl bg-[#BABDE2]/30 shrink-0" />

          {/* Center Column: Text */}
          <div className="flex-1 min-w-0 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-20 h-4 rounded-full bg-[#BABDE2]/30" />
              <div className="w-16 h-3 rounded-md bg-[#BABDE2]/20" />
            </div>
            <div className="w-2/3 h-5 rounded-md bg-[#BABDE2]/40" />
            <div className="w-full h-4 rounded-md bg-[#BABDE2]/20" />
            <div className="w-28 h-7 rounded-xl bg-[#BABDE2]/30 mt-2" />
          </div>

          {/* Right Column: Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-[#BABDE2]/20" />
            <div className="w-8 h-8 rounded-xl bg-[#BABDE2]/20" />
          </div>
        </div>
      ))}
    </div>
  )
}
