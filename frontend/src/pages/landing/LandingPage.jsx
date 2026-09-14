import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CreateModal from '../create/CreateModal'
import TeamsPage from '../teams/TeamsPage'
import ProfilePage from '../profile/ProfilePage';
import CalendarPage from '../calendar/CalendarPage';

export default function LandingPage({ onNavigate, onCommunityCreated }){
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(64)

  useEffect(() => {
    function updateHeight() {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight)
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showTeamsModal, setShowTeamsModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [userName, setUserName] = useState('');

  const quickNav = [
    { id: 'events', label: 'Events', onClick: () => onNavigate && onNavigate('events') },
    { id: 'communities', label: 'Communities', onClick: () => onNavigate && onNavigate('communities') },
    { id: 'discussions', label: 'Discussions', onClick: () => onNavigate && onNavigate('discussions') },
    { id: 'form-teams', label: 'Form Teams', onClick: () => setShowTeamsModal(true) },
   
  ]

  function Icon({ children, src }){
    if (src) {
      return <img src={src} alt="logo" className="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover shadow-md" />
    }
    return (
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md text-base">{children}</div>
    )
  }
  const cards = [
    {
      key: 'events',
      title: 'Events',
      img: '/images/banners/events-banner.jpg',
      desc: 'Explore upcoming hackathons, mentorship drives, and innovation challenges. Your next big idea might begin at one of these events!',
      onClick: () => onNavigate && onNavigate('events'),
    },
    {
      key: 'communities',
      title: 'Communities',
      img: '/images/banners/communities-banner.jpg',
      desc: 'Communities bring together students who share the same passion — whether it’s art, nature, tech, studies, or sports. Join a group that inspires you, collaborate on ideas, and grow with people who dream the same way you do.',
      onClick: () => onNavigate && onNavigate('communities'),
    },
    {
      key: 'discussions',
      title: 'Discussions',
      img: '/images/banners/discussions-banner.webp',
      desc: 'Engage in meaningful conversations, share your thoughts, and learn from others in the community.',
      onClick: () => onNavigate && onNavigate('discussions'),
    },
    {
      key: 'form-teams',
      title: 'Form Teams',
      img: '/images/banners/teams-banner.jpg',
      desc: 'Build teams that think, create, and innovate together. From brainstorming concepts to completing projects — teamwork turns imagination into achievement.',
      onClick: () => setShowTeamsModal(true),
    },
  ]

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    if (lowerCaseQuery.includes('events')) {
      onNavigate && onNavigate('events');
    } else if (lowerCaseQuery.includes('communities')) {
      onNavigate && onNavigate('communities');
    } else if (lowerCaseQuery.includes('discussions')) {
      onNavigate && onNavigate('discussions');
    } else if (lowerCaseQuery.includes('teams')) {
      onNavigate && onNavigate('form-teams');
    } else {
      alert('No matching page found. Please search for Events, Communities, Discussions, or Teams.');
    }
  };

  function handleSaveDetails(name) {
    setUserName(name);
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header ref={headerRef} className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Left: Logo and Name */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate && onNavigate('landing')}
              className="flex items-center gap-3 hover:opacity-90 transition-opacity"
            >
              <Icon src="/images/branding/logo.png" />
              <span className="font-extrabold text-2xl md:text-3xl text-white tracking-tight">CampusConnect</span>
            </button>
          </div>

          {/* Right: Navigation Buttons, Quick Nav and Profile */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-3">
              {quickNav.map((n) => (
                <button
                  key={n.id}
                  onClick={n.onClick}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all shadow-sm ${n.id === 'events' ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'}`}
                >
                  {n.label}
                </button>
              ))}
            </div>

            <button className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center transition-colors" title="Wishlist">
              <span className="text-xl">❤️</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center transition-colors" title="Notifications">
              <span className="text-xl">🔔</span>
            </button>
            <div className="relative">
              <button onClick={()=>setMenuOpen(v=>!v)} className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-600 to-sky-500 grid place-items-center hover:opacity-90 transition-opacity shadow-md">
                <span className="text-lg font-bold text-white">{userName?.[0] || 'U'}</span>
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:8}} className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-2 z-50">
                    <a onClick={() => { setShowProfileModal(true); setMenuOpen(false); }} className="block px-3 py-2 rounded-lg hover:bg-slate-700 text-slate-200 cursor-pointer">My Profile</a>
                    <a className="block px-3 py-2 rounded-lg hover:bg-slate-700 text-slate-200 cursor-pointer">Logout</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-semibold">
              ✨ The Student Community Platform
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              Discover. Connect. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400">Innovate.</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl">
              From idea to impact — together. Think, build, and belong in Nagpur’s premier college community network.
            </p>

            <div className="relative max-w-2xl w-full pt-2">
              <input 
                type="text" 
                className="w-full rounded-2xl bg-slate-800/90 border border-slate-700 shadow-2xl pl-14 pr-6 py-4 text-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                placeholder="Search events, communities, discussions..." 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(e.target.value);
                  }
                }}
              />
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-slate-400">🔍</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 group">
              <img src="/images/banners/hero-college.jpg" alt="College Campus" className="w-full h-[360px] object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">VNIT & College Fests</span>
                <span className="text-xl font-bold text-white">Join 5000+ Nagpur Students</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - fixed to extreme left on md+ */}
          <aside
            className="hidden md:block w-64 flex-shrink-0"
          >
            <div className="bg-slate-800/80 border border-slate-700/80 backdrop-blur-md rounded-2xl p-4 sticky top-24 shadow-xl space-y-1">
              <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">Navigation</div>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 font-bold text-white shadow-md transition-all flex items-center gap-3"
              >
                <span className="text-xl">➕</span>
                <span>Create Post</span>
              </button>
              <button onClick={() => onNavigate && onNavigate('events')} className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-slate-700/70 font-semibold text-slate-200 transition-colors flex items-center gap-3">
                <span className="text-xl">🎉</span>
                <span>Events</span>
              </button>
              <button onClick={() => onNavigate && onNavigate('communities')} className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-slate-700/70 font-semibold text-slate-200 transition-colors flex items-center gap-3">
                <span className="text-xl">👥</span>
                <span>Communities</span>
              </button>
              <button onClick={() => onNavigate && onNavigate('discussions')} className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-slate-700/70 font-semibold text-slate-200 transition-colors flex items-center gap-3">
                <span className="text-xl">💬</span>
                <span>Discussions</span>
              </button>
              <button onClick={() => setShowTeamsModal(true)} className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-slate-700/70 font-semibold text-slate-200 transition-colors flex items-center gap-3">
                <span className="text-xl">🚀</span>
                <span>Form Teams</span>
              </button>
              <button onClick={() => setShowProfileModal(true)} className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-slate-700/70 font-semibold text-slate-200 transition-colors flex items-center gap-3">
                <span className="text-xl">👤</span>
                <span>My Profile</span>
              </button>
            </div>
          </aside>

          {/* Main content area */}
          <div className="flex-1">
            {/* Quick Navigation - visible only on mobile */}
            <div className="grid grid-cols-2 gap-2 md:hidden mb-6">
              {quickNav.map((n) => (
                <button
                  key={n.id}
                  onClick={n.onClick}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all font-semibold ${n.id === 'events' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200 border border-slate-700'}`}
                >
                  {n.label}
                </button>
              ))}
            </div>

            {/* Cards Section - Discover and Join */}
            <section className="pb-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-extrabold text-white">Explore Hubs</h3>
                  <p className="text-sm text-slate-400">Everything you need to thrive in campus life</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => (
                  <motion.div
                    key={card.key}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="bg-slate-800/90 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col group"
                    onClick={card.onClick}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                      <span className="absolute bottom-3 left-4 font-bold text-lg text-white drop-shadow-md">{card.title}</span>
                    </div>
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <p className="text-xs text-slate-300 leading-relaxed">{card.desc}</p>
                      <div className="mt-4 flex items-center justify-between text-indigo-400 font-semibold text-xs group-hover:text-indigo-300">
                        <span>Explore now</span>
                        <span>→</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Create Modal used by sidebar */}
      <CreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onEventCreated={(ev) => {
          alert('Event published successfully!');
          setShowCreateModal(false);
        }}
        onCommunityCreated={(c) => {
          if (onCommunityCreated) onCommunityCreated(c);
          setShowCreateModal(false);
        }}
      />

      {/* Teams Modal */}
      <AnimatePresence>
        {showTeamsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 py-8"
            onClick={() => setShowTeamsModal(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-4xl max-h-[85vh] rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <TeamsPage />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowProfileModal(false);
            }}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl max-h-[500px] rounded-xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700 p-6 overflow-auto"
            >
              <ProfilePage onNameChange={handleSaveDetails} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}