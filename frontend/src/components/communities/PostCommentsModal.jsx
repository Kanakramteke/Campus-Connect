import React, { useState } from 'react'
import { X, MessageSquare, Send, ThumbsUp, User } from 'lucide-react'
import { useCampus } from '../../context/CampusContext'

const PostCommentsModal = ({ isOpen, onClose, post, communityId, isMember, onJoin }) => {
  const { addCommunityReply, toggleLikePost } = useCampus()
  const [commentText, setCommentText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen || !post) return null

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      addCommunityReply(communityId, post.id, commentText.trim())
      setCommentText('')
      setIsSubmitting(false)
    }, 300)
  }

  const replies = post.replies || []

  return (
    <div className="fixed inset-0 z-50 bg-[#374375]/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FFFCF5] rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl border border-[#BABDE2] animate-scaleUp max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#BABDE2]/40 pb-4 shrink-0">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#895159]" />
            <h3 className="font-black text-[#374375] text-base">
              Discussion & Replies
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-[#374375]/60 hover:text-[#374375] hover:bg-[#BABDE2]/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Post Card Banner */}
        <div className="p-4 bg-white rounded-2xl border border-[#BABDE2]/40 space-y-2 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-8 h-8 rounded-full bg-slate-100 object-cover"
              />
              <div>
                <span className="font-bold text-xs text-[#374375] block">{post.author}</span>
                <span className="text-[10px] text-slate-500 font-medium">{post.college} • {post.timestamp}</span>
              </div>
            </div>

            <button
              onClick={() => toggleLikePost(communityId, post.id)}
              className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                post.userLiked
                  ? 'bg-[#374375] text-white border-[#374375]'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{post.likes || 0}</span>
            </button>
          </div>

          <h4 className="font-extrabold text-sm text-[#374375] pt-1">{post.title}</h4>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">{post.content}</p>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#895159] block">
            Replies ({replies.length})
          </span>

          {replies.length > 0 ? (
            replies.map((reply, idx) => (
              <div key={idx} className="p-3.5 bg-white rounded-2xl border border-slate-200/80 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={reply.avatar}
                      alt={reply.author}
                      className="w-6 h-6 rounded-full bg-slate-100 object-cover"
                    />
                    <span className="font-bold text-[#374375]">{reply.author}</span>
                    <span className="text-[10px] text-slate-400 font-medium">({reply.college})</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{reply.timestamp}</span>
                </div>
                <p className="text-slate-600 pl-8 font-medium leading-relaxed">{reply.content}</p>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-xs text-slate-400 font-medium">
              No replies yet. Be the first to start the conversation!
            </div>
          )}
        </div>

        {/* Reply Composer Input */}
        <div className="pt-2 border-t border-[#BABDE2]/40 shrink-0">
          {!isMember ? (
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-center text-xs space-y-1">
              <span className="text-slate-500 font-medium block">Join community to join the conversation</span>
              <button
                onClick={onJoin}
                className="text-xs font-bold text-[#374375] underline cursor-pointer"
              >
                Join Community
              </button>
            </div>
          ) : (
            <form onSubmit={handleAddComment} className="flex items-center gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 px-4 py-2.5 bg-white border border-[#BABDE2] rounded-xl text-xs font-semibold text-[#374375] focus:outline-none focus:ring-2 focus:ring-[#BABDE2]"
              />
              <button
                type="submit"
                disabled={isSubmitting || !commentText.trim()}
                className="p-2.5 bg-[#374375] hover:bg-[#895159] text-white rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostCommentsModal
