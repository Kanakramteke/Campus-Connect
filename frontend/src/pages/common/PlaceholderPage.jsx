import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowLeft } from 'lucide-react'

export default function PlaceholderPage({ title, description, onNavigate }) {
  return (
    <div className="space-y-6">
      <button
        onClick={() => onNavigate?.('dashboard')}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#BABDE2]/30 text-[#374375] font-bold text-xs hover:bg-[#374375] hover:text-[#FFFCF5] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#FFFCF5] rounded-3xl p-8 sm:p-14 border border-[#BABDE2] shadow-sm text-center flex flex-col items-center justify-center space-y-4 max-w-2xl mx-auto my-12"
      >
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#BABDE2] to-[#DFAEA1] text-[#374375] flex items-center justify-center shadow-md">
          <Sparkles className="w-8 h-8 text-[#374375]" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-[#374375] tracking-tight">
          {title || 'Section Name'}
        </h2>

        <p className="text-sm sm:text-base text-[#374375]/80 font-medium max-w-md leading-relaxed">
          {description || "Explore full details, active filters, and interactive features."}
        </p>

        <div className="pt-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#895159]/15 text-[#895159] font-extrabold text-xs tracking-wide">
            Coming in the next phase
          </span>
        </div>
      </motion.div>
    </div>
  )
}
