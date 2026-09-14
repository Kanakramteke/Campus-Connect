import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCampus } from '../../context/CampusContext'
import CreatePostModal from '../../components/communities/CreatePostModal'
import PostCommentsModal from '../../components/communities/PostCommentsModal'
import JoinCommunityModal from '../../components/communities/JoinCommunityModal'
import CommunityShareModal from '../../components/communities/CommunityShareModal'
import {
  Globe, Building2, Users, Activity, Share2, CheckCircle2, ArrowLeft,
  MessageSquare, ThumbsUp, Plus, Sparkles, ShieldCheck, Tag
} from 'lucide-react'

const CommunityDetailsPage = ({ communityId: propCommunityId, mockCommunity, onNavigate }) => {
  const { id: paramId } = useParams()
  const navigate = useNavigate()
  const { allCommunities, isCommunityJoined, joinCommunity, leaveCommunity, toggleLikePost } = useCampus()

  const id = paramId || propCommunityId

  const [community, setCommunity] = useState(mockCommunity || null)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [modalAction, setModalAction] = useState('join')
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  // Discussion & Comment Modals State
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)
  const [selectedPostForComments, setSelectedPostForComments] = useState(null)

  useEffect(() => {
    if (mockCommunity) {
      setCommunity(mockCommunity)
      return
    }
    const found = allCommunities.find((c) => c.id === id)
    if (found) {
      setCommunity(found)
    }
  }, [id, allCommunities, mockCommunity])

  if (!community) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <Globe className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-[#374375]">Community Not Found</h2>
        <p className="text-slate-500">The requested community page could not be found.</p>
        <button
          onClick={() => (onNavigate ? onNavigate('communities') : navigate('/communities'))}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#374375] text-white font-semibold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Communities
        </button>
      </div>
    )
  }

  const joined = isCommunityJoined(community.id)
  const posts = community.popularPosts || community.posts || []

  const handleOpenJoinModal = (act) => {
    setModalAction(act)
    setIsJoinModalOpen(true)
  }

  const handleConfirmMembership = () => {
    if (modalAction === 'join') {
      joinCommunity(community.id)
    } else {
      leaveCommunity(community.id)
    }
    setIsJoinModalOpen(false)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* 1. Back Navigation */}
      <button
        onClick={() => (onNavigate ? onNavigate('communities') : navigate('/communities'))}
        className="inline-flex items-center gap-2 text-sm font-bold text-[#374375] hover:text-[#895159] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Communities
      </button>

      {/* 2. COMMUNITY HERO SECTION */}
      <div className="relative bg-[#FFFCF5] rounded-3xl border border-[#BABDE2] overflow-hidden shadow-sm">
        {/* Cover Image Header */}
        <div className="h-44 sm:h-56 bg-slate-200 relative overflow-hidden">
          {community.coverImage ? (
            <img
              src={community.coverImage}
              alt={community.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-[#374375] via-[#895159] to-[#BABDE2]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFCF5] via-transparent to-black/20" />
        </div>

        {/* Hero Details */}
        <div className="p-6 sm:p-8 pt-0 relative -mt-16 sm:-mt-20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            
            {/* Logo & Title */}
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-[#374375] to-[#2c365e] text-white flex items-center justify-center border-4 border-[#FFFCF5] shadow-lg shrink-0 overflow-hidden">
                {community.logo && (community.logo.startsWith('http') || community.logo.startsWith('/') || community.logo.startsWith('data:')) ? (
                  <img src={community.logo} alt={community.name} className="w-full h-full object-cover" />
                ) : (
                  <Globe className="w-12 h-12 text-[#BABDE2]" />
                )}
              </div>

              <div className="space-y-1 pb-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#374375]/10 text-[#374375] border border-[#374375]/20">
                    {community.subcategory || community.category}
                  </span>
                  {joined && (
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Joined Member
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-[#374375] tracking-tight">
                  {community.name}
                </h1>
                <div className="flex items-center gap-2 text-xs font-bold text-[#895159]">
                  <Building2 className="w-4 h-4 text-[#374375]" />
                  <span>{community.college || 'Nagpur Campus Hub'}</span>
                  <span>•</span>
                  <Users className="w-4 h-4 text-[#374375]" />
                  <span>{community.memberCount || 250} Members</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 shrink-0">
              <button
                type="button"
                onClick={() => setIsShareModalOpen(true)}
                className="p-3 rounded-2xl bg-white border border-[#BABDE2] text-[#374375] hover:bg-[#BABDE2]/20 transition-all cursor-pointer shadow-xs"
                aria-label="Share community"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {joined ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled
                    className="py-3 px-5 rounded-2xl bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm cursor-default"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Joined ✓</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenJoinModal('leave')}
                    className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 font-bold text-xs transition-colors cursor-pointer border border-slate-200"
                  >
                    Leave
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleOpenJoinModal('join')}
                  className="py-3.5 px-6 rounded-2xl bg-[#374375] hover:bg-[#895159] text-white font-black text-xs transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Join Community</span>
                </button>
              )}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#374375]/85 font-medium leading-relaxed max-w-3xl pt-2">
            {community.shortDescription}
          </p>
        </div>
      </div>

      {/* 3. MAIN LAYOUT GRID (8 cols Left, 4 cols Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Discussions & About (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* About This Community */}
          <section className="bg-[#FFFCF5] rounded-3xl p-6 sm:p-8 border border-[#BABDE2]/60 space-y-4 shadow-xs">
            <h2 className="text-lg sm:text-xl font-black text-[#374375] tracking-tight">
              About This Community
            </h2>
            <p className="text-xs sm:text-sm text-[#374375]/85 font-medium leading-relaxed">
              {community.description}
            </p>

            {/* Interest Tags */}
            {community.interests && community.interests.length > 0 && (
              <div className="pt-3 border-t border-[#BABDE2]/30 space-y-2">
                <span className="text-xs font-bold text-[#895159] uppercase tracking-wider block">
                  Topics & Focus Areas
                </span>
                <div className="flex flex-wrap gap-2">
                  {community.interests.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl text-xs font-extrabold bg-[#BABDE2]/25 text-[#374375] border border-[#BABDE2]/40"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* COMMUNITY DISCUSSIONS / FEED SECTION */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-[#374375] tracking-tight flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#895159]" /> Community Discussions
                </h2>
                <p className="text-xs text-slate-500 font-semibold">
                  Share ideas, ask questions, and collaborate with Nagpur students.
                </p>
              </div>

              {/* Start a Discussion Button */}
              <button
                onClick={() => setIsCreatePostModalOpen(true)}
                className="py-2.5 px-4 bg-[#374375] hover:bg-[#895159] text-white font-extrabold text-xs rounded-2xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Start a Discussion</span>
              </button>
            </div>

            {/* Post Feed List */}
            {posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-[#FFFCF5] rounded-3xl p-6 border border-[#BABDE2]/60 shadow-xs hover:border-[#BABDE2] transition-all space-y-3"
                  >
                    {/* Author & Timestamp */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.avatar}
                          alt={post.author}
                          className="w-10 h-10 rounded-full bg-slate-100 object-cover border border-[#BABDE2]/40 shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-xs text-[#374375]">{post.author}</h4>
                          <span className="text-[10px] text-slate-500 font-semibold">{post.college} • {post.timestamp}</span>
                        </div>
                      </div>

                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#BABDE2]/20 text-[#374375]">
                        Discussion
                      </span>
                    </div>

                    {/* Post Content */}
                    <div className="space-y-1">
                      <h3 className="font-black text-sm text-[#374375] leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#374375]/85 font-medium leading-relaxed">
                        {post.content}
                      </p>
                    </div>

                    {/* Post Actions: Likes & Comments */}
                    <div className="pt-3 border-t border-[#BABDE2]/30 flex items-center gap-4 text-xs font-bold text-slate-600">
                      <button
                        onClick={() => toggleLikePost(community.id, post.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                          post.userLiked
                            ? 'bg-[#374375] text-white border-[#374375]'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{post.likes || 0} Likes</span>
                      </button>

                      <button
                        onClick={() => setSelectedPostForComments(post)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#895159]" />
                        <span>{(post.repliesCount || post.replies?.length || 0)} Comments</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-[#FFFCF5] rounded-3xl border border-[#BABDE2]/60 text-center space-y-3">
                <MessageSquare className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-semibold text-slate-500">
                  No discussions yet in this community. Be the first to start a conversation!
                </p>
                <button
                  onClick={() => setIsCreatePostModalOpen(true)}
                  className="px-4 py-2 bg-[#374375] text-white font-bold text-xs rounded-xl inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Start First Discussion
                </button>
              </div>
            )}
          </section>
        </div>

        {/* RIGHT COLUMN: Community Stats & Sidebar Info (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Community Stats Box */}
          <div className="bg-[#FFFCF5] rounded-3xl p-6 border border-[#BABDE2]/60 space-y-4 shadow-xs">
            <h3 className="font-black text-[#374375] text-base border-b border-[#BABDE2]/30 pb-3">
              Community Stats
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-[#895159] block">Total Members</span>
                <span className="text-lg font-black text-[#374375]">{community.memberCount || 250}</span>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-[#895159] block">Discussions</span>
                <span className="text-lg font-black text-[#374375]">{community.postCount || posts.length}</span>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-[#895159] block">Active This Week</span>
                <span className="text-lg font-black text-[#374375]">{community.activeMembers || 85}</span>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-[#895159] block">Status</span>
                <span className="text-xs font-bold text-emerald-700 block truncate">{community.activityStatus || 'Active'}</span>
              </div>
            </div>
          </div>

          {/* Membership Info Card */}
          <div className="bg-[#FFFCF5] rounded-3xl p-6 border border-[#BABDE2]/60 space-y-3 shadow-xs text-xs">
            <h3 className="font-black text-[#374375] text-base flex items-center gap-2">
              <ShieldCheck className="w-4.5 h-4.5 text-[#895159]" /> Open Access
            </h3>
            <p className="text-slate-600 font-semibold leading-relaxed">
              This student community is open to undergraduates across all colleges in Nagpur. Members get priority notifications for discussions and collaborative projects.
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        community={community}
        isMember={joined}
        onJoin={() => {
          setIsCreatePostModalOpen(false)
          handleOpenJoinModal('join')
        }}
      />

      <PostCommentsModal
        isOpen={!!selectedPostForComments}
        onClose={() => setSelectedPostForComments(null)}
        post={selectedPostForComments}
        communityId={community.id}
        isMember={joined}
        onJoin={() => {
          setSelectedPostForComments(null)
          handleOpenJoinModal('join')
        }}
      />

      <JoinCommunityModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        community={community}
        action={modalAction}
        onConfirm={handleConfirmMembership}
      />

      <CommunityShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        community={community}
      />
    </div>
  )
}

export default CommunityDetailsPage
