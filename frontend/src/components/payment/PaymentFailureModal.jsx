import React from 'react'
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PaymentFailureModal = ({ event, onRetry, eventId }) => {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 z-50 bg-[#374375]/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-6 shadow-2xl border border-red-100 animate-scaleUp">
        {/* Warning Icon */}
        <div className="w-18 h-18 rounded-full bg-red-100 text-[#895159] flex items-center justify-center mx-auto ring-8 ring-red-50">
          <AlertTriangle className="w-10 h-10 text-[#895159]" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-[#374375]">
            Payment Unsuccessful
          </h3>
          <p className="text-sm text-slate-600">
            Your payment could not be completed. No charges were made to your account.
          </p>
        </div>

        <div className="bg-red-50/70 p-3.5 rounded-2xl border border-red-200 text-xs text-red-700 text-left space-y-1">
          <span className="font-bold block">Possible Reasons:</span>
          <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
            <li>Session timeout or network interruption</li>
            <li>Incorrect UPI PIN or bank authorization failure</li>
            <li>Insufficient balance or daily transaction limit</li>
          </ul>
        </div>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={onRetry}
            className="w-full py-3 px-5 bg-[#374375] hover:bg-[#2c365e] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Payment Again</span>
          </button>

          <button
            type="button"
            onClick={() => navigate(`/events/${eventId}`)}
            className="w-full py-2.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Event Details</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailureModal
