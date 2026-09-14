import React from 'react'
import { Bookmark } from 'lucide-react'
import { useCampus } from '../../context/CampusContext'

export default function BookmarkButton({ eventId, className = '' }) {
  const { savedEventIds, toggleSaveEvent } = useCampus()
  const isSaved = savedEventIds?.includes(eventId)

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        toggleSaveEvent(eventId)
      }}
      title={isSaved ? 'Remove from saved' : 'Save event'}
      aria-label={isSaved ? 'Remove from saved' : 'Save event'}
      className={`p-2.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#BABDE2] ${
        isSaved
          ? 'bg-[#895159] text-[#FFFCF5] shadow-sm scale-105'
          : 'bg-[#FFFCF5]/90 text-[#374375] hover:bg-[#BABDE2]/30 hover:text-[#895159] border border-[#BABDE2]/40'
      } ${className}`}
    >
      <Bookmark className={`w-4 h-4 transition-transform ${isSaved ? 'fill-current' : ''}`} />
    </button>
  )
}
