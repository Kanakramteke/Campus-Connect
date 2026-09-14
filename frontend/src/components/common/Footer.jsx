import React from 'react'

export default function Footer({ onNavigate }) {
  return (
    <footer className="relative z-10 border-t border-[#BABDE2]/40 bg-[#FFFCF5]/80 backdrop-blur-md py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#374375]">
        <div>
          Campus Connect &copy; {new Date().getFullYear()} — Built for Students.
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate && onNavigate('privacy')} className="hover:text-[#895159]">Privacy Policy</button>
          <button onClick={() => onNavigate && onNavigate('terms')} className="hover:text-[#895159]">Terms of Service</button>
        </div>
      </div>
    </footer>
  )
}
