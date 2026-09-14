import React from 'react'
import { Search, Filter, ArrowUpDown, X } from 'lucide-react'

const MyEventsSearch = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  categories = []
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search registered events by title, college, venue..."
          className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-[#374375] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#374375]/20 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Filter Dropdown */}
      <div className="relative w-full sm:w-auto">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full sm:w-auto px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#374375] focus:outline-none focus:ring-2 focus:ring-[#374375]/20 cursor-pointer"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Dropdown */}
      <div className="relative w-full sm:w-auto">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full sm:w-auto px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#374375] focus:outline-none focus:ring-2 focus:ring-[#374375]/20 cursor-pointer"
        >
          <option value="soonest">Date: Soonest First</option>
          <option value="latest">Date: Latest First</option>
          <option value="alphabetical">Title: A to Z</option>
        </select>
      </div>
    </div>
  )
}

export default MyEventsSearch
