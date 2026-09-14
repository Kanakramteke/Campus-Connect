import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Lock, Eye, EyeOff, Check, AlertCircle } from 'lucide-react'
import { useCampus } from '../../context/CampusContext'

export default function ChangePasswordModal({ isOpen, onClose }) {
  const { showToast } = useCampus()
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const validate = () => {
    const newErrors = {}
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required'
    }
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters'
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      showToast('Password changed successfully!')
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      onClose()
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#374375]/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#FFFCF5] rounded-3xl border border-[#BABDE2] shadow-2xl w-full max-w-md overflow-hidden my-8"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#BABDE2]/30 flex items-center justify-between bg-gradient-to-r from-[#FFFCF5] to-[#BABDE2]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#374375] text-[#FFFCF5] flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#374375]">Change Password</h2>
              <p className="text-xs font-semibold text-[#374375]/75">Update your security credentials.</p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Current Password */}
          <div className="space-y-1">
            <label className="text-xs font-extrabold text-[#374375] uppercase tracking-wider">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 pr-10 rounded-xl bg-white border text-sm text-[#374375] font-semibold focus:outline-none focus:ring-2 ${
                  errors.currentPassword ? 'border-red-500 ring-red-200' : 'border-[#BABDE2] focus:ring-[#374375]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#374375]/60 hover:text-[#374375]"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-[11px] font-extrabold text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {errors.currentPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-1">
            <label className="text-xs font-extrabold text-[#374375] uppercase tracking-wider">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                placeholder="At least 6 characters"
                className={`w-full px-4 py-2.5 pr-10 rounded-xl bg-white border text-sm text-[#374375] font-semibold focus:outline-none focus:ring-2 ${
                  errors.newPassword ? 'border-red-500 ring-red-200' : 'border-[#BABDE2] focus:ring-[#374375]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#374375]/60 hover:text-[#374375]"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-[11px] font-extrabold text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-xs font-extrabold text-[#374375] uppercase tracking-wider">
              Confirm New Password *
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Re-enter new password"
                className={`w-full px-4 py-2.5 pr-10 rounded-xl bg-white border text-sm text-[#374375] font-semibold focus:outline-none focus:ring-2 ${
                  errors.confirmPassword ? 'border-red-500 ring-red-200' : 'border-[#BABDE2] focus:ring-[#374375]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#374375]/60 hover:text-[#374375]"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-[11px] font-extrabold text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#BABDE2]/30 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-2xl bg-[#FFFCF5] hover:bg-[#BABDE2]/20 text-[#374375] border border-[#BABDE2]/60 font-extrabold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2.5 px-6 rounded-2xl bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Updating...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
