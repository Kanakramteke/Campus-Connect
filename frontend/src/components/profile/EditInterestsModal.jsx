import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Sparkles, Check } from 'lucide-react'
import { useCampus } from '../../context/CampusContext'

const INTEREST_TAGS = [
  'AI/ML',
  'Hackathons',
  'Web Development',
  'Mobile Apps',
  'Robotics',
  'Cybersecurity',
  'Coding',
  'UI/UX Design',
  'Entrepreneurship',
  'Web3 & Blockchain',
  'Dance',
  'Music',
  'Drama & Theatre',
  'Photography',
  'Gaming & Esports',
  'Sports',
  'Debating',
  'Creative Writing'
]

export default function EditInterestsModal({ isOpen, onClose }) {
  const { user, updateUserInterests } = useCampus()
  const [selectedInterests, setSelectedInterests] = useState(user?.interests || [])

  if (!isOpen) return null

  const toggleInterest = (tag) => {
    if (selectedInterests.includes(tag)) {
      setSelectedInterests(selectedInterests.filter(t => t !== tag))
    } else {
      setSelectedInterests([...selectedInterests, tag])
    }
  }

  const handleSave = () => {
    updateUserInterests(selectedInterests)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#374375]/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#FFFCF5] rounded-3xl border border-[#BABDE2] shadow-2xl w-full max-w-lg overflow-hidden my-8"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#BABDE2]/30 flex items-center justify-between bg-gradient-to-r from-[#FFFCF5] to-[#BABDE2]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#895159] text-[#FFFCF5] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#374375]">Manage Interests</h2>
              <p className="text-xs font-semibold text-[#374375]/75">Select topics & activities you're passionate about.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#374375] hover:bg-[#BABDE2]/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <p className="text-xs font-semibold text-[#374375]/80">
            Selected interests power your personalized recommendation feed for events, clubs, and communities across Nagpur campuses.
          </p>

          <div className="flex flex-wrap items-center gap-2 max-h-[50vh] overflow-y-auto p-1">
            {INTEREST_TAGS.map((tag) => {
              const isSelected = selectedInterests.includes(tag)
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleInterest(tag)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#374375] text-[#FFFCF5] shadow-2xs scale-105 border border-[#374375]'
                      : 'bg-white text-[#374375] border border-[#BABDE2]/60 hover:border-[#BABDE2] hover:bg-[#BABDE2]/20'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#DFAEA1]" />}
                  <span>{tag}</span>
                </button>
              )
            })}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#BABDE2]/30 flex items-center justify-between gap-3">
            <span className="text-xs font-extrabold text-[#895159]">
              {selectedInterests.length} selected
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-2xl bg-[#FFFCF5] hover:bg-[#BABDE2]/20 text-[#374375] border border-[#BABDE2]/60 font-extrabold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="py-2.5 px-6 rounded-2xl bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Interests</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
