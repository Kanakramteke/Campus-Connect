import React from 'react'
import { motion } from 'framer-motion'
import { Code, Music, Users, MessageSquare, ArrowRight } from 'lucide-react'

export default function DiscoveryCard({ id, title, description, buttonText, onClick, variant = 'default' }) {
  const iconMap = {
    technical: <Code className="w-6 h-6 text-[#374375]" />,
    cultural: <Music className="w-6 h-6 text-[#895159]" />,
    clubs: <Users className="w-6 h-6 text-[#374375]" />,
    communities: <MessageSquare className="w-6 h-6 text-[#374375]" />
  }

  const stylesMap = {
    technical: {
      cardBg: 'bg-gradient-to-br from-[#FFFCF5] via-[#FFFCF5] to-[#BABDE2]/30 border-[#BABDE2]',
      badgeBg: 'bg-[#BABDE2]/40 text-[#374375]',
      btnBg: 'bg-[#374375] text-[#FFFCF5] hover:bg-[#895159]'
    },
    cultural: {
      cardBg: 'bg-gradient-to-br from-[#FFFCF5] via-[#FFFCF5] to-[#DFAEA1]/30 border-[#DFAEA1]',
      badgeBg: 'bg-[#DFAEA1]/40 text-[#895159]',
      btnBg: 'bg-[#895159] text-[#FFFCF5] hover:bg-[#374375]'
    },
    clubs: {
      cardBg: 'bg-[#FFFCF5] border-[#BABDE2]/60 hover:border-[#BABDE2]',
      badgeBg: 'bg-[#BABDE2]/30 text-[#374375]',
      btnBg: 'bg-[#374375] text-[#FFFCF5] hover:bg-[#895159]'
    },
    communities: {
      cardBg: 'bg-[#FFFCF5] border-[#BABDE2]/60 hover:border-[#BABDE2]',
      badgeBg: 'bg-[#DFAEA1]/30 text-[#374375]',
      btnBg: 'bg-[#374375] text-[#FFFCF5] hover:bg-[#895159]'
    }
  }

  const currentStyle = stylesMap[variant] || stylesMap.clubs

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`p-6 rounded-3xl border shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between ${currentStyle.cardBg} group`}
    >
      <div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${currentStyle.badgeBg}`}>
          {iconMap[variant] || <Code className="w-6 h-6 text-[#374375]" />}
        </div>
        <h3 className="text-xl font-black text-[#374375] mb-2 tracking-tight group-hover:text-[#895159] transition-colors">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#374375]/80 font-medium leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onClick?.()
        }}
        className={`w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-xs ${currentStyle.btnBg}`}
      >
        <span>{buttonText}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  )
}
