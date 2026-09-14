import React from 'react'
import { X, Users, AlertCircle, LogOut, CheckCircle2 } from 'lucide-react'

const JoinClubModal = ({ isOpen, onClose, club, action = 'join', onConfirm }) => {
  if (!isOpen || !club) return null

  const isLeaving = action === 'leave'

  return (
    <div className="fixed inset-0 z-50 bg-[#374375]/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FFFCF5] rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-6 shadow-2xl border border-[#BABDE2] animate-scaleUp">
        
        {/* Top Icon Badge */}
        <div className={`w-18 h-18 rounded-full flex items-center justify-center mx-auto ring-8 ${
          isLeaving ? 'bg-red-100 text-[#895159] ring-red-50' : 'bg-[#BABDE2]/30 text-[#374375] ring-[#BABDE2]/15'
        }`}>
          {isLeaving ? (
            <LogOut className="w-9 h-9 text-[#895159]" />
          ) : (
            <Users className="w-9 h-9 text-[#374375]" />
          )}
        </div>

        {/* Header Text */}
        <div className="space-y-2">
          <h3 className="text-xl font-black text-[#374375]">
            {isLeaving ? `Leave ${club.name}?` : `Join ${club.name}?`}
          </h3>
          <p className="text-xs text-slate-600 font-semibold max-w-xs mx-auto leading-relaxed">
            {isLeaving
              ? "You will no longer receive updates, announcements, or priority event notifications from this club."
              : "You'll become an official member of this student organization and receive updates on upcoming activities."}
          </p>
        </div>

        {/* Club Quick Summary */}
        <div className="p-3.5 bg-white rounded-2xl border border-[#BABDE2]/40 text-left flex items-center gap-3 text-xs">
          <div className="w-10 h-10 rounded-xl bg-[#374375] text-white flex items-center justify-center text-lg font-bold shrink-0">
            {club.logo || '🏛️'}
          </div>
          <div className="min-w-0">
            <h4 className="font-extrabold text-[#374375] truncate">{club.name}</h4>
            <p className="text-slate-500 font-medium truncate">{club.college}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={onConfirm}
            className={`w-full py-3.5 px-6 font-bold rounded-2xl text-xs transition-all shadow-md cursor-pointer ${
              isLeaving
                ? 'bg-[#895159] hover:bg-[#6e4047] text-white'
                : 'bg-[#374375] hover:bg-[#2c365e] text-white'
            }`}
          >
            {isLeaving ? 'Confirm & Leave Club' : 'Confirm & Join Club'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl text-xs transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default JoinClubModal
