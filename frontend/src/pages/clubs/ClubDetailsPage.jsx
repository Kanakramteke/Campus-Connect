import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCampus } from '../../context/CampusContext'
import EventCard from '../../components/common/EventCard'
import JoinClubModal from '../../components/clubs/JoinClubModal'
import ClubShareModal from '../../components/clubs/ClubShareModal'
import {
  Building2, Users, Calendar, Award, Share2, CheckCircle2,
  ArrowLeft, Cpu, Bot, Zap, BookOpen, Code, Terminal, Laptop,
  Shield, Lock, Sparkles, Flame, Music, Radio, Film, Camera,
  Video, Briefcase, TrendingUp, UserCheck
} from 'lucide-react'

// Icon mapping helper
const iconMap = {
  Cpu, Bot, Zap, BookOpen, Code, Terminal, Laptop, Shield, Lock,
  Sparkles, Award, Flame, Music, Radio, Film, Camera, Video,
  Briefcase, TrendingUp, Users
}

const ClubDetailsPage = ({ clubId: propClubId, mockClub, onNavigate }) => {
  const { id: paramId } = useParams()
  const navigate = useNavigate()
  const { allClubs, allEvents, isClubJoined, joinClub, leaveClub } = useCampus()

  const id = paramId || propClubId

  const [club, setClub] = useState(mockClub || null)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [modalAction, setModalAction] = useState('join')
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  useEffect(() => {
    if (mockClub) {
      setClub(mockClub)
      return
    }
    const found = allClubs.find((c) => c.id === id)
    if (found) {
      setClub(found)
    }
  }, [id, allClubs, mockClub])

  if (!club) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <Building2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-[#374375]">Club Not Found</h2>
        <p className="text-slate-500">The requested club page could not be found.</p>
        <button
          onClick={() => (onNavigate ? onNavigate('clubs') : navigate('/clubs'))}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#374375] text-white font-semibold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Clubs
        </button>
      </div>
    )
  }

  const joined = isClubJoined(club.id)

  // Associated Upcoming Events
  const upcomingEvents = allEvents.filter(
    (e) => (club.upcomingEventIds || []).includes(e.id) || e.collegeId === club.collegeId
  ).slice(0, 3)

  const handleOpenJoinModal = (act) => {
    setModalAction(act)
    setIsJoinModalOpen(true)
  }

  const handleConfirmMembership = () => {
    if (modalAction === 'join') {
      joinClub(club.id)
    } else {
      leaveClub(club.id)
    }
    setIsJoinModalOpen(false)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* 1. Top Back Navigation */}
      <button
        onClick={() => (onNavigate ? onNavigate('clubs') : navigate('/clubs'))}
        className="inline-flex items-center gap-2 text-sm font-bold text-[#374375] hover:text-[#895159] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Clubs
      </button>

      {/* 2. CLUB HERO SECTION */}
      <div className="relative bg-[#FFFCF5] rounded-3xl border border-[#BABDE2] overflow-hidden shadow-sm">
        {/* Banner Graphic background */}
        <div className="h-44 sm:h-56 bg-slate-200 relative overflow-hidden">
          {club.banner ? (
            <img
              src={club.banner}
              alt={club.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-[#374375] via-[#895159] to-[#BABDE2]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFCF5] via-transparent to-black/20" />
        </div>

        {/* Hero Content */}
        <div className="p-6 sm:p-8 pt-0 relative -mt-16 sm:-mt-20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            
            {/* Logo & Title Header */}
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#374375] text-white flex items-center justify-center border-4 border-[#FFFCF5] shadow-lg shrink-0 overflow-hidden">
                {club.logo && (club.logo.startsWith('http') || club.logo.startsWith('/') || club.logo.startsWith('data:')) ? (
                  <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-12 h-12 text-[#BABDE2]" />
                )}
              </div>

              <div className="space-y-1 pb-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#374375]/10 text-[#374375] border border-[#374375]/20">
                    {club.subcategory || club.category} Club
                  </span>
                  {joined && (
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Joined Member
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-[#374375] tracking-tight">
                  {club.name}
                </h1>
                <div className="flex items-center gap-2 text-xs font-bold text-[#895159]">
                  <Building2 className="w-4 h-4 text-[#374375]" />
                  <span>{club.college}</span>
                  <span>•</span>
                  <Users className="w-4 h-4 text-[#374375]" />
                  <span>{club.stats?.members || club.membersCount} Active Members</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 shrink-0">
              <button
                type="button"
                onClick={() => setIsShareModalOpen(true)}
                className="p-3 rounded-2xl bg-white border border-[#BABDE2] text-[#374375] hover:bg-[#BABDE2]/20 transition-all cursor-pointer shadow-xs"
                aria-label="Share club"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {joined ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled
                    className="py-3 px-5 rounded-2xl bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm cursor-default"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Member</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenJoinModal('leave')}
                    className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 font-bold text-xs transition-colors cursor-pointer border border-slate-200"
                  >
                    Leave
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleOpenJoinModal('join')}
                  className="py-3.5 px-6 rounded-2xl bg-[#374375] hover:bg-[#895159] text-white font-black text-xs transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Join Club</span>
                </button>
              )}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#374375]/85 font-medium leading-relaxed max-w-3xl pt-2">
            {club.shortDescription}
          </p>
        </div>
      </div>

      {/* 3. MAIN CONTENT GRID (2 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: About, Activities, Leadership (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* About Section */}
          <section className="bg-[#FFFCF5] rounded-3xl p-6 sm:p-8 border border-[#BABDE2]/60 space-y-3 shadow-xs">
            <h2 className="text-lg sm:text-xl font-black text-[#374375] tracking-tight">
              About the Club
            </h2>
            <p className="text-xs sm:text-sm text-[#374375]/85 font-medium leading-relaxed">
              {club.description}
            </p>
          </section>

          {/* Activities ("What We Do") */}
          {club.activities && club.activities.length > 0 && (
            <section className="bg-[#FFFCF5] rounded-3xl p-6 sm:p-8 border border-[#BABDE2]/60 space-y-4 shadow-xs">
              <h2 className="text-lg sm:text-xl font-black text-[#374375] tracking-tight">
                What We Do
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {club.activities.map((act, idx) => {
                  const IconComp = iconMap[act.icon] || Sparkles
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#BABDE2]/15 border border-[#BABDE2]/40 space-y-2"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#374375] text-[#FFFCF5] flex items-center justify-center">
                        <IconComp className="w-4 h-4 text-[#DFAEA1]" />
                      </div>
                      <h3 className="text-xs font-black text-[#374375]">
                        {act.title}
                      </h3>
                      <p className="text-[11px] text-[#374375]/75 font-semibold leading-relaxed">
                        {act.desc}
                      </p>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* Upcoming Club Events */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-[#374375] tracking-tight">
                Upcoming Club Events
              </h2>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {upcomingEvents.map((ev) => (
                  <EventCard
                    key={ev.id}
                    event={ev}
                    onClick={() => (onNavigate ? onNavigate('events', ev.id) : navigate(`/events/${ev.id}`))}
                  />
                ))}
              </div>
            ) : (
              <div className="p-6 bg-[#FFFCF5] rounded-3xl border border-[#BABDE2]/60 text-center text-xs text-slate-500 font-medium">
                No upcoming events scheduled at this moment. Stay tuned for updates!
              </div>
            )}
          </section>

          {/* Past Events */}
          {club.pastEvents && club.pastEvents.length > 0 && (
            <section className="bg-[#FFFCF5] rounded-3xl p-6 sm:p-8 border border-[#BABDE2]/60 space-y-4 shadow-xs">
              <h2 className="text-lg sm:text-xl font-black text-[#374375] tracking-tight">
                Past Club Highlights
              </h2>
              <div className="space-y-3">
                {club.pastEvents.map((pe, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-[#374375]">{pe.title}</h4>
                      <span className="text-[11px] text-slate-500 font-medium">{pe.venue}</span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-[#895159] bg-[#BABDE2]/30 px-2.5 py-1 rounded-lg">
                      {pe.date}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN: Stats & Leadership (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Club Stats Box */}
          <div className="bg-[#FFFCF5] rounded-3xl p-6 border border-[#BABDE2]/60 space-y-4 shadow-xs">
            <h3 className="font-black text-[#374375] text-base border-b border-[#BABDE2]/30 pb-3">
              Club Overview
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-[#895159] block">Total Members</span>
                <span className="text-lg font-black text-[#374375]">{club.stats?.members || club.membersCount}</span>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-[#895159] block">Events Hosted</span>
                <span className="text-lg font-black text-[#374375]">{club.stats?.eventsHosted || 12}+</span>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-[#895159] block">Active Since</span>
                <span className="text-lg font-black text-[#374375]">{club.establishedYear || '2021'}</span>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-[#895159] block">College</span>
                <span className="text-xs font-bold text-[#374375] truncate block">{club.college}</span>
              </div>
            </div>
          </div>

          {/* Leadership / Team Cards */}
          {club.team && club.team.length > 0 && (
            <div className="bg-[#FFFCF5] rounded-3xl p-6 border border-[#BABDE2]/60 space-y-4 shadow-xs">
              <h3 className="font-black text-[#374375] text-base border-b border-[#BABDE2]/30 pb-3">
                Club Leadership
              </h3>
              <div className="space-y-3">
                {club.team.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-xl bg-slate-100 object-cover shrink-0"
                    />
                    <div className="min-w-0 text-xs">
                      <h4 className="font-bold text-[#374375] truncate">{member.name}</h4>
                      <span className="text-[11px] text-[#895159] font-extrabold block">{member.role}</span>
                      <span className="text-[10px] text-slate-400 font-medium block">{member.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <JoinClubModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        club={club}
        action={modalAction}
        onConfirm={handleConfirmMembership}
      />

      <ClubShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        club={club}
      />
    </div>
  )
}

export default ClubDetailsPage
