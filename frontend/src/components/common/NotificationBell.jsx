import React, { useState, useRef, useEffect } from 'react'
import { 
  Bell, 
  Check, 
  ExternalLink, 
  Calendar, 
  CreditCard, 
  Users, 
  MessageSquare, 
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { useCampus } from '../../context/CampusContext'

export default function NotificationBell({ onNavigate }) {
  const { notifications, unreadNotificationsCount, markNotificationRead, markAllNotificationsRead } = useCampus()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'events': return Calendar
      case 'payments': return CreditCard
      case 'clubs': return Users
      case 'communities': return MessageSquare
      default: return Sparkles
    }
  }

  const handleNotificationClick = (notif) => {
    if (!notif.isRead) {
      markNotificationRead(notif.id)
    }
    setIsOpen(false)

    if (notif.actionRoute && onNavigate) {
      const entityId = notif.actionParams?.eventId || 
                       notif.actionParams?.clubId || 
                       notif.actionParams?.communityId || 
                       notif.relatedEntityId
      onNavigate(notif.actionRoute, entityId)
    } else {
      onNavigate?.('notifications')
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Notifications (${unreadNotificationsCount} unread)`}
        className="relative p-2.5 rounded-2xl text-[#374375] hover:bg-[#BABDE2]/30 transition-colors focus:outline-none focus:ring-2 focus:ring-[#BABDE2] cursor-pointer"
      >
        <Bell className="w-5 h-5 text-[#374375]" />
        {unreadNotificationsCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#895159] text-[#FFFCF5] text-[10px] font-black flex items-center justify-center animate-pulse">
            {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#FFFCF5] rounded-3xl shadow-2xl border border-[#BABDE2] py-4 z-50 overflow-hidden text-[#374375] animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="px-5 pb-3 border-b border-[#BABDE2]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-black text-base text-[#374375]">Notifications</h3>
              {unreadNotificationsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#895159] text-[#FFFCF5] text-[10px] font-black">
                  {unreadNotificationsCount} unread
                </span>
              )}
            </div>
            {unreadNotificationsCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs font-bold text-[#895159] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-[#BABDE2]/20">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-xs font-bold text-[#374375]/70">
                You're all caught up! No notifications right now.
              </div>
            ) : (
              notifications.slice(0, 5).map((notif) => {
                const Icon = getCategoryIcon(notif.category)
                return (
                  <div
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    className={`p-4 hover:bg-[#BABDE2]/20 cursor-pointer transition-colors flex items-start gap-3 relative ${
                      !notif.isRead ? 'bg-[#BABDE2]/15' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#374375]/10 text-[#374375] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      <Icon className="w-4 h-4 text-[#374375]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className={`text-xs text-[#374375] truncate ${!notif.isRead ? 'font-black' : 'font-bold'}`}>
                          {notif.title}
                        </p>
                        {!notif.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#895159] shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-[#374375]/80 mt-0.5 line-clamp-2 leading-relaxed font-medium">
                        {notif.message}
                      </p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[10px] text-[#374375]/60 font-semibold">{notif.timestamp || 'Recent'}</span>
                        {notif.actionRoute && (
                          <span className="text-[10px] font-black text-[#895159] hover:underline inline-flex items-center gap-0.5">
                            {notif.actionLabel || 'View'} <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Footer */}
          <div className="pt-3 px-4 border-t border-[#BABDE2]/30 text-center">
            <button
              onClick={() => {
                onNavigate?.('notifications')
                setIsOpen(false)
              }}
              className="w-full py-2 px-3 rounded-xl bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <span>View All Notifications</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
