import React from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import BackgroundDecoration from '../../components/common/BackgroundDecoration'

export default function AuthLandingPage({ onNavigate }) {
  const features = [
    {
      title: 'Campus Events & Drives',
      desc: 'Discover upcoming hackathons, career workshops, club events, and guest speaker sessions.',
      tag: 'Events'
    },
    {
      title: 'Student Communities',
      desc: 'Connect with peers sharing your interests in tech, arts, sports, academics, and creative projects.',
      tag: 'Communities'
    },
    {
      title: 'Project Collaboration',
      desc: 'Form teams for hackathons, study groups, research work, and campus initiatives seamlessly.',
      tag: 'Collaboration'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col relative bg-[#FFFCF5] text-[#374375] font-sans selection:bg-[#BABDE2]">
      {/* Background Graphic Layer */}
      <BackgroundDecoration />

      {/* Top Header Navbar */}
      <Navbar currentRoute="landing" onNavigate={onNavigate} />

      {/* Main Hero Section */}
      <main className="flex-1 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFCF5]/70 backdrop-blur-md border border-[#BABDE2] text-xs sm:text-sm font-bold text-[#374375] shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#895159] animate-pulse" />
            <span>Official Student & Campus Hub</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#374375] tracking-tight leading-[1.15]">
              Campus <span className="text-[#895159]">Connect</span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-[#895159] tracking-wide">
              "Connect. Collaborate. Grow."
            </p>
          </div>

          <p className="text-base sm:text-lg text-[#374375]/90 font-medium leading-relaxed max-w-2xl mx-auto">
            Bringing students, campus activities, academic organizations, and peer collaboration together in one clean, modern platform designed specifically for college life.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <button
              onClick={() => onNavigate && onNavigate('login')}
              className="w-full sm:w-auto min-w-[180px] py-4 px-8 rounded-full bg-[#374375] text-[#FFFCF5] font-extrabold text-lg shadow-lg hover:shadow-xl hover:bg-[#2e3863] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ring-2 ring-[#BABDE2] flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <svg className="w-5 h-5 text-[#DFAEA1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('register')}
              className="w-full sm:w-auto min-w-[180px] py-4 px-8 rounded-full bg-[#DFAEA1] text-[#374375] font-extrabold text-lg shadow-md hover:bg-[#895159] hover:text-[#FFFCF5] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Create Account</span>
            </button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((item, idx) => (
            <div 
              key={idx}
              className="campus-glass-frosted rounded-2xl p-6 sm:p-8 hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-md bg-[#374375] text-[#FFFCF5] text-[11px] font-extrabold uppercase tracking-wider">
                  {item.tag}
                </span>
                <h3 className="text-xl font-bold text-[#374375]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#374375]/85 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  )
}
