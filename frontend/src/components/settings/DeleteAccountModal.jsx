import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Trash2, X } from 'lucide-react'
import { useCampus } from '../../context/CampusContext'

export default function DeleteAccountModal({ isOpen, onClose }) {
  const { showToast } = useCampus()
  const [confirmInput, setConfirmInput] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  if (!isOpen) return null

  const handleDelete = () => {
    if (confirmInput.trim() !== 'DELETE') return

    setIsDeleting(true)
    setTimeout(() => {
      setIsDeleting(false)
      showToast('Account deletion request submitted for processing.')
      setConfirmInput('')
      onClose()
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#374375]/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#FFFCF5] rounded-3xl border border-red-200 shadow-2xl w-full max-w-md overflow-hidden p-6 space-y-6 text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-black text-[#374375]">Delete Campus Connect Account?</h3>
          <p className="text-xs sm:text-sm text-[#374375]/80 font-semibold leading-relaxed">
            This action will permanently remove your student profile, event passes, club memberships, and community post activity.
          </p>
        </div>

        <div className="space-y-2 text-left bg-red-50 p-4 rounded-2xl border border-red-200">
          <label className="text-xs font-black text-red-800 uppercase tracking-wider block">
            Type <span className="underline">DELETE</span> to confirm:
          </label>
          <input
            type="text"
            value={confirmInput}
            onChange={(e) => setConfirmInput(e.target.value)}
            placeholder="Type DELETE"
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-red-300 text-sm text-[#374375] font-extrabold focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              setConfirmInput('')
              onClose()
            }}
            className="w-1/2 py-3 rounded-2xl bg-[#FFFCF5] hover:bg-[#BABDE2]/20 text-[#374375] border border-[#BABDE2] font-extrabold text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={confirmInput.trim() !== 'DELETE' || isDeleting}
            className="w-1/2 py-3 rounded-2xl bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-extrabold text-xs transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isDeleting ? 'Deleting...' : 'Confirm Delete'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
