import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Globe, Users, ArrowLeft, Eye, Save, Send, Plus, Trash2, Sparkles, Tag
} from 'lucide-react'
import { NAGPUR_COLLEGES } from '../../data/nagpurData'
import ImageUploadInput from './ImageUploadInput'
import LivePreviewWrapper from './LivePreviewWrapper'
import CommunityDetailsPage from '../../pages/communities/CommunityDetailsPage'

const COMMUNITY_LOGO_PRESETS = [
  { name: 'AI & ML', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80' },
  { name: 'Full-Stack', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=300&q=80' },
  { name: 'CyberSec', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=300&q=80' },
  { name: 'Founders', url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=300&q=80' },
  { name: 'Designers', url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=300&q=80' },
  { name: 'Music Hub', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80' }
]
const COMMUNITY_CATEGORIES = ['Technology', 'Coding', 'AI & ML', 'Entrepreneurship', 'Design', 'Music', 'Gaming', 'Sports', 'Academic', 'Literature', 'Other']

export default function CreateCommunityForm({ initialData = null, onSave, onCancel, onNavigate }) {
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    name: initialData?.name || '',
    category: initialData?.category || 'Technology',
    subcategory: initialData?.subcategory || 'AI & Machine Learning',
    college: initialData?.college || 'VNIT Nagpur',
    collegeId: initialData?.collegeId || 'vnit',
    logo: initialData?.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
    coverImage: initialData?.coverImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    memberCount: initialData?.memberCount ?? 150,
    activityStatus: initialData?.activityStatus || 'Highly Active',
    shortDescription: initialData?.shortDescription || '',
    description: initialData?.description || '',
    interests: initialData?.interests || ['AI', 'Python', 'Machine Learning', 'OpenSource'],
    popularPosts: initialData?.popularPosts || [
      {
        id: 'p-1',
        author: 'Kanak Ramteke',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KanakRamteke',
        college: 'VNIT Nagpur',
        timeAgo: '2 hours ago',
        title: 'Welcome to our new student community!',
        content: 'Excited to connect with student developers and creators across Nagpur campuses.',
        likes: 12,
        isLiked: false,
        replies: []
      }
    ]
  })

  const [errors, setErrors] = useState({})
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [tagInput, setTagInput] = useState('')

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Community name is required'
    if (!formData.shortDescription.trim()) errs.shortDescription = 'Short description is required'
    if (!formData.description.trim()) errs.description = 'Detailed description is required'
    if (!formData.coverImage) errs.coverImage = 'Community cover image is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleTagAdd = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault()
      if (tagInput.trim() && !formData.interests.includes(tagInput.trim())) {
        setFormData(prev => ({ ...prev, interests: [...prev.interests, tagInput.trim()] }))
        setTagInput('')
      }
    }
  }

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({ ...prev, interests: prev.interests.filter(t => t !== tagToRemove) }))
  }

  const handleSaveDraft = () => {
    onSave('community', formData, true)
  }

  const handlePublish = () => {
    if (validate()) {
      onSave('community', formData, false)
    }
  }

  if (isPreviewMode) {
    const previewCommObject = {
      ...formData,
      id: formData.id || `preview-comm-${Date.now()}`
    }

    return (
      <LivePreviewWrapper
        entityType="Student Community"
        onBackToEdit={() => setIsPreviewMode(false)}
        onPublish={handlePublish}
      >
        <CommunityDetailsPage communityId={previewCommObject.id} mockCommunity={previewCommObject} onNavigate={onNavigate} />
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
            <span>Community Creator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#374375] tracking-tight">
            {initialData ? 'Edit Community' : 'Create New Student Community'}
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
            <Globe className="w-5 h-5 text-[#895159]" /> 1. Community Basic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                Community Name <span className="text-[#895159]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Nagpur AI & Developers Hub"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full py-3 px-4 rounded-xl bg-white border text-[#374375] font-bold text-sm outline-none ${
                  errors.name ? 'border-rose-400 ring-2 ring-rose-200' : 'border-[#BABDE2]/80 focus:ring-2 focus:ring-[#374375]'
                }`}
              />
              {errors.name && <p className="text-xs font-bold text-rose-600">{errors.name}</p>}
            </div>

            {/* Community Logo / Image Upload */}
            <div>
              <ImageUploadInput
                label="Community Logo / Avatar Image"
                value={formData.logo}
                onChange={(val) => setFormData(prev => ({ ...prev, logo: val }))}
                presets={COMMUNITY_LOGO_PRESETS}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                Primary Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#BABDE2]/80 text-[#374375] font-bold text-xs focus:ring-2 focus:ring-[#374375] outline-none"
              >
                {COMMUNITY_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Subcategory */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                Subcategory Focus
              </label>
              <input
                type="text"
                placeholder="e.g. LLMs & Prompting, Mobile Dev"
                value={formData.subcategory}
                onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#BABDE2]/80 text-[#374375] font-bold text-xs focus:ring-2 focus:ring-[#374375] outline-none"
              />
            </div>

            {/* College */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                Host College / Campus
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

        {/* 2. Cover Image */}
        <section className="bg-[#FFFCF5] rounded-3xl p-6 sm:p-8 border border-[#BABDE2]/60 shadow-xs space-y-5">
          <ImageUploadInput
            label="2. Community Cover Header Image"
            value={formData.coverImage}
            onChange={(val) => setFormData(prev => ({ ...prev, coverImage: val }))}
            error={errors.coverImage}
          />
        </section>

        {/* 3. Description & Interest Tags */}
        <section className="bg-[#FFFCF5] rounded-3xl p-6 sm:p-8 border border-[#BABDE2]/60 shadow-xs space-y-5">
          <h2 className="text-lg font-black text-[#374375] border-b border-[#BABDE2]/30 pb-3 flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#895159]" /> 3. About & Topics of Interest
          </h2>

          <div className="space-y-2">
            <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
              Short Summary <span className="text-[#895159]">*</span>
            </label>
            <input
              type="text"
              placeholder="Short tagline or summary for community card..."
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
              Detailed About Community <span className="text-[#895159]">*</span>
            </label>
            <textarea
              rows="4"
              placeholder="Explain community goals, discussion guidelines, and topics..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={`w-full py-3 px-4 rounded-xl bg-white border text-[#374375] font-medium text-xs outline-none leading-relaxed ${
                errors.description ? 'border-rose-400 ring-2 ring-rose-200' : 'border-[#BABDE2]/80 focus:ring-2 focus:ring-[#374375]'
              }`}
            />
            {errors.description && <p className="text-xs font-bold text-rose-600">{errors.description}</p>}
          </div>

          {/* Interest Tags */}
          <div className="space-y-2">
            <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
              Topic Interest Tags
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type tag (e.g. ArtificialIntelligence) and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagAdd}
                className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-[#374375]"
              />
              <button
                type="button"
                onClick={handleTagAdd}
                className="py-2 px-3.5 rounded-xl bg-[#374375] text-white font-bold text-xs hover:bg-[#895159] transition-colors cursor-pointer"
              >
                Add Tag
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              {formData.interests.map((tag, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 text-[11px] font-bold text-[#374375] bg-[#BABDE2]/30 px-3 py-1 rounded-full border border-[#BABDE2]/60">
                  #{tag}
                  <button type="button" onClick={() => handleTagRemove(tag)} className="text-slate-400 hover:text-rose-600 ml-1">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
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
              <span>Publish Community</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
