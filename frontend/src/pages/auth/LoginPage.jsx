import React from 'react'
import Navbar from '../../components/common/Navbar'
import BackgroundDecoration from '../../components/common/BackgroundDecoration'
import LoginForm from '../../components/auth/LoginForm'

export default function LoginPage({ onNavigate, onLoginSuccess }) {
  return (
    <div className="min-h-screen flex flex-col relative bg-[#FFFCF5] text-[#374375] font-sans selection:bg-[#BABDE2] overflow-x-hidden">
      {/* Background Graphic Decoration displaying Pinterest image */}
      <BackgroundDecoration />

      {/* Simplified Authentication Header */}
      <Navbar currentRoute="login" onNavigate={onNavigate} />

      {/* Main Centered Login Card Container */}
      <main className="flex-1 relative z-10 flex items-center justify-center p-4 sm:p-6 lg:p-8 my-auto">
        <div className="w-full max-w-[420px] sm:max-w-[460px]">
          
          {/* Frosted Glass Login Card matching reference image */}
          <div className="campus-glass-frosted rounded-3xl p-8 sm:p-11 shadow-2xl transition-all duration-300 relative overflow-hidden">
            <LoginForm
              onLoginSuccess={onLoginSuccess}
              onNavigateToRegister={() => onNavigate && onNavigate('register')}
              onNavigateToForgot={() => onNavigate && onNavigate('forgot-password')}
            />
          </div>

        </div>
      </main>

      {/* Minimal Footer Credit */}
      <footer className="relative z-10 py-4 text-center text-xs font-bold text-[#374375]/80">
        Campus Connect &copy; {new Date().getFullYear()} — Student Platform
      </footer>
    </div>
  )
}
