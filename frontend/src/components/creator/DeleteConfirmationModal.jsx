import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Trash2, X } from 'lucide-react'

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm, title = 'Delete Content', message = 'Are you sure you want to remove this content? This action cannot be undone.' }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#374375]/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#FFFCF5] w-full max-w-md rounded-3xl border border-[#BABDE2] p-6 shadow-2xl space-y-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#BABDE2]/30 text-[#374375] hover:bg-[#895159] hover:text-[#FFFCF5] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-black text-[#374375]">{title}</h3>
          <p className="text-xs text-[#374375]/80 font-medium leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#BABDE2]/30 text-[#374375] font-extrabold text-xs hover:bg-[#BABDE2]/50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Confirm Delete</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
