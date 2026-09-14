import React from 'react'
import { FolderOpen } from 'lucide-react'

export default function EmptyState({
  title = 'No items found',
  description = "There's nothing to display right now.",
  actionText,
  onAction,
  icon: CustomIcon
}) {
  const IconComponent = CustomIcon || FolderOpen

  return (
    <div className="bg-[#FFFCF5] rounded-3xl p-8 border border-dashed border-[#BABDE2] text-center flex flex-col items-center justify-center space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-[#BABDE2]/30 text-[#374375] flex items-center justify-center">
        <IconComponent className="w-6 h-6 text-[#374375]" />
      </div>
      <h3 className="text-base font-extrabold text-[#374375]">{title}</h3>
      <p className="text-xs sm:text-sm text-[#374375]/70 max-w-sm leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-5 py-2.5 rounded-2xl bg-[#374375] text-[#FFFCF5] text-xs font-bold hover:bg-[#895159] transition-colors shadow-xs"
        >
          {actionText}
        </button>
      )}
    </div>
  )
}
