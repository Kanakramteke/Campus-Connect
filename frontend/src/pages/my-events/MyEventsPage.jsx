import React, { useState, useMemo } from 'react'
import { useCampus } from '../../context/CampusContext'
import MyEventsTabs from '../../components/my-events/MyEventsTabs'
import MyEventsSearch from '../../components/my-events/MyEventsSearch'
import RegisteredEventCard from '../../components/my-events/RegisteredEventCard'
import RegistrationPassModal from '../../components/my-events/RegistrationPassModal'
import MyEventsEmptyState from '../../components/my-events/MyEventsEmptyState'
import { Ticket, Sparkles, Filter } from 'lucide-react'

const MyEventsPage = () => {
  const { registeredEvents, allEvents } = useCampus()

  const [activeTab, setActiveTab] = useState('upcoming')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('soonest')

  // Selected Pass Modal State
  const [selectedPass, setSelectedPass] = useState(null) // { registration, event }

  // Map registered events to full event objects
  const enrichedRegistrations = useMemo(() => {
    return registeredEvents
      .map((reg) => {
        const event = allEvents.find((e) => e.id === reg.eventId)
        return {
          registration: reg,
          event
        }
      })
      .filter((item) => item.event !== undefined)
  }, [registeredEvents, allEvents])

  // Extract unique categories for filter
  const categories = useMemo(() => {
    const set = new Set()
    enrichedRegistrations.forEach((item) => {
      if (item.event?.category) set.add(item.event.category)
    })
    return Array.from(set)
  }, [enrichedRegistrations])

  // Filter & Separate by Tab, Search & Category
  const filteredRegistrations = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return enrichedRegistrations.filter(({ registration, event }) => {
      const eventDate = new Date(event.date)
      const isUpcoming = eventDate >= today
      const isPast = eventDate < today

      // 1. Tab Filter
      if (activeTab === 'upcoming' && !isUpcoming) return false
      if (activeTab === 'past' && !isPast) return false

      // 2. Category Filter
      if (selectedCategory !== 'all' && event.category !== selectedCategory) {
        return false
      }

      // 3. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const titleMatch = event.title.toLowerCase().includes(q)
        const collegeMatch = event.organizingCollege.toLowerCase().includes(q)
        const venueMatch = (event.venue || '').toLowerCase().includes(q)
        const catMatch = (event.category || '').toLowerCase().includes(q)
        if (!titleMatch && !collegeMatch && !venueMatch && !catMatch) {
          return false
        }
      }

      return true
    })
  }, [enrichedRegistrations, activeTab, selectedCategory, searchQuery])

  // Sort Filtered Registrations
  const sortedRegistrations = useMemo(() => {
    return [...filteredRegistrations].sort((a, b) => {
      if (sortBy === 'soonest') {
        return new Date(a.event.date) - new Date(b.event.date)
      }
      if (sortBy === 'latest') {
        return new Date(b.event.date) - new Date(a.event.date)
      }
      if (sortBy === 'alphabetical') {
        return a.event.title.localeCompare(b.event.title)
      }
      return 0
    })
  }, [filteredRegistrations, sortBy])

  // Tab Counts
  const tabCounts = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let upcoming = 0
    let past = 0

    enrichedRegistrations.forEach(({ event }) => {
      if (new Date(event.date) >= today) upcoming++
      else past++
    })

    return {
      upcoming,
      past,
      all: enrichedRegistrations.length
    }
  }, [enrichedRegistrations])

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-[#BABDE2]/30 text-[#374375]">
              <Ticket className="w-5 h-5" />
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#895159]">
              Student Dashboard Hub
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#374375] tracking-tight">
            My Enrolled Events
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Keep track of the events you've registered for across Nagpur campuses.
          </p>
        </div>

        {/* Tab Switcher */}
        <MyEventsTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={tabCounts}
        />
      </div>

      {/* Search & Filtering Bar */}
      <MyEventsSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        categories={categories}
      />

      {/* Main Content Grid or Empty State */}
      {sortedRegistrations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {sortedRegistrations.map(({ registration, event }) => (
            <RegisteredEventCard
              key={registration.registrationId}
              registration={registration}
              event={event}
              onViewPass={(reg, ev) => setSelectedPass({ registration: reg, event: ev })}
            />
          ))}
        </div>
      ) : (
        <MyEventsEmptyState type={activeTab} />
      )}

      {/* Digital Registration Pass Modal */}
      {selectedPass && (
        <RegistrationPassModal
          isOpen={!!selectedPass}
          onClose={() => setSelectedPass(null)}
          registration={selectedPass.registration}
          event={selectedPass.event}
        />
      )}
    </div>
  )
}

export default MyEventsPage
