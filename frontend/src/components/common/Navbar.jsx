import React from 'react'

export default function Navbar({ currentRoute, onNavigate }) {
  return (
    <header className="sticky top-0 z-40 w-full campus-glass-nav transition-all duration-300 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <button 
          onClick={() => onNavigate && onNavigate('login')}
          className="flex items-center gap-3 group focus:outline-none rounded-xl text-left cursor-pointer"
          aria-label="Campus Connect"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#374375] flex items-center justify-center text-[#FFFCF5] font-black text-lg shadow-md group-hover:bg-[#895159] transition-colors duration-300">
            CC
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black text-[#374375] tracking-tight group-hover:text-[#895159] transition-colors">
              Campus <span className="text-[#895159]">Connect</span>
            </span>
          </div>
        </button>

        {/* Authentication Navigation Only */}
        <div className="flex items-center gap-3 sm:gap-4">
          {currentRoute === 'login' ? (
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold text-[#374375]/80 hidden sm:inline">
                Don't have an account?
              </span>
              <button
                onClick={() => onNavigate && onNavigate('register')}
                className="py-2 px-4 sm:px-5 rounded-full bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs tracking-wider uppercase transition-colors shadow-2xs cursor-pointer"
              >
                Register
              </button>
            </div>
          ) : currentRoute === 'register' ? (
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold text-[#374375]/80 hidden sm:inline">
                Already have an account?
              </span>
              <button
                onClick={() => onNavigate && onNavigate('login')}
                className="py-2 px-4 sm:px-5 rounded-full bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs tracking-wider uppercase transition-colors shadow-2xs cursor-pointer"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => onNavigate && onNavigate('login')}
                className="py-2 px-4 rounded-full border-2 border-[#374375] text-[#374375] hover:bg-[#374375] hover:text-[#FFFCF5] font-extrabold text-xs tracking-wider uppercase transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate && onNavigate('register')}
                className="py-2 px-4 rounded-full bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs tracking-wider uppercase transition-colors shadow-2xs cursor-pointer"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
