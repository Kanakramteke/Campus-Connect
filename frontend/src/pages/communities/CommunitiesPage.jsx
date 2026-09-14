import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useCampus } from '../../context/CampusContext'
import { NAGPUR_COLLEGES } from '../../data/nagpurData'

import Breadcrumb from '../../components/common/Breadcrumb'
import CommunityCard from '../../components/communities/CommunityCard'
import CommunitySearch from '../../components/communities/CommunitySearch'
import CommunityFilters from '../../components/communities/CommunityFilters'
import CommunitySort from '../../components/communities/CommunitySort'
import CommunityEmptyState from '../../components/communities/CommunityEmptyState'
import FilterChips from '../../components/events/FilterChips'
import { Globe, Sparkles, Filter } from 'lucide-react'

const CommunitiesPage = ({ onNavigate }) => {
  const { allCommunities, isCommunityJoined } = useCampus()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCollege, setSelectedCollege] = useState('all')
  const [selectedMemberSize, setSelectedMemberSize] = useState('all')
  const [membershipFilter, setMembershipFilter] = useState('all')
  const [sortBy, setSortBy] = useState('relevant')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Filter Communities
  const filteredCommunities = useMemo(() => {
    return allCommunities.filter((comm) => {
      // 1. Category Filter
      if (selectedCategory !== 'all' && comm.category !== selectedCategory && comm.type !== selectedCategory.toLowerCase()) {
        return false
      }

      // 2. College Filter
      if (selectedCollege !== 'all' && comm.collegeId !== selectedCollege && !comm.college?.toLowerCase().includes(selectedCollege.toLowerCase())) {
        return false
      }

      // 3. Member Count Size Filter
      const members = comm.memberCount || comm.membersCount || 0
      if (selectedMemberSize === 'small' && members >= 200) return false
      if (selectedMemberSize === 'medium' && (members < 200 || members > 700)) return false
      if (selectedMemberSize === 'large' && members <= 700) return false

      // 4. Membership Filter
      const joined = isCommunityJoined(comm.id)
      if (membershipFilter === 'joined' && !joined) return false
      if (membershipFilter === 'not_joined' && joined) return false

      // 5. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const nameMatch = comm.name.toLowerCase().includes(q)
        const collegeMatch = (comm.college || '').toLowerCase().includes(q)
        const catMatch = (comm.category || '').toLowerCase().includes(q) || (comm.subcategory || '').toLowerCase().includes(q)
        const descMatch = (comm.description || '').toLowerCase().includes(q) || (comm.shortDescription || '').toLowerCase().includes(q)
        const interestMatch = (comm.interests || []).some(i => i.toLowerCase().includes(q))

        if (!nameMatch && !collegeMatch && !catMatch && !descMatch && !interestMatch) {
          return false
        }
      }

      return true
    })
  }, [allCommunities, selectedCategory, selectedCollege, selectedMemberSize, membershipFilter, searchQuery, isCommunityJoined])

  // Sort Communities
  const sortedCommunities = useMemo(() => {
    return [...filteredCommunities].sort((a, b) => {
      const membersA = a.memberCount || a.membersCount || 0
      const membersB = b.memberCount || b.membersCount || 0

      if (sortBy === 'members') {
        return membersB - membersA
      }
      if (sortBy === 'recent') {
        return (b.activeMembers || 0) - (a.activeMembers || 0)
      }
      if (sortBy === 'newest') {
        return b.id.localeCompare(a.id)
      }
      // 'relevant' default -> members count
      return membersB - membersA
    })
  }, [filteredCommunities, sortBy])

  // Active filter chips generation
  const activeFilterChips = useMemo(() => {
    const chips = []
    if (searchQuery.trim()) {
      chips.push({ id: 'search', label: `Search: "${searchQuery}"`, action: () => setSearchQuery('') })
    }
    if (selectedCategory && selectedCategory !== 'all') {
      chips.push({ id: 'category', label: `Category: ${selectedCategory}`, action: () => setSelectedCategory('all') })
    }
    if (selectedCollege && selectedCollege !== 'all') {
      chips.push({ id: 'college', label: `College: ${selectedCollege}`, action: () => setSelectedCollege('all') })
    }
    if (selectedMemberSize && selectedMemberSize !== 'all') {
      chips.push({ id: 'memberSize', label: `Size: ${selectedMemberSize}`, action: () => setSelectedMemberSize('all') })
    }
    if (membershipFilter && membershipFilter !== 'all') {
      const label = membershipFilter === 'joined' ? 'Status: Joined' : 'Status: Not Joined'
      chips.push({ id: 'membership', label, action: () => setMembershipFilter('all') })
    }
    return chips
  }, [searchQuery, selectedCategory, selectedCollege, selectedMemberSize, membershipFilter])

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedCollege('all')
    setSelectedMemberSize('all')
    setMembershipFilter('all')
    setSortBy('relevant')
  }

  const handleRemoveChip = (chipId) => {
    const chip = activeFilterChips.find(c => c.id === chipId)
    if (chip && chip.action) chip.action()
  }

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Breadcrumbs */}
      <Breadcrumb items={[{ label: 'Student Communities' }]} onNavigate={onNavigate} />

      {/* 2. Page Hero Section */}
      <div className="bg-gradient-to-r from-[#FFFCF5] via-[#FFFCF5] to-[#BABDE2]/25 p-6 sm:p-8 rounded-3xl border border-[#BABDE2]/60 shadow-xs relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BABDE2]/30 text-[#374375] text-xs font-extrabold">
            <Sparkles className="w-3.5 h-3.5 text-[#895159]" />
            <span>Inter-College Student Networks</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#374375] tracking-tight">
            Student Communities
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#374375]/80">
            Find student communities, connect with peers, collaborate on projects, and discuss topics across Nagpur.
          </p>
        </div>
      </div>

      {/* 3. Search & Filter Controls */}
      <div className="space-y-4">
        <CommunitySearch value={searchQuery} onChange={setSearchQuery} />

        <div className="hidden md:block">
          <CommunityFilters
            category={selectedCategory}
            onCategoryChange={setSelectedCategory}
            college={selectedCollege}
            onCollegeChange={setSelectedCollege}
            memberSize={selectedMemberSize}
            onMemberSizeChange={setSelectedMemberSize}
            membership={membershipFilter}
            onMembershipChange={setMembershipFilter}
            onReset={handleResetFilters}
          />
        </div>

        {/* Active Filter Chips */}
        <FilterChips
          chips={activeFilterChips}
          onRemoveChip={handleRemoveChip}
          onClearAll={handleResetFilters}
        />
      </div>

      {/* 4. Results Count & Sorting Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#BABDE2]/40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden py-2 px-3 bg-[#FFFCF5] border border-[#BABDE2] text-[#374375] font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-[#895159]" /> Filter Communities
          </button>
          <span className="text-xs font-extrabold text-[#374375]">
            Showing <span className="text-[#895159]">{sortedCommunities.length}</span> {sortedCommunities.length === 1 ? 'Community' : 'Communities'}
          </span>
        </div>

        <CommunitySort value={sortBy} onChange={setSortBy} />
      </div>

      {/* 5. Main Cards Grid */}
      {sortedCommunities.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {sortedCommunities.map((comm) => (
            <CommunityCard key={comm.id} community={comm} onNavigate={onNavigate} />
          ))}
        </motion.div>
      ) : (
        <CommunityEmptyState
          type={membershipFilter === 'joined' ? 'no_joined' : 'no_matches'}
          onReset={handleResetFilters}
        />
      )}
    </div>
  )
}

export default CommunitiesPage