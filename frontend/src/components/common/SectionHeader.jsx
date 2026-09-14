import React from 'react'

export default function SectionHeader({ title, subtitle, onViewAll, viewAllText = 'View All' }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#374375] tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm font-medium text-[#374375]/70 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {onViewAll && (
        <button
          onClick={onViewAll}
          className="text-xs font-extrabold text-[#895159] hover:text-[#374375] transition-colors flex items-center gap-1 shrink-0 self-start sm:self-auto group"
        >
          <span>{viewAllText}</span>
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </button>
      )}
    </div>
  )
}
