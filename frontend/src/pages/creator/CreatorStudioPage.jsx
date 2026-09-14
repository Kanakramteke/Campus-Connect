import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, Plus, Edit3, Trash2, Eye, ExternalLink, Calendar,
  Building2, Globe, Shield, CheckCircle2, Clock, Filter, AlertCircle,
  Terminal, Music, ArrowRight
} from 'lucide-react'
import { useCampus } from '../../context/CampusContext'
import CreateTypeSelectionModal from '../../components/creator/CreateTypeSelectionModal'
import CreateEventForm from '../../components/creator/CreateEventForm'
import CreateClubForm from '../../components/creator/CreateClubForm'
import CreateCommunityForm from '../../components/creator/CreateCommunityForm'
import DeleteConfirmationModal from '../../components/creator/DeleteConfirmationModal'
import EmptyState from '../../components/common/EmptyState'

export default function CreatorStudioPage({ onNavigate }) {
  const {
    createdItems,
    saveCreatedItem,
    deleteCreatedItem,
    creatorRole,
    setCreatorRole
  } = useCampus()

  const [activeTab, setActiveTab] = useState('all') // 'all', 'event', 'club', 'community', 'drafts', 'published'
  const [isSelectTypeModalOpen, setIsSelectTypeModalOpen] = useState(false)
  const [activeFormType, setActiveFormType] = useState(null) // null, 'event', 'club', 'community'
  const [formEventType, setFormEventType] = useState('technical')
  const [itemToEdit, setItemToEdit] = useState(null)
  const [itemToDelete, setItemToDelete] = useState(null)

  // Roles Definition
  const ROLES = [
    { id: 'organizer', label: 'Event Organizer', icon: Calendar, color: 'bg-[#374375] text-[#FFFCF5]' },
    { id: 'club_head', label: 'Club Head', icon: Building2, color: 'bg-[#895159] text-[#FFFCF5]' },
    { id: 'community_admin', label: 'Community Admin', icon: Globe, color: 'bg-[#BABDE2] text-[#374375]' },
    { id: 'student', label: 'Student (View Only)', icon: Shield, color: 'bg-[#DFAEA1] text-[#374375]' }
  ]

  // Filter created items
  const filteredItems = createdItems.filter(item => {
    if (activeTab === 'event') return item.entityType === 'event'
    if (activeTab === 'club') return item.entityType === 'club'
    if (activeTab === 'community') return item.entityType === 'community'
    if (activeTab === 'drafts') return item.status === 'draft'
    if (activeTab === 'published') return item.status === 'published'
    return true
  })

  const handleStartCreate = (type, eventType = 'technical') => {
    setItemToEdit(null)
    setFormEventType(eventType)
    setActiveFormType(type)
  }

  const handleStartEdit = (item) => {
    setItemToEdit(item.data)
    setFormEventType(item.data.type || 'technical')
    setActiveFormType(item.entityType)
  }

  const handleSaveForm = (entityType, formData, isDraft) => {
    const publishedId = saveCreatedItem(entityType, formData, isDraft)
    setActiveFormType(null)
    setItemToEdit(null)
  }

  // Render active create/edit forms
  if (activeFormType === 'event') {
    return (
      <CreateEventForm
        initialData={itemToEdit}
        initialType={formEventType}
        onSave={handleSaveForm}
        onCancel={() => { setActiveFormType(null); setItemToEdit(null) }}
        onNavigate={onNavigate}
      />
    )
  }

  if (activeFormType === 'club') {
    return (
      <CreateClubForm
        initialData={itemToEdit}
        onSave={handleSaveForm}
        onCancel={() => { setActiveFormType(null); setItemToEdit(null) }}
        onNavigate={onNavigate}
      />
    )
  }

  if (activeFormType === 'community') {
    return (
      <CreateCommunityForm
        initialData={itemToEdit}
        onSave={handleSaveForm}
        onCancel={() => { setActiveFormType(null); setItemToEdit(null) }}
        onNavigate={onNavigate}
      />
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* 1. HERO HEADER */}
      <div className="bg-gradient-to-r from-[#FFFCF5] via-[#FFFCF5] to-[#BABDE2]/25 rounded-3xl border border-[#BABDE2]/60 p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#374375] text-[#FFFCF5] text-xs font-black">
            <Sparkles className="w-3.5 h-3.5 text-[#DFAEA1]" />
            <span>Campus Creator Hub</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#374375] tracking-tight">
            Creator Studio & Management
          </h1>

          <p className="text-xs sm:text-sm font-semibold text-[#374375]/80 max-w-xl leading-relaxed">
            Create and manage events, clubs, and communities across Nagpur campuses. Draft, preview live, and publish student-facing experiences.
          </p>
        </div>
      </div>

      {/* 2. CREATION OPTIONS GRID - FIRST SCREEN INTERFACE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-[#374375] tracking-tight">
              Select What You Want to Create
            </h2>
            <p className="text-xs font-semibold text-[#374375]/70">
              Choose a content type to start building your student-facing experience.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => handleStartCreate('event', 'technical')}
            className="p-5 rounded-3xl bg-[#FFFCF5] border-2 border-[#BABDE2]/60 hover:border-[#374375] shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#374375] text-[#FFFCF5] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Terminal className="w-6 h-6 text-[#DFAEA1]" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#374375] text-[#FFFCF5]">
                  Technical
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-[#374375] group-hover:text-[#895159] transition-colors">
                  Technical Event
                </h3>
                <span className="text-[11px] font-bold text-[#895159] block">
                  Hackathons, Coding, Workshops
                </span>
              </div>
              <p className="text-xs text-[#374375]/80 font-medium leading-relaxed">
                Host hackathons, speed coding contests, hardware exhibitions, and technical masterclasses for Nagpur students.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-extrabold text-[#374375] group-hover:text-[#895159] transition-colors">
              <span>Create Event</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => handleStartCreate('event', 'cultural')}
            className="p-5 rounded-3xl bg-[#FFFCF5] border-2 border-[#BABDE2]/60 hover:border-[#895159] shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#895159] text-[#FFFCF5] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Music className="w-6 h-6 text-[#FFFCF5]" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#895159] text-[#FFFCF5]">
                  Cultural
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-[#374375] group-hover:text-[#895159] transition-colors">
                  Cultural Event
                </h3>
                <span className="text-[11px] font-bold text-[#895159] block">
                  Fests, Concerts, Dance, Drama
                </span>
              </div>
              <p className="text-xs text-[#374375]/80 font-medium leading-relaxed">
                Organize inter-college cultural fests, Battle of the Bands, street dance cyphers, and drama slams.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-extrabold text-[#374375] group-hover:text-[#895159] transition-colors">
              <span>Create Event</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => handleStartCreate('club')}
            className="p-5 rounded-3xl bg-[#FFFCF5] border-2 border-[#BABDE2]/60 hover:border-[#374375] shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#BABDE2] text-[#374375] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Building2 className="w-6 h-6 text-[#374375]" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#BABDE2] text-[#374375]">
                  Club
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-[#374375] group-hover:text-[#895159] transition-colors">
                  Campus Club
                </h3>
                <span className="text-[11px] font-bold text-[#895159] block">
                  Student Societies & Chapters
                </span>
              </div>
              <p className="text-xs text-[#374375]/80 font-medium leading-relaxed">
                Establish a new student society, robotics chapter, music club, or dance crew across Nagpur campuses.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-extrabold text-[#374375] group-hover:text-[#895159] transition-colors">
              <span>Create Club</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => handleStartCreate('community')}
            className="p-5 rounded-3xl bg-[#FFFCF5] border-2 border-[#BABDE2]/60 hover:border-[#895159] shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#DFAEA1] text-[#374375] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Globe className="w-6 h-6 text-[#895159]" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#DFAEA1] text-[#374375]">
                  Community
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-[#374375] group-hover:text-[#895159] transition-colors">
                  Student Community
                </h3>
                <span className="text-[11px] font-bold text-[#895159] block">
                  Interest-based Discussion Hubs
                </span>
              </div>
              <p className="text-xs text-[#374375]/80 font-medium leading-relaxed">
                Create an open interest group for coding, AI/ML, photography, gaming, startups, or literature.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-extrabold text-[#374375] group-hover:text-[#895159] transition-colors">
              <span>Create Community</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. ROLE SWITCHER BAR */}
      <div className="p-4 bg-[#FFFCF5] rounded-3xl border border-[#BABDE2]/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-black text-[#374375]">
          <Shield className="w-4 h-4 text-[#895159]" />
          <span>Active Creator Role:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {ROLES.map(r => (
            <button
              key={r.id}
              type="button"
              onClick={() => setCreatorRole(r.id)}
              className={`py-1.5 px-3 rounded-xl font-bold text-[11px] transition-all cursor-pointer border ${
                creatorRole === r.id
                  ? 'bg-[#374375] text-white border-[#374375] shadow-2xs'
                  : 'bg-white text-[#374375] border-slate-200 hover:border-[#BABDE2]'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. FILTER TABS & COUNT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#BABDE2]/40 pb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Content' },
            { id: 'event', label: 'Events' },
            { id: 'club', label: 'Clubs' },
            { id: 'community', label: 'Communities' },
            { id: 'drafts', label: 'Drafts' },
            { id: 'published', label: 'Published' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-3.5 rounded-xl font-extrabold text-xs transition-colors shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#374375] text-[#FFFCF5] shadow-xs'
                  : 'bg-[#FFFCF5] text-[#374375] border border-[#BABDE2]/60 hover:bg-[#BABDE2]/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-bold text-[#895159]">
          Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* 4. CREATED ITEMS GRID */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => {
            const isDraft = item.status === 'draft'
            const isEvent = item.entityType === 'event'
            const isClub = item.entityType === 'club'
            const isCommunity = item.entityType === 'community'

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#FFFCF5] rounded-3xl border border-[#BABDE2]/60 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden"
              >
                <div>
                  {/* Top image / logo header */}
                  <div className="relative h-36 w-full rounded-2xl overflow-hidden bg-[#BABDE2]/20 mb-3">
                    <img
                      src={item.data.banner || item.data.coverImage || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'}
                      alt={item.data.title || item.data.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        isEvent ? 'bg-[#374375] text-[#FFFCF5]' : isClub ? 'bg-[#895159] text-[#FFFCF5]' : 'bg-[#DFAEA1] text-[#374375]'
                      }`}>
                        {item.entityType}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-xs ${
                        isDraft ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {isDraft ? 'Draft' : 'Published'}
                      </span>
                    </div>
                  </div>

                  {/* Title & Info */}
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-[#374375] line-clamp-1 group-hover:text-[#895159] transition-colors">
                      {item.data.title || item.data.name}
                    </h3>
                    <p className="text-xs text-[#895159] font-bold truncate">
                      {item.data.organizingCollege || item.data.college || 'Nagpur Campus'}
                    </p>
                    <p className="text-xs text-[#374375]/80 font-medium line-clamp-2 leading-relaxed pt-1">
                      {item.data.shortDescription || item.data.description}
                    </p>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-[#BABDE2]/30 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(item)}
                      className="p-2 rounded-xl bg-white border border-[#BABDE2]/60 hover:bg-[#374375] hover:text-white text-[#374375] transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setItemToDelete(item)}
                      className="p-2 rounded-xl bg-white border border-[#BABDE2]/60 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (isEvent) onNavigate('events', item.data.id)
                      else if (isClub) onNavigate('club-details', item.data.id)
                      else if (isCommunity) onNavigate('community-details', item.data.id)
                    }}
                    className="py-1.5 px-3 rounded-xl bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                  >
                    <span>View Live</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <EmptyState
          title="No Created Content Found"
          description="Start building your first event, club, or community to share with students across Nagpur."
          actionText="Create Content Now"
          onAction={() => setIsSelectTypeModalOpen(true)}
        />
      )}

      {/* Modals */}
      <CreateTypeSelectionModal
        isOpen={isSelectTypeModalOpen}
        onClose={() => setIsSelectTypeModalOpen(false)}
        onSelectType={handleStartCreate}
        onOpenStudio={() => setIsSelectTypeModalOpen(false)}
      />

      <DeleteConfirmationModal
        isOpen={Boolean(itemToDelete)}
        onClose={() => setItemToDelete(null)}
        onConfirm={() => {
          if (itemToDelete) {
            deleteCreatedItem(itemToDelete.id)
            setItemToDelete(null)
          }
        }}
        title={`Delete ${itemToDelete?.entityType?.toUpperCase()}?`}
        message={`Are you sure you want to delete "${itemToDelete?.data?.title || itemToDelete?.data?.name}"? This will remove it from your creator hub and discovery pages.`}
      />
    </div>
  )
}
