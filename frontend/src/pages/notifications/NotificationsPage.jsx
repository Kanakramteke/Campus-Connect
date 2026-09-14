import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, CheckCheck, Trash2, Sparkles, RefreshCw, AlertCircle } from 'lucide-react'
import { useCampus } from '../../context/CampusContext'

import NotificationCard from '../../components/notifications/NotificationCard'
import NotificationFilters from '../../components/notifications/NotificationFilters'
import NotificationSkeleton from '../../components/notifications/NotificationSkeleton'
import NotificationEmptyState from '../../components/notifications/NotificationEmptyState'

export default function NotificationsPage({ onNavigate }) {
  const { 
    notifications, 
    unreadNotificationsCount, 
    markAllNotificationsRead, 
    clearAllNotifications 
  } = useCampus()

  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Filter & Search Logic
  const filteredNotifications = notifications.filter((notif) => {
    // 1. Category / State filter
    if (activeFilter === 'unread' && notif.isRead) return false
    if (activeFilter !== 'all' && activeFilter !== 'unread' && notif.category !== activeFilter) return false

    // 2. Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase()
      const titleMatch = notif.title?.toLowerCase().includes(q)
      const msgMatch = notif.message?.toLowerCase().includes(q)
      const catMatch = notif.category?.toLowerCase().includes(q)
      return titleMatch || msgMatch || catMatch
    }

    return true
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-16 max-w-5xl mx-auto"
    >
      {/* 1. HERO HEADER */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-[#FFFCF5] via-[#FFFCF5] to-[#BABDE2]/25 p-6 sm:p-8 rounded-3xl border border-[#BABDE2]/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BABDE2]/30 text-[#374375] text-xs font-extrabold">
            <Bell className="w-3.5 h-3.5 text-[#895159]" />
            <span>Activity & Updates Hub</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#374375] tracking-tight">
              Notifications
            </h1>
            {unreadNotificationsCount > 0 && (
              <span className="px-3 py-1 rounded-full bg-[#895159] text-[#FFFCF5] text-xs font-black shadow-xs">
                {unreadNotificationsCount} Unread
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm font-semibold text-[#374375]/80 max-w-xl">
            Stay updated with your events, payment receipts, club announcements, community discussions, and Campus Connect alerts.
          </p>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
          {unreadNotificationsCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="py-2.5 px-4 rounded-2xl bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs transition-all duration-200 flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark all as read</span>
            </button>
          )}

          {notifications.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all notifications?')) {
                  clearAllNotifications()
                }
              }}
              className="py-2.5 px-3.5 rounded-2xl bg-[#FFFCF5] hover:bg-[#895159]/10 text-[#895159] border border-[#895159]/30 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Clear all notifications"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear All</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* 2. FILTERS & SEARCH */}
      <motion.section variants={itemVariants}>
        <NotificationFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          unreadCount={unreadNotificationsCount}
          notifications={notifications}
        />
      </motion.section>

      {/* 3. MAIN CONTENT: SKELETON / ERROR / LIST / EMPTY */}
      <motion.section variants={itemVariants}>
        {isLoading ? (
          <NotificationSkeleton />
        ) : hasError ? (
          <div className="bg-[#FFFCF5] rounded-3xl p-8 sm:p-12 border border-[#895159]/40 text-center space-y-4 max-w-md mx-auto my-8">
            <div className="w-14 h-14 rounded-2xl bg-[#895159]/10 text-[#895159] flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-[#374375]">Unable to load notifications</h3>
              <p className="text-xs sm:text-sm text-[#374375]/75 font-semibold">
                Something went wrong while fetching your notification feed.
              </p>
            </div>
            <button
              onClick={() => setHasError(false)}
              className="py-2.5 px-5 rounded-2xl bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        ) : notifications.length === 0 ? (
          <NotificationEmptyState
            isFilter={false}
            onExplore={() => onNavigate('dashboard')}
          />
        ) : filteredNotifications.length === 0 ? (
          <NotificationEmptyState
            isFilter={true}
            onClearFilters={() => {
              setActiveFilter('all')
              setSearchQuery('')
            }}
          />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-extrabold text-[#374375]/60 px-1 uppercase tracking-wider">
              <span>Showing {filteredNotifications.length} Notifications</span>
              {activeFilter !== 'all' && (
                <span className="text-[#895159]">Filtered by: {activeFilter}</span>
              )}
            </div>

            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 gap-4">
                {filteredNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </AnimatePresence>
          </div>
        )}
      </motion.section>
    </motion.div>
  )
}
