import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function ErrorState({
  title = 'Unable to load content',
  message = 'An unexpected error occurred while fetching data. Please try again.',
  onRetry
}) {
  return (
    <div className="bg-[#FFFCF5] rounded-3xl p-8 border border-[#895159]/30 text-center flex flex-col items-center justify-center space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-[#895159]/15 text-[#895159] flex items-center justify-center">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-extrabold text-[#374375]">{title}</h3>
      <p className="text-xs sm:text-sm text-[#374375]/75 max-w-md leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-5 py-2.5 rounded-2xl bg-[#895159] text-[#FFFCF5] text-xs font-bold hover:bg-[#374375] transition-colors flex items-center gap-2 shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  )
}
