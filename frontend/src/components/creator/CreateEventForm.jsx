import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar, Clock, MapPin, Users, Ticket, ArrowLeft, Eye,
  Save, Send, Plus, Trash2, Sparkles, Building2, HelpCircle, Target
} from 'lucide-react'
import { NAGPUR_COLLEGES } from '../../data/nagpurData'
import ImageUploadInput from './ImageUploadInput'
import LivePreviewWrapper from './LivePreviewWrapper'
import EventDetailsPage from '../../pages/events/EventDetailsPage'

const TECHNICAL_CATEGORIES = ['Hackathon', 'Robotics', 'Workshop', 'Coding Competition', 'Cybersecurity', 'AI & Data', 'Gaming', 'Other Tech']
const CULTURAL_CATEGORIES = ['Cultural Fest', 'Music', 'Dance', 'Drama', 'Fine Arts', 'Poetry', 'Fashion', 'Other Cultural']

export default function CreateEventForm({ initialData = null, initialType = 'technical', onSave, onCancel, onNavigate }) {
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    title: initialData?.title || '',
    tagline: initialData?.tagline || '',
    type: initialData?.type || initialType,
    category: initialData?.category || (initialType === 'technical' ? 'Hackathon' : 'Cultural Fest'),
    organizingCollege: initialData?.organizingCollege || 'VNIT Nagpur',
    collegeId: initialData?.collegeId || 'vnit',
    date: initialData?.date || '',
    time: initialData?.time || '10:00 AM - 05:00 PM',
    venue: initialData?.venue || '',
    venueAddress: initialData?.venueAddress || '',
    location: initialData?.location || '',
    registrationFee: initialData?.registrationFee ?? 0,
    isFree: initialData?.isFree ?? true,
    teamSize: initialData?.teamSize || 'Individual',
    registrationDeadline: initialData?.registrationDeadline || '',
    eligibility: initialData?.eligibility || 'Open to all undergraduates across Nagpur colleges',
    seatsAvailable: initialData?.seatsAvailable ?? 50,
    totalCapacity: initialData?.totalCapacity ?? 100,
    status: initialData?.status || 'open',
    banner: initialData?.banner || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    description: initialData?.description || '',
    expectations: initialData?.expectations || [
      { title: 'Hands-on Experience', desc: 'Practical participation and live project work.' },
      { title: 'Networking Opportunity', desc: 'Connect with peers from top Nagpur campuses.' }
    ],
    organizer: {
      name: initialData?.organizer?.name || 'VNIT Student Council',
      description: initialData?.organizer?.description || 'Official campus student body.',
      contactPerson: initialData?.organizer?.contactPerson || 'Student Coordinator',
      email: initialData?.organizer?.email || 'events@nagpur.edu.in',
      phone: initialData?.organizer?.phone || '+91 98765 43210'
    },
    tags: initialData?.tags || ['NagpurEvents', 'InterCollege']
  })

  const [errors, setErrors] = useState({})
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [tagInput, setTagInput] = useState('')

  const categoriesList = formData.type === 'technical' ? TECHNICAL_CATEGORIES : CULTURAL_CATEGORIES

  const validate = () => {
    const errs = {}
    if (!formData.title.trim()) errs.title = 'Event title is required'
    if (!formData.description.trim()) errs.description = 'About Event description is required'
    if (!formData.date) errs.date = 'Event date is required'
    if (!formData.venue.trim()) errs.venue = 'Venue name is required'
    if (!formData.banner) errs.banner = 'Event banner image is required'
    if (!formData.isFree && formData.registrationFee <= 0) {
      errs.registrationFee = 'Registration fee must be greater than 0 for paid events'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleExpectationAdd = () => {
    setFormData(prev => ({
      ...prev,
      expectations: [...prev.expectations, { title: '', desc: '' }]
    }))
  }

  const handleExpectationChange = (idx, field, val) => {
    setFormData(prev => {
      const updated = [...prev.expectations]
      updated[idx] = { ...updated[idx], [field]: val }
      return { ...prev, expectations: updated }
    })
  }

  const handleExpectationRemove = (idx) => {
    setFormData(prev => ({
      ...prev,
      expectations: prev.expectations.filter((_, i) => i !== idx)
    }))
  }

  const handleTagAdd = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault()
      if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }))
        setTagInput('')
      }
    }
  }

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }))
  }

  const handleSaveDraft = () => {
    onSave('event', formData, true)
  }

  const handlePublish = () => {
    if (validate()) {
      onSave('event', formData, false)
    }
  }

  // Live Preview Wrapper Render
  if (isPreviewMode) {
    // Construct preview event object conforming to EventDetailsPage expected structure
    const previewEventObject = {
      ...formData,
      id: formData.id || `preview-${Date.now()}`,
      location: formData.location || formData.venue,
      popular: false
    }

    return (
      <LivePreviewWrapper
        entityType={`${formData.type === 'technical' ? 'Technical' : 'Cultural'} Event`}
        onBackToEdit={() => setIsPreviewMode(false)}
        onPublish={handlePublish}
      >
        <EventDetailsPage eventId={previewEventObject.id} mockEvent={previewEventObject} onNavigate={onNavigate} />
      </LivePreviewWrapper>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#374375] text-[#FFFCF5] text-[10px] font-black uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-[#DFAEA1]" />
            <span>Event Creator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#374375] tracking-tight">
            {initialData ? 'Edit Event' : `Create New ${formData.type === 'technical' ? 'Technical' : 'Cultural'} Event`}
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

      {/* Main Form Container */}
      <form onSubmit={(e) => { e.preventDefault(); handlePublish() }} className="space-y-8">
        
        {/* 1. Basic Information */}
        <section className="bg-[#FFFCF5] rounded-3xl p-6 sm:p-8 border border-[#BABDE2]/60 shadow-xs space-y-5">
          <h2 className="text-lg font-black text-[#374375] border-b border-[#BABDE2]/30 pb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#895159]" /> 1. Basic Event Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Event Type */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                Event Type <span className="text-[#895159]">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: 'technical', category: TECHNICAL_CATEGORIES[0] }))}
                  className={`py-2.5 px-3 rounded-xl font-extrabold text-xs border transition-all cursor-pointer ${
                    formData.type === 'technical'
                      ? 'bg-[#374375] text-[#FFFCF5] border-[#374375] shadow-xs'
                      : 'bg-white text-[#374375] border-[#BABDE2]/60 hover:bg-[#BABDE2]/20'
                  }`}
                >
                  Technical Event
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: 'cultural', category: CULTURAL_CATEGORIES[0] }))}
                  className={`py-2.5 px-3 rounded-xl font-extrabold text-xs border transition-all cursor-pointer ${
                    formData.type === 'cultural'
                      ? 'bg-[#895159] text-[#FFFCF5] border-[#895159] shadow-xs'
                      : 'bg-white text-[#374375] border-[#BABDE2]/60 hover:bg-[#BABDE2]/20'
                  }`}
                >
                  Cultural Event
                </button>
              </div>
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                Category <span className="text-[#895159]">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#BABDE2]/80 text-[#374375] font-bold text-xs focus:ring-2 focus:ring-[#374375] outline-none"
              >
                {categoriesList.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Event Title */}
          <div className="space-y-2">
            <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
              Event Title <span className="text-[#895159]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. HackNova 2026 / Aarohi Cultural Fest"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className={`w-full py-3 px-4 rounded-xl bg-white border text-[#374375] font-bold text-sm outline-none transition-all ${
                errors.title ? 'border-rose-400 ring-2 ring-rose-200' : 'border-[#BABDE2]/80 focus:ring-2 focus:ring-[#374375]'
              }`}
            />
            {errors.title && <p className="text-xs font-bold text-rose-600">{errors.title}</p>}
          </div>

          {/* Tagline */}
          <div className="space-y-2">
            <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
              Event Tagline
            </label>
            <input
              type="text"
              placeholder="e.g. Build. Innovate. Compete. / Unleash The Creator Within."
              value={formData.tagline}
              onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
              className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#BABDE2]/80 text-[#374375] font-medium text-xs focus:ring-2 focus:ring-[#374375] outline-none"
            />
          </div>

          {/* Organizing College */}
          <div className="space-y-2">
            <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
              Organizing College <span className="text-[#895159]">*</span>
            </label>
            <select
              value={formData.collegeId}
              onChange={(e) => {
                const found = NAGPUR_COLLEGES.find(c => c.id === e.target.value)
                setFormData(prev => ({
                  ...prev,
                  collegeId: e.target.value,
                  organizingCollege: found?.name || 'VNIT Nagpur'
                }))
              }}
              className="w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#BABDE2]/80 text-[#374375] font-bold text-xs focus:ring-2 focus:ring-[#374375] outline-none"
            >
              {NAGPUR_COLLEGES.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </section>

        {/* 2. Date, Time & Location */}
        <section className="bg-[#FFFCF5] rounded-3xl p-6 sm:p-8 border border-[#BABDE2]/60 shadow-xs space-y-5">
          <h2 className="text-lg font-black text-[#374375] border-b border-[#BABDE2]/30 pb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#895159]" /> 2. Date, Time & Venue
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Event Date */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                Event Date <span className="text-[#895159]">*</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className={`w-full py-2.5 px-4 rounded-xl bg-white border text-[#374375] font-bold text-xs outline-none ${
                  errors.date ? 'border-rose-400 ring-2 ring-rose-200' : 'border-[#BABDE2]/80 focus:ring-2 focus:ring-[#374375]'
                }`}
              />
              {errors.date && <p className="text-xs font-bold text-rose-600">{errors.date}</p>}
            </div>

            {/* Event Time */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                Event Time Slot
              </label>
              <input
                type="text"
                placeholder="e.g. 09:00 AM - 05:00 PM"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#BABDE2]/80 text-[#374375] font-bold text-xs focus:ring-2 focus:ring-[#374375] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Venue Name */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                Venue Name <span className="text-[#895159]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Auditorium Hall, VNIT OAT Stadium"
                value={formData.venue}
                onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value, location: e.target.value }))}
                className={`w-full py-2.5 px-4 rounded-xl bg-white border text-[#374375] font-bold text-xs outline-none ${
                  errors.venue ? 'border-rose-400 ring-2 ring-rose-200' : 'border-[#BABDE2]/80 focus:ring-2 focus:ring-[#374375]'
                }`}
              />
              {errors.venue && <p className="text-xs font-bold text-rose-600">{errors.venue}</p>}
            </div>

            {/* Venue Address */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                Full Address / Campus Location
              </label>
              <input
                type="text"
                placeholder="e.g. South Ambazari Road, Nagpur 440010"
                value={formData.venueAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, venueAddress: e.target.value }))}
                className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#BABDE2]/80 text-[#374375] font-medium text-xs focus:ring-2 focus:ring-[#374375] outline-none"
              />
            </div>
          </div>
        </section>

        {/* 3. Registration Fee & Capacity */}
        <section className="bg-[#FFFCF5] rounded-3xl p-6 sm:p-8 border border-[#BABDE2]/60 shadow-xs space-y-5">
          <h2 className="text-lg font-black text-[#374375] border-b border-[#BABDE2]/30 pb-3 flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#895159]" /> 3. Registration Fee & Capacity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Free vs Paid */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                Fee Type
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, isFree: true, registrationFee: 0 }))}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-extrabold text-xs border transition-all cursor-pointer ${
                    formData.isFree
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-[#374375] border-[#BABDE2]/60'
                  }`}
                >
                  Free Event
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, isFree: false, registrationFee: prev.registrationFee || 199 }))}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-extrabold text-xs border transition-all cursor-pointer ${
                    !formData.isFree
                      ? 'bg-[#374375] text-white border-[#374375] shadow-xs'
                      : 'bg-white text-[#374375] border-[#BABDE2]/60'
                  }`}
                >
                  Paid Event
                </button>
              </div>
            </div>

            {/* Registration Fee */}
            {!formData.isFree && (
              <div className="space-y-2">
                <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                  Registration Fee (₹) <span className="text-[#895159]">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 199"
                  value={formData.registrationFee}
                  onChange={(e) => setFormData(prev => ({ ...prev, registrationFee: Number(e.target.value) }))}
                  className={`w-full py-2.5 px-4 rounded-xl bg-white border text-[#374375] font-bold text-xs outline-none ${
                    errors.registrationFee ? 'border-rose-400 ring-2 ring-rose-200' : 'border-[#BABDE2]/80 focus:ring-2 focus:ring-[#374375]'
                  }`}
                />
                {errors.registrationFee && <p className="text-xs font-bold text-rose-600">{errors.registrationFee}</p>}
              </div>
            )}

            {/* Team Size */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                Team Size / Participation
              </label>
              <input
                type="text"
                placeholder="e.g. Individual / 2 - 4 Members"
                value={formData.teamSize}
                onChange={(e) => setFormData(prev => ({ ...prev, teamSize: e.target.value }))}
                className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#BABDE2]/80 text-[#374375] font-bold text-xs focus:ring-2 focus:ring-[#374375] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Seats Available */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                Available Seats
              </label>
              <input
                type="number"
                min="1"
                value={formData.seatsAvailable}
                onChange={(e) => setFormData(prev => ({ ...prev, seatsAvailable: Number(e.target.value) }))}
                className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#BABDE2]/80 text-[#374375] font-bold text-xs focus:ring-2 focus:ring-[#374375] outline-none"
              />
            </div>

            {/* Total Capacity */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                Total Capacity
              </label>
              <input
                type="number"
                min="1"
                value={formData.totalCapacity}
                onChange={(e) => setFormData(prev => ({ ...prev, totalCapacity: Number(e.target.value) }))}
                className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#BABDE2]/80 text-[#374375] font-bold text-xs focus:ring-2 focus:ring-[#374375] outline-none"
              />
            </div>

            {/* Registration Deadline */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                Registration Deadline
              </label>
              <input
                type="date"
                value={formData.registrationDeadline}
                onChange={(e) => setFormData(prev => ({ ...prev, registrationDeadline: e.target.value }))}
                className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#BABDE2]/80 text-[#374375] font-bold text-xs focus:ring-2 focus:ring-[#374375] outline-none"
              />
            </div>
          </div>
        </section>

        {/* 4. Banner Image Upload */}
        <section className="bg-[#FFFCF5] rounded-3xl p-6 sm:p-8 border border-[#BABDE2]/60 shadow-xs space-y-5">
          <ImageUploadInput
            label="4. Event Banner / Graphic Image"
            value={formData.banner}
            onChange={(val) => setFormData(prev => ({ ...prev, banner: val }))}
            error={errors.banner}
          />
        </section>

        {/* 5. About & What to Expect */}
        <section className="bg-[#FFFCF5] rounded-3xl p-6 sm:p-8 border border-[#BABDE2]/60 shadow-xs space-y-5">
          <h2 className="text-lg font-black text-[#374375] border-b border-[#BABDE2]/30 pb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#895159]" /> 5. Description & Highlights
          </h2>

          {/* Detailed Description */}
          <div className="space-y-2">
            <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
              About the Event <span className="text-[#895159]">*</span>
            </label>
            <textarea
              rows="4"
              placeholder="Describe the event purpose, activities, challenges, and benefits for students..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={`w-full py-3 px-4 rounded-xl bg-white border text-[#374375] font-medium text-xs outline-none leading-relaxed ${
                errors.description ? 'border-rose-400 ring-2 ring-rose-200' : 'border-[#BABDE2]/80 focus:ring-2 focus:ring-[#374375]'
              }`}
            />
            {errors.description && <p className="text-xs font-bold text-rose-600">{errors.description}</p>}
          </div>

          {/* Eligibility */}
          <div className="space-y-2">
            <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
              Eligibility / Who Can Participate?
            </label>
            <input
              type="text"
              placeholder="e.g. Open to all Engineering, Tech & Computer Science Undergraduates"
              value={formData.eligibility}
              onChange={(e) => setFormData(prev => ({ ...prev, eligibility: e.target.value }))}
              className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#BABDE2]/80 text-[#374375] font-bold text-xs focus:ring-2 focus:ring-[#374375] outline-none"
            />
          </div>

          {/* Dynamic What To Expect List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
                What To Expect Highlights (Cards)
              </label>
              <button
                type="button"
                onClick={handleExpectationAdd}
                className="text-[11px] font-black text-[#895159] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Highlight</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.expectations.map((exp, idx) => (
                <div key={idx} className="p-3.5 bg-white rounded-2xl border border-[#BABDE2]/60 flex items-start gap-3">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      placeholder="Highlight Title (e.g. Expert Mentorship)"
                      value={exp.title}
                      onChange={(e) => handleExpectationChange(idx, 'title', e.target.value)}
                      className="w-full py-1.5 px-3 rounded-lg border border-slate-200 text-xs font-black text-[#374375]"
                    />
                    <input
                      type="text"
                      placeholder="Highlight Description (e.g. Learn from industry architects)"
                      value={exp.desc}
                      onChange={(e) => handleExpectationChange(idx, 'desc', e.target.value)}
                      className="w-full py-1.5 px-3 rounded-lg border border-slate-200 text-xs font-medium text-[#374375]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleExpectationRemove(idx)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Form Footer Actions */}
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
              <span>Publish Event</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
