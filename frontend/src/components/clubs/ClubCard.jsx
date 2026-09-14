import React from 'react'
import { Building2, Users, CheckCircle2, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCampus } from '../../context/CampusContext'

const ClubCard = ({ club, onNavigate }) => {
  const navigate = useNavigate()
  const { isClubJoined } = useCampus()

  if (!club) return null

  const joined = isClubJoined(club.id)

  const handleCardClick = () => {
    if (onNavigate) {
      onNavigate('club-details', club.id)
    } else {
      navigate(`/clubs/${club.id}`)
    }
  }

  const categoryStyles = {
    Technical: 'bg-[#374375]/10 text-[#374375] border-[#374375]/20',
    Cultural: 'bg-[#895159]/10 text-[#895159] border-[#895159]/20',
    Other: 'bg-[#DFAEA1]/40 text-[#374375] border-[#DFAEA1]/60'
  }

  const badgeStyle = categoryStyles[club.category] || categoryStyles.Technical

  return (
    <div
      onClick={handleCardClick}
      className="bg-[#FFFCF5] rounded-3xl border border-[#BABDE2]/60 hover:border-[#BABDE2] shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden p-6"
    >
      {/* Top Header Row */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          {/* Logo Avatar */}
          <div className="w-14 h-14 rounded-2xl bg-[#374375] text-[#FFFCF5] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0 overflow-hidden">
            {club.logo && (club.logo.startsWith('http') || club.logo.startsWith('/') || club.logo.startsWith('data:')) ? (
              <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
            ) : (
              <Building2 className="w-7 h-7 text-[#BABDE2]" />
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-col items-end gap-1.5">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${badgeStyle}`}>
              {club.subcategory || club.category}
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
            {club.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-[#895159] font-bold">
            <Building2 className="w-3.5 h-3.5 text-[#374375] shrink-0" />
            <span className="truncate">{club.college}</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-[#374375]/80 font-medium line-clamp-2 leading-relaxed">
          {club.shortDescription || club.description}
        </p>
      </div>

      {/* Card Footer: Members Count & CTA */}
      <div className="pt-4 mt-4 border-t border-[#BABDE2]/30 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#374375]">
          <Users className="w-4 h-4 text-[#895159]" />
          <span>{club.membersCount || club.stats?.members || 120} Members</span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleCardClick()
          }}
          className="py-2.5 px-4 rounded-xl bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <span>View Club</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

export default ClubCard
