import React from 'react'
import { Search, X } from 'lucide-react'

export default function NotificationFilters({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  unreadCount,
  notifications = []
}) {
  const getCategoryCount = (cat) => {
    if (cat === 'all') return notifications.length
    if (cat === 'unread') return unreadCount
    return notifications.filter(n => n.category === cat).length
  }

  const filterOptions = [
    { id: 'all', label: 'All', badge: getCategoryCount('all') },
    { id: 'unread', label: 'Unread', badge: getCategoryCount('unread') },
    { id: 'events', label: 'Events', badge: getCategoryCount('events') },
    { id: 'payments', label: 'Payments', badge: getCategoryCount('payments') },
    { id: 'clubs', label: 'Clubs', badge: getCategoryCount('clubs') },
    { id: 'communities', label: 'Communities', badge: getCategoryCount('communities') },
    { id: 'system', label: 'Campus Connect', badge: getCategoryCount('system') }
  ]

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#374375]/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notifications by title, message, or college..."
            className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-[#FFFCF5] border border-[#BABDE2] text-sm text-[#374375] placeholder-[#374375]/50 focus:outline-none focus:ring-2 focus:ring-[#374375] font-semibold transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-[#374375]/60 hover:text-[#895159] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {filterOptions.map((opt) => {
          const isActive = activeFilter === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onFilterChange(opt.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[#374375] text-[#FFFCF5] shadow-xs translate-y-[-1px]'
                  : 'bg-[#FFFCF5] text-[#374375] border border-[#BABDE2]/60 hover:border-[#BABDE2] hover:bg-[#BABDE2]/20'
              }`}
            >
              <span>{opt.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                isActive
                  ? (opt.id === 'unread' ? 'bg-[#895159] text-[#FFFCF5]' : 'bg-[#FFFCF5]/20 text-[#FFFCF5]')
                  : (opt.id === 'unread' ? 'bg-[#895159] text-[#FFFCF5]' : 'bg-[#BABDE2]/40 text-[#374375]')
              }`}>
                {opt.badge}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
