import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  GraduationCap, 
  BookOpen, 
  MapPin, 
  Sparkles, 
  Edit3, 
  Ticket, 
  Users, 
  MessageSquare, 
  Bookmark,
  ShieldCheck,
  Camera
} from 'lucide-react'
import { useCampus } from '../../context/CampusContext'
import EditProfileModal from '../../components/profile/EditProfileModal'
import EditInterestsModal from '../../components/profile/EditInterestsModal'

export default function ProfilePage({ onNavigate }) {
  const { 
    user, 
    registeredEvents, 
    joinedClubIds, 
    joinedCommunityIds, 
    savedEventIds 
  } = useCampus()

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [isEditInterestsOpen, setIsEditInterestsOpen] = useState(false)

  const studentName = user?.fullName || 'Student'
  const initials = studentName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

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
      className="space-y-8 pb-16 max-w-5xl mx-auto"
    >
      {/* 1. HERO PROFILE CARD */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-[#FFFCF5] via-[#FFFCF5] to-[#BABDE2]/25 rounded-3xl border border-[#BABDE2]/60 p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative group shrink-0">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={studentName}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#374375] shadow-md bg-white object-cover"
                />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#374375] to-[#895159] text-[#FFFCF5] flex items-center justify-center font-black text-2xl shadow-md border-4 border-[#FFFCF5]">
                  {initials}
                </div>
              )}
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="absolute bottom-1 right-1 p-2 rounded-full bg-[#374375] text-[#FFFCF5] hover:bg-[#895159] transition-colors shadow-md cursor-pointer"
                title="Update avatar"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Profile Core Info */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-[#374375] tracking-tight">
                  {studentName}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Student
                </span>
              </div>

              <p className="text-xs sm:text-sm font-bold text-[#895159] flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#374375]" />
                <span>{user?.college || 'VNIT Nagpur'}{user?.department ? ` • ${user.department}` : ''}</span>
              </p>

              <p className="text-xs text-[#374375]/75 font-semibold flex items-center gap-3 flex-wrap pt-0.5">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#895159]" /> {user?.email}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#374375]" /> {user?.city || 'Nagpur'}
                </span>
              </p>

              {user?.bio && (
                <p className="text-xs sm:text-sm text-[#374375]/80 font-medium pt-2 max-w-xl line-clamp-2 leading-relaxed">
                  "{user.bio}"
                </p>
              )}
            </div>
          </div>

          {/* Primary Edit Action */}
          <div className="shrink-0 self-start md:self-center">
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="py-2.5 px-5 rounded-2xl bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs transition-all duration-200 flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 2. ACTIVITY SUMMARY CARDS (DERIVED LIVE DATA) */}
      <motion.section variants={itemVariants} className="space-y-4">
        <h3 className="text-lg font-black text-[#374375]">My Campus Connect Activity</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Enrolled Events */}
          <div
            onClick={() => onNavigate('my-events')}
            className="bg-[#FFFCF5] rounded-3xl p-5 border border-[#BABDE2]/60 hover:border-[#BABDE2] shadow-2xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#374375]/10 text-[#374375] flex items-center justify-center font-bold">
                <Ticket className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-[#374375] group-hover:text-[#895159] transition-colors">
                {registeredEvents.length}
              </span>
            </div>
            <h4 className="text-sm font-black text-[#374375]">Enrolled Events</h4>
            <p className="text-xs text-[#374375]/70 font-semibold mt-0.5">Active event registrations & passes</p>
          </div>

          {/* Clubs Joined */}
          <div
            onClick={() => onNavigate('clubs')}
            className="bg-[#FFFCF5] rounded-3xl p-5 border border-[#BABDE2]/60 hover:border-[#BABDE2] shadow-2xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#895159]/10 text-[#895159] flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-[#374375] group-hover:text-[#895159] transition-colors">
                {joinedClubIds.length}
              </span>
            </div>
            <h4 className="text-sm font-black text-[#374375]">Clubs Joined</h4>
            <p className="text-xs text-[#374375]/70 font-semibold mt-0.5">Student clubs & societies in Nagpur</p>
          </div>

          {/* Communities Joined */}
          <div
            onClick={() => onNavigate('communities')}
            className="bg-[#FFFCF5] rounded-3xl p-5 border border-[#BABDE2]/60 hover:border-[#BABDE2] shadow-2xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#DFAEA1]/40 text-[#374375] flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-[#374375] group-hover:text-[#895159] transition-colors">
                {joinedCommunityIds.length}
              </span>
            </div>
            <h4 className="text-sm font-black text-[#374375]">Communities</h4>
            <p className="text-xs text-[#374375]/70 font-semibold mt-0.5">Inter-college discussion groups</p>
          </div>

          {/* Saved Events */}
          <div
            onClick={() => onNavigate('technical')}
            className="bg-[#FFFCF5] rounded-3xl p-5 border border-[#BABDE2]/60 hover:border-[#BABDE2] shadow-2xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#BABDE2]/40 text-[#374375] flex items-center justify-center font-bold">
                <Bookmark className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-[#374375] group-hover:text-[#895159] transition-colors">
                {savedEventIds.length}
              </span>
            </div>
            <h4 className="text-sm font-black text-[#374375]">Saved Events</h4>
            <p className="text-xs text-[#374375]/70 font-semibold mt-0.5">Bookmarked event listings</p>
          </div>
        </div>
      </motion.section>

      {/* 3. PERSONAL DETAILS & INTERESTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Details Card */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-[#FFFCF5] rounded-3xl border border-[#BABDE2]/60 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#BABDE2]/30 pb-4">
            <h3 className="text-lg font-black text-[#374375]">Personal & Campus Details</h3>
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="text-xs font-bold text-[#895159] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Details
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-[#374375]/60 uppercase tracking-wider block">Full Name</span>
              <span className="font-extrabold text-[#374375]">{studentName}</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-extrabold text-[#374375]/60 uppercase tracking-wider block">Email Address</span>
              <span className="font-extrabold text-[#374375]">{user?.email}</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-extrabold text-[#374375]/60 uppercase tracking-wider block">Phone Number</span>
              <span className="font-extrabold text-[#374375]">{user?.phone || '+91 98765 43210'}</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-extrabold text-[#374375]/60 uppercase tracking-wider block">College</span>
              <span className="font-extrabold text-[#374375]">{user?.college || 'VNIT Nagpur'}</span>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <span className="text-xs font-extrabold text-[#374375]/60 uppercase tracking-wider block">Department</span>
              <span className="font-extrabold text-[#374375]">{user?.department || 'Computer Science & Engineering'}</span>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <span className="text-xs font-extrabold text-[#374375]/60 uppercase tracking-wider block">City</span>
              <span className="font-extrabold text-[#374375]">{user?.city || 'Nagpur'}</span>
            </div>
          </div>
        </motion.div>

        {/* Interests Card */}
        <motion.div variants={itemVariants} className="bg-[#FFFCF5] rounded-3xl border border-[#BABDE2]/60 p-6 shadow-xs space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#BABDE2]/30 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#895159]" />
                <h3 className="text-lg font-black text-[#374375]">My Interests</h3>
              </div>
              <button
                onClick={() => setIsEditInterestsOpen(true)}
                className="text-xs font-bold text-[#895159] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
            </div>

            <p className="text-xs text-[#374375]/75 font-semibold mb-4">
              Your selected topics help tailor your Nagpur campus event and community recommendations.
            </p>

            <div className="flex flex-wrap gap-2">
              {user?.interests?.length > 0 ? (
                user.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-2xl bg-[#BABDE2]/30 text-[#374375] font-extrabold text-xs border border-[#BABDE2]"
                  >
                    #{interest}
                  </span>
                ))
              ) : (
                <p className="text-xs text-[#374375]/60 italic font-semibold">No interests selected yet.</p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-[#BABDE2]/30">
            <button
              onClick={() => setIsEditInterestsOpen(true)}
              className="w-full py-2.5 px-4 rounded-2xl bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <span>Manage Interests ({user?.interests?.length || 0})</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />

      <EditInterestsModal
        isOpen={isEditInterestsOpen}
        onClose={() => setIsEditInterestsOpen(false)}
      />
    </motion.div>
  )
}