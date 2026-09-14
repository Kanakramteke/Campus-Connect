import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  User, 
  Lock, 
  LogOut, 
  Trash2
} from 'lucide-react'
import { useCampus } from '../../context/CampusContext'
import ChangePasswordModal from '../../components/settings/ChangePasswordModal'
import LogoutConfirmationModal from '../../components/settings/LogoutConfirmationModal'
import DeleteAccountModal from '../../components/settings/DeleteAccountModal'

export default function SettingsPage({ onNavigate, onSignOut }) {
  const { user } = useCampus()

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
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
      {/* HERO HEADER */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-[#FFFCF5] via-[#FFFCF5] to-[#BABDE2]/25 p-6 sm:p-8 rounded-3xl border border-[#BABDE2]/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BABDE2]/30 text-[#374375] text-xs font-extrabold">
            <Settings className="w-3.5 h-3.5 text-[#895159]" />
            <span>Preferences & Control</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#374375] tracking-tight">
            Settings
          </h1>

          <p className="text-xs sm:text-sm font-semibold text-[#374375]/80 max-w-xl">
            Manage your Campus Connect account information, security credentials, and session controls.
          </p>
        </div>
      </motion.div>

      {/* 1. ACCOUNT SETTINGS */}
      <motion.section variants={itemVariants} className="bg-[#FFFCF5] rounded-3xl border border-[#BABDE2]/60 p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#BABDE2]/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#374375]/10 text-[#374375] flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#374375]">Account Information</h3>
              <p className="text-xs font-semibold text-[#374375]/70">Your core account identifiers and contact info.</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('profile')}
            className="py-2 px-4 rounded-xl bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs transition-colors cursor-pointer"
          >
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold text-[#374375]">
          <div className="bg-[#BABDE2]/15 p-4 rounded-2xl border border-[#BABDE2]/30 space-y-1">
            <span className="text-[10px] uppercase font-black text-[#374375]/60 tracking-wider">Email</span>
            <p className="truncate font-extrabold">{user?.email}</p>
          </div>

          <div className="bg-[#BABDE2]/15 p-4 rounded-2xl border border-[#BABDE2]/30 space-y-1">
            <span className="text-[10px] uppercase font-black text-[#374375]/60 tracking-wider">Phone</span>
            <p className="truncate font-extrabold">{user?.phone || '+91 98765 43210'}</p>
          </div>

          <div className="bg-[#BABDE2]/15 p-4 rounded-2xl border border-[#BABDE2]/30 space-y-1">
            <span className="text-[10px] uppercase font-black text-[#374375]/60 tracking-wider">College</span>
            <p className="truncate font-extrabold">{user?.college || 'VNIT Nagpur'}</p>
          </div>

          <div className="bg-[#BABDE2]/15 p-4 rounded-2xl border border-[#BABDE2]/30 space-y-1">
            <span className="text-[10px] uppercase font-black text-[#374375]/60 tracking-wider">Account Status</span>
            <div className="flex items-center gap-1 text-emerald-700 font-black">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse" />
              <span>Active Verified Student</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. SECURITY & ACCOUNT ACTIONS */}
      <motion.section variants={itemVariants} className="bg-[#FFFCF5] rounded-3xl border border-[#BABDE2]/60 p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-[#BABDE2]/30 pb-4">
          <div className="w-9 h-9 rounded-xl bg-[#374375] text-[#FFFCF5] flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-[#374375]">Security & Account Actions</h3>
            <p className="text-xs font-semibold text-[#374375]/70">Manage password, session logout, and account status.</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Change Password Bar */}
          <div className="p-4 rounded-2xl bg-[#BABDE2]/15 border border-[#BABDE2]/30 flex items-center justify-between gap-4">
            <div>
              <h4 className="font-extrabold text-[#374375] text-sm">Account Password</h4>
              <p className="text-xs text-[#374375]/75 font-semibold">Regularly update your password to keep your account safe.</p>
            </div>
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="py-2 px-4 rounded-xl bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs transition-colors shrink-0 cursor-pointer"
            >
              Change Password
            </button>
          </div>

          {/* Logout & Delete Row */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="py-3 px-5 rounded-2xl bg-[#895159]/10 hover:bg-[#895159] text-[#895159] hover:text-[#FFFCF5] font-extrabold text-xs transition-colors flex items-center gap-2 border border-[#895159]/30 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out of Campus Connect</span>
            </button>

            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="py-3 px-5 rounded-2xl bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-extrabold text-xs transition-colors flex items-center gap-2 border border-red-200 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </motion.section>

      {/* Modals */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />

      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => onSignOut?.()}
      />

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </motion.div>
  )
}
