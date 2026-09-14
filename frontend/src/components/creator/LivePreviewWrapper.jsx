import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Edit3, Send, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react'

export default function LivePreviewWrapper({ children, entityType = 'Event', onBackToEdit, onPublish, isSubmitting = false }) {
  return (
    <div className="space-y-6">
      {/* Top Banner Bar for Live Preview Mode */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-16 z-30 bg-[#374375] text-[#FFFCF5] p-4 px-6 rounded-2xl border-2 border-[#BABDE2] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#895159] text-[#FFFCF5] flex items-center justify-center shrink-0 shadow-xs">
            <Eye className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#DFAEA1]">
                Live Student View Preview Mode
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-900 font-extrabold text-[10px]">
                Draft / Preview
              </span>
            </div>
            <p className="text-xs text-white/90 font-semibold">
              This is exactly how students across Nagpur will see your {entityType}.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={onBackToEdit}
            className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-[#BABDE2]/30 hover:bg-[#BABDE2]/50 text-[#FFFCF5] font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>Back to Edit</span>
          </button>

          <button
            type="button"
            onClick={onPublish}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-[#895159] hover:bg-rose-700 text-[#FFFCF5] font-black text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Publishing...' : 'Publish Content Now'}</span>
          </button>
        </div>
      </motion.div>

      {/* Rendered Student-Facing Detail Page */}
      <div className="relative">
        {children}
      </div>
    </div>
  )
}
