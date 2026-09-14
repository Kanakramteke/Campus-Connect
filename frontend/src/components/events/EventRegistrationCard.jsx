import React from 'react'
import { CheckCircle2, ShieldCheck, Clock, Users, ArrowRight, Check } from 'lucide-react'

export default function EventRegistrationCard({
  event,
  isRegistered,
  onEnroll,
  onViewMyEvent
}) {
  if (!event) return null

  const isFree = event.isFree || event.registrationFee === 0
  const isClosed = event.status === 'closed'
  const isFull = event.status === 'full' || (event.seatsAvailable !== undefined && event.seatsAvailable <= 0)

  const total = event.totalCapacity || 100
  const available = event.seatsAvailable ?? 45
  const takenPercent = Math.min(100, Math.round(((total - available) / total) * 100))

  return (
    <div className="bg-[#FFFCF5] rounded-3xl p-6 border border-[#BABDE2] shadow-sm space-y-5 text-[#374375] sticky top-24">
      <div className="pb-4 border-b border-[#BABDE2]/30">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#895159]">
          Registration Fee
        </span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-3xl font-black text-[#374375]">
            {isFree ? 'Free' : `₹${event.registrationFee}`}
          </span>
          {!isFree && <span className="text-xs font-semibold text-[#374375]/60">/ participant</span>}
        </div>
      </div>

      {/* Deadline & Seats */}
      <div className="space-y-3 text-xs font-semibold">
        <div className="flex items-center justify-between text-[#374375]/80">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#895159]" /> Registration Closes:
          </span>
          <span className="font-extrabold text-[#374375]">
            {event.registrationDeadline || '20 Oct 2026'}
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[#374375]/80">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#374375]/70" /> Seat Availability:
            </span>
            <span className="font-extrabold text-[#374375]">
              {available} seats left
            </span>
          </div>

          {/* Seat progress bar */}
          <div className="w-full h-2 rounded-full bg-[#BABDE2]/30 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#374375] to-[#895159] rounded-full transition-all duration-500"
              style={{ width: `${takenPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="pt-2 space-y-2">
        {isRegistered ? (
          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-[#BABDE2]/40 border border-[#BABDE2] text-center font-extrabold text-xs text-[#374375] flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#374375]" /> You're Enrolled in this event
            </div>
            <button
              onClick={onViewMyEvent}
              className="w-full py-3 px-4 rounded-2xl bg-[#374375] text-[#FFFCF5] font-extrabold text-xs hover:bg-[#895159] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>View My Event</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : isClosed ? (
          <button
            disabled
            className="w-full py-3.5 px-4 rounded-2xl bg-[#BABDE2]/30 text-[#374375]/50 font-bold text-xs cursor-not-allowed text-center"
          >
            Registration Closed
          </button>
        ) : isFull ? (
          <button
            disabled
            className="w-full py-3.5 px-4 rounded-2xl bg-[#BABDE2]/30 text-[#374375]/50 font-bold text-xs cursor-not-allowed text-center"
          >
            Event Full
          </button>
        ) : (
          <button
            onClick={onEnroll}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#374375] text-[#FFFCF5] font-black text-sm hover:bg-[#895159] transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98"
          >
            <span>Enroll Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Trust Badges */}
      <div className="pt-3 border-t border-[#BABDE2]/30 space-y-1.5 text-[11px] font-semibold text-[#374375]/75">
        <div className="flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-[#895159]" />
          <span>Instant registration confirmation</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#374375]" />
          <span>Verified campus event listing</span>
        </div>
      </div>
    </div>
  )
}
