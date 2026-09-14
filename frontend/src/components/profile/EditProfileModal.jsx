import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, User, Mail, Phone, Building2, BookOpen, GraduationCap, MapPin, Sparkles, Check, AlertCircle, Camera } from 'lucide-react'
import { useCampus } from '../../context/CampusContext'

const NAGPUR_COLLEGES = [
  'VNIT Nagpur',
  'RCOEM Nagpur',
  'YCCE Nagpur',
  'GCOEN Nagpur',
  'IIIT Nagpur',
  'S.B. Jain Institute',
  'St. Vincent Pallotti College',
  'G.H. Raisoni College of Engineering',
  'LAD College for Women',
  'Symbiosis Institute of Technology Nagpur'
]

const AVATAR_OPTIONS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=KanakRamteke',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=AdityaDeshmukh',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=AnanyaSharma',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaSharma',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=RohanPatil',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=SiddharthRao'
]

export default function EditProfileModal({ isOpen, onClose }) {
  const { user, updateUserProfile } = useCampus()

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    college: user?.college || 'VNIT Nagpur',
    department: user?.department || '',
    year: user?.year || '3rd Year',
    course: user?.course || 'B.Tech',
    city: user?.city || 'Nagpur',
    bio: user?.bio || '',
    avatar: user?.avatar || AVATAR_OPTIONS[0]
  })

  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [customAvatarUrl, setCustomAvatarUrl] = useState('')

  if (!isOpen) return null

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    if (!formData.college) {
      newErrors.college = 'College selection is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSaving(true)
    setTimeout(() => {
      updateUserProfile(formData)
      setIsSaving(false)
      onClose()
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#374375]/60 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#FFFCF5] rounded-3xl border border-[#BABDE2] shadow-2xl w-full max-w-2xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#BABDE2]/30 flex items-center justify-between bg-gradient-to-r from-[#FFFCF5] to-[#BABDE2]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#374375] text-[#FFFCF5] flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#374375]">Edit Student Profile</h2>
              <p className="text-xs font-semibold text-[#374375]/75">Update your personal details & campus info.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#374375] hover:bg-[#BABDE2]/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Avatar Selector Section */}
          <div className="space-y-3 p-4 rounded-2xl bg-[#BABDE2]/15 border border-[#BABDE2]/40">
            <label className="block text-xs font-extrabold text-[#374375] uppercase tracking-wider">
              Profile Photo / Avatar
            </label>
            <div className="flex items-center gap-4 flex-wrap">
              <img
                src={formData.avatar}
                alt="Selected Avatar"
                className="w-16 h-16 rounded-full border-2 border-[#374375] shadow-md bg-white shrink-0"
              />
              <div className="space-y-2 flex-1 min-w-[200px]">
                <span className="text-xs text-[#374375]/80 font-medium block">Choose from preset avatars:</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {AVATAR_OPTIONS.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar: imgUrl })}
                      className={`w-9 h-9 rounded-full border-2 overflow-hidden transition-all ${
                        formData.avatar === imgUrl ? 'border-[#895159] ring-2 ring-[#895159]/30 scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Avatar ${idx}`} className="w-full h-full bg-white" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#374375] uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#895159]" /> Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Your full name"
                className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-[#374375] font-semibold focus:outline-none focus:ring-2 ${
                  errors.fullName ? 'border-red-500 ring-red-200' : 'border-[#BABDE2] focus:ring-[#374375]'
                }`}
              />
              {errors.fullName && (
                <p className="text-[11px] font-extrabold text-red-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#374375] uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#895159]" /> Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="student@college.ac.in"
                className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-[#374375] font-semibold focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 ring-red-200' : 'border-[#BABDE2] focus:ring-[#374375]'
                }`}
              />
              {errors.email && (
                <p className="text-[11px] font-extrabold text-red-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#374375] uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#895159]" /> Phone Number *
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-[#374375] font-semibold focus:outline-none focus:ring-2 ${
                  errors.phone ? 'border-red-500 ring-red-200' : 'border-[#BABDE2] focus:ring-[#374375]'
                }`}
              />
              {errors.phone && (
                <p className="text-[11px] font-extrabold text-red-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                </p>
              )}
            </div>

            {/* College */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-extrabold text-[#374375] uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#895159]" /> College *
              </label>
              <select
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#BABDE2] text-sm text-[#374375] font-semibold focus:outline-none focus:ring-2 focus:ring-[#374375]"
              >
                {NAGPUR_COLLEGES.map((c, idx) => (
                  <option key={idx} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-extrabold text-[#374375] uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#895159]" /> Department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="e.g. Computer Science & Engineering"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#BABDE2] text-sm text-[#374375] font-semibold focus:outline-none focus:ring-2 focus:ring-[#374375]"
              />
            </div>

            {/* City */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-extrabold text-[#374375] uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#895159]" /> City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Nagpur"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#BABDE2] text-sm text-[#374375] font-semibold focus:outline-none focus:ring-2 focus:ring-[#374375]"
              />
            </div>

            {/* Bio */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-extrabold text-[#374375] uppercase tracking-wider">
                Student Bio
              </label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell other Nagpur students about your interests, skills, or projects..."
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#BABDE2] text-sm text-[#374375] font-medium focus:outline-none focus:ring-2 focus:ring-[#374375]"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#BABDE2]/30 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-5 rounded-2xl bg-[#FFFCF5] hover:bg-[#BABDE2]/20 text-[#374375] border border-[#BABDE2]/60 font-extrabold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="py-2.5 px-6 rounded-2xl bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs transition-colors flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <span>Saving changes...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
