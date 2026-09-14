import React from 'react'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function MobileStickyCTA({
  event,
  isRegistered,
  onEnroll,
  onViewMyEvent
}) {
  if (!event) return null

  const isFree = event.isFree || event.registrationFee === 0
  const isClosed = event.status === 'closed'
  const isFull = event.status === 'full'

  return (
    <div className="fixed bottom-0 inset-x-0 bg-[#FFFCF5]/95 backdrop-blur-md border-t border-[#BABDE2] p-4 z-40 lg:hidden shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#895159] block">
            Registration Fee
          </span>
          <span className="text-lg font-black text-[#374375]">
            {isFree ? 'Free' : `₹${event.registrationFee}`}
          </span>
        </div>

        <div className="flex-1 max-w-[220px]">
          {isRegistered ? (
            <button
              onClick={onViewMyEvent}
              className="w-full py-3 px-4 rounded-2xl bg-[#374375] text-[#FFFCF5] font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>You're Enrolled</span>
            </button>
          ) : isClosed || isFull ? (
            <button
              disabled
              className="w-full py-3 px-4 rounded-2xl bg-[#BABDE2]/30 text-[#374375]/50 font-bold text-xs cursor-not-allowed text-center"
            >
              {isClosed ? 'Closed' : 'Full'}
            </button>
          ) : (
            <button
              onClick={onEnroll}
              className="w-full py-3 px-4 rounded-2xl bg-[#374375] text-[#FFFCF5] font-extrabold text-xs hover:bg-[#895159] transition-colors flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>Enroll Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
