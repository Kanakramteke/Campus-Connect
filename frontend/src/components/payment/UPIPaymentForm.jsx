import React, { useState } from 'react'
import { QrCode, Lock, AlertCircle, Check } from 'lucide-react'

const UPIPaymentForm = ({ fee, onSubmit, isProcessing }) => {
  const [upiId, setUpiId] = useState('')
  const [error, setError] = useState('')

  const quickHandles = ['@okaxis', '@okhdfcbank', '@okicici', '@ybl', '@paytm']

  const validateUPI = (id) => {
    // Standard UPI ID pattern username@bank
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/
    return upiRegex.test(id.trim())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!upiId.trim()) {
      setError('Please enter a valid UPI ID.')
      return
    }

    if (!validateUPI(upiId.trim())) {
      setError('Please enter a valid UPI ID format (e.g., student@upi).')
      return
    }

    setError('')
    onSubmit({
      method: 'UPI',
      upiId: upiId.trim()
    })
  }

  const appendHandle = (handle) => {
    const prefix = upiId.split('@')[0] || 'student'
    const newUpi = `${prefix}${handle}`
    setUpiId(newUpi)
    if (error) setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="upiId" className="block text-xs font-bold uppercase tracking-wider text-[#374375]">
            UPI ID / VPA Address
          </label>
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-600" /> Safe & Verified
          </span>
        </div>

        <div className="relative">
          <input
            id="upiId"
            type="text"
            value={upiId}
            onChange={(e) => {
              setUpiId(e.target.value)
              if (error) setError('')
            }}
            placeholder="e.g. student@upi or mobile@okaxis"
            disabled={isProcessing}
            className={`w-full px-4 py-3 bg-white border rounded-xl font-medium text-[#374375] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#374375]/20 text-sm transition-all ${
              error ? 'border-red-500 focus:border-red-500 ring-red-100' : 'border-slate-300 focus:border-[#374375]'
            }`}
          />
          {upiId && validateUPI(upiId) && (
            <Check className="w-5 h-5 text-emerald-600 absolute right-3.5 top-3.5" />
          )}
        </div>

        {error && (
          <p className="mt-2 text-xs font-semibold text-red-600 flex items-center gap-1.5 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </p>
        )}
      </div>

      {/* Quick Handle Chips */}
      <div>
        <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
          Quick Bank Handles:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {quickHandles.map((handle) => (
            <button
              key={handle}
              type="button"
              onClick={() => appendHandle(handle)}
              disabled={isProcessing}
              className="text-xs px-2.5 py-1 rounded-lg bg-white hover:bg-[#BABDE2]/20 border border-slate-200 text-slate-700 font-medium transition-all"
            >
              {handle}
            </button>
          ))}
        </div>
      </div>

      {/* Submit CTA */}
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full py-3.5 px-6 bg-[#374375] hover:bg-[#2c365e] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Lock className="w-4 h-4" />
        <span>Pay ₹{fee}</span>
      </button>
    </form>
  )
}

export default UPIPaymentForm
