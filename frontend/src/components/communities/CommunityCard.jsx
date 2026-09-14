import React from 'react'
import { Building2, Users, CheckCircle2, ArrowRight, Activity, MessageSquare, Globe } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCampus } from '../../context/CampusContext'

const CommunityCard = ({ community, onNavigate }) => {
  const navigate = useNavigate()
  const { isCommunityJoined } = useCampus()

  if (!community) return null

  const joined = isCommunityJoined(community.id)

  const handleCardClick = () => {
    if (onNavigate) {
      onNavigate('community-details', community.id)
    } else {
      navigate(`/communities/${community.id}`)
    }
  }

  // Category Accent styling
  const categoryStyles = {
    Technology: 'bg-[#374375]/10 text-[#374375] border-[#374375]/20',
    Coding: 'bg-[#374375]/10 text-[#374375] border-[#374375]/20',
    'AI & ML': 'bg-[#374375]/10 text-[#374375] border-[#374375]/20',
    Entrepreneurship: 'bg-[#895159]/10 text-[#895159] border-[#895159]/20',
    Design: 'bg-[#DFAEA1]/40 text-[#374375] border-[#DFAEA1]/60',
    Music: 'bg-[#895159]/10 text-[#895159] border-[#895159]/20',
    Gaming: 'bg-[#374375]/10 text-[#374375] border-[#374375]/20',
    Sports: 'bg-[#DFAEA1]/40 text-[#374375] border-[#DFAEA1]/60',
    Academic: 'bg-[#374375]/10 text-[#374375] border-[#374375]/20',
    Literature: 'bg-[#895159]/10 text-[#895159] border-[#895159]/20'
  }

  const badgeStyle = categoryStyles[community.category] || categoryStyles.Technology

  return (
    <div
      onClick={handleCardClick}
      className="bg-[#FFFCF5] rounded-3xl border border-[#BABDE2]/60 hover:border-[#BABDE2] shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden p-6"
    >
      {/* Top Header Row */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          {/* Logo / Avatar */}
          <div className="w-14 h-14 rounded-2xl bg-[#374375] text-[#FFFCF5] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0 overflow-hidden">
            {community.logo && (community.logo.startsWith('http') || community.logo.startsWith('/') || community.logo.startsWith('data:')) ? (
              <img src={community.logo} alt={community.name} className="w-full h-full object-cover" />
            ) : (
              <Globe className="w-7 h-7 text-[#BABDE2]" />
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-col items-end gap-1.5">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${badgeStyle}`}>
              {community.subcategory || community.category}
            </span>
            {joined && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Member
              </span>
            )}
          </div>
        </div>

        {/* Title & College */}
        <div className="space-y-1">
          <h3 className="text-lg font-black text-[#374375] group-hover:text-[#895159] transition-colors leading-snug line-clamp-1">
            {community.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-[#895159] font-bold">
            <Building2 className="w-3.5 h-3.5 text-[#374375] shrink-0" />
            <span className="truncate">{community.college}</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-[#374375]/80 font-medium line-clamp-2 leading-relaxed">
          {community.shortDescription || community.description}
        </p>

        {/* Activity Indicator / Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {community.interests?.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-[10px] font-semibold text-[#374375]/75 bg-[#BABDE2]/20 px-2 py-0.5 rounded-md">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Members & Action */}
      <div className="pt-4 mt-4 border-t border-[#BABDE2]/30 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs font-bold text-[#374375]">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4 text-[#895159]" />
            {community.memberCount || 100}
          </span>
          <span className="flex items-center gap-1 text-slate-500 font-semibold text-[11px]">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            {community.activityStatus || 'Active'}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleCardClick()
          }}
          className="py-2.5 px-4 rounded-xl bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <span>View Community</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

export default CommunityCard
