import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2, Users, ArrowLeft, Eye, Save, Send, Plus, Trash2, Sparkles, Award, Flame, Cpu, Bot, Zap, Code, Shield
} from 'lucide-react'
import { NAGPUR_COLLEGES } from '../../data/nagpurData'
import ImageUploadInput from './ImageUploadInput'
import LivePreviewWrapper from './LivePreviewWrapper'
import ClubDetailsPage from '../../pages/clubs/ClubDetailsPage'

const CLUB_LOGO_PRESETS = [
  { name: 'Tech / AI', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=300&q=80' },
  { name: 'Coding Hub', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=300&q=80' },
  { name: 'CyberSec', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=300&q=80' },
  { name: 'Dance Crew', url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=300&q=80' },
  { name: 'Music Club', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80' },
  { name: 'Drama Society', url: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=300&q=80' },
  { name: 'Photography', url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=300&q=80' },
  { name: 'E-Cell', url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=300&q=80' }
]

export default function CreateClubForm({ initialData = null, onSave, onCancel, onNavigate }) {
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    name: initialData?.name || '',
    category: initialData?.category || 'Technical',
    subcategory: initialData?.subcategory || 'AI & Robotics',
    type: (initialData?.category || 'Technical').toLowerCase(),
    college: initialData?.college || 'VNIT Nagpur',
    collegeId: initialData?.collegeId || 'vnit',
    logo: initialData?.logo || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=300&q=80',
    banner: initialData?.banner || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    membersCount: initialData?.membersCount ?? 120,
    establishedYear: initialData?.establishedYear ?? 2023,
    shortDescription: initialData?.shortDescription || '',
    description: initialData?.description || '',
    activities: initialData?.activities || [
      { title: 'Workshops & Training', desc: 'Regular hands-on technical sessions.', icon: 'Cpu' },
      { title: 'Campus Competitions', desc: 'Hosting inter-college challenges & hackathons.', icon: 'Zap' }
    ],
    stats: initialData?.stats || { members: 120, eventsHosted: 8, activeSince: '2023', college: 'VNIT Nagpur' },
    team: initialData?.team || [
      { name: 'Kanak Ramteke', role: 'President', year: '3rd Year CSE', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KanakRamteke' }
    ]
  })

  const [errors, setErrors] = useState({})
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Club name is required'
    if (!formData.shortDescription.trim()) errs.shortDescription = 'Short description is required'
    if (!formData.description.trim()) errs.description = 'Detailed description is required'
    if (!formData.banner) errs.banner = 'Club banner image is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleActivityAdd = () => {
    setFormData(prev => ({
      ...prev,
      activities: [...prev.activities, { title: '', desc: '', icon: 'Sparkles' }]
    }))
  }

  const handleActivityChange = (idx, field, val) => {
    setFormData(prev => {
      const updated = [...prev.activities]
      updated[idx] = { ...updated[idx], [field]: val }
      return { ...prev, activities: updated }
    })
  }

  const handleActivityRemove = (idx) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== idx)
    }))
  }

  const handleTeamMemberAdd = () => {
    setFormData(prev => ({
      ...prev,
      team: [...prev.team, { name: '', role: 'Lead', year: '3rd Year', avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}` }]
    }))
  }

  const handleTeamMemberChange = (idx, field, val) => {
    setFormData(prev => {
      const updated = [...prev.team]
      updated[idx] = { ...updated[idx], [field]: val }
      return { ...prev, team: updated }
    })
  }

  const handleTeamMemberRemove = (idx) => {
    setFormData(prev => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== idx)
    }))
  }

  const handleSaveDraft = () => {
    onSave('club', formData, true)
  }

  const handlePublish = () => {
    if (validate()) {
      onSave('club', formData, false)
    }
  }

  if (isPreviewMode) {
    const previewClubObject = {
      ...formData,
      id: formData.id || `preview-club-${Date.now()}`,
      stats: { members: formData.membersCount, eventsHosted: 10, activeSince: String(formData.establishedYear), college: formData.college }
    }

    return (
      <LivePreviewWrapper
        entityType="Campus Club"
        onBackToEdit={() => setIsPreviewMode(false)}
        onPublish={handlePublish}
      >
        <ClubDetailsPage clubId={previewClubObject.id} mockClub={previewClubObject} onNavigate={onNavigate} />
      </LivePreviewWrapper>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#374375] text-[#FFFCF5] text-[10px] font-black uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-[#DFAEA1]" />
            <span>Club Creator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#374375] tracking-tight">
            {initialData ? 'Edit Campus Club' : 'Establish New Campus Club'}
          </h1>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="px-3.5 py-1.5 rounded-xl bg-[#BABDE2]/30 text-[#374375] font-extrabold text-xs hover:bg-[#374375] hover:text-[#FFFCF5] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cancel</span>
        </button>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handlePublish() }} className="space-y-8">
        
        {/* 1. Basic Info */}
        <section className="bg-[#FFFCF5] rounded-3xl p-6 sm:p-8 border border-[#BABDE2]/60 shadow-xs space-y-5">
          <h2 className="text-lg font-black text-[#374375] border-b border-[#BABDE2]/30 pb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#895159]" /> 1. Club Basic Overview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Club Name */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                Club Name <span className="text-[#895159]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. VNIT AI & Robotics Society"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full py-3 px-4 rounded-xl bg-white border text-[#374375] font-bold text-sm outline-none ${
                  errors.name ? 'border-rose-400 ring-2 ring-rose-200' : 'border-[#BABDE2]/80 focus:ring-2 focus:ring-[#374375]'
                }`}
              />
              {errors.name && <p className="text-xs font-bold text-rose-600">{errors.name}</p>}
            </div>

            {/* Club Logo / Image Upload */}
            <div>
              <ImageUploadInput
                label="Club Logo / Avatar Image"
                value={formData.logo}
                onChange={(val) => setFormData(prev => ({ ...prev, logo: val }))}
                presets={CLUB_LOGO_PRESETS}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value, type: e.target.value.toLowerCase() }))}
                className="w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#BABDE2]/80 text-[#374375] font-bold text-xs focus:ring-2 focus:ring-[#374375] outline-none"
              >
                <option value="Technical">Technical</option>
                <option value="Cultural">Cultural</option>
                <option value="Other">Other / General</option>
              </select>
            </div>

            {/* Subcategory */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                Subcategory Domain
              </label>
              <input
                type="text"
                placeholder="e.g. AI & Robotics, Dance, Music, Coding"
                value={formData.subcategory}
                onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#BABDE2]/80 text-[#374375] font-bold text-xs focus:ring-2 focus:ring-[#374375] outline-none"
              />
            </div>

            {/* College Select */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                College Affiliation
              </label>
              <select
                value={formData.collegeId}
                onChange={(e) => {
                  const found = NAGPUR_COLLEGES.find(c => c.id === e.target.value)
                  setFormData(prev => ({
                    ...prev,
                    collegeId: e.target.value,
                    college: found?.name || 'VNIT Nagpur'
                  }))
                }}
                className="w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#BABDE2]/80 text-[#374375] font-bold text-xs focus:ring-2 focus:ring-[#374375] outline-none"
              >
                {NAGPUR_COLLEGES.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* 2. Banner Upload */}
        <section className="bg-[#FFFCF5] rounded-3xl p-6 sm:p-8 border border-[#BABDE2]/60 shadow-xs space-y-5">
          <ImageUploadInput
            label="2. Club Banner Header Image"
            value={formData.banner}
            onChange={(val) => setFormData(prev => ({ ...prev, banner: val }))}
            error={errors.banner}
          />
        </section>

        {/* 3. Description & Activities */}
        <section className="bg-[#FFFCF5] rounded-3xl p-6 sm:p-8 border border-[#BABDE2]/60 shadow-xs space-y-5">
          <h2 className="text-lg font-black text-[#374375] border-b border-[#BABDE2]/30 pb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#895159]" /> 3. Club Descriptions & Activities
          </h2>

          <div className="space-y-2">
            <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
              Short Summary <span className="text-[#895159]">*</span>
            </label>
            <input
              type="text"
              placeholder="A one-line punchy summary of the club..."
              value={formData.shortDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
              className={`w-full py-2.5 px-4 rounded-xl bg-white border text-[#374375] font-semibold text-xs outline-none ${
                errors.shortDescription ? 'border-rose-400 ring-2 ring-rose-200' : 'border-[#BABDE2]/80 focus:ring-2 focus:ring-[#374375]'
              }`}
            />
            {errors.shortDescription && <p className="text-xs font-bold text-rose-600">{errors.shortDescription}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
              Detailed About Club <span className="text-[#895159]">*</span>
            </label>
            <textarea
              rows="4"
              placeholder="Explain club mission, regular training, projects, and achievements..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={`w-full py-3 px-4 rounded-xl bg-white border text-[#374375] font-medium text-xs outline-none leading-relaxed ${
                errors.description ? 'border-rose-400 ring-2 ring-rose-200' : 'border-[#BABDE2]/80 focus:ring-2 focus:ring-[#374375]'
              }`}
            />
            {errors.description && <p className="text-xs font-bold text-rose-600">{errors.description}</p>}
          </div>

          {/* Dynamic Activities List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                Key Club Activities
              </label>
              <button
                type="button"
                onClick={handleActivityAdd}
                className="text-[11px] font-black text-[#895159] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Activity</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.activities.map((act, idx) => (
                <div key={idx} className="p-3.5 bg-white rounded-2xl border border-[#BABDE2]/60 flex items-start gap-3">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      placeholder="Activity Title (e.g. Full-Stack Bootcamps)"
                      value={act.title}
                      onChange={(e) => handleActivityChange(idx, 'title', e.target.value)}
                      className="w-full py-1.5 px-3 rounded-lg border border-slate-200 text-xs font-black text-[#374375]"
                    />
                    <input
                      type="text"
                      placeholder="Activity Description"
                      value={act.desc}
                      onChange={(e) => handleActivityChange(idx, 'desc', e.target.value)}
                      className="w-full py-1.5 px-3 rounded-lg border border-slate-200 text-xs font-medium text-[#374375]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleActivityRemove(idx)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Leadership Team */}
        <section className="bg-[#FFFCF5] rounded-3xl p-6 sm:p-8 border border-[#BABDE2]/60 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#BABDE2]/30 pb-3">
            <h2 className="text-lg font-black text-[#374375] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#895159]" /> 4. Club Leadership Team
            </h2>
            <button
              type="button"
              onClick={handleTeamMemberAdd}
              className="text-[11px] font-black text-[#895159] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Member</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formData.team.map((mem, idx) => (
              <div key={idx} className="p-4 bg-white rounded-2xl border border-[#BABDE2]/60 space-y-3 relative">
                <button
                  type="button"
                  onClick={() => handleTeamMemberRemove(idx)}
                  className="absolute top-2 right-2 p-1 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3">
                  <img src={mem.avatar} alt={mem.name} className="w-10 h-10 rounded-full bg-slate-100 object-cover" />
                  <div className="space-y-1 flex-1">
                    <input
                      type="text"
                      placeholder="Member Name"
                      value={mem.name}
                      onChange={(e) => handleTeamMemberChange(idx, 'name', e.target.value)}
                      className="w-full py-1 px-2 rounded-lg border border-slate-200 text-xs font-black text-[#374375]"
                    />
                    <input
                      type="text"
                      placeholder="Role (e.g. President)"
                      value={mem.role}
                      onChange={(e) => handleTeamMemberChange(idx, 'role', e.target.value)}
                      className="w-full py-1 px-2 rounded-lg border border-slate-200 text-[11px] font-bold text-[#895159]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Actions */}
        <div className="p-6 bg-[#FFFCF5] rounded-3xl border border-[#BABDE2]/60 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-6 z-20 backdrop-blur-sm">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-[#BABDE2]/30 text-[#374375] font-extrabold text-xs hover:bg-[#BABDE2]/50 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-white border border-[#BABDE2] text-[#374375] hover:bg-[#BABDE2]/20 font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4 text-[#895159]" />
              <span>Save Draft</span>
            </button>

            <button
              type="button"
              onClick={() => { if (validate()) setIsPreviewMode(true) }}
              className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-[#BABDE2] text-[#374375] hover:bg-[#374375] hover:text-[#FFFCF5] font-black text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Eye className="w-4 h-4" />
              <span>Preview Page</span>
            </button>

            <button
              type="submit"
              className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-black text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Publish Club</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
