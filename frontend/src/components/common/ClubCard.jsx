import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Badge from './Badge'

export default function ClubCard({ club, onClick }) {
  if (!club) return null

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick?.(club)}
      className="bg-[#FFFCF5] rounded-3xl p-5 border border-[#BABDE2]/60 hover:border-[#BABDE2] shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#BABDE2]/40 to-[#DFAEA1]/40 flex items-center justify-center text-2xl shadow-xs group-hover:scale-105 transition-transform">
            {club.logo || '🏛️'}
          </div>
          <Badge variant={club.type === 'cultural' ? 'cultural' : 'technical'}>
            {club.category || (club.type === 'cultural' ? 'Cultural' : 'Technical')}
          </Badge>
        </div>

        <h3 className="text-base font-black text-[#374375] line-clamp-1 group-hover:text-[#895159] transition-colors">
          {club.name}
        </h3>
        <p className="text-xs font-bold text-[#895159] mt-0.5">
          {club.college}
        </p>
        <p className="text-xs text-[#374375]/75 mt-2 line-clamp-2 leading-relaxed">
          {club.shortDescription || club.description}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-[#BABDE2]/20 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-[#374375]/60">
          {club.membersCount ? `${club.membersCount} Members` : 'Active Club'}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClick?.(club)
          }}
          className="py-1.5 px-3.5 rounded-xl bg-[#BABDE2]/30 text-[#374375] font-bold text-xs hover:bg-[#374375] hover:text-[#FFFCF5] transition-colors flex items-center gap-1"
        >
          <span>View Club</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  )
}
