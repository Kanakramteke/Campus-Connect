import React from 'react'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumb({ items, onNavigate }) {
  return (
    <nav className="flex items-center gap-2 text-xs font-semibold text-[#374375]/70 mb-4" aria-label="Breadcrumb">
      <button
        onClick={() => onNavigate?.('dashboard')}
        className="flex items-center gap-1 text-[#374375] hover:text-[#895159] transition-colors focus:outline-none"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Dashboard</span>
      </button>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-[#BABDE2] shrink-0" />
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="text-[#374375] hover:text-[#895159] transition-colors focus:outline-none"
            >
              {item.label}
            </button>
          ) : (
            <span className="font-bold text-[#895159] truncate max-w-[200px]">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
