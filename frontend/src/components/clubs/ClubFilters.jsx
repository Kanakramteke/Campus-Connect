import React from 'react'
import { Filter, Tag, Building2, UserCheck } from 'lucide-react'
import { NAGPUR_COLLEGES } from '../../data/nagpurData'

const ClubFilters = ({
  category,
  onCategoryChange,
  college,
  onCollegeChange,
  membership,
  onMembershipChange
}) => {
  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'Technical', label: 'Technical' },
    { id: 'Cultural', label: 'Cultural' },
    { id: 'Other', label: 'Other Interests' }
  ]

  const membershipOptions = [
    { id: 'all', label: 'All Clubs' },
    { id: 'joined', label: 'Joined Clubs' },
    { id: 'not_joined', label: 'Not Joined' }
  ]

  return (
    <div className="bg-[#FFFCF5] p-4 sm:p-5 rounded-3xl border border-[#BABDE2]/60 shadow-xs space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-[#BABDE2]/30 font-extrabold text-xs text-[#374375] uppercase tracking-wider">
        <Filter className="w-4 h-4 text-[#895159]" />
        <span>Filter Clubs</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-[#374375]">
        {/* Category */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#895159]">
            <Tag className="w-3.5 h-3.5" /> Category
          </label>
          <select
            value={category || 'all'}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full p-2.5 rounded-2xl bg-[#FFFCF5] border border-[#BABDE2] text-[#374375] font-semibold focus:outline-none focus:ring-2 focus:ring-[#BABDE2] cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* College */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#895159]">
            <Building2 className="w-3.5 h-3.5" /> College / Campus
          </label>
          <select
            value={college || 'all'}
            onChange={(e) => onCollegeChange(e.target.value)}
            className="w-full p-2.5 rounded-2xl bg-[#FFFCF5] border border-[#BABDE2] text-[#374375] font-semibold focus:outline-none focus:ring-2 focus:ring-[#BABDE2] cursor-pointer"
          >
            {NAGPUR_COLLEGES.map((col) => (
              <option key={col.id} value={col.id}>{col.name}</option>
            ))}
          </select>
        </div>

        {/* Membership */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#895159]">
            <UserCheck className="w-3.5 h-3.5" /> Membership Status
          </label>
          <select
            value={membership || 'all'}
            onChange={(e) => onMembershipChange(e.target.value)}
            className="w-full p-2.5 rounded-2xl bg-[#FFFCF5] border border-[#BABDE2] text-[#374375] font-semibold focus:outline-none focus:ring-2 focus:ring-[#BABDE2] cursor-pointer"
          >
            {membershipOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default ClubFilters
