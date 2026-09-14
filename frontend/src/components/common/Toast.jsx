import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

export default function Toast({ toast, onClose }) {
  if (!toast) return null

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-[#374375] shrink-0" />
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 max-w-md bg-[#FFFCF5] text-[#374375] p-4 rounded-2xl shadow-2xl border border-[#BABDE2] flex items-center gap-3.5"
      >
        {icons[toast.type] || icons.info}
        <p className="text-sm font-semibold text-[#374375] flex-1">{toast.message}</p>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-[#374375]/60 hover:text-[#374375] hover:bg-[#BABDE2]/20 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
