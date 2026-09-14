import React from 'react'
import { motion } from 'framer-motion'
import {
  X, Calendar, Music, Building2, Globe, ArrowRight,
  Sparkles, Layers, CheckCircle2, Shield
} from 'lucide-react'

export default function CreateTypeSelectionModal({ isOpen, onClose, onSelectType, onOpenStudio }) {
  if (!isOpen) return null

  const options = [
    {
      id: 'create-technical-event',
      type: 'event',
      eventType: 'technical',
      title: 'Technical Event',
      category: 'Hackathons, Coding, Workshops',
      description: 'Host hackathons, speed coding contests, hardware exhibitions, and technical masterclasses for Nagpur students.',
      icon: Calendar,
      accentColor: 'border-[#374375] bg-[#374375]/5 text-[#374375]',
      badge: 'Technical',
      badgeStyle: 'bg-[#374375] text-[#FFFCF5]'
    },
    {
      id: 'create-cultural-event',
      type: 'event',
      eventType: 'cultural',
      title: 'Cultural Event',
      category: 'Fests, Concerts, Dance, Drama',
      description: 'Organize inter-college cultural fests, Battle of the Bands, street dance cyphers, and drama slams.',
      icon: Music,
      accentColor: 'border-[#895159] bg-[#895159]/5 text-[#895159]',
      badge: 'Cultural',
      badgeStyle: 'bg-[#895159] text-[#FFFCF5]'
    },
    {
      id: 'create-club',
      type: 'club',
      title: 'Campus Club',
      category: 'Student Societies & Chapters',
      description: 'Establish a new student society, robotics chapter, music club, or dance crew across Nagpur campuses.',
      icon: Building2,
      accentColor: 'border-[#374375] bg-[#374375]/5 text-[#374375]',
      badge: 'Club',
      badgeStyle: 'bg-[#BABDE2] text-[#374375]'
    },
    {
      id: 'create-community',
      type: 'community',
      title: 'Student Community',
      category: 'Interest-based Discussion Hubs',
      description: 'Create an open interest group for coding, AI/ML, photography, gaming, startups, or literature.',
      icon: Globe,
      accentColor: 'border-[#895159] bg-[#895159]/5 text-[#895159]',
      badge: 'Community',
      badgeStyle: 'bg-[#DFAEA1] text-[#374375]'
    }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#374375]/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-[#FFFCF5] w-full max-w-3xl rounded-3xl border border-[#BABDE2] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-[#BABDE2]/40 flex items-center justify-between bg-gradient-to-r from-[#FFFCF5] to-[#BABDE2]/20">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#374375] text-[#FFFCF5] text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#DFAEA1]" />
              <span>Campus Connect Creator Studio</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#374375] tracking-tight">
              What do you want to create?
            </h2>
            <p className="text-xs font-semibold text-[#374375]/80">
              Select content type to start building your student-facing experience.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#BABDE2]/30 text-[#374375] hover:bg-[#895159] hover:text-[#FFFCF5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options Grid */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {options.map((opt) => {
              const IconComp = opt.icon
              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    onSelectType(opt.type, opt.eventType)
                    onClose()
                  }}
                  className={`p-5 rounded-2xl border-2 hover:border-[#374375] bg-white hover:bg-[#FFFCF5] shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-3 relative overflow-hidden`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 ${opt.accentColor}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${opt.badgeStyle}`}>
                        {opt.badge}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-black text-[#374375] group-hover:text-[#895159] transition-colors">
                        {opt.title}
                      </h3>
                      <span className="text-[11px] font-bold text-[#895159] block">
                        {opt.category}
                      </span>
                    </div>

                    <p className="text-xs text-[#374375]/80 font-medium leading-relaxed">
                      {opt.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center text-xs font-extrabold text-[#374375] group-hover:text-[#895159] transition-colors">
                    <span>Build Form & Preview</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Modal Footer with Creator Studio Link */}
        <div className="p-4 px-6 border-t border-[#BABDE2]/40 bg-[#BABDE2]/15 flex items-center justify-between text-xs font-bold text-[#374375]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#895159]" />
            <span>Already have content?</span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (onOpenStudio) onOpenStudio()
              onClose()
            }}
            className="py-2 px-4 rounded-xl bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <span>Manage My Content & Drafts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
