import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, CheckCircle2, ArrowRight } from 'lucide-react'
import Badge from './Badge'

export default function EnrolledEventCard({ enrollment, event, onClick }) {
  if (!enrollment && !event) return null
  const displayEvent = event || enrollment

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick?.(displayEvent)}
      className="bg-[#FFFCF5] rounded-3xl p-5 border border-[#BABDE2]/60 hover:border-[#BABDE2] shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
    >
      <div>
        <div className="flex items-center justify-between mb-3 gap-2">
          <Badge variant="registered" className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#374375]" />
            <span>{enrollment?.status || 'Registered'}</span>
          </Badge>
          <span className="text-[10px] font-mono text-[#374375]/60 bg-[#BABDE2]/20 px-2 py-0.5 rounded-full">
            {enrollment?.registrationId || 'CC-REG-2026'}
          </span>
        </div>

        <h3 className="text-base font-black text-[#374375] line-clamp-1 group-hover:text-[#895159] transition-colors">
          {displayEvent.title || displayEvent.eventName}
        </h3>
        <p className="text-xs font-bold text-[#895159] mt-0.5">
          {displayEvent.organizingCollege || displayEvent.college}
        </p>

        <div className="mt-4 space-y-1.5 text-xs text-[#374375]/80 font-medium">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#895159] shrink-0" />
            <span className="truncate">{displayEvent.date} ({displayEvent.time || '10:00 AM'})</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#374375]/60 shrink-0" />
            <span className="truncate">{displayEvent.venue || displayEvent.location}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-[#BABDE2]/20">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClick?.(displayEvent)
          }}
          className="w-full py-2 px-3 rounded-xl bg-[#374375] text-[#FFFCF5] font-bold text-xs hover:bg-[#895159] transition-colors flex items-center justify-center gap-1.5"
        >
          <span>View Event</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  )
}
