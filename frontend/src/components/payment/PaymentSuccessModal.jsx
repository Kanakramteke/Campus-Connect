import React from 'react'
import { CheckCircle2, Calendar, MapPin, Ticket, ArrowRight, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PaymentSuccessModal = ({ registration, event, onClose }) => {
  const navigate = useNavigate()

  if (!registration || !event) return null

  return (
    <div className="fixed inset-0 z-50 bg-[#374375]/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center space-y-6 shadow-2xl border border-[#BABDE2]/40 animate-scaleUp">
        
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-[#BABDE2]/30 text-[#374375] flex items-center justify-center mx-auto ring-8 ring-[#BABDE2]/15">
          <CheckCircle2 className="w-12 h-12 text-[#374375]" />
        </div>

        {/* Header Title */}
        <div className="space-y-1.5">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
            Registration Confirmed
          </span>
          <h2 className="text-2xl font-black text-[#374375]">
            Payment Successful!
          </h2>
          <p className="text-sm text-slate-600 max-w-sm mx-auto">
            Your seat for <span className="font-bold text-[#374375]">{event.title}</span> is officially reserved.
          </p>
        </div>

        {/* Digital Ticket Summary Box */}
        <div className="bg-[#FFFCF5] p-4 sm:p-5 rounded-2xl border border-[#DFAEA1]/40 text-left space-y-3">
          <div className="flex justify-between items-start pb-3 border-b border-[#DFAEA1]/30">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Registration ID
              </span>
              <span className="font-mono font-bold text-sm text-[#374375]">
                {registration.registrationId}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Transaction ID
              </span>
              <span className="font-mono text-xs font-semibold text-slate-600">
                {registration.transactionId}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-[#895159] shrink-0" />
              <span className="font-semibold">{event.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#895159] shrink-0" />
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
              <MapPin className="w-4 h-4 text-[#895159] shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#DFAEA1]/30 flex justify-between items-center text-xs font-bold">
            <span className="text-slate-500">Amount Paid</span>
            <span className="text-base text-[#374375]">
              {registration.paymentAmount === 0 ? 'Free' : `₹${registration.paymentAmount}`}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => navigate('/my-events')}
            className="w-full py-3.5 px-6 bg-[#374375] hover:bg-[#2c365e] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <span>View My Events</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="w-full py-2.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <Home className="w-4 h-4 text-slate-500" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccessModal
