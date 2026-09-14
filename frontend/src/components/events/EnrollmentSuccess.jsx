import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Calendar, MapPin, Ticket, ArrowLeft, ExternalLink } from 'lucide-react'

export default function EnrollmentSuccess({ event, registration, onDone, onNavigate }) {
  if (!event) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-5 py-4 text-[#374375]"
    >
      <div className="w-16 h-16 rounded-full bg-[#BABDE2]/40 text-[#374375] flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 className="w-10 h-10 text-[#374375]" />
      </div>

      <div>
        <h3 className="text-xl font-black text-[#374375] tracking-tight">
          You're successfully enrolled! 🎉
        </h3>
        <p className="text-xs text-[#374375]/80 font-medium mt-1">
          Your registration for <span className="font-bold text-[#895159]">{event.title}</span> has been confirmed.
        </p>
      </div>

      {/* Confirmation details card */}
      <div className="p-4 rounded-2xl bg-[#FFFCF5] border border-[#BABDE2] text-left space-y-2 text-xs font-semibold">
        <div className="flex items-center justify-between pb-2 border-b border-[#BABDE2]/30">
          <span className="text-[10px] font-bold text-[#895159] uppercase">Registration ID</span>
          <span className="font-mono text-xs text-[#374375] font-extrabold">{registration?.registrationId || 'CC-REG-2026-X99'}</span>
        </div>

        <div className="flex items-center gap-2 pt-1 text-[#374375]/80">
          <Calendar className="w-3.5 h-3.5 text-[#895159] shrink-0" />
          <span className="truncate">{event.date} ({event.time || '10:00 AM'})</span>
        </div>

        <div className="flex items-center gap-2 text-[#374375]/80">
          <MapPin className="w-3.5 h-3.5 text-[#374375]/60 shrink-0" />
          <span className="truncate">{event.venue || event.location}</span>
        </div>

        <div className="flex items-center gap-2 text-[#374375]/80">
          <Ticket className="w-3.5 h-3.5 text-[#374375]/60 shrink-0" />
          <span>Status: <strong className="text-[#374375]">Registered</strong> ({event.isFree ? 'Free' : `₹${event.registrationFee}`})</span>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => {
            onDone()
            onNavigate?.('profile')
          }}
          className="flex-1 py-3 px-4 rounded-2xl bg-[#374375] text-[#FFFCF5] font-extrabold text-xs hover:bg-[#895159] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <span>View My Event</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => {
            onDone()
            onNavigate?.(event.type === 'technical' ? 'technical' : 'cultural')
          }}
          className="flex-1 py-3 px-4 rounded-2xl bg-[#BABDE2]/30 text-[#374375] font-bold text-xs hover:bg-[#BABDE2]/50 transition-colors flex items-center justify-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Events</span>
        </button>
      </div>
    </motion.div>
  )
}
