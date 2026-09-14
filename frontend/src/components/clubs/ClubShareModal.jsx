import React, { useState } from 'react'
import { X, Copy, Check, Share2, Globe } from 'lucide-react'
import { useCampus } from '../../context/CampusContext'

const ClubShareModal = ({ isOpen, onClose, club }) => {
  const { showToast } = useCampus()
  const [copied, setCopied] = useState(false)

  if (!isOpen || !club) return null

  const shareUrl = window.location.href

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    showToast('Club link copied to clipboard!', 'success')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: club.name,
          text: `Check out ${club.name} from ${club.college} on Campus Connect!`,
          url: shareUrl
        })
      } catch (err) {
        console.error(err)
      }
    } else {
      handleCopy()
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#374375]/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FFFCF5] rounded-3xl p-6 max-w-sm w-full space-y-5 shadow-2xl border border-[#BABDE2] animate-scaleUp">
        <div className="flex items-center justify-between border-b border-[#BABDE2]/40 pb-3">
          <h3 className="font-black text-[#374375] text-base flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#895159]" /> Share Club
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-[#374375]/60 hover:text-[#374375] hover:bg-[#BABDE2]/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3.5 bg-white rounded-2xl border border-[#BABDE2]/30 text-xs space-y-1">
          <span className="font-bold text-[#374375] block line-clamp-1">{club.name}</span>
          <span className="text-slate-500 font-medium block">{club.college}</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3 py-2 bg-white border border-[#BABDE2] rounded-xl text-xs font-mono text-slate-600 focus:outline-none truncate"
            />
            <button
              onClick={handleCopy}
              className="py-2 px-3 bg-[#374375] hover:bg-[#2c365e] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full py-2.5 px-4 bg-[#895159] hover:bg-[#6e4047] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <Globe className="w-4 h-4" />
              <span>Share via Apps</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClubShareModal
