import React, { useState } from 'react'
import { apiClient, setToken } from '../../api/apiClient'

export default function LoginForm({ onLoginSuccess, onNavigateToRegister, onNavigateToForgot }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!email) {
      errs.email = 'Email address is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Enter a valid email address'
    }
    if (!password) {
      errs.password = 'Password is required'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    setErrors({})
    try {
      const response = await apiClient('/auth/login', {
        method: 'POST',
        body: { email, password }
      })
      if (response && response.access_token) {
        setToken(response.access_token)
        if (onLoginSuccess) {
          onLoginSuccess(response.user)
        }
      }
    } catch (err) {
      setErrors({ form: err.message || 'Login failed. Please check credentials.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      {/* Title matching reference screenshot: LOGIN */}
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-black text-[#374375] tracking-widest uppercase">
          LOGIN
        </h1>
      </div>

      {errors.form && (
        <div className="mb-6 p-3 rounded-xl bg-[#895159]/10 border border-[#895159]/30 text-[#895159] text-xs font-bold text-center">
          ⚠️ {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-7" noValidate>
        
        {/* Email Field with Underline & Envelope Icon on the Right */}
        <div className="relative flex flex-col space-y-1">
          <div className="relative flex items-center">
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({ ...errors, email: null })
              }}
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
          {errors.email && (
            <span className="text-xs font-bold text-[#895159] mt-1">⚠️ {errors.email}</span>
          )}
        </div>

        {/* Password Field with Underline & Eye Icon on the Right */}
        <div className="relative flex flex-col space-y-1">
          <div className="relative flex items-center">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors({ ...errors, password: null })
              }}
              placeholder="Password"
              required
              autoComplete="current-password"
              className="w-full campus-underline-input text-[#374375] placeholder-[#374375]/70 text-base font-semibold py-2 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 text-[#374375]/70 hover:text-[#374375] p-1 focus:outline-none"
              aria-label={showPassword ? 'Hide Password' : 'Show Password'}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
                </svg>
              )}
            </button>
          </div>

          {/* Forgot Password Link positioned right below the password line on the right side */}
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={onNavigateToForgot}
              className="text-xs font-semibold text-[#374375] hover:text-[#895159] focus:outline-none transition-colors"
            >
              Forgot <span className="font-extrabold text-[#895159]">Password?</span>
            </button>
          </div>

          {errors.password && (
            <span className="text-xs font-bold text-[#895159] mt-1">⚠️ {errors.password}</span>
          )}
        </div>

        {/* Remember Me Checkbox Row */}
        <div className="pt-1">
          <label className="inline-flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded-md bg-[#FFFCF5] border border-[#BABDE2] peer-checked:bg-[#374375] peer-checked:border-[#374375] flex items-center justify-center transition-all shadow-xs">
              <svg className="w-3.5 h-3.5 text-[#FFFCF5] opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-[#374375]">
              Remember Me
            </span>
          </label>
        </div>

        {/* Primary CTA Button: Gradient Pill matching reference image */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl font-black text-base tracking-wide text-[#FFFCF5] bg-gradient-to-r from-[#374375] via-[#4d5c94] to-[#374375] hover:from-[#895159] hover:to-[#374375] shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Logging in...</span>
              </div>
            ) : (
              <span>Login</span>
            )}
          </button>
        </div>

        {/* Footer row: Don't have an Account? Register */}
        <div className="pt-4 text-center">
          <p className="text-xs sm:text-sm font-semibold text-[#374375]">
            Don't have an Account?{' '}
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="font-extrabold text-[#374375] hover:text-[#895159] hover:underline focus:outline-none transition-colors ml-1"
            >
              Register
            </button>
          </p>
        </div>

      </form>
    </div>
  )
}
