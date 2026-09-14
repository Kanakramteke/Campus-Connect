import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, Bell, User, Settings, LogOut, X, PlusCircle } from 'lucide-react'
import { useCampus } from '../../context/CampusContext'

export default function Sidebar({ currentRoute, onNavigate, onSignOut, isOpenMobile, onCloseMobile }) {
  const { unreadNotificationsCount } = useCampus()

  const navItems = [
    {
      id: 'creator',
      label: 'Create',
      icon: PlusCircle
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : null
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings
    }
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#FFFCF5] border-r border-[#BABDE2]/40 text-[#374375] shadow-xl">
      {/* Top Branding Section */}
      <div className="p-6 border-b border-[#BABDE2]/30 flex items-center justify-between">
        <button
          onClick={() => {
            onNavigate('dashboard')
            if (onCloseMobile) onCloseMobile()
          }}
          className="flex items-center gap-3 group focus:outline-none text-left"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#374375] to-[#895159] text-[#FFFCF5] flex items-center justify-center font-black text-lg shadow-md group-hover:scale-105 transition-transform">
            CC
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-[#374375]">
              Campus <span className="text-[#895159]">Connect</span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-[#895159]/80 uppercase">
              Nagpur Hub
            </span>
          </div>
        </button>

        {/* Close button for mobile drawer */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-2 rounded-xl text-[#374375] hover:bg-[#BABDE2]/30 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation List - STRICTLY 4 ITEMS + LOGOUT AT BOTTOM */}
      <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-extrabold uppercase tracking-wider text-[#895159]/70">
          Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentRoute === item.id || (item.id === 'dashboard' && ['technical', 'cultural', 'clubs', 'communities', 'events', 'event-details', 'club-details', 'community-details'].includes(currentRoute))
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id)
                if (onCloseMobile) onCloseMobile()
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-[#BABDE2]/40 text-[#374375] border border-[#BABDE2] shadow-xs translate-x-0.5'
                  : 'text-[#374375]/80 hover:bg-[#BABDE2]/20 hover:text-[#374375]'
              }`}
            >
              <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#374375]' : 'text-[#374375]/70'}`} />
              <span>{item.label}</span>
              {item.badge ? (
                <span className="ml-auto px-2 py-0.5 rounded-full bg-[#895159] text-[#FFFCF5] text-[10px] font-black">
                  {item.badge}
                </span>
              ) : isActive ? (
                <div className="ml-auto w-2 h-2 rounded-full bg-[#895159]" />
              ) : null}
            </button>
          )
        })}
      </div>

      {/* Bottom Logout Button */}
      <div className="p-4 border-t border-[#BABDE2]/30 bg-[#FFFCF5]">
        <button
          onClick={() => {
            if (onCloseMobile) onCloseMobile()
            onSignOut()
          }}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-extrabold text-sm text-[#895159] hover:bg-[#895159] hover:text-[#FFFCF5] transition-all duration-200 group border border-[#895159]/30"
        >
          <LogOut className="w-5 h-5 text-[#895159] group-hover:text-[#FFFCF5] transition-colors" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 left-0 shrink-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Slide-Out Drawer */}
      <AnimatePresence>
        {isOpenMobile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 bg-[#374375]/50 backdrop-blur-xs z-50 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 max-w-[85vw] z-50 md:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
