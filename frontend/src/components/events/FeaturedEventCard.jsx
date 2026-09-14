import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Sparkles, ArrowRight } from 'lucide-react'
import Badge from '../common/Badge'
import BookmarkButton from '../common/BookmarkButton'

export default function FeaturedEventCard({ event, onClick }) {
  if (!event) return null

  const isTechnical = event.type === 'technical'
  const isFree = event.isFree || event.registrationFee === 0

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick?.(event)}
      className="bg-[#FFFCF5] rounded-3xl border border-[#BABDE2] p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 items-stretch group cursor-pointer relative overflow-hidden"
    >
      {/* Banner image */}
      <div className="relative h-44 sm:h-auto sm:w-2/5 rounded-2xl overflow-hidden bg-[#BABDE2]/20 shrink-0">
        <img
          src={event.banner}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <Badge variant={isTechnical ? 'technical' : 'cultural'}>
            {event.category || 'Featured'}
          </Badge>
          <span className="px-2.5 py-0.5 rounded-full bg-[#895159] text-[#FFFCF5] text-[10px] font-black tracking-wider uppercase flex items-center gap-1 shadow-xs">
            <Sparkles className="w-3 h-3 text-[#DFAEA1]" /> Featured
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-bold text-[#895159] uppercase tracking-wider">
              {event.organizingCollege}
            </span>
            <BookmarkButton eventId={event.id} />
          </div>

          <h3 className="text-lg font-black text-[#374375] line-clamp-1 group-hover:text-[#895159] transition-colors">
            {event.title}
          </h3>

          <p className="text-xs text-[#374375]/80 mt-1.5 line-clamp-2 leading-relaxed font-medium">
            {event.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#BABDE2]/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs font-semibold text-[#374375]/80">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#895159]" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#374375]/60" />
              <span className="truncate max-w-[140px]">{event.location || event.venue}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto sm:ml-0">
            <span className="text-xs font-black text-[#374375] bg-[#BABDE2]/30 px-3 py-1 rounded-full">
              {isFree ? 'Free' : `₹${event.registrationFee}`}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClick?.(event)
              }}
              className="py-2 px-3.5 rounded-xl bg-[#374375] text-[#FFFCF5] font-bold text-xs hover:bg-[#895159] transition-colors flex items-center gap-1"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
