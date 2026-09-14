import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check, Share2, Send } from 'lucide-react'
import { useCampus } from '../../context/CampusContext'

export default function ShareModal({ isOpen, onClose, event }) {
  const [copied, setCopied] = useState(false)
  const { showToast } = useCampus()

  if (!isOpen || !event) return null

  const shareUrl = window.location.href
  const shareTitle = `Check out ${event.title} organized by ${event.organizingCollege} on Campus Connect!`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    showToast('Event link copied to clipboard!')
    setTimeout(() => setCopied(false), 2500)
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: shareTitle,
          url: shareUrl
        })
      } catch (err) {
        console.error(err)
      }
    } else {
      handleCopyLink()
    }
  }

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle}\n${shareUrl}`)}`
    window.open(waUrl, '_blank')
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#374375]/50 backdrop-blur-xs"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-[#FFFCF5] rounded-3xl p-6 border border-[#BABDE2] shadow-2xl z-10 text-[#374375]"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#BABDE2]/30">
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-[#895159]" />
              <h3 className="text-base font-black text-[#374375]">Share Event</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#374375]/60 hover:text-[#374375] hover:bg-[#BABDE2]/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-5 space-y-4">
            <div className="p-3 rounded-2xl bg-[#BABDE2]/20 border border-[#BABDE2]/40 flex items-center gap-3">
              <img
                src={event.banner}
                alt={event.title}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-black text-[#374375] truncate">{event.title}</h4>
                <p className="text-[10px] font-bold text-[#895159]">{event.organizingCollege}</p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleWhatsAppShare}
                className="w-full py-3 px-4 rounded-2xl bg-[#25D366]/15 text-[#128C7E] font-bold text-xs hover:bg-[#25D366]/25 transition-colors flex items-center justify-center gap-2 border border-[#25D366]/30"
              >
                <Send className="w-4 h-4" /> Share on WhatsApp
              </button>

              {navigator.share && (
                <button
                  onClick={handleNativeShare}
                  className="w-full py-3 px-4 rounded-2xl bg-[#BABDE2]/30 text-[#374375] font-bold text-xs hover:bg-[#BABDE2]/50 transition-colors flex items-center justify-center gap-2 border border-[#BABDE2]"
                >
                  <Share2 className="w-4 h-4" /> Share via System App
                </button>
              )}
            </div>

            {/* Copy Link Section */}
            <div className="pt-2">
              <label className="text-[11px] font-bold text-[#895159] block mb-1.5">
                Or Copy Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 p-2.5 rounded-2xl bg-[#FFFCF5] border border-[#BABDE2] text-xs font-semibold text-[#374375] truncate select-all"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 rounded-2xl bg-[#374375] text-[#FFFCF5] text-xs font-bold hover:bg-[#895159] transition-colors flex items-center gap-1.5 shrink-0"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
