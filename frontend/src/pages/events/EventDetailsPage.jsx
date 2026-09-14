import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar, Clock, MapPin, Users, Ticket, ArrowLeft, Share2,
  CheckCircle2, Sparkles, Building2, HelpCircle, Award, Target
} from 'lucide-react'
import { useCampus } from '../../context/CampusContext'

import Breadcrumb from '../../components/common/Breadcrumb'
import Badge from '../../components/common/Badge'
import BookmarkButton from '../../components/common/BookmarkButton'
import EventCard from '../../components/common/EventCard'
import EventRegistrationCard from '../../components/events/EventRegistrationCard'
import MobileStickyCTA from '../../components/events/MobileStickyCTA'
import EnrollmentModal from '../../components/events/EnrollmentModal'
import ShareModal from '../../components/events/ShareModal'
import EmptyState from '../../components/common/EmptyState'

export default function EventDetailsPage({ eventId, mockEvent, onNavigate }) {
  const { allEvents, registeredEvents } = useCampus()
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  // Find event object from master dataset or use mockEvent during preview
  const targetEvent = useMemo(() => {
    if (mockEvent) return mockEvent
    if (!eventId) return allEvents[0]
    return allEvents.find(e => e.id === eventId) || allEvents.find(e => e.id.toLowerCase() === eventId.toLowerCase())
  }, [allEvents, eventId, mockEvent])

  // Check if current student is registered for this event
  const isRegistered = useMemo(() => {
    if (!targetEvent) return false
    return registeredEvents.some(r => r.eventId === targetEvent.id)
  }, [registeredEvents, targetEvent])

  // Related events (3 events from same category or type)
  const relatedEvents = useMemo(() => {
    if (!targetEvent) return []
    return allEvents
      .filter(e => e.id !== targetEvent.id && (e.type === targetEvent.type || e.category === targetEvent.category))
      .slice(0, 3)
  }, [allEvents, targetEvent])

  if (!targetEvent) {
    return (
      <div className="space-y-6 pb-12">
        <Breadcrumb items={[{ label: 'Event Details' }]} onNavigate={onNavigate} />
        <EmptyState
          title="Event Not Found"
          description="The event you're looking for may have been removed or is no longer available."
          actionText="Back to Events"
          onAction={() => onNavigate('technical')}
        />
      </div>
    )
  }

  const isTechnical = targetEvent.type === 'technical'
  const isFree = targetEvent.isFree || targetEvent.registrationFee === 0

  return (
    <div className="space-y-8 pb-20 lg:pb-12">
      {/* 1. Breadcrumb & Back Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Breadcrumb
          items={[
            { label: isTechnical ? 'Technical Events' : 'Cultural Events', onClick: () => onNavigate(isTechnical ? 'technical' : 'cultural') },
            { label: targetEvent.title }
          ]}
          onNavigate={onNavigate}
        />

        <button
          onClick={() => onNavigate(isTechnical ? 'technical' : 'cultural')}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-[#BABDE2]/30 text-[#374375] font-bold text-xs hover:bg-[#374375] hover:text-[#FFFCF5] transition-colors shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      {/* 2. Hero Header Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#FFFCF5] rounded-3xl border border-[#BABDE2] overflow-hidden shadow-sm relative group"
      >
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-[#BABDE2]/20">
          <img
            src={targetEvent.banner}
            alt={targetEvent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#374375]/90 via-[#374375]/40 to-transparent" />

          {/* Badges top left */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Badge variant={isTechnical ? 'technical' : 'cultural'}>
              {targetEvent.category || (isTechnical ? 'Technical' : 'Cultural')}
            </Badge>
            {targetEvent.popular && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#895159] text-[#FFFCF5] text-[10px] font-black tracking-wider uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#DFAEA1]" /> Featured
              </span>
            )}
          </div>

          {/* Action buttons top right */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="p-2.5 rounded-full bg-[#FFFCF5]/90 text-[#374375] hover:bg-[#BABDE2]/30 hover:text-[#895159] transition-all border border-[#BABDE2]/40 shadow-xs"
              aria-label="Share event"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <BookmarkButton eventId={targetEvent.id} />
          </div>

          {/* Overlay Content */}
          <div className="absolute bottom-6 left-6 right-6 text-[#FFFCF5]">
            <span className="text-xs font-bold text-[#DFAEA1] uppercase tracking-wider block mb-1">
              Organized by {targetEvent.organizingCollege}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[#FFFCF5]">
              {targetEvent.title}
            </h1>
            {targetEvent.tagline && (
              <p className="text-xs sm:text-sm text-[#FFFCF5]/80 font-medium mt-1 italic">
                "{targetEvent.tagline}"
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* 3. Quick Info Row / Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs font-bold text-[#374375]">
        <div className="p-3.5 rounded-2xl bg-[#FFFCF5] border border-[#BABDE2]/60 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#BABDE2]/30 text-[#374375] flex items-center justify-center shrink-0">
            <Calendar className="w-4.5 h-4.5 text-[#895159]" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-[#895159] uppercase block font-extrabold">Date</span>
            <span className="truncate block">{targetEvent.date}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#FFFCF5] border border-[#BABDE2]/60 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#BABDE2]/30 text-[#374375] flex items-center justify-center shrink-0">
            <Clock className="w-4.5 h-4.5 text-[#374375]" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-[#895159] uppercase block font-extrabold">Time</span>
            <span className="truncate block">{targetEvent.time || '10:00 AM'}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#FFFCF5] border border-[#BABDE2]/60 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#BABDE2]/30 text-[#374375] flex items-center justify-center shrink-0">
            <MapPin className="w-4.5 h-4.5 text-[#374375]" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-[#895159] uppercase block font-extrabold">Location</span>
            <span className="truncate block">{targetEvent.location || targetEvent.venue}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#FFFCF5] border border-[#BABDE2]/60 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#BABDE2]/30 text-[#374375] flex items-center justify-center shrink-0">
            <Ticket className="w-4.5 h-4.5 text-[#895159]" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-[#895159] uppercase block font-extrabold">Fee</span>
            <span className="truncate block">{isFree ? 'Free' : `₹${targetEvent.registrationFee}`}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#FFFCF5] border border-[#BABDE2]/60 flex items-center gap-3 col-span-2 sm:col-span-1">
          <div className="w-9 h-9 rounded-xl bg-[#BABDE2]/30 text-[#374375] flex items-center justify-center shrink-0">
            <Users className="w-4.5 h-4.5 text-[#374375]" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-[#895159] uppercase block font-extrabold">Seats Left</span>
            <span className="truncate block">{targetEvent.seatsAvailable ?? 45} available</span>
          </div>
        </div>
      </div>

      {/* 4. Main Two-Column Layout (Desktop: Left Content, Right Registration Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Event Detailed Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* About The Event */}
          <section className="bg-[#FFFCF5] rounded-3xl p-6 border border-[#BABDE2]/60 space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#374375] tracking-tight">
              About the Event
            </h2>
            <p className="text-xs sm:text-sm text-[#374375]/85 font-medium leading-relaxed">
              {targetEvent.description}
            </p>
          </section>

          {/* What To Expect */}
          {targetEvent.expectations && targetEvent.expectations.length > 0 && (
            <section className="bg-[#FFFCF5] rounded-3xl p-6 border border-[#BABDE2]/60 space-y-4">
              <h2 className="text-lg sm:text-xl font-black text-[#374375] tracking-tight">
                What to Expect
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {targetEvent.expectations.map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#BABDE2]/15 border border-[#BABDE2]/40 space-y-1">
                    <h3 className="text-xs font-black text-[#374375] flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-[#895159]" /> {exp.title}
                    </h3>
                    <p className="text-[11px] text-[#374375]/75 font-semibold leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}



          {/* Eligibility */}
          <section className="bg-[#FFFCF5] rounded-3xl p-6 border border-[#BABDE2]/60 space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#374375] tracking-tight flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#895159]" /> Who Can Participate?
            </h2>
            <div className="p-4 rounded-2xl bg-[#BABDE2]/20 text-xs font-bold text-[#374375]">
              {targetEvent.eligibility || 'Open to students from all colleges across Nagpur.'}
            </div>
          </section>

          {/* Organizer Info */}
          <section className="bg-[#FFFCF5] rounded-3xl p-6 border border-[#BABDE2]/60 space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#374375] tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#895159]" /> Organized By
            </h2>
            <div className="p-4 rounded-2xl bg-[#BABDE2]/15 border border-[#BABDE2]/40 flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#374375] text-[#FFFCF5] flex items-center justify-center font-black text-lg shrink-0">
                {targetEvent.organizingCollege ? targetEvent.organizingCollege.slice(0, 2) : 'CC'}
              </div>
              <div className="space-y-1 text-xs">
                <h3 className="font-black text-[#374375]">{targetEvent.organizer?.name || targetEvent.organizingCollege}</h3>
                <p className="text-[#374375]/75 font-semibold">{targetEvent.organizer?.description || 'College student-led society organizing campus events.'}</p>
                {targetEvent.organizer?.email && (
                  <p className="text-[11px] font-bold text-[#895159] pt-1">Contact: {targetEvent.organizer.email}</p>
                )}
              </div>
            </div>
          </section>

          {/* Venue & Location */}
          <section className="bg-[#FFFCF5] rounded-3xl p-6 border border-[#BABDE2]/60 space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#374375] tracking-tight flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#895159]" /> Venue & Address
            </h2>
            <div className="p-4 rounded-2xl bg-[#BABDE2]/15 border border-[#BABDE2]/40 space-y-1.5 text-xs font-semibold text-[#374375]">
              <p className="font-extrabold text-sm text-[#374375]">{targetEvent.venue}</p>
              <p className="text-[#374375]/75">{targetEvent.venueAddress || targetEvent.location}</p>
            </div>
          </section>
        </div>

        {/* Right Column (Desktop Registration Card) */}
        <div className="hidden lg:block">
          <EventRegistrationCard
            event={targetEvent}
            isRegistered={isRegistered}
            onEnroll={() => setIsEnrollModalOpen(true)}
            onViewMyEvent={() => onNavigate('profile')}
          />
        </div>
      </div>

      {/* 5. Related Events Section */}
      {relatedEvents.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-[#BABDE2]/30">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-[#374375] tracking-tight">
              You May Also Like
            </h2>
            <button
              onClick={() => onNavigate(isTechnical ? 'technical' : 'cultural')}
              className="text-xs font-extrabold text-[#895159] hover:underline"
            >
              Explore More Events →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedEvents.map(relEvent => (
              <EventCard
                key={relEvent.id}
                event={relEvent}
                onClick={() => onNavigate('events', relEvent.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 6. Mobile Sticky CTA Bar */}
      <MobileStickyCTA
        event={targetEvent}
        isRegistered={isRegistered}
        onEnroll={() => setIsEnrollModalOpen(true)}
        onViewMyEvent={() => onNavigate('profile')}
      />

      {/* 7. Enrollment & Share Modals */}
      <EnrollmentModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        event={targetEvent}
        onNavigate={onNavigate}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        event={targetEvent}
      />
    </div>
  )
}
