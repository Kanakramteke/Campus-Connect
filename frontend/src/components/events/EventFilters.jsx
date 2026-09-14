import React from 'react'
import { Filter, Calendar, Tag, Building2, Coins } from 'lucide-react'

export default function EventFilters({
  type = 'technical',
  colleges = [],
  selectedCategory,
  onSelectCategory,
  selectedCollege,
  onSelectCollege,
  selectedDateOption,
  onSelectDateOption,
  customDate,
  onChangeCustomDate,
  selectedFeeOption,
  onSelectFeeOption
}) {
  const technicalCategories = ['All', 'Hackathon', 'Workshop', 'Coding Competition', 'Robotics', 'Cybersecurity', 'AI / ML', 'Web Development', 'Project Competition', 'Tech Fest']
  const culturalCategories = ['All', 'Cultural Fest', 'Music', 'Dance', 'Drama', 'Fashion', 'Photography', 'Art', 'Open Mic', 'Literary']

  const categories = type === 'technical' ? technicalCategories : culturalCategories

  const dateOptions = [
    { id: 'all', label: 'Any Date' },
    { id: 'today', label: 'Today' },
    { id: 'this-week', label: 'This Week' },
    { id: 'this-month', label: 'This Month' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'custom', label: 'Custom Date' }
  ]

  const feeOptions = [
    { id: 'all', label: 'All Fees' },
    { id: 'free', label: 'Free Only' },
    { id: 'paid', label: 'Paid Only' },
    { id: '0-100', label: '₹0 – ₹100' },
    { id: '101-300', label: '₹101 – ₹300' },
    { id: '301-500', label: '₹301 – ₹500' },
    { id: '500+', label: '₹500+' }
  ]

  return (
    <div className="bg-[#FFFCF5] p-4 sm:p-5 rounded-3xl border border-[#BABDE2]/60 shadow-xs space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-[#BABDE2]/30 font-extrabold text-xs text-[#374375] uppercase tracking-wider">
        <Filter className="w-4 h-4 text-[#895159]" />
        <span>Filter Events</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold text-[#374375]">
        {/* Category Filter */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#895159]">
            <Tag className="w-3.5 h-3.5" /> Category
          </label>
          <select
            value={selectedCategory || 'All'}
            onChange={(e) => onSelectCategory(e.target.value)}
            className="w-full p-2.5 rounded-2xl bg-[#FFFCF5] border border-[#BABDE2] text-[#374375] font-semibold focus:outline-none focus:ring-2 focus:ring-[#BABDE2]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* College Filter */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#895159]">
            <Building2 className="w-3.5 h-3.5" /> College
          </label>
          <select
            value={selectedCollege || 'all'}
            onChange={(e) => onSelectCollege(e.target.value)}
            className="w-full p-2.5 rounded-2xl bg-[#FFFCF5] border border-[#BABDE2] text-[#374375] font-semibold focus:outline-none focus:ring-2 focus:ring-[#BABDE2]"
          >
            <option value="all">All Colleges in Nagpur</option>
            {colleges.filter(c => c.id !== 'all').map((col) => (
              <option key={col.id} value={col.name}>{col.name}</option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#895159]">
            <Calendar className="w-3.5 h-3.5" /> Date
          </label>
          <div className="flex gap-2">
            <select
              value={selectedDateOption || 'all'}
              onChange={(e) => onSelectDateOption(e.target.value)}
              className="w-full p-2.5 rounded-2xl bg-[#FFFCF5] border border-[#BABDE2] text-[#374375] font-semibold focus:outline-none focus:ring-2 focus:ring-[#BABDE2]"
            >
              {dateOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
            {selectedDateOption === 'custom' && (
              <input
                type="date"
                value={customDate || ''}
                onChange={(e) => onChangeCustomDate(e.target.value)}
                className="p-2 rounded-2xl bg-[#FFFCF5] border border-[#BABDE2] text-[#374375] font-semibold text-xs focus:outline-none"
              />
            )}
          </div>
        </div>

        {/* Fee Filter */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#895159]">
            <Coins className="w-3.5 h-3.5" /> Registration Fee
          </label>
          <select
            value={selectedFeeOption || 'all'}
            onChange={(e) => onSelectFeeOption(e.target.value)}
            className="w-full p-2.5 rounded-2xl bg-[#FFFCF5] border border-[#BABDE2] text-[#374375] font-semibold focus:outline-none focus:ring-2 focus:ring-[#BABDE2]"
          >
            {feeOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
