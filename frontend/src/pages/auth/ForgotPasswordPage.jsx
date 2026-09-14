import React, { useState } from 'react'
import Navbar from '../../components/common/Navbar'
import BackgroundDecoration from '../../components/common/BackgroundDecoration'

export default function ForgotPasswordPage({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 800)
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-[#FFFCF5] text-[#374375] font-sans selection:bg-[#BABDE2]">
      <BackgroundDecoration />
      <Navbar currentRoute="forgot-password" onNavigate={onNavigate} />

      <main className="flex-1 relative z-10 flex items-center justify-center p-4 sm:p-6 lg:p-8 my-auto">
        <div className="w-full max-w-[420px]">
          <div className="campus-glass-frosted rounded-3xl p-8 sm:p-10 shadow-2xl transition-all">
            {isSubmitted ? (
              <div className="text-center space-y-4 py-2">
                <h2 className="text-2xl font-extrabold text-[#374375]">Reset Link Sent!</h2>
                <p className="text-sm font-semibold text-[#374375]/80">Instructions sent to <span className="font-bold text-[#895159]">{email}</span>.</p>
                <button
                  onClick={() => onNavigate && onNavigate('login')}
                  className="w-full py-3 rounded-xl font-bold bg-[#374375] text-[#FFFCF5] mt-4"
                >
                  Return to LOGIN
                </button>
              </div>
            ) : (
              <div>
                <div className="text-center mb-8">
                  <h1 className="text-2xl sm:text-3xl font-black text-[#374375] tracking-widest uppercase">
                    RESET PASSWORD
                  </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative flex flex-col space-y-1">
                    <div className="relative flex items-center">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        autoComplete="email"
                        className="w-full campus-underline-input text-[#374375] placeholder-[#374375]/70 text-base font-semibold py-2 transition-all"
                      />
                      <div className="absolute right-0 text-[#374375]/70 pointer-events-none p-1">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-xl font-black text-base tracking-wide text-[#FFFCF5] bg-gradient-to-r from-[#374375] to-[#4d5c94] hover:from-[#895159] shadow-lg"
                  >
                    Send Reset Link
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => onNavigate && onNavigate('login')}
                      className="text-xs font-bold text-[#374375] hover:text-[#895159]"
                    >
                      ← Back to LOGIN
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Minimal Footer Credit matching Login & Register Page */}
      <footer className="relative z-10 py-4 text-center text-xs font-bold text-[#374375]/80">
        Campus Connect &copy; {new Date().getFullYear()} — Student Platform
      </footer>
    </div>
  )
}
