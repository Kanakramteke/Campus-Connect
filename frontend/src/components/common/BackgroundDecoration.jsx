import React from 'react'
import { ASSET_CONFIG } from '../../assets/assetConfig'

export default function BackgroundDecoration({ customBgImage }) {
  const bgImage = customBgImage || ASSET_CONFIG.customBackgroundImage

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#FFFCF5]">
      {/* User Provided Pinterest Background Image Layer */}
      {bgImage ? (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {/* Subtle contrast tint keeping full HD crisp clarity & text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFCF5]/10 via-transparent to-[#374375]/25" />
        </div>
      ) : (
        /* Mountain & Campus Landscape Vector Fallback */
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFCF5] via-[#BABDE2]/40 to-[#BABDE2]" />

          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#FFFCF5] opacity-80 blur-xs shadow-2xl" />

          {/* Birds in Sky */}
          <svg className="absolute top-28 left-[22%] w-16 h-16 text-[#374375] opacity-70" viewBox="0 0 50 30" fill="currentColor">
            <path d="M 0 15 Q 12 0 25 15 Q 38 0 50 15 Q 38 8 25 20 Q 12 8 0 15 Z" />
          </svg>
          <svg className="absolute top-24 right-[20%] w-20 h-20 text-[#374375] opacity-75" viewBox="0 0 50 30" fill="currentColor">
            <path d="M 0 15 Q 12 0 25 15 Q 38 0 50 15 Q 38 8 25 20 Q 12 8 0 15 Z" />
          </svg>

          {/* Layered Mountains */}
          <svg className="absolute bottom-0 inset-x-0 w-full h-[75%] opacity-95" viewBox="0 0 1440 600" preserveAspectRatio="none">
            <path d="M0,280 L200,180 L420,310 L680,140 L960,290 L1200,160 L1440,300 L1440,600 L0,600 Z" fill="#BABDE2" fillOpacity="0.75" />
            <path d="M0,320 L280,200 L540,340 L820,190 L1120,320 L1440,220 L1440,600 L0,600 Z" fill="#DFAEA1" fillOpacity="0.5" />
            <path d="M-50,380 Q 240,260 520,370 T 1100,340 T 1500,420 L1500,600 L-50,600 Z" fill="#895159" fillOpacity="0.65" />
            <path d="M0,450 Q 360,350 720,440 T 1440,400 L1440,600 L0,600 Z" fill="#374375" fillOpacity="0.9" />
          </svg>
        </div>
      )}
    </div>
  )
}
