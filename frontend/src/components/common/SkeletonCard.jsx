import React from 'react'

export default function SkeletonCard({ type = 'event' }) {
  if (type === 'club' || type === 'community') {
    return (
      <div className="bg-[#FFFCF5] rounded-3xl p-5 border border-[#BABDE2]/40 animate-pulse space-y-4">
        <div className="flex justify-between items-center">
          <div className="w-10 h-10 rounded-2xl bg-[#BABDE2]/30" />
          <div className="w-16 h-5 rounded-full bg-[#BABDE2]/30" />
        </div>
        <div className="w-3/4 h-5 rounded-lg bg-[#BABDE2]/40" />
        <div className="w-1/2 h-3 rounded-md bg-[#BABDE2]/20" />
        <div className="space-y-2 pt-2">
          <div className="w-full h-3 rounded-md bg-[#BABDE2]/20" />
          <div className="w-5/6 h-3 rounded-md bg-[#BABDE2]/20" />
        </div>
        <div className="w-full h-9 rounded-xl bg-[#BABDE2]/30 pt-2" />
      </div>
    )
  }

  return (
    <div className="bg-[#FFFCF5] rounded-3xl border border-[#BABDE2]/40 overflow-hidden animate-pulse">
      <div className="h-44 w-full bg-[#BABDE2]/30" />
      <div className="p-5 space-y-3">
        <div className="w-1/3 h-3 rounded-md bg-[#BABDE2]/30" />
        <div className="w-4/5 h-5 rounded-lg bg-[#BABDE2]/40" />
        <div className="space-y-2 pt-2">
          <div className="w-2/3 h-3 rounded-md bg-[#BABDE2]/20" />
          <div className="w-1/2 h-3 rounded-md bg-[#BABDE2]/20" />
        </div>
        <div className="w-full h-10 rounded-2xl bg-[#BABDE2]/30 mt-4" />
      </div>
    </div>
  )
}
