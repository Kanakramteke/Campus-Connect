import React from 'react'
import { Building2, Calendar, MapPin, Tag, ShieldCheck } from 'lucide-react'

const OrderSummary = ({ event, fee = 0 }) => {
  if (!event) return null

  const convenienceFee = 0
  const totalAmount = fee || event.registrationFee || 0

  return (
    <div className="bg-white rounded-2xl border border-[#BABDE2]/40 shadow-sm p-6 space-y-6">
      {/* Event Details Card Header */}
      <div className="flex items-start gap-4 pb-5 border-b border-slate-100">
        {event.banner && (
          <img
            src={event.banner}
            alt={event.title}
            className="w-20 h-20 rounded-xl object-cover border border-slate-100 shrink-0"
          />
        )}
        <div className="space-y-1">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold text-[#374375] bg-[#BABDE2]/20">
            {event.category || 'Event'}
          </span>
          <h3 className="font-bold text-[#374375] text-lg leading-tight line-clamp-2">
            {event.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
            <Building2 className="w-3.5 h-3.5 text-[#374375]" />
            <span className="font-medium text-slate-700">{event.organizingCollege}</span>
          </div>
        </div>
      </div>

      {/* Quick Event Info */}
      <div className="space-y-2.5 text-sm text-slate-600 bg-[#FFFCF5] p-3.5 rounded-xl border border-[#DFAEA1]/30">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#895159]" />
          <span>
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
          <MapPin className="w-4 h-4 text-[#895159]" />
          <span className="truncate">{event.location || event.venue}</span>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Order Breakdown
        </h4>
        
        <div className="flex justify-between items-center text-sm text-slate-600">
          <span>Registration Fee</span>
          <span className="font-semibold text-slate-800">₹{totalAmount}</span>
        </div>

        <div className="flex justify-between items-center text-sm text-slate-600">
          <span>Convenience Fee</span>
          <span className="font-medium text-emerald-600">FREE (₹0)</span>
        </div>

        <div className="border-t border-dashed border-slate-200 pt-3 flex justify-between items-center text-base font-bold text-[#374375]">
          <span>Total Amount Payable</span>
          <span className="text-xl text-[#374375]">₹{totalAmount}</span>
        </div>
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="pt-4 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
        <ShieldCheck className="w-5 h-5 text-[#374375] shrink-0" />
        <span>100% Encrypted & Safe Registration checkout via Campus Connect</span>
      </div>
    </div>
  )
}

export default OrderSummary
