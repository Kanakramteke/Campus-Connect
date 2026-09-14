import React from 'react'
import { Menu } from 'lucide-react'
import ProfileMenu from '../common/ProfileMenu'

export default function TopHeader({ onToggleMobileMenu, onNavigate, pageTitle = 'Dashboard' }) {
  return (
    <header className="sticky top-0 z-20 w-full bg-[#FFFCF5]/90 backdrop-blur-md border-b border-[#BABDE2]/40 px-4 sm:px-8 py-4 flex items-center justify-between transition-all">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-xl text-[#374375] hover:bg-[#BABDE2]/30 transition-colors focus:outline-none"
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-black text-[#374375] tracking-tight capitalize">
            {pageTitle}
          </h1>
          <p className="text-[11px] font-semibold text-[#895159] hidden sm:block">
            Nagpur Student Portal
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <ProfileMenu onNavigate={onNavigate} />
      </div>
    </header>
  )
}
