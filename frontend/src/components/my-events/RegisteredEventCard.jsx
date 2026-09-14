import React from 'react'
import { Building2, Calendar, MapPin, Ticket, CheckCircle2, ArrowRight, QrCode } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const RegisteredEventCard = ({ registration, event, onViewPass }) => {
  const navigate = useNavigate()

  if (!registration || !event) return null

  const isPast = new Date(event.date) < new Date(new Date().setHours(0, 0, 0, 0))
  const isFree = registration.paymentStatus === 'free' || event.isFree

  return (
    <div className="bg-white rounded-2xl border border-[#BABDE2]/40 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group">
      {/* Event Header Banner Image */}
      <div className="relative h-40 overflow-hidden bg-slate-100">
        <img
          src={event.banner}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#374375]/80 via-transparent to-black/20" />

        {/* Top Status Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/90 text-[#374375] backdrop-blur-xs">
            {event.category}
          </span>
          {isPast && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-800/80 text-white backdrop-blur-xs">
              Past Event
            </span>
          )}
        </div>

        {/* Registration ID Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#374375]/90 text-white border border-white/30 backdrop-blur-xs">
            {registration.registrationId}
          </span>
        </div>

        {/* Title over banner */}
        <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
          <span className="text-[11px] font-medium text-[#DFAEA1] block">
            {event.organizingCollege}
          </span>
          <h3 className="font-bold text-base leading-tight line-clamp-1 text-white">
            {event.title}
          </h3>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        {/* Info Grid */}
        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#895159] shrink-0" />
            <span className="font-medium">
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}{' '}
              • {event.time}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#895159] shrink-0" />
            <span className="line-clamp-1 font-medium">{event.venue}</span>
          </div>
        </div>

        {/* Status Pills */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Confirmed</span>
          </div>

          <div className="font-bold text-[#374375] bg-[#BABDE2]/20 px-2.5 py-1 rounded-lg">
            {isFree ? 'Free Registration' : `Payment: ₹${registration.paymentAmount}`}
          </div>
        </div>

        {/* Card Actions */}
        <div className="pt-1 flex items-center gap-2">
          <button
            onClick={() => onViewPass(registration, event)}
            className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-[#BABDE2]/20 text-[#374375] font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-[#374375]" />
            <span>Digital Pass</span>
          </button>

          <button
            onClick={() => navigate(`/events/${event.id}`)}
            className="flex-1 py-2.5 px-3 bg-[#374375] hover:bg-[#2c365e] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>View Event</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegisteredEventCard
