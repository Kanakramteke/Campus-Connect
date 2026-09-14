import React from 'react'
import { Loader2, ShieldCheck, Lock } from 'lucide-react'

const PaymentProcessing = ({ eventName }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#374375]/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl border border-white/20 animate-scaleUp">
        {/* Animated Loading Spinner & Shield Icon */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-[#BABDE2]/30 border-t-[#374375] animate-spin" />
          <div className="w-16 h-16 rounded-full bg-[#374375]/5 flex items-center justify-center">
            <Lock className="w-8 h-8 text-[#374375] animate-pulse" />
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-[#374375]">
            Processing Payment...
          </h3>
          <p className="text-sm text-slate-500 max-w-xs mx-auto">
            Securing your seat for <span className="font-semibold text-slate-700">{eventName || 'Event'}</span>. Please do not refresh or close this window.
          </p>
        </div>

        {/* Status Stepper Pills */}
        <div className="bg-[#FFFCF5] p-3.5 rounded-2xl border border-[#DFAEA1]/40 text-xs space-y-2 text-left">
          <div className="flex items-center gap-2 text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Verifying payment authorization</span>
          </div>
          <div className="flex items-center gap-2 text-[#374375] font-medium pl-6">
            <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0 text-[#374375]" />
            <span>Generating official registration pass</span>
          </div>
        </div>

        <div className="pt-2 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
          Encrypted 256-Bit SSL Connection
        </div>
      </div>
    </div>
  )
}

export default PaymentProcessing
