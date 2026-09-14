import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CampusProvider } from './context/CampusContext'
import { removeToken } from './api/apiClient'
import AuthLandingPage from './pages/auth/AuthLandingPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import CampusDashboard from './pages/auth/CampusDashboard'
import AppLayout from './components/layout/AppLayout'
import PlaceholderPage from './pages/common/PlaceholderPage'
import EventDiscoveryPage from './pages/events/EventDiscoveryPage'
import EventDetailsPage from './pages/events/EventDetailsPage'
import PaymentPage from './pages/payment/PaymentPage'
import MyEventsPage from './pages/my-events/MyEventsPage'
import ClubsPage from './pages/clubs/ClubsPage'
import ClubDetailsPage from './pages/clubs/ClubDetailsPage'
import CommunitiesPage from './pages/communities/CommunitiesPage'
import CommunityDetailsPage from './pages/communities/CommunityDetailsPage'
import NotificationsPage from './pages/notifications/NotificationsPage'
import ProfilePage from './pages/profile/ProfilePage'
import SettingsPage from './pages/settings/SettingsPage'
import CreatorStudioPage from './pages/creator/CreatorStudioPage'

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('login')
  const [selectedEventId, setSelectedEventId] = useState(null)
  const [user, setUser] = useState(null)

  const handleNavigate = (route, eventId = null) => {
    if (eventId) {
      setSelectedEventId(eventId)
    }
    setCurrentRoute(route)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLoginSuccess = (userData) => {
    setUser(userData)
    setCurrentRoute('dashboard')
  }

  const handleRegisterSuccess = (userData) => {
    setUser(userData)
    setCurrentRoute('dashboard')
  }

  const handleSignOut = () => {
    removeToken()
    localStorage.removeItem('cc_student_user')
    setUser(null)
    setCurrentRoute('landing')
  }

  const pageVariants = {
    initial: { opacity: 0, scale: 0.99 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.99 }
  }

  const isAuthenticatedRoute = [
    'dashboard', 'notifications', 'profile', 'settings', 'creator',
    'technical', 'cultural', 'clubs', 'club-details', 'communities', 'community-details', 'events',
    'payment', 'my-events'
  ].includes(currentRoute)

  const getPageTitle = (route) => {
    switch (route) {
      case 'dashboard': return 'Dashboard'
      case 'notifications': return 'Notifications'
      case 'profile': return 'Profile'
      case 'settings': return 'Settings'
      case 'creator': return 'Creator Studio & Management'
      case 'technical': return 'Technical Events'
      case 'cultural': return 'Cultural Events'
      case 'clubs': return 'Explore Campus Clubs'
      case 'club-details': return 'Club Details'
      case 'communities': return 'Student Communities'
      case 'community-details': return 'Community Feed & Details'
      case 'events': return 'Event Details'
      case 'payment': return 'Event Checkout & Payment'
      case 'my-events': return 'My Enrolled Events'
      default: return 'Campus Connect'
    }
  }

  const getPlaceholderConfig = (route) => {
    switch (route) {
      default:
        return { title: 'Feature Module', description: 'This module will be fully activated in the next phase.' }
    }
  }

  const renderContent = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <CampusDashboard onNavigate={handleNavigate} />
      case 'notifications':
        return <NotificationsPage onNavigate={handleNavigate} />
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />
      case 'settings':
        return <SettingsPage onNavigate={handleNavigate} onSignOut={handleSignOut} />
      case 'creator':
        return <CreatorStudioPage onNavigate={handleNavigate} />
      case 'technical':
        return <EventDiscoveryPage type="technical" onNavigate={handleNavigate} />
      case 'cultural':
        return <EventDiscoveryPage type="cultural" onNavigate={handleNavigate} />
      case 'events':
        return <EventDetailsPage eventId={selectedEventId} onNavigate={handleNavigate} />
      case 'clubs':
        return <ClubsPage onNavigate={handleNavigate} />
      case 'club-details':
        return <ClubDetailsPage clubId={selectedEventId} onNavigate={handleNavigate} />
      case 'communities':
        return <CommunitiesPage onNavigate={handleNavigate} />
      case 'community-details':
        return <CommunityDetailsPage communityId={selectedEventId} onNavigate={handleNavigate} />
      case 'payment':
        return <PaymentPage eventId={selectedEventId} onNavigate={handleNavigate} />
      case 'my-events':
        return <MyEventsPage onNavigate={handleNavigate} />
      default:
        return (
          <PlaceholderPage
            {...getPlaceholderConfig(currentRoute)}
            onNavigate={handleNavigate}
          />
        )
    }
  }

  return (
    <CampusProvider initialUser={user}>
      <div className="min-h-screen bg-[#FFFCF5] font-sans antialiased text-[#374375] selection:bg-[#BABDE2]">
        <AnimatePresence mode="wait">
          {/* Auth Pages (Unchanged) */}
          {currentRoute === 'landing' && (
            <motion.div key="landing" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>
              <AuthLandingPage onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentRoute === 'login' && (
            <motion.div key="login" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>
              <LoginPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />
            </motion.div>
          )}

          {currentRoute === 'register' && (
            <motion.div key="register" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>
              <RegisterPage onNavigate={handleNavigate} onRegisterSuccess={handleRegisterSuccess} />
            </motion.div>
          )}

          {currentRoute === 'forgot-password' && (
            <motion.div key="forgot-password" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>
              <ForgotPasswordPage onNavigate={handleNavigate} />
            </motion.div>
          )}

          {/* Authenticated Application Shell */}
          {isAuthenticatedRoute && (
            <AppLayout
              currentRoute={currentRoute}
              onNavigate={handleNavigate}
              onSignOut={handleSignOut}
              pageTitle={getPageTitle(currentRoute)}
            >
              {renderContent()}
            </AppLayout>
          )}
        </AnimatePresence>
      </div>
    </CampusProvider>
  )
}