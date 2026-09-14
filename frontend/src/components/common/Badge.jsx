import React from 'react'

export default function Badge({ children, variant = 'default', className = '' }) {
  const variantStyles = {
    default: 'bg-[#BABDE2]/30 text-[#374375] border border-[#BABDE2]/60',
    technical: 'bg-[#BABDE2]/40 text-[#374375] border border-[#BABDE2]',
    cultural: 'bg-[#DFAEA1]/40 text-[#895159] border border-[#DFAEA1]',
    navy: 'bg-[#374375] text-[#FFFCF5]',
    maroon: 'bg-[#895159] text-[#FFFCF5]',
    peach: 'bg-[#DFAEA1] text-[#374375]',
    periwinkle: 'bg-[#BABDE2] text-[#374375]',
    registered: 'bg-[#BABDE2]/50 text-[#374375] border border-[#374375]/20 font-bold',
    free: 'bg-emerald-500/15 text-emerald-800 border border-emerald-500/30'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-all ${variantStyles[variant] || variantStyles.default} ${className}`}>
      {children}
    </span>
  )
}
