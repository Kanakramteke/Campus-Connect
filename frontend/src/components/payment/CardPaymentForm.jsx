import React, { useState } from 'react'
import { CreditCard, Lock, AlertCircle, Calendar, ShieldCheck } from 'lucide-react'

const CardPaymentForm = ({ fee, onSubmit, isProcessing }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiry: '',
    cvv: ''
  })

  const [errors, setErrors] = useState({})

  // Format Card Number (space every 4 digits)
  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16)
    const formatted = raw.replace(/(.{4})/g, '$1 ').trim()
    setFormData(prev => ({ ...prev, cardNumber: formatted }))
    if (errors.cardNumber) setErrors(prev => ({ ...prev, cardNumber: null }))
  }

  // Format Expiry (MM/YY)
  const handleExpiryChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4)
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`
    }
    setFormData(prev => ({ ...prev, expiry: raw }))
    if (errors.expiry) setErrors(prev => ({ ...prev, expiry: null }))
  }

  // Format CVV (3 or 4 digits max)
  const handleCvvChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4)
    setFormData(prev => ({ ...prev, cvv: raw }))
    if (errors.cvv) setErrors(prev => ({ ...prev, cvv: null }))
  }

  const validateForm = () => {
    const newErrors = {}

    // Card number validation (16 digits)
    const digitsOnly = formData.cardNumber.replace(/\s/g, '')
    if (!digitsOnly || digitsOnly.length < 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number.'
    }

    // Name validation
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required.'
    }

    // Expiry validation (MM/YY)
    if (!formData.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = 'Use MM/YY format.'
    } else {
      const [mm, yy] = formData.expiry.split('/')
      const month = parseInt(mm, 10)
      const year = parseInt(`20${yy}`, 10)
      const now = new Date()
      const currentYear = now.getFullYear()
      const currentMonth = now.getMonth() + 1

      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiry = 'Card is expired.'
      }
    }

    // CVV validation (3 or 4 digits)
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'Enter 3-4 digit CVV.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    // Safe mock submit passing non-sensitive metadata only
    onSubmit({
      method: 'Card',
      lastFourDigits: formData.cardNumber.replace(/\s/g, '').slice(-4),
      cardType: 'Credit/Debit'
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
      {/* Cardholder Name */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#374375] mb-1">
          Cardholder Name
        </label>
        <input
          type="text"
          value={formData.cardholderName}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, cardholderName: e.target.value }))
            if (errors.cardholderName) setErrors(prev => ({ ...prev, cardholderName: null }))
          }}
          placeholder="As printed on your card"
          disabled={isProcessing}
          className={`w-full px-4 py-2.5 bg-white border rounded-xl font-medium text-[#374375] placeholder-slate-400 focus:outline-none text-sm transition-all ${
            errors.cardholderName ? 'border-red-500 ring-1 ring-red-100' : 'border-slate-300 focus:border-[#374375]'
          }`}
        />
        {errors.cardholderName && (
          <p className="mt-1 text-xs font-medium text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {errors.cardholderName}
          </p>
        )}
      </div>

      {/* Card Number */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#374375] mb-1">
          Card Number
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.cardNumber}
            onChange={handleCardNumberChange}
            placeholder="4532 •••• •••• 8921"
            disabled={isProcessing}
            className={`w-full pl-4 pr-10 py-2.5 bg-white border rounded-xl font-mono text-sm tracking-wider text-[#374375] placeholder-slate-400 focus:outline-none transition-all ${
              errors.cardNumber ? 'border-red-500 ring-1 ring-red-100' : 'border-slate-300 focus:border-[#374375]'
            }`}
          />
          <CreditCard className="w-5 h-5 text-slate-400 absolute right-3 top-2.5" />
        </div>
        {errors.cardNumber && (
          <p className="mt-1 text-xs font-medium text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {errors.cardNumber}
          </p>
        )}
      </div>

      {/* Expiry & CVV */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#374375] mb-1">
            Expiry (MM/YY)
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.expiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              disabled={isProcessing}
              className={`w-full pl-4 pr-9 py-2.5 bg-white border rounded-xl font-mono text-sm text-[#374375] placeholder-slate-400 focus:outline-none transition-all ${
                errors.expiry ? 'border-red-500 ring-1 ring-red-100' : 'border-slate-300 focus:border-[#374375]'
              }`}
            />
            <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
          </div>
          {errors.expiry && (
            <p className="mt-1 text-xs font-medium text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.expiry}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#374375] mb-1">
            CVV Code
          </label>
          <div className="relative">
            <input
              type="password"
              maxLength={4}
              value={formData.cvv}
              onChange={handleCvvChange}
              placeholder="•••"
              disabled={isProcessing}
              className={`w-full pl-4 pr-9 py-2.5 bg-white border rounded-xl font-mono text-sm text-[#374375] placeholder-slate-400 focus:outline-none transition-all ${
                errors.cvv ? 'border-red-500 ring-1 ring-red-100' : 'border-slate-300 focus:border-[#374375]'
              }`}
            />
            <ShieldCheck className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
          </div>
          {errors.cvv && (
            <p className="mt-1 text-xs font-medium text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.cvv}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full mt-2 py-3.5 px-6 bg-[#374375] hover:bg-[#2c365e] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Lock className="w-4 h-4" />
        <span>Pay ₹{fee}</span>
      </button>
    </form>
  )
}

export default CardPaymentForm
