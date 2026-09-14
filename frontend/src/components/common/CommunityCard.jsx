import React from 'react'
import { motion } from 'framer-motion'
import { Users, ArrowRight } from 'lucide-react'
import Badge from './Badge'

export default function CommunityCard({ community, onClick }) {
  if (!community) return null

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick?.(community)}
      className="bg-[#FFFCF5] rounded-3xl p-5 border border-[#BABDE2]/60 hover:border-[#BABDE2] shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <Badge variant={community.type === 'cultural' ? 'cultural' : 'technical'}>
            {community.category || 'Community'}
          </Badge>
          <div className="flex items-center gap-1 text-xs font-bold text-[#895159]">
            <Users className="w-3.5 h-3.5" />
            <span>{community.membersCount || 500}+</span>
          </div>
        </div>

        <h3 className="text-base font-black text-[#374375] line-clamp-1 group-hover:text-[#895159] transition-colors">
          {community.name}
        </h3>

        <p className="text-xs text-[#374375]/80 mt-2 line-clamp-2 leading-relaxed">
          {community.shortDescription || community.description}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-[#BABDE2]/20">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClick?.(community)
          }}
          className="w-full py-2 px-3 rounded-xl bg-[#374375] text-[#FFFCF5] font-bold text-xs hover:bg-[#895159] transition-colors flex items-center justify-center gap-1.5"
        >
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  )
}
