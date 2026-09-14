import React from 'react'
import { Code, Music, Terminal, Sparkles } from 'lucide-react'

export default function EventHero({ type = 'technical', title, description }) {
  const isTechnical = type === 'technical'

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border shadow-xs relative overflow-hidden transition-all ${
      isTechnical
        ? 'bg-gradient-to-r from-[#FFFCF5] via-[#FFFCF5] to-[#BABDE2]/30 border-[#BABDE2]'
        : 'bg-gradient-to-r from-[#FFFCF5] via-[#FFFCF5] to-[#DFAEA1]/30 border-[#DFAEA1]'
    }`}>
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="max-w-2xl">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold mb-3 ${
            isTechnical
              ? 'bg-[#BABDE2]/40 text-[#374375]'
              : 'bg-[#DFAEA1]/40 text-[#895159]'
          }`}>
            {isTechnical ? <Terminal className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span>{isTechnical ? 'Technical Discovery' : 'Cultural Discovery'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#374375] tracking-tight">
            {title || (isTechnical ? 'Technical Events' : 'Cultural Events')}
          </h1>

          <p className="text-xs sm:text-sm font-semibold text-[#374375]/80 mt-2 leading-relaxed">
            {description || (isTechnical
              ? 'Explore opportunities to learn, compete and connect with tech enthusiasts across Nagpur.'
              : 'Discover celebrations, performances and creative experiences happening across Nagpur.')}
          </p>
        </div>

        <div className={`w-14 h-14 rounded-2xl hidden sm:flex items-center justify-center shrink-0 shadow-sm ${
          isTechnical ? 'bg-[#374375] text-[#FFFCF5]' : 'bg-[#895159] text-[#FFFCF5]'
        }`}>
          {isTechnical ? <Code className="w-7 h-7" /> : <Music className="w-7 h-7" />}
        </div>
      </div>
    </div>
  )
}
