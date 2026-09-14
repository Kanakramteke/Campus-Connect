import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Sparkles, Award, Flame } from 'lucide-react'
import { useCampus } from '../../context/CampusContext'

import SectionHeader from '../../components/common/SectionHeader'
import DiscoveryCard from '../../components/common/DiscoveryCard'
import EventCard from '../../components/common/EventCard'
import EnrolledEventCard from '../../components/common/EnrolledEventCard'
import ClubCard from '../../components/clubs/ClubCard'
import CommunityCard from '../../components/communities/CommunityCard'
import EmptyState from '../../components/common/EmptyState'

export default function CampusDashboard({ onNavigate }) {
  const { user, allEvents, registeredEvents, allClubs, joinedClubIds, allCommunities } = useCampus()

  // Student name resolution
  const studentName = user?.fullName || 'Student'

  // Upcoming events (top 4)
  const upcomingEvents = allEvents.slice(0, 4)

  // Enrolled events mapped to full event objects
  const enrolledList = registeredEvents.map(reg => {
    const matchedEvent = allEvents.find(e => e.id === reg.eventId)
    return { ...reg, ...(matchedEvent || {}) }
  })

  // Filter joined clubs
  const userClubs = allClubs.filter(c => joinedClubIds.includes(c.id))

  // Communities to display (top 3)
  const featuredCommunities = allCommunities.slice(0, 3)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12 pb-12"
    >
      {/* 1. WELCOME SECTION */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-[#FFFCF5] via-[#FFFCF5] to-[#BABDE2]/25 p-6 sm:p-8 rounded-3xl border border-[#BABDE2]/60 shadow-sm relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BABDE2]/30 text-[#374375] text-xs font-extrabold">
            <Sparkles className="w-3.5 h-3.5 text-[#895159]" />
            <span>Nagpur Cross-College Platform</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#374375] tracking-tight">
            Welcome back, <span className="text-[#895159]">{studentName}</span> 👋
          </h1>
          <p className="text-sm sm:text-base font-semibold text-[#374375]/80">
            Discover, join, or host events, clubs, and communities across Nagpur.
          </p>
        </div>
      </motion.div>

      {/* 2 & 3. PRIMARY DISCOVERY SECTION (TECHNICAL / CULTURAL / CLUBS / COMMUNITIES) */}
      <motion.section variants={itemVariants} className="space-y-4">
        <SectionHeader
          title="What are you looking for?"
          subtitle="Explore events, clubs and communities across Nagpur."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <DiscoveryCard
            id="technical"
            title="Technical"
            description="Discover hackathons, coding competitions, workshops and other technical events."
            buttonText="Explore Technical"
            variant="technical"
            onClick={() => onNavigate('technical')}
          />
          <DiscoveryCard
            id="cultural"
            title="Cultural"
            description="Explore fests, dance, music, art, drama and cultural activities."
            buttonText="Explore Cultural"
            variant="cultural"
            onClick={() => onNavigate('cultural')}
          />
          <DiscoveryCard
            id="clubs"
            title="Clubs"
            description="Discover technical and cultural clubs from colleges across Nagpur."
            buttonText="Explore Clubs"
            variant="clubs"
            onClick={() => onNavigate('clubs')}
          />
          <DiscoveryCard
            id="communities"
            title="Communities"
            description="Connect with students who share your interests."
            buttonText="Explore Communities"
            variant="communities"
            onClick={() => onNavigate('communities')}
          />
        </div>
      </motion.section>

      {/* 4. UPCOMING EVENTS */}
      <motion.section variants={itemVariants} className="space-y-4">
        <SectionHeader
          title="Upcoming Events"
          subtitle="Don't miss what's happening around Nagpur."
          onViewAll={() => onNavigate('technical')}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {upcomingEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onClick={(eObj) => onNavigate('events', eObj?.id || event.id)}
            />
          ))}
        </div>
      </motion.section>

      {/* 5. MY ENROLLED EVENTS */}
      <motion.section variants={itemVariants} className="space-y-4">
        <SectionHeader
          title="My Enrolled Events"
          subtitle="Keep track of the events you've registered for."
          onViewAll={() => onNavigate('my-events')}
        />
        {enrolledList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {enrolledList.slice(0, 3).map((item, idx) => (
              <EnrolledEventCard
                key={item.eventId || idx}
                enrollment={item}
                onClick={() => onNavigate('my-events')}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="You haven't enrolled in any events yet."
            description="Explore upcoming technical and cultural events around Nagpur colleges."
            actionText="Explore Events"
            onAction={() => onNavigate('technical')}
          />
        )}
      </motion.section>

      {/* 6. MY CLUBS */}
      <motion.section variants={itemVariants} className="space-y-4">
        <SectionHeader
          title="My Clubs"
          subtitle="Clubs you're currently part of."
          onViewAll={() => onNavigate('clubs')}
        />
        {userClubs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {userClubs.map(club => (
              <ClubCard
                key={club.id}
                club={club}
                onClick={() => onNavigate('club-details', club.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="You haven't joined any clubs yet."
            description="Discover technical, cultural and interest-based student clubs across Nagpur colleges."
            actionText="Explore Clubs"
            onAction={() => onNavigate('clubs')}
          />
        )}
      </motion.section>

      {/* 7. COMMUNITIES FOR YOU */}
      <motion.section variants={itemVariants} className="space-y-4">
        <SectionHeader
          title="Communities for You"
          subtitle="Connect with students who share your interests."
          onViewAll={() => onNavigate('communities')}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {featuredCommunities.map(community => (
            <CommunityCard
              key={community.id}
              community={community}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </motion.section>

      {/* 8. TRENDING ACROSS NAGPUR */}
      <motion.section variants={itemVariants} className="space-y-4">
        <SectionHeader
          title="Trending Across Nagpur"
          subtitle="Popular activities getting the most student engagement."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-[#FFFCF5] p-5 rounded-3xl border border-[#BABDE2]/60 flex items-center gap-4 hover:shadow-xs transition-shadow">
            <div className="w-11 h-11 rounded-2xl bg-[#BABDE2]/40 text-[#374375] flex items-center justify-center shrink-0 font-bold">
              <Flame className="w-5 h-5 text-[#895159]" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#895159]">
                Most Registered
              </span>
              <h4 className="text-sm font-black text-[#374375] truncate">
                TechNova Hackathon 2026
              </h4>
              <p className="text-xs text-[#374375]/70 font-semibold">VNIT Nagpur</p>
            </div>
          </div>

          <div className="bg-[#FFFCF5] p-5 rounded-3xl border border-[#BABDE2]/60 flex items-center gap-4 hover:shadow-xs transition-shadow">
            <div className="w-11 h-11 rounded-2xl bg-[#DFAEA1]/40 text-[#895159] flex items-center justify-center shrink-0 font-bold">
              <TrendingUp className="w-5 h-5 text-[#374375]" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#895159]">
                Growing Community
              </span>
              <h4 className="text-sm font-black text-[#374375] truncate">
                AI & ML Community
              </h4>
              <p className="text-xs text-[#374375]/70 font-semibold">1,250+ Nagpur Members</p>
            </div>
          </div>

          <div className="bg-[#FFFCF5] p-5 rounded-3xl border border-[#BABDE2]/60 flex items-center gap-4 hover:shadow-xs transition-shadow">
            <div className="w-11 h-11 rounded-2xl bg-[#BABDE2]/40 text-[#374375] flex items-center justify-center shrink-0 font-bold">
              <Award className="w-5 h-5 text-[#374375]" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#895159]">
                Popular Club
              </span>
              <h4 className="text-sm font-black text-[#374375] truncate">
                RCOEM Developers Circle
              </h4>
              <p className="text-xs text-[#374375]/70 font-semibold">420+ Active Coders</p>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  )
}
