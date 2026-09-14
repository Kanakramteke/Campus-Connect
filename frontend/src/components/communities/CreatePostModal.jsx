import React, { useState } from 'react'
import { X, MessageSquare, AlertCircle, Send, Users, ShieldAlert } from 'lucide-react'
import { useCampus } from '../../context/CampusContext'

const CreatePostModal = ({ isOpen, onClose, community, isMember, onJoin }) => {
  const { addCommunityPost } = useCampus()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen || !community) return null

  const validate = () => {
    const newErrors = {}
    if (!title.trim()) {
      newErrors.title = 'Please enter a discussion title.'
    } else if (title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters long.'
    }

    if (!content.trim()) {
      newErrors.content = 'Please enter discussion details.'
    } else if (content.trim().length < 10) {
      newErrors.content = 'Discussion content must be at least 10 characters long.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isMember) return
    if (!validate()) return

    setIsSubmitting(true)
    setTimeout(() => {
      addCommunityPost(community.id, title.trim(), content.trim())
      setIsSubmitting(false)
      setTitle('')
      setContent('')
      onClose()
    }, 400)
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#374375]/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FFFCF5] rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl border border-[#BABDE2] animate-scaleUp">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#BABDE2]/40 pb-4">
          <div>
            <h3 className="font-black text-[#374375] text-lg flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#895159]" /> Start a Discussion
            </h3>
            <p className="text-xs font-semibold text-slate-500">
              {community.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-[#374375]/60 hover:text-[#374375] hover:bg-[#BABDE2]/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If user is NOT a member -> Prompt to Join */}
        {!isMember ? (
          <div className="p-6 text-center space-y-4 bg-white rounded-2xl border border-[#BABDE2]/40">
            <div className="w-14 h-14 bg-[#BABDE2]/30 text-[#374375] rounded-full flex items-center justify-center mx-auto">
              <ShieldAlert className="w-7 h-7 text-[#374375]" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-[#374375] text-base">Members Only</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                You must be a member of <span className="font-bold text-[#374375]">{community.name}</span> to start a discussion.
              </p>
            </div>
            <button
              onClick={onJoin}
              className="py-3 px-6 bg-[#374375] hover:bg-[#895159] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Join Community to Post</span>
            </button>
          </div>
        ) : (
          /* Form composer */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="postTitle" className="block text-xs font-bold uppercase tracking-wider text-[#374375] mb-1">
                Discussion Title *
              </label>
              <input
                id="postTitle"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  if (errors.title) setErrors(prev => ({ ...prev, title: null }))
                }}
                placeholder="e.g. Anyone building with Llama-3 or PyTorch for upcoming hackathon?"
                disabled={isSubmitting}
                className={`w-full px-4 py-2.5 bg-white border rounded-xl font-semibold text-xs text-[#374375] placeholder-slate-400 focus:outline-none transition-all ${
                  errors.title ? 'border-red-500 ring-1 ring-red-100' : 'border-[#BABDE2] focus:border-[#374375]'
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-[11px] font-semibold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.title}
                </p>
              )}
            </div>

            {/* Content Body */}
            <div>
              <label htmlFor="postContent" className="block text-xs font-bold uppercase tracking-wider text-[#374375] mb-1">
                Discussion Details *
              </label>
              <textarea
                id="postContent"
                rows={5}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value)
                  if (errors.content) setErrors(prev => ({ ...prev, content: null }))
                }}
                placeholder="Share your thoughts, ask questions, or invite project collaborators..."
                disabled={isSubmitting}
                className={`w-full p-4 bg-white border rounded-xl font-medium text-xs text-[#374375] placeholder-slate-400 focus:outline-none transition-all resize-none ${
                  errors.content ? 'border-red-500 ring-1 ring-red-100' : 'border-[#BABDE2] focus:border-[#374375]'
                }`}
              />
              {errors.content && (
                <p className="mt-1 text-[11px] font-semibold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.content}
                </p>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 bg-[#374375] hover:bg-[#895159] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Publishing...' : 'Publish Post'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default CreatePostModal
