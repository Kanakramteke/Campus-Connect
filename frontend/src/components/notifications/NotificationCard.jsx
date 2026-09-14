import React from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  CreditCard, 
  Building2, 
  Globe, 
  Bell, 
  ArrowRight, 
  Check, 
  Trash2, 
  RotateCcw,
  Clock
} from 'lucide-react'
import { useCampus } from '../../context/CampusContext'

const formatTimeAgo = (dateInput) => {
  if (!dateInput) return 'Recent'
  const date = new Date(dateInput)
  if (isNaN(date.getTime())) return dateInput

  const diffMs = Date.now() - date.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  if (diffSecs < 60) return 'Just now'
  const diffMins = Math.floor(diffSecs / 60)
  if (diffMins < 60) return `${diffMins}m ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function NotificationCard({ notification, onNavigate }) {
  const { markNotificationRead, markNotificationUnread, deleteNotification } = useCampus()

  if (!notification) return null

  const isRead = notification.isRead

  // Config mapping categories to Lucide icons & styling
  const getCategoryConfig = (category) => {
    switch (category) {
      case 'events':
        return {
          icon: Calendar,
          badge: 'Events',
          badgeStyle: 'bg-[#374375]/10 text-[#374375] border-[#374375]/20'
        }
      case 'payments':
        return {
          icon: CreditCard,
          badge: 'Payment',
          badgeStyle: 'bg-[#895159]/10 text-[#895159] border-[#895159]/20'
        }
      case 'clubs':
        return {
          icon: Building2,
          badge: 'Club',
          badgeStyle: 'bg-[#374375]/10 text-[#374375] border-[#374375]/20'
        }
      case 'communities':
        return {
          icon: Globe,
          badge: 'Community',
          badgeStyle: 'bg-[#DFAEA1]/40 text-[#374375] border-[#DFAEA1]/60'
        }
      case 'system':
      default:
        return {
          icon: Bell,
          badge: 'Campus Connect',
          badgeStyle: 'bg-[#BABDE2]/40 text-[#374375] border-[#BABDE2]'
        }
    }
  }

  const config = getCategoryConfig(notification.category)
  const CategoryIcon = config.icon

  const handleCardClick = () => {
    if (!isRead) {
      markNotificationRead(notification.id)
    }
    if (notification.actionRoute && onNavigate) {
      const entityId = notification.actionParams?.eventId || 
                       notification.actionParams?.clubId || 
                       notification.actionParams?.communityId || 
                       notification.relatedEntityId
      onNavigate(notification.actionRoute, entityId)
    }
  }

  const handleActionClick = (e) => {
    e.stopPropagation()
    handleCardClick()
  }

  const handleToggleRead = (e) => {
    e.stopPropagation()
    if (isRead) {
      markNotificationUnread(notification.id)
    } else {
      markNotificationRead(notification.id)
    }
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    deleteNotification(notification.id)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={handleCardClick}
      className={`rounded-3xl p-5 sm:p-6 border transition-all duration-200 cursor-pointer group relative overflow-hidden flex items-start gap-4 ${
        !isRead 
          ? 'bg-[#FFFCF5] border-[#BABDE2] shadow-sm hover:shadow-md' 
          : 'bg-[#FFFCF5]/70 border-[#BABDE2]/40 opacity-90 hover:opacity-100 hover:border-[#BABDE2] shadow-2xs'
      }`}
    >
      {/* Accent strip for unread */}
      {!isRead && (
        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#895159] rounded-l-full" />
      )}

      {/* Left Column: Category Icon Container */}
      <div className="w-11 h-11 rounded-2xl bg-[#BABDE2]/30 text-[#374375] flex items-center justify-center font-bold shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
        <CategoryIcon className="w-5 h-5 text-[#374375]" />
      </div>

      {/* Center Column: Content */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${config.badgeStyle}`}>
            {config.badge}
          </span>
          <span className="text-[11px] font-bold text-[#374375]/60 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{formatTimeAgo(notification.createdAt || notification.timestamp)}</span>
          </span>
          {!isRead && (
            <span className="w-2.5 h-2.5 rounded-full bg-[#895159] shrink-0" title="Unread" />
          )}
        </div>

        <h3 className={`text-base leading-snug text-[#374375] group-hover:text-[#895159] transition-colors ${
          !isRead ? 'font-black' : 'font-extrabold'
        }`}>
          {notification.title}
        </h3>

        <p className="text-xs sm:text-sm text-[#374375]/80 font-medium leading-relaxed">
          {notification.message}
        </p>

        {/* Action CTA Button */}
        {notification.actionRoute && (
          <div className="pt-2">
            <button
              type="button"
              onClick={handleActionClick}
              className="py-1.5 px-3.5 rounded-xl bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs transition-colors inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <span>{notification.actionLabel || 'View Details'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Right Column: Actions */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onClick={handleToggleRead}
          className="p-2 rounded-xl text-[#374375]/60 hover:text-[#374375] hover:bg-[#BABDE2]/30 transition-colors cursor-pointer"
          title={isRead ? "Mark as unread" : "Mark as read"}
        >
          {isRead ? (
            <RotateCcw className="w-4 h-4 text-[#895159]" />
          ) : (
            <Check className="w-4 h-4 text-emerald-600" />
          )}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          title="Delete notification"
          className="p-2 rounded-xl text-[#374375]/40 hover:text-[#895159] hover:bg-[#895159]/10 transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}
