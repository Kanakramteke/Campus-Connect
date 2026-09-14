import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, ArrowUpRight } from 'lucide-react'
import Badge from './Badge'
import BookmarkButton from './BookmarkButton'

export default function EventCard({ event, onClick }) {
  if (!event) return null

  const isTechnical = event.type === 'technical'
  const badgeVariant = isTechnical ? 'technical' : 'cultural'
  const isFree = event.isFree || event.registrationFee === 0

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick?.(event)}
      className="bg-[#FFFCF5] rounded-3xl border border-[#BABDE2]/60 hover:border-[#BABDE2] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
    >
      <div>
        {/* Banner image container */}
        <div className="relative h-44 w-full overflow-hidden bg-[#BABDE2]/20">
          <img
            src={event.banner}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#374375]/60 via-transparent to-transparent opacity-60" />

          {/* Category badge on top left */}
          <div className="absolute top-3 left-3">
            <Badge variant={badgeVariant}>
              {event.category || (isTechnical ? 'Technical' : 'Cultural')}
            </Badge>
          </div>

          {/* Bookmark button on top right */}
          <div className="absolute top-3 right-3">
            <BookmarkButton eventId={event.id} />
          </div>

          {/* Fee tag bottom right */}
          <div className="absolute bottom-3 right-3 bg-[#FFFCF5]/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-[#374375] shadow-sm">
            {isFree ? 'Free' : `₹${event.registrationFee}`}
          </div>
        </div>

        {/* Content body */}
        <div className="p-5">
          <span className="text-[11px] font-bold tracking-wider text-[#895159] uppercase block mb-1">
            {event.organizingCollege}
          </span>
          <h3 className="text-lg font-black text-[#374375] line-clamp-1 group-hover:text-[#895159] transition-colors">
            {event.title}
          </h3>

          <div className="mt-4 space-y-2 text-xs font-medium text-[#374375]/80">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#895159] shrink-0" />
              <span className="truncate">{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#374375]/60 shrink-0" />
              <span className="truncate">{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#374375]/60 shrink-0" />
              <span className="truncate">{event.venue || event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card action footer */}
      <div className="p-5 pt-0">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClick?.(event)
          }}
          className="w-full py-2.5 px-4 rounded-2xl bg-[#BABDE2]/30 text-[#374375] font-bold text-xs hover:bg-[#374375] hover:text-[#FFFCF5] transition-colors flex items-center justify-center gap-1.5"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}
