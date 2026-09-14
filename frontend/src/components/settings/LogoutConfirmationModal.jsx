import React from 'react'
import { motion } from 'framer-motion'
import { LogOut, X } from 'lucide-react'

export default function LogoutConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#374375]/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#FFFCF5] rounded-3xl border border-[#BABDE2] shadow-2xl w-full max-w-md overflow-hidden p-6 space-y-6 text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-[#895159]/10 text-[#895159] flex items-center justify-center mx-auto">
          <LogOut className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-black text-[#374375]">Log out of Campus Connect?</h3>
          <p className="text-xs sm:text-sm text-[#374375]/80 font-semibold leading-relaxed">
            Are you sure you want to end your current session? You will need to log back in to access your event passes and club activities.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-1/2 py-3 rounded-2xl bg-[#FFFCF5] hover:bg-[#BABDE2]/20 text-[#374375] border border-[#BABDE2] font-extrabold text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose()
              onConfirm()
            }}
            className="w-1/2 py-3 rounded-2xl bg-[#895159] hover:bg-[#724148] text-[#FFFCF5] font-extrabold text-xs transition-colors shadow-sm cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </motion.div>
    </div>
  )
}
