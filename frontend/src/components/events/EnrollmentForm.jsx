import React, { useState, useEffect } from 'react'
import { User, Mail, Building2, Phone, AlertCircle } from 'lucide-react'
import { useCampus } from '../../context/CampusContext'
import { NAGPUR_COLLEGES } from '../../data/nagpurData'

export default function EnrollmentForm({ event, onSubmit, isLoading }) {
  const { user } = useCampus()

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    college: user?.college || 'VNIT Nagpur',
    phone: user?.phone || '',
    studentId: user?.studentId || '2023CSE089',
    teamName: ''
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || user.fullName || '',
        email: prev.email || user.email || '',
        college: prev.college || user.college || 'VNIT Nagpur',
        phone: prev.phone || user.phone || ''
      }))
    }
  }, [user])

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.'
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.'
    }
    if (!formData.college.trim()) {
      newErrors.college = 'Please select your college.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-[#374375]">
      {/* Full Name */}
      <div className="space-y-1">
        <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#895159]">
          <User className="w-3.5 h-3.5 text-[#374375]" /> Full Name *
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="e.g. Kanak Ramteke"
          className={`w-full p-3 rounded-2xl bg-[#FFFCF5] border text-[#374375] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#BABDE2] ${
            errors.fullName ? 'border-rose-400 bg-rose-50/50' : 'border-[#BABDE2]'
          }`}
        />
        {errors.fullName && (
          <p className="text-[10px] font-bold text-rose-600 flex items-center gap-1 mt-0.5">
            <AlertCircle className="w-3 h-3" /> {errors.fullName}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#895159]">
          <Mail className="w-3.5 h-3.5 text-[#374375]" /> Email Address *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="e.g. student@college.edu"
          className={`w-full p-3 rounded-2xl bg-[#FFFCF5] border text-[#374375] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#BABDE2] ${
            errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-[#BABDE2]'
          }`}
        />
        {errors.email && (
          <p className="text-[10px] font-bold text-rose-600 flex items-center gap-1 mt-0.5">
            <AlertCircle className="w-3 h-3" /> {errors.email}
          </p>
        )}
      </div>

      {/* College Dropdown */}
      <div className="space-y-1">
        <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#895159]">
          <Building2 className="w-3.5 h-3.5 text-[#374375]" /> College / Institution *
        </label>
        <select
          value={formData.college}
          onChange={(e) => setFormData({ ...formData, college: e.target.value })}
          className={`w-full p-3 rounded-2xl bg-[#FFFCF5] border text-[#374375] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#BABDE2] ${
            errors.college ? 'border-rose-400' : 'border-[#BABDE2]'
          }`}
        >
          {NAGPUR_COLLEGES.filter(c => c.id !== 'all').map((col) => (
            <option key={col.id} value={col.name}>{col.name}</option>
          ))}
        </select>
        {errors.college && (
          <p className="text-[10px] font-bold text-rose-600 flex items-center gap-1 mt-0.5">
            <AlertCircle className="w-3 h-3" /> {errors.college}
          </p>
        )}
      </div>

      {/* Phone Number */}
      <div className="space-y-1">
        <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#895159]">
          <Phone className="w-3.5 h-3.5 text-[#374375]" /> Phone Number *
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="e.g. +91 98765 43210"
          className={`w-full p-3 rounded-2xl bg-[#FFFCF5] border text-[#374375] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#BABDE2] ${
            errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-[#BABDE2]'
          }`}
        />
        {errors.phone && (
          <p className="text-[10px] font-bold text-rose-600 flex items-center gap-1 mt-0.5">
            <AlertCircle className="w-3 h-3" /> {errors.phone}
          </p>
        )}
      </div>

      {/* Team Name (Optional) */}
      {event?.teamSize && event.teamSize !== 'Individual' && (
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#895159]">
            Team Name (Optional)
          </label>
          <input
            type="text"
            value={formData.teamName}
            onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
            placeholder="e.g. ByteBusters"
            className="w-full p-3 rounded-2xl bg-[#FFFCF5] border border-[#BABDE2] text-[#374375] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#BABDE2]"
          />
        </div>
      )}

      {/* Paid event note */}
      {event && !event.isFree && event.registrationFee > 0 ? (
        <div className="p-3 rounded-xl bg-[#BABDE2]/20 border border-[#BABDE2]/40 text-[11px] text-[#374375] font-medium flex items-center justify-between">
          <span>Registration Fee: <strong className="text-[#895159]">₹{event.registrationFee}</strong></span>
          <span className="text-[10px] text-slate-500 font-normal">Payment on next screen</span>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 font-medium">
          ✓ This is a <strong>FREE</strong> event. No payment is required.
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#374375] text-[#FFFCF5] font-extrabold text-xs hover:bg-[#895159] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
        >
          {isLoading
            ? 'Processing...'
            : event && !event.isFree
            ? `Continue to Payment (₹${event.registrationFee})`
            : 'Confirm Free Registration'}
        </button>
      </div>
    </form>
  )
}
