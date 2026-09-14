import React from 'react'
import { HelpCircle, ArrowLeft, X } from 'lucide-react'

const PaymentCancelModal = ({ onContinue, onLeave }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#374375]/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-5 shadow-2xl border border-slate-200 animate-scaleUp">
        <div className="w-16 h-16 rounded-full bg-[#DFAEA1]/20 text-[#895159] flex items-center justify-center mx-auto">
          <HelpCircle className="w-8 h-8 text-[#895159]" />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-[#374375]">
            Leave Payment?
          </h3>
          <p className="text-xs text-slate-600">
            Your event registration has not been completed yet. If you leave now, your draft registration will be cancelled.
          </p>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={onContinue}
            className="w-full py-3 px-4 bg-[#374375] hover:bg-[#2c365e] text-white font-bold rounded-xl text-sm transition-all cursor-pointer"
          >
            Continue Payment
          </button>
          
          <button
            type="button"
            onClick={onLeave}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <X className="w-4 h-4 text-slate-500" />
            <span>Leave Checkout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentCancelModal
