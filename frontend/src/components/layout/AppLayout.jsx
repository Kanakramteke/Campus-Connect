import React, { useState } from 'react'
import Sidebar from './Sidebar'
import TopHeader from './TopHeader'
import Toast from '../common/Toast'
import { useCampus } from '../../context/CampusContext'

export default function AppLayout({ children, currentRoute, onNavigate, onSignOut, pageTitle }) {
  const [isOpenMobile, setIsOpenMobile] = useState(false)
  const { toast, setToast } = useCampus()

  return (
    <div className="min-h-screen flex bg-[#FFFCF5] text-[#374375] font-sans antialiased selection:bg-[#BABDE2]">
      {/* 5-Item Fixed Sidebar / Mobile Drawer */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        onSignOut={onSignOut}
        isOpenMobile={isOpenMobile}
        onCloseMobile={() => setIsOpenMobile(false)}
      />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        <TopHeader
          onToggleMobileMenu={() => setIsOpenMobile(true)}
          onNavigate={onNavigate}
          pageTitle={pageTitle}
        />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-10">
          {children}
        </main>
      </div>

      {/* Global Toast Component */}
      <Toast toast={toast} onClose={() => setToast?.(null)} />
    </div>
  )
}
