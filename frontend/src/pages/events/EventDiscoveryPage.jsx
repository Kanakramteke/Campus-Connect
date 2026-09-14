import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useCampus } from '../../context/CampusContext'
import { NAGPUR_COLLEGES } from '../../data/nagpurData'

import Breadcrumb from '../../components/common/Breadcrumb'
import EventHero from '../../components/events/EventHero'
import EventSearch from '../../components/events/EventSearch'
import EventFilters from '../../components/events/EventFilters'
import ResultsCount from '../../components/events/ResultsCount'
import FilterChips from '../../components/events/FilterChips'
import FilterDrawer from '../../components/events/FilterDrawer'
import FeaturedEventCard from '../../components/events/FeaturedEventCard'
import EventCard from '../../components/common/EventCard'
import EmptyState from '../../components/common/EmptyState'

export default function EventDiscoveryPage({ type = 'technical', onNavigate }) {
  const { allEvents } = useCampus()

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCollege, setSelectedCollege] = useState('all')
  const [selectedDateOption, setSelectedDateOption] = useState('all')
  const [customDate, setCustomDate] = useState('')
  const [selectedFeeOption, setSelectedFeeOption] = useState('all')
  const [sortOption, setSortOption] = useState('soonest')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Filter dataset by type first
  const masterTypeEvents = useMemo(() => {
    return allEvents.filter(e => e.type === type)
  }, [allEvents, type])

  // Popular featured events for top highlight section (top 2)
  const popularFeaturedEvents = useMemo(() => {
    return masterTypeEvents.filter(e => e.popular).slice(0, 2)
  }, [masterTypeEvents])

  // Apply Search, Filters, and Sorting
  const filteredEvents = useMemo(() => {
    let result = [...masterTypeEvents]

    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(e =>
        e.title.toLowerCase().includes(q) ||
        (e.organizingCollege && e.organizingCollege.toLowerCase().includes(q)) ||
        (e.description && e.description.toLowerCase().includes(q)) ||
        (e.category && e.category.toLowerCase().includes(q)) ||
        (e.tags && e.tags.some(t => t.toLowerCase().includes(q)))
      )
    }

    // 2. Category Filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(e => e.category?.toLowerCase() === selectedCategory.toLowerCase())
    }

    // 3. College Filter
    if (selectedCollege && selectedCollege !== 'all') {
      result = result.filter(e =>
        e.organizingCollege?.toLowerCase().includes(selectedCollege.toLowerCase()) ||
        e.collegeId === selectedCollege
      )
    }

    // 4. Date Filter
    if (selectedDateOption !== 'all') {
      const today = new Date().toISOString().split('T')[0]
      if (selectedDateOption === 'today') {
        result = result.filter(e => e.date === today)
      } else if (selectedDateOption === 'upcoming') {
        result = result.filter(e => e.date >= today)
      } else if (selectedDateOption === 'this-week') {
        result = result.filter(e => (e.upcomingDays || 99) <= 7)
      } else if (selectedDateOption === 'this-month') {
        result = result.filter(e => (e.upcomingDays || 99) <= 30)
      } else if (selectedDateOption === 'custom' && customDate) {
        result = result.filter(e => e.date === customDate)
      }
    }

    // 5. Fee Filter
    if (selectedFeeOption !== 'all') {
      if (selectedFeeOption === 'free') {
        result = result.filter(e => e.isFree || e.registrationFee === 0)
      } else if (selectedFeeOption === 'paid') {
        result = result.filter(e => !e.isFree && e.registrationFee > 0)
      } else if (selectedFeeOption === '0-100') {
        result = result.filter(e => e.registrationFee >= 0 && e.registrationFee <= 100)
      } else if (selectedFeeOption === '101-300') {
        result = result.filter(e => e.registrationFee >= 101 && e.registrationFee <= 300)
      } else if (selectedFeeOption === '301-500') {
        result = result.filter(e => e.registrationFee >= 301 && e.registrationFee <= 500)
      } else if (selectedFeeOption === '500+') {
        result = result.filter(e => e.registrationFee > 500)
      }
    }

    // 6. Sorting Logic
    if (sortOption === 'soonest') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date))
    } else if (sortOption === 'latest') {
      result.sort((a, b) => new Date(b.date) - new Date(a.date))
    } else if (sortOption === 'fee-low') {
      result.sort((a, b) => (a.registrationFee || 0) - (b.registrationFee || 0))
    } else if (sortOption === 'fee-high') {
      result.sort((a, b) => (b.registrationFee || 0) - (a.registrationFee || 0))
    } else if (sortOption === 'popular') {
      result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
    }

    return result
  }, [masterTypeEvents, searchQuery, selectedCategory, selectedCollege, selectedDateOption, customDate, selectedFeeOption, sortOption])

  // Active filter chips generation
  const activeFilterChips = useMemo(() => {
    const chips = []
    if (searchQuery.trim()) {
      chips.push({ id: 'search', label: `Search: "${searchQuery}"`, action: () => setSearchQuery('') })
    }
    if (selectedCategory && selectedCategory !== 'All') {
      chips.push({ id: 'category', label: `Category: ${selectedCategory}`, action: () => setSelectedCategory('All') })
    }
    if (selectedCollege && selectedCollege !== 'all') {
      chips.push({ id: 'college', label: `College: ${selectedCollege}`, action: () => setSelectedCollege('all') })
    }
    if (selectedDateOption && selectedDateOption !== 'all') {
      const label = selectedDateOption === 'custom' ? `Date: ${customDate}` : `Date: ${selectedDateOption}`
      chips.push({ id: 'date', label, action: () => setSelectedDateOption('all') })
    }
    if (selectedFeeOption && selectedFeeOption !== 'all') {
      chips.push({ id: 'fee', label: `Fee: ${selectedFeeOption}`, action: () => setSelectedFeeOption('all') })
    }
    return chips
  }, [searchQuery, selectedCategory, selectedCollege, selectedDateOption, customDate, selectedFeeOption])

  const handleClearAll = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setSelectedCollege('all')
    setSelectedDateOption('all')
    setCustomDate('')
    setSelectedFeeOption('all')
    setSortOption('soonest')
  }

  const handleRemoveChip = (chipId) => {
    const chip = activeFilterChips.find(c => c.id === chipId)
    if (chip && chip.action) chip.action()
  }

  const pageTitle = type === 'technical' ? 'Technical Events' : 'Cultural Events'

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[{ label: pageTitle }]}
        onNavigate={onNavigate}
      />

      {/* Hero Header Section */}
      <EventHero type={type} title={pageTitle} />

      {/* Search & Desktop Filter System */}
      <div className="space-y-4">
        <EventSearch
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />

        <div className="hidden md:block">
          <EventFilters
            type={type}
            colleges={NAGPUR_COLLEGES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedCollege={selectedCollege}
            onSelectCollege={setSelectedCollege}
            selectedDateOption={selectedDateOption}
            onSelectDateOption={setSelectedDateOption}
            customDate={customDate}
            onChangeCustomDate={setCustomDate}
            selectedFeeOption={selectedFeeOption}
            onSelectFeeOption={setSelectedFeeOption}
          />
        </div>

        {/* Active Filter Chips */}
        <FilterChips
          chips={activeFilterChips}
          onRemoveChip={handleRemoveChip}
          onClearAll={handleClearAll}
        />
      </div>

      {/* Results Summary Count & Sorting Bar */}
      <ResultsCount
        count={filteredEvents.length}
        sortValue={sortOption}
        onSortChange={setSortOption}
        onOpenMobileFilter={() => setIsMobileFilterOpen(true)}
      />

      {/* Popular Featured Events Section (if no specific query active) */}
      {!searchQuery && selectedCategory === 'All' && selectedCollege === 'all' && popularFeaturedEvents.length > 0 && (
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-[#374375] tracking-tight">
              Popular {pageTitle}
            </h3>
            <span className="text-xs font-bold text-[#895159]">Top Nagpur Picks</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {popularFeaturedEvents.map(event => (
              <FeaturedEventCard
                key={event.id}
                event={event}
                onClick={(eObj) => onNavigate('events', eObj?.id || event.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Main Event Cards Grid */}
      {filteredEvents.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onClick={(eObj) => onNavigate('events', eObj?.id || event.id)}
            />
          ))}
        </motion.div>
      ) : (
        <EmptyState
          title="No events found"
          description="Try changing your search keywords or clearing some filters to see events."
          actionText="Clear All Filters"
          onAction={handleClearAll}
        />
      )}

      {/* Mobile Filter Drawer Modal */}
      <FilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        type={type}
        colleges={NAGPUR_COLLEGES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedCollege={selectedCollege}
        onSelectCollege={setSelectedCollege}
        selectedDateOption={selectedDateOption}
        onSelectDateOption={setSelectedDateOption}
        customDate={customDate}
        onChangeCustomDate={setCustomDate}
        selectedFeeOption={selectedFeeOption}
        onSelectFeeOption={setSelectedFeeOption}
        onClearAll={handleClearAll}
      />
    </div>
  )
}
