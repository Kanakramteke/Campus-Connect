import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CreateModal({ isOpen, onClose, onEventCreated, onCommunityCreated }) {
  const [step, setStep] = useState('select') // select, create-event, create-community, create-post, etc.
  const [eventType, setEventType] = useState('') // technical or cultural
  const [formData, setFormData] = useState({
    // Event Details
    eventTitle: '',
    eventHeadline: '', // Short catchy tagline for the card
    briefDescription: '', // What is event all about - shown on card
    eventDescription: '', // Full detailed description - shown in modal
    eventImage: null,
    eventImagePreview: '',
    category: 'technical', // technical or cultural
    
    // Timing & Location
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    eventMode: 'Offline', // Offline or Online
    venue: '',
    
    // Organizers & Contact
    organizedBy: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    
    // Registration Info
    registrationRequired: true,
    registrationDeadline: '',
    registrationLink: '',
    maxParticipants: '',
    registrationFee: '',
    
    // Extra Options
    tags: '',
    eligibility: 'Open for all',
    prizePool: '',
    participationType: 'Individual', // Individual or Team
    maxTeamMembers: '1'
    ,
    // Community specific fields
    communityName: '',
    communityHeadline: '',
    communityBrief: '',
    communityDescription: '',
    communityImage: null,
    communityImagePreview: '',
    joinType: 'Open', // Open or Approval
    membersLimit: '',
    communityTags: '',
    communityWebsite: ''
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Convert to base64 for persistent storage
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          eventImage: file,
          eventImagePreview: reader.result // base64 data URL
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCommunityImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          communityImage: file,
          communityImagePreview: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSelectOption = (option) => {
    setStep(option)
  }

  const handleEventTypeSelect = (type) => {
    setEventType(type)
    setFormData(prev => ({ ...prev, category: type }))
    setStep('create-event')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Format the date properly
    const startDateObj = new Date(formData.startDate)
    const formattedDate = startDateObj.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
    
    // Ensure registration fee has ₹ symbol
    let regFee = formData.registrationFee
    if (regFee && !regFee.includes('₹') && !regFee.toLowerCase().includes('free')) {
      regFee = '₹' + regFee
    }
    if (!regFee) {
      regFee = 'Free'
    }
    
    // Create event object with all required fields
    const newEvent = {
      id: Date.now(),
      name: formData.eventTitle,
      headline: formData.eventHeadline, // Short tagline for card
      description: formData.briefDescription, // Brief description shown on card
      fullDescription: formData.eventDescription, // Full description in modal
      date: formattedDate,
      venue: formData.eventMode === 'Offline' ? formData.venue : formData.venue + ' (Online)',
      college: formData.organizedBy,
      image: formData.eventImagePreview || '/images/banners/events-banner.jpg', // Use uploaded image or default
      organizer: formData.contactPerson,
      contact: formData.contactPhone,
      email: formData.contactEmail,
      prizePool: formData.prizePool || 'To be announced',
      participationType: formData.participationType,
      maxTeamMembers: parseInt(formData.maxTeamMembers) || 1,
      registrationFee: regFee,
      startDate: formData.startDate,
      startTime: formData.startTime,
      endDate: formData.endDate,
      endTime: formData.endTime,
      eventMode: formData.eventMode,
      registrationRequired: formData.registrationRequired,
      registrationDeadline: formData.registrationDeadline,
      maxParticipants: formData.maxParticipants,
      tags: formData.tags,
      eligibility: formData.eligibility,
      category: formData.category,
      isUserCreated: true // Flag to identify user-created events
    }

    // Call parent callback to add event
    if (onEventCreated) {
      onEventCreated(newEvent)
    }

    // Reset and close
    handleClose()
  }

  const handleCommunitySubmit = (e) => {
    e.preventDefault()

    const newCommunity = {
      id: Date.now(),
      name: formData.communityName || formData.organizedBy || 'Community',
      headline: formData.communityHeadline,
      description: formData.communityBrief,
      fullDescription: formData.communityDescription,
      image: formData.communityImagePreview || formData.eventImagePreview || '/images/banners/communities-banner.jpg',
      joinType: formData.joinType,
      membersLimit: formData.membersLimit,
      tags: formData.communityTags || formData.tags,
      website: formData.communityWebsite || formData.website,
      organizer: formData.contactPerson || formData.organizedBy,
      contact: formData.contactPhone,
      email: formData.contactEmail,
      isUserCreated: true
    }

    if (onCommunityCreated) {
      onCommunityCreated(newCommunity)
    }

    handleClose()
  }

  const handleClose = () => {
    setStep('select')
    setEventType('')
    setFormData({
      eventTitle: '',
      eventHeadline: '',
      briefDescription: '',
      eventDescription: '',
      eventImage: null,
      eventImagePreview: '',
      category: 'technical',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      eventMode: 'Offline',
      venue: '',
      organizedBy: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      website: '',
      registrationRequired: true,
      registrationDeadline: '',
      registrationLink: '',
      maxParticipants: '',
      registrationFee: '',
      tags: '',
      eligibility: 'Open for all',
      prizePool: '',
      participationType: 'Individual',
      maxTeamMembers: '1'
      ,
      // reset community fields
      communityName: '',
      communityHeadline: '',
      communityBrief: '',
      communityDescription: '',
      communityImage: null,
      communityImagePreview: '',
      joinType: 'Open',
      membersLimit: '',
      communityTags: '',
      communityWebsite: ''
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-6 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {step === 'select' && 'What would you like to create?'}
                  {step === 'select-event-type' && 'Select Event Type'}
                  {step === 'create-event' && `Create ${eventType === 'technical' ? 'Technical' : 'Cultural'} Event`}
                  {step === 'create-community' && 'Create Community'}
                  {step === 'create-post' && 'Create Discussion Post'}
                  {step === 'find-team' && 'Find Team Members'}
                  {step === 'ask-question' && 'Ask a Question'}
                  {step === 'collaborate' && 'Collaboration Request'}
                </h2>
                <p className="text-white/90 mt-1">Share your ideas with the campus community</p>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1">
            {/* Step 1: Select what to create */}
            {step === 'select' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep('select-event-type')}
                  className="p-6 border-2 border-slate-200 rounded-xl hover:border-cyan-500 hover:bg-cyan-50 transition-all text-left"
                >
                  <div className="text-4xl mb-3">🎉</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Create Event</h3>
                  <p className="text-slate-600 text-sm">Organize technical or cultural events for your college</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectOption('create-community')}
                  className="p-6 border-2 border-slate-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all text-left"
                >
                  <div className="text-4xl mb-3">👥</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Create Community</h3>
                  <p className="text-slate-600 text-sm">Build communities around shared interests</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectOption('create-post')}
                  className="p-6 border-2 border-slate-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left"
                >
                  <div className="text-4xl mb-3">💬</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Discussion Post</h3>
                  <p className="text-slate-600 text-sm">Start a conversation or share updates</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectOption('find-team')}
                  className="p-6 border-2 border-slate-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all text-left"
                >
                  <div className="text-4xl mb-3">🤝</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Find Team Members</h3>
                  <p className="text-slate-600 text-sm">Looking for teammates for a project or event</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectOption('ask-question')}
                  className="p-6 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                >
                  <div className="text-4xl mb-3">❓</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Ask a Question</h3>
                  <p className="text-slate-600 text-sm">Get help from the community</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectOption('collaborate')}
                  className="p-6 border-2 border-slate-200 rounded-xl hover:border-pink-500 hover:bg-pink-50 transition-all text-left"
                >
                  <div className="text-4xl mb-3">🚀</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Collaborate</h3>
                  <p className="text-slate-600 text-sm">Find collaborators for your project or idea</p>
                </motion.button>
              </div>
            )}

            {/* Step 2: Select Event Type */}
            {step === 'select-event-type' && (
              <div>
                <button
                  onClick={() => setStep('select')}
                  className="mb-4 text-cyan-600 hover:text-cyan-700 font-semibold flex items-center gap-2"
                >
                  ← Back
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleEventTypeSelect('technical')}
                    className="p-8 border-2 border-cyan-300 bg-cyan-50 rounded-xl hover:border-cyan-500 hover:bg-cyan-100 transition-all text-center"
                  >
                    <div className="text-5xl mb-4">💻</div>
                    <h3 className="text-2xl font-bold text-cyan-700 mb-2">Technical Event</h3>
                    <p className="text-slate-600">Hackathons, workshops, coding competitions, tech talks</p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleEventTypeSelect('cultural')}
                    className="p-8 border-2 border-purple-300 bg-purple-50 rounded-xl hover:border-purple-500 hover:bg-purple-100 transition-all text-center"
                  >
                    <div className="text-5xl mb-4">🎨</div>
                    <h3 className="text-2xl font-bold text-purple-700 mb-2">Cultural Event</h3>
                    <p className="text-slate-600">Fests, music, dance, drama, art exhibitions, literary events</p>
                  </motion.button>
                </div>
              </div>
            )}

            {/* Step 3: Create Event Form */}
            {step === 'create-event' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <button
                  type="button"
                  onClick={() => setStep('select-event-type')}
                  className="text-cyan-600 hover:text-cyan-700 font-semibold flex items-center gap-2"
                >
                  ← Back
                </button>

                {/* Section 1: Event Details */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">📝 Event Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Event Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="eventTitle"
                        value={formData.eventTitle}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                        placeholder="e.g., Tech Hackathon 2025"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Event Headline <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="eventHeadline"
                        value={formData.eventHeadline}
                        onChange={handleInputChange}
                        required
                        maxLength="80"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                        placeholder="Short catchy tagline (shown at top of event card)"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        {formData.eventHeadline.length}/80 characters
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        What is this event all about? <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="briefDescription"
                        value={formData.briefDescription}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        maxLength="200"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                        placeholder="Brief overview shown on the event card (2-3 lines)"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        {formData.briefDescription.length}/200 characters - This will be visible on the card
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Full Event Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="eventDescription"
                        value={formData.eventDescription}
                        onChange={handleInputChange}
                        required
                        rows="6"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                        placeholder="Detailed description shown when user clicks 'View Details'..."
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Detailed information - This will be shown inside the modal after clicking "View Details"
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Event Poster / Image Upload
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                      {formData.eventImagePreview && (
                        <img 
                          src={formData.eventImagePreview} 
                          alt="Preview" 
                          className="mt-3 w-full h-48 object-cover rounded-xl"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 2: Timing & Location */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">📅 Timing & Location</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Start Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        End Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        End Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Event Mode <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-xl hover:border-cyan-300 cursor-pointer transition-colors flex-1">
                        <input
                          type="radio"
                          name="eventMode"
                          value="Offline"
                          checked={formData.eventMode === 'Offline'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-cyan-500"
                        />
                        <span className="text-slate-700 font-medium">🏛️ Offline</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-xl hover:border-cyan-300 cursor-pointer transition-colors flex-1">
                        <input
                          type="radio"
                          name="eventMode"
                          value="Online"
                          checked={formData.eventMode === 'Online'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-cyan-500"
                        />
                        <span className="text-slate-700 font-medium">💻 Online</span>
                      </label>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {formData.eventMode === 'Offline' ? 'Venue' : 'Platform Link'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder={formData.eventMode === 'Offline' ? 'e.g., Auditorium Hall A' : 'e.g., https://meet.google.com/xyz'}
                    />
                  </div>
                </div>

                {/* Section 3: Organizers & Contact */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">👤 Organizers & Contact</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Organized By / Community Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="organizedBy"
                        value={formData.organizedBy}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                        placeholder="e.g., VNIT Nagpur / Tech Club"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Contact Person Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                        placeholder="e.g., Dr. Rajesh Kumar"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Contact Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="contactEmail"
                          value={formData.contactEmail}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                          placeholder="email@college.ac.in"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Contact Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="contactPhone"
                          value={formData.contactPhone}
                          onChange={handleInputChange}
                          required
                          pattern="[0-9+\- ]+"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Website / Social Link (optional)
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Registration Info */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">📋 Registration Info</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="registrationRequired"
                          checked={formData.registrationRequired}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-cyan-500"
                        />
                        <span className="text-sm font-semibold text-slate-700">Registration Required?</span>
                      </label>
                    </div>

                    {formData.registrationRequired && (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Registration Deadline
                          </label>
                          <input
                            type="date"
                            name="registrationDeadline"
                            value={formData.registrationDeadline}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Registration Fee
                          </label>
                          <input
                            type="text"
                            name="registrationFee"
                            value={formData.registrationFee}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                            placeholder="e.g., ₹499 or Free"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Max Participants (optional)
                          </label>
                          <input
                            type="number"
                            name="maxParticipants"
                            value={formData.maxParticipants}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                            placeholder="e.g., 100"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-3">
                            Participation Type <span className="text-red-500">*</span>
                          </label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-xl hover:border-cyan-300 cursor-pointer transition-colors flex-1">
                              <input
                                type="radio"
                                name="participationType"
                                value="Individual"
                                checked={formData.participationType === 'Individual'}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-cyan-500"
                              />
                              <span className="text-slate-700 font-medium">👤 Individual</span>
                            </label>
                            <label className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-xl hover:border-cyan-300 cursor-pointer transition-colors flex-1">
                              <input
                                type="radio"
                                name="participationType"
                                value="Team"
                                checked={formData.participationType === 'Team'}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-cyan-500"
                              />
                              <span className="text-slate-700 font-medium">👥 Team</span>
                            </label>
                          </div>
                        </div>

                        {formData.participationType === 'Team' && (
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Max Team Members <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              name="maxTeamMembers"
                              value={formData.maxTeamMembers}
                              onChange={handleInputChange}
                              required
                              min="2"
                              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                              placeholder="e.g., 4"
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Section 5: Extra Options */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">🧩 Extra Options</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Prize Pool (if applicable)
                      </label>
                      <input
                        type="text"
                        name="prizePool"
                        value={formData.prizePool}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                        placeholder="e.g., ₹50,000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Tags / Keywords
                      </label>
                      <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                        placeholder="e.g., AI, Design, Workshop (comma separated)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Eligibility
                      </label>
                      <select
                        name="eligibility"
                        value={formData.eligibility}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors bg-white"
                      >
                        <option value="Open for all">Open for all</option>
                        <option value="Only for CS Students">Only for CS Students</option>
                        <option value="Only for Engineering Students">Only for Engineering Students</option>
                        <option value="College Students Only">College Students Only</option>
                        <option value="Custom">Custom (specify in description)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 transition-all"
                  >
                    🎉 Publish Event
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-8 py-4 rounded-xl font-bold border-2 border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Create Community Form */}
            {step === 'create-community' && (
              <form onSubmit={handleCommunitySubmit} className="space-y-6">
                <button
                  type="button"
                  onClick={() => setStep('select')}
                  className="mb-4 text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2"
                >
                  ← Back
                </button>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">👥 Community Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Community Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="communityName"
                        value={formData.communityName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="e.g., VNIT Robotics Club"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Headline <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="communityHeadline"
                        value={formData.communityHeadline}
                        onChange={handleInputChange}
                        required
                        maxLength={80}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="Short catchy line for the community"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">What is this community about? <span className="text-red-500">*</span></label>
                      <textarea
                        name="communityBrief"
                        value={formData.communityBrief}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        maxLength={200}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="Short overview shown on community card (2-3 lines)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Description <span className="text-red-500">*</span></label>
                      <textarea
                        name="communityDescription"
                        value={formData.communityDescription}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="Detailed description shown on community page"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Community Image</label>
                      <input type="file" accept="image/*" onChange={handleCommunityImageUpload} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" />
                      {formData.communityImagePreview && (
                        <img src={formData.communityImagePreview} alt="Preview" className="mt-3 w-full h-48 object-cover rounded-xl" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">🔗 Membership & Contact</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Join Type</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-3 p-3 border-2 border-slate-200 rounded-xl hover:border-purple-300 cursor-pointer">
                          <input type="radio" name="joinType" value="Open" checked={formData.joinType === 'Open'} onChange={handleInputChange} className="w-4 h-4 text-purple-500" />
                          <span>Open to All</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 border-2 border-slate-200 rounded-xl hover:border-purple-300 cursor-pointer">
                          <input type="radio" name="joinType" value="Approval" checked={formData.joinType === 'Approval'} onChange={handleInputChange} className="w-4 h-4 text-purple-500" />
                          <span>Join by Approval</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Members Limit (optional)</label>
                      <input type="number" name="membersLimit" value={formData.membersLimit} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" placeholder="e.g., 200" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Tags / Topics</label>
                      <input type="text" name="communityTags" value={formData.communityTags} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" placeholder="e.g., robotics, ai, competitions" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Website / Social Link (optional)</label>
                      <input type="url" name="communityWebsite" value={formData.communityWebsite} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" placeholder="https://..." />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all">Create Community</button>
                  <button type="button" onClick={handleClose} className="px-8 py-4 rounded-xl font-bold border-2 border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors">Cancel</button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
