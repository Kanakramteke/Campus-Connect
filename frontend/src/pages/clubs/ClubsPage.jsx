import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useCampus } from '../../context/CampusContext'
import { NAGPUR_COLLEGES } from '../../data/nagpurData'

import Breadcrumb from '../../components/common/Breadcrumb'
import ClubCard from '../../components/clubs/ClubCard'
import ClubSearch from '../../components/clubs/ClubSearch'
import ClubFilters from '../../components/clubs/ClubFilters'
import ClubSort from '../../components/clubs/ClubSort'
import ClubEmptyState from '../../components/clubs/ClubEmptyState'
import FilterChips from '../../components/events/FilterChips'
import { Building2, Sparkles, Filter } from 'lucide-react'

const ClubsPage = ({ onNavigate }) => {
  const { allClubs, isClubJoined } = useCampus()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCollege, setSelectedCollege] = useState('all')
  const [membershipFilter, setMembershipFilter] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Filter Clubs
  const filteredClubs = useMemo(() => {
    return allClubs.filter((club) => {
      // 1. Category Filter
      if (selectedCategory !== 'all' && club.category !== selectedCategory && club.type !== selectedCategory.toLowerCase()) {
        return false
      }

      // 2. College Filter
      if (selectedCollege !== 'all' && club.collegeId !== selectedCollege && !club.college?.toLowerCase().includes(selectedCollege.toLowerCase())) {
        return false
      }

      // 3. Membership Filter
      const joined = isClubJoined(club.id)
      if (membershipFilter === 'joined' && !joined) return false
      if (membershipFilter === 'not_joined' && joined) return false

      // 4. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const nameMatch = club.name.toLowerCase().includes(q)
        const collegeMatch = club.college.toLowerCase().includes(q)
        const catMatch = (club.category || '').toLowerCase().includes(q) || (club.subcategory || '').toLowerCase().includes(q)
        const descMatch = (club.description || '').toLowerCase().includes(q) || (club.shortDescription || '').toLowerCase().includes(q)

        if (!nameMatch && !collegeMatch && !catMatch && !descMatch) {
          return false
        }
      }

      return true
    })
  }, [allClubs, selectedCategory, selectedCollege, membershipFilter, searchQuery, isClubJoined])

  // Sort Clubs
  const sortedClubs = useMemo(() => {
    return [...filteredClubs].sort((a, b) => {
      const membersA = a.membersCount || a.stats?.members || 0
      const membersB = b.membersCount || b.stats?.members || 0

      if (sortBy === 'members' || sortBy === 'popular') {
        return membersB - membersA
      }
      if (sortBy === 'recent') {
        return (b.establishedYear || 2020) - (a.establishedYear || 2020)
      }
      if (sortBy === 'alphabetical') {
        return a.name.localeCompare(b.name)
      }
      return 0
    })
  }, [filteredClubs, sortBy])

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
    if (membershipFilter && membershipFilter !== 'all') {
      const label = membershipFilter === 'joined' ? 'Status: Joined' : 'Status: Not Joined'
      chips.push({ id: 'membership', label, action: () => setMembershipFilter('all') })
    }
    return chips
  }, [searchQuery, selectedCategory, selectedCollege, membershipFilter])

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedCollege('all')
    setMembershipFilter('all')
    setSortBy('popular')
  }

  const handleRemoveChip = (chipId) => {
    const chip = activeFilterChips.find(c => c.id === chipId)
    if (chip && chip.action) chip.action()
  }

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Breadcrumbs */}
      <Breadcrumb items={[{ label: 'Explore Clubs' }]} onNavigate={onNavigate} />

      {/* 2. Page Hero Section */}
      <div className="bg-gradient-to-r from-[#FFFCF5] via-[#FFFCF5] to-[#BABDE2]/25 p-6 sm:p-8 rounded-3xl border border-[#BABDE2]/60 shadow-xs relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BABDE2]/30 text-[#374375] text-xs font-extrabold">
            <Sparkles className="w-3.5 h-3.5 text-[#895159]" />
            <span>Campus Communities & Societies</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#374375] tracking-tight">
            Explore Campus Clubs
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#374375]/80">
            Find technical, cultural, and interest-based student organizations across Nagpur colleges.
          </p>
        </div>
      </div>

      {/* 3. Search & Filter Controls */}
      <div className="space-y-4">
        <ClubSearch value={searchQuery} onChange={setSearchQuery} />

        <div className="hidden md:block">
          <ClubFilters
            category={selectedCategory}
            onCategoryChange={setSelectedCategory}
            college={selectedCollege}
            onCollegeChange={setSelectedCollege}
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
            <Filter className="w-3.5 h-3.5 text-[#895159]" /> Filter Clubs
          </button>
          <span className="text-xs font-extrabold text-[#374375]">
            Showing <span className="text-[#895159]">{sortedClubs.length}</span> {sortedClubs.length === 1 ? 'Club' : 'Clubs'}
          </span>
        </div>

        <ClubSort value={sortBy} onChange={setSortBy} />
      </div>

      {/* 5. Main Cards Grid */}
      {sortedClubs.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {sortedClubs.map((club) => (
            <ClubCard key={club.id} club={club} onNavigate={onNavigate} />
          ))}
        </motion.div>
      ) : (
        <ClubEmptyState
          type={membershipFilter === 'joined' ? 'no_joined' : 'no_matches'}
          onReset={handleResetFilters}
        />
      )}
    </div>
  )
}

export default ClubsPage
