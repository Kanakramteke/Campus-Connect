import React, { useState, useRef, useEffect } from 'react'
import { User, Ticket, Settings, ChevronDown, Sparkles } from 'lucide-react'
import { useCampus } from '../../context/CampusContext'

export default function ProfileMenu({ onNavigate }) {
  const { user } = useCampus()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  const studentName = user?.fullName || 'Student'
  const initials = studentName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-[#BABDE2]/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#BABDE2] group text-left cursor-pointer"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#374375] to-[#895159] text-[#FFFCF5] flex items-center justify-center font-black text-xs shadow-sm ring-2 ring-[#FFFCF5]">
          {initials || <User className="w-4 h-4" />}
        </div>
        <div className="hidden sm:flex flex-col">
          <span className="text-xs font-bold text-[#374375] group-hover:text-[#895159] transition-colors truncate max-w-[120px]">
            {studentName}
          </span>
          <span className="text-[10px] font-semibold text-[#895159]">
            Student / Creator
          </span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#BABDE2]/40 py-2 z-50 animate-scaleUp text-xs font-semibold text-[#374375]">
          <div className="px-4 py-2 border-b border-slate-100">
            <span className="font-bold block text-sm">{studentName}</span>
            <span className="text-[10px] text-slate-500 font-medium block truncate">{user?.email}</span>
          </div>

          <button
            onClick={() => {
              setIsOpen(false)
              onNavigate?.('profile')
            }}
            className="w-full text-left px-4 py-2.5 hover:bg-[#BABDE2]/20 flex items-center gap-2.5 transition-colors cursor-pointer"
          >
            <User className="w-4 h-4 text-[#374375]" /> My Profile
          </button>

          <button
            onClick={() => {
              setIsOpen(false)
              onNavigate?.('creator')
            }}
            className="w-full text-left px-4 py-2.5 hover:bg-[#BABDE2]/20 flex items-center gap-2.5 transition-colors font-extrabold text-[#374375] bg-[#BABDE2]/20 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#895159]" /> Creator Studio
          </button>

          <button
            onClick={() => {
              setIsOpen(false)
              onNavigate?.('my-events')
            }}
            className="w-full text-left px-4 py-2.5 hover:bg-[#BABDE2]/20 flex items-center gap-2.5 transition-colors font-extrabold text-[#374375] cursor-pointer"
          >
            <Ticket className="w-4 h-4 text-[#895159]" /> My Enrolled Events
          </button>

          <button
            onClick={() => {
              setIsOpen(false)
              onNavigate?.('settings')
            }}
            className="w-full text-left px-4 py-2.5 hover:bg-[#BABDE2]/20 flex items-center gap-2.5 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4 text-slate-500" /> Settings
          </button>
        </div>
      )}
    </div>
  )
}
