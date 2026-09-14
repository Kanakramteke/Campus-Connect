import React, { createContext, useContext, useState, useEffect } from 'react'
import { TECHNICAL_EVENTS, CULTURAL_EVENTS, TECHNICAL_CLUBS, CULTURAL_CLUBS, OTHER_CLUBS, COMMUNITIES, INITIAL_NOTIFICATIONS } from '../data/nagpurData'
import { apiClient, getToken } from '../api/apiClient'

const CampusContext = createContext()

export const useCampus = () => {
  const context = useContext(CampusContext)
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider')
  }
  return context
}

export const CampusProvider = ({ children, initialUser }) => {
  // Student Profile State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cc_student_user')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) { console.error(e) }
    }
    return {
      fullName: initialUser?.fullName || 'Kanak Ramteke',
      email: initialUser?.email || 'kanak.ramteke@vnit.ac.in',
      studentId: initialUser?.studentId || '2023CSE089',
      college: initialUser?.college || 'VNIT Nagpur',
      collegeId: 'vnit',
      department: 'Computer Science & Engineering',
      year: '3rd Year',
      course: 'B.Tech',
      city: 'Nagpur',
      phone: '+91 98765 43210',
      bio: 'Tech enthusiast & passionate developer exploring AI, Web Development & hackathons across Nagpur campuses.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KanakRamteke',
      interests: ['AI/ML', 'Hackathons', 'Web Development', 'Robotics', 'Dance']
    }
  })

  // Synchronize when initialUser prop updates
  useEffect(() => {
    if (initialUser && initialUser.email) {
      setUser(initialUser)
      localStorage.setItem('cc_student_user', JSON.stringify(initialUser))
    }
  }, [initialUser])

  useEffect(() => {
    if (user) {
      localStorage.setItem('cc_student_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('cc_student_user')
    }
  }, [user])

  // Creator Role State ('organizer', 'club_head', 'community_admin', 'student')
  const [creatorRole, setCreatorRole] = useState(() => {
    return localStorage.getItem('cc_creator_role') || 'organizer'
  })

  useEffect(() => {
    localStorage.setItem('cc_creator_role', creatorRole)
  }, [creatorRole])

  // Custom Created Content & Drafts State
  const [createdItems, setCreatedItems] = useState(() => {
    const saved = localStorage.getItem('cc_created_items')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) { console.error(e) }
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('cc_created_items', JSON.stringify(createdItems))
  }, [createdItems])

  // Dynamic Events, Clubs, Communities datasets combining defaults + published creator items
  const [allEvents, setAllEvents] = useState(() => {
    const defaultList = [...TECHNICAL_EVENTS, ...CULTURAL_EVENTS]
    const saved = localStorage.getItem('cc_created_items')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const publishedEvents = parsed
          .filter(item => item.entityType === 'event' && item.status === 'published')
          .map(item => item.data)
        return [...publishedEvents, ...defaultList]
      } catch (e) {}
    }
    return defaultList
  })

  const [allClubs, setAllClubs] = useState(() => {
    const defaultList = [...TECHNICAL_CLUBS, ...CULTURAL_CLUBS, ...OTHER_CLUBS]
    const saved = localStorage.getItem('cc_created_items')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const publishedClubs = parsed
          .filter(item => item.entityType === 'club' && item.status === 'published')
          .map(item => item.data)
        return [...publishedClubs, ...defaultList]
      } catch (e) {}
    }
    return defaultList
  })

  const [allCommunities, setAllCommunities] = useState(() => {
    const saved = localStorage.getItem('cc_created_items')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const publishedComms = parsed
          .filter(item => item.entityType === 'community' && item.status === 'published')
          .map(item => item.data)
        return [...publishedComms, ...COMMUNITIES]
      } catch (e) {}
    }
    return COMMUNITIES
  })

  // Synchronize dynamic datasets whenever createdItems change
  useEffect(() => {
    const defaultEvents = [...TECHNICAL_EVENTS, ...CULTURAL_EVENTS]
    const defaultClubs = [...TECHNICAL_CLUBS, ...CULTURAL_CLUBS, ...OTHER_CLUBS]
    
    const customPublishedEvents = createdItems
      .filter(item => item.entityType === 'event' && item.status === 'published')
      .map(item => item.data)
    
    const customPublishedClubs = createdItems
      .filter(item => item.entityType === 'club' && item.status === 'published')
      .map(item => item.data)
      
    const customPublishedComms = createdItems
      .filter(item => item.entityType === 'community' && item.status === 'published')
      .map(item => item.data)

    setAllEvents([...customPublishedEvents, ...defaultEvents])
    setAllClubs([...customPublishedClubs, ...defaultClubs])
    setAllCommunities([...customPublishedComms, ...COMMUNITIES])
  }, [createdItems])

  // Enrolled Events state
  const [registeredEvents, setRegisteredEvents] = useState(() => {
    const saved = localStorage.getItem('cc_registered_events')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    // Realistic initial demo registrations for visual testing (Paid Upcoming, Free Upcoming, Past Event)
    return [
      {
        eventId: 'tech-1',
        registrationId: 'CC-REG-2026-8921',
        registrationDate: '2026-09-10',
        paymentStatus: 'paid',
        paymentMethod: 'UPI',
        paymentAmount: 299,
        transactionId: 'TXN-9948210398',
        registrationStatus: 'confirmed',
        participantInfo: {
          name: 'Kanak Ramteke',
          email: 'kanak.ramteke@vnit.ac.in',
          phone: '+91 98765 43210',
          college: 'VNIT Nagpur',
          studentId: '2023CSE089',
          teamName: 'ByteBusters'
        }
      },
      {
        eventId: 'cult-1',
        registrationId: 'CC-REG-2026-4102',
        registrationDate: '2026-09-12',
        paymentStatus: 'free',
        paymentMethod: 'Free',
        paymentAmount: 0,
        transactionId: 'N/A',
        registrationStatus: 'confirmed',
        participantInfo: {
          name: 'Kanak Ramteke',
          email: 'kanak.ramteke@vnit.ac.in',
          phone: '+91 98765 43210',
          college: 'VNIT Nagpur',
          studentId: '2023CSE089'
        }
      },
      {
        eventId: 'tech-11',
        registrationId: 'CC-REG-2026-1049',
        registrationDate: '2026-08-01',
        paymentStatus: 'paid',
        paymentMethod: 'Card',
        paymentAmount: 199,
        transactionId: 'TXN-4820194822',
        registrationStatus: 'confirmed',
        participantInfo: {
          name: 'Kanak Ramteke',
          email: 'kanak.ramteke@vnit.ac.in',
          phone: '+91 98765 43210',
          college: 'VNIT Nagpur',
          studentId: '2023CSE089'
        }
      }
    ]
  })

  useEffect(() => {
    localStorage.setItem('cc_registered_events', JSON.stringify(registeredEvents))
  }, [registeredEvents])

  // Draft participant info for pending payment checkout flow
  const [draftEnrollment, setDraftEnrollment] = useState(null)

  // Saved / Bookmarked Event IDs
  const [savedEventIds, setSavedEventIds] = useState(() => {
    const saved = localStorage.getItem('cc_saved_events')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    return ['tech-2', 'cult-1', 'tech-3']
  })

  useEffect(() => {
    localStorage.setItem('cc_saved_events', JSON.stringify(savedEventIds))
  }, [savedEventIds])

  // Joined Clubs State
  const [joinedClubIds, setJoinedClubIds] = useState(() => {
    const saved = localStorage.getItem('cc_joined_clubs')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    return ['tclub-1', 'cclub-2']
  })

  useEffect(() => {
    localStorage.setItem('cc_joined_clubs', JSON.stringify(joinedClubIds))
  }, [joinedClubIds])

  // Joined Communities State
  const [joinedCommunityIds, setJoinedCommunityIds] = useState(() => {
    const saved = localStorage.getItem('cc_joined_communities')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    return ['comm-1', 'comm-2']
  })

  useEffect(() => {
    localStorage.setItem('cc_joined_communities', JSON.stringify(joinedCommunityIds))
  }, [joinedCommunityIds])

  // Notifications State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('cc_notifications')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    return INITIAL_NOTIFICATIONS
  })

  useEffect(() => {
    localStorage.setItem('cc_notifications', JSON.stringify(notifications))
  }, [notifications])

  // Fetch real backend data on mount / auth state
  useEffect(() => {
    const syncBackendData = async () => {
      try {
        const eventsData = await apiClient('/events')
        if (Array.isArray(eventsData) && eventsData.length > 0) {
          setAllEvents(eventsData)
        }
      } catch (e) {}

      try {
        const clubsData = await apiClient('/clubs')
        if (Array.isArray(clubsData) && clubsData.length > 0) {
          setAllClubs(clubsData)
        }
      } catch (e) {}

      try {
        const commsData = await apiClient('/communities')
        if (Array.isArray(commsData) && commsData.length > 0) {
          setAllCommunities(commsData)
        }
      } catch (e) {}

      const token = getToken()
      if (token) {
        try {
          const profileData = await apiClient('/auth/me')
          if (profileData && profileData.email) {
            setUser(profileData)
            localStorage.setItem('cc_student_user', JSON.stringify(profileData))
          }
        } catch (e) {
          removeToken()
          localStorage.removeItem('cc_student_user')
        }

        try {
          const myRegs = await apiClient('/events/registrations/my')
          if (Array.isArray(myRegs)) setRegisteredEvents(myRegs)
        } catch (e) {}

        try {
          const savedIds = await apiClient('/events/bookmarks/ids')
          if (Array.isArray(savedIds)) setSavedEventIds(savedIds)
        } catch (e) {}

        try {
          const jClubIds = await apiClient('/clubs/joined/ids')
          if (Array.isArray(jClubIds)) setJoinedClubIds(jClubIds)
        } catch (e) {}

        try {
          const jCommIds = await apiClient('/communities/joined/ids')
          if (Array.isArray(jCommIds)) setJoinedCommunityIds(jCommIds)
        } catch (e) {}

        try {
          const notifData = await apiClient('/notifications')
          if (Array.isArray(notifData)) setNotifications(notifData)
        } catch (e) {}

        try {
          const myCreatorItems = await apiClient('/creator/my-items')
          if (Array.isArray(myCreatorItems)) setCreatedItems(myCreatorItems)
        } catch (e) {}
      }
    }

    syncBackendData()
  }, [])

  // Toast Notification State
  const [toast, setToast] = useState(null)
  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  // Helper check if event is registered
  const isRegistered = (eventId) => {
    return registeredEvents.some(r => r.eventId === eventId && r.registrationStatus === 'confirmed')
  }

  const getRegistration = (eventId) => {
    return registeredEvents.find(r => r.eventId === eventId && r.registrationStatus === 'confirmed')
  }

  // Helper check if club is joined
  const isClubJoined = (clubId) => {
    return joinedClubIds.includes(clubId)
  }

  // Helper check if community is joined
  const isCommunityJoined = (commId) => {
    return joinedCommunityIds.includes(commId)
  }

  // Action Methods
  const updateUserProfile = async (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }))
    try {
      const res = await apiClient('/users/profile', {
        method: 'PUT',
        body: updatedData
      })
      if (res) setUser(res)
    } catch (e) {}
    showToast('Profile updated successfully!')
  }

  const toggleSaveEvent = async (eventId) => {
    setSavedEventIds(prev => {
      const isSaved = prev.includes(eventId)
      const newSaved = isSaved ? prev.filter(id => id !== eventId) : [...prev, eventId]
      showToast(isSaved ? 'Removed from Saved Events' : 'Event saved to your bookmarks!')
      return newSaved
    })
    try {
      await apiClient(`/events/${eventId}/bookmark`, { method: 'POST' })
    } catch (e) {}
  }

  const saveDraftEnrollment = (eventId, participantInfo) => {
    setDraftEnrollment({ eventId, participantInfo, timestamp: Date.now() })
  }

  const enrollInEvent = async (eventId, participantInfo, paymentDetails = {}) => {
    const event = allEvents.find(e => e.id === eventId)
    if (!event) return null

    const newRegId = `CC-REG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    const newTxnRef = paymentDetails.transactionId || (event.isFree ? 'N/A' : `TXN-${Math.floor(1000000000 + Math.random() * 9000000000)}`)

    const newRegistration = {
      id: `reg-${Date.now()}`,
      eventId: event.id,
      studentId: user?.studentId || user?.id,
      registrationId: newRegId,
      registrationDate: new Date().toISOString().split('T')[0],
      registeredAt: new Date().toISOString(),
      registrationStatus: 'confirmed',
      paymentStatus: event.isFree ? 'free' : 'paid',
      paymentMethod: paymentDetails.paymentMethod || (event.isFree ? 'Free' : 'UPI'),
      paymentAmount: event.isFree ? 0 : (paymentDetails.amountPaid || event.registrationFee),
      transactionId: newTxnRef,
      participantInfo: participantInfo || {
        name: user.fullName,
        email: user.email,
        phone: user.phone,
        college: user.college
      }
    }

    setRegisteredEvents(prev => [...prev.filter(r => r.eventId !== eventId), newRegistration])
    setDraftEnrollment(null)

    try {
      const apiReg = await apiClient(`/events/${eventId}/register`, {
        method: 'POST',
        body: {
          eventId,
          participantInfo: newRegistration.participantInfo,
          paymentMethod: newRegistration.paymentMethod,
          paymentAmount: newRegistration.paymentAmount,
          transactionId: newRegistration.transactionId
        }
      })
      if (apiReg) {
        setRegisteredEvents(prev => [...prev.filter(r => r.eventId !== eventId), apiReg])
      }
    } catch (e) {}

    // Generate Notifications (Registration & Payment)
    addNotification({
      title: event.isFree ? 'Registration Confirmed' : 'Payment & Registration Confirmed',
      message: `You're successfully registered for ${event.title} organized by ${event.organizingCollege}.`,
      category: 'events',
      type: 'event_registration',
      relatedEntityType: 'event',
      relatedEntityId: event.id,
      actionRoute: 'events',
      actionParams: { eventId: event.id },
      actionLabel: 'View Event'
    })

    if (!event.isFree) {
      addNotification({
        title: 'Payment Successful',
        message: `Your payment of ₹${event.registrationFee} for ${event.title} was confirmed (TXN: ${newTxnRef}).`,
        category: 'payments',
        type: 'payment_success',
        relatedEntityType: 'event',
        relatedEntityId: event.id,
        actionRoute: 'my-events',
        actionLabel: 'View Pass'
      })
    }

    showToast(`Successfully enrolled in ${event.title}!`, 'success')
    return newRegistration
  }

  const joinClub = async (clubId) => {
    const club = allClubs.find(c => c.id === clubId)
    setJoinedClubIds(prev => {
      if (prev.includes(clubId)) return prev
      showToast(`Joined ${club?.name || 'Club'}!`)
      return [...prev, clubId]
    })
    try {
      await apiClient(`/clubs/${clubId}/join`, { method: 'POST' })
    } catch (e) {}

    if (club) {
      addNotification({
        title: `Welcome to ${club.name}!`,
        message: `You are now a member of ${club.name} (${club.college}). Stay tuned for upcoming activities!`,
        category: 'clubs',
        type: 'club_joined',
        relatedEntityType: 'club',
        relatedEntityId: clubId,
        actionRoute: 'club-details',
        actionParams: { clubId },
        actionLabel: 'View Club'
      })
    }
  }

  const leaveClub = async (clubId) => {
    setJoinedClubIds(prev => prev.filter(id => id !== clubId))
    try {
      await apiClient(`/clubs/${clubId}/leave`, { method: 'POST' })
    } catch (e) {}
    showToast('Left club successfully.')
  }

  const joinCommunity = async (commId) => {
    const comm = allCommunities.find(c => c.id === commId)
    setJoinedCommunityIds(prev => {
      if (prev.includes(commId)) return prev
      showToast(`Joined ${comm?.name || 'Community'}!`)
      return [...prev, commId]
    })
    try {
      await apiClient(`/communities/${commId}/join`, { method: 'POST' })
    } catch (e) {}

    if (comm) {
      addNotification({
        title: `Welcome to ${comm.name}!`,
        message: `You have successfully joined ${comm.name} (${comm.college}). Join the inter-college discussion feed!`,
        category: 'communities',
        type: 'community_joined',
        relatedEntityType: 'community',
        relatedEntityId: commId,
        actionRoute: 'community-details',
        actionParams: { communityId: commId },
        actionLabel: 'View Community'
      })
    }
  }

  const leaveCommunity = async (commId) => {
    setJoinedCommunityIds(prev => prev.filter(id => id !== commId))
    try {
      await apiClient(`/communities/${commId}/leave`, { method: 'POST' })
    } catch (e) {}
    showToast('Left community.')
  }

  const addCommunityPost = async (communityId, title, content) => {
    const comm = allCommunities.find(c => c.id === communityId)
    const newPost = {
      id: `post-${Date.now()}`,
      author: user?.fullName || 'Anonymous',
      college: user?.college || 'VNIT Nagpur',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${(user?.fullName || 'User').replace(' ', '')}`,
      timestamp: 'Just now',
      title,
      content,
      likes: 0,
      repliesCount: 0,
      replies: []
    }

    setAllCommunities(prev => prev.map(cItem => {
      if (cItem.id === communityId) {
        return {
          ...cItem,
          popularPosts: [newPost, ...(cItem.popularPosts || [])]
        }
      }
      return cItem
    }))

    try {
      await apiClient(`/communities/${communityId}/posts`, {
        method: 'POST',
        body: { title, content }
      })
    } catch (e) {}

    addNotification({
      title: 'Discussion Post Published',
      message: `Your post "${title}" is live in ${comm?.name || 'Community'}. Members can reply to your post.`,
      category: 'communities',
      type: 'community_post',
      relatedEntityType: 'community',
      relatedEntityId: communityId,
      actionRoute: 'community-details',
      actionParams: { communityId },
      actionLabel: 'View Discussion'
    })
    showToast('Discussion post published!')
  }

  const addCommunityReply = async (communityId, postId, replyContent) => {
    const comm = allCommunities.find(c => c.id === communityId)
    setAllCommunities(prev => prev.map(cItem => {
      if (cItem.id === communityId) {
        return {
          ...cItem,
          popularPosts: (cItem.popularPosts || []).map(post => {
            if (post.id === postId) {
              const newReply = {
                author: user?.fullName || 'User',
                college: user?.college || 'VNIT Nagpur',
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${(user?.fullName || 'User').replace(' ', '')}`,
                content: replyContent,
                timestamp: 'Just now'
              }
              return {
                ...post,
                repliesCount: (post.repliesCount || 0) + 1,
                replies: [...(post.replies || []), newReply]
              }
            }
            return post
          })
        }
      }
      return cItem
    }))

    try {
      await apiClient(`/communities/${communityId}/posts/${postId}/comments`, {
        method: 'POST',
        body: { content: replyContent }
      })
    } catch (e) {}

    addNotification({
      title: 'Reply Published',
      message: `Your reply was added to the discussion in ${comm?.name || 'Community'}.`,
      category: 'communities',
      type: 'community_comment',
      relatedEntityType: 'community',
      relatedEntityId: communityId,
      actionRoute: 'community-details',
      actionParams: { communityId },
      actionLabel: 'View Thread'
    })
    showToast('Reply posted!')
  }

  const toggleLikePost = async (communityId, postId) => {
    setAllCommunities(prev => prev.map(comm => {
      if (comm.id === communityId) {
        return {
          ...comm,
          popularPosts: (comm.popularPosts || []).map(post => {
            if (post.id === postId) {
              const isLiked = post.userLiked
              return {
                ...post,
                userLiked: !isLiked,
                likes: isLiked ? post.likes - 1 : post.likes + 1
              }
            }
            return post
          })
        }
      }
      return comm
    }))
    try {
      await apiClient(`/communities/${communityId}/posts/${postId}/like`, { method: 'POST' })
    } catch (e) {}
  }

  const addNotification = (notifData) => {
    const newNotif = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId: user.studentId || 'student01',
      category: notifData.category || 'events',
      type: notifData.type || 'system',
      title: notifData.title || 'Notification',
      message: notifData.message || '',
      relatedEntityType: notifData.relatedEntityType || null,
      relatedEntityId: notifData.relatedEntityId || null,
      actionRoute: notifData.actionRoute || null,
      actionParams: notifData.actionParams || null,
      actionLabel: notifData.actionLabel || 'View Details',
      isRead: false,
      createdAt: new Date().toISOString(),
      timestamp: 'Just now'
    }
    setNotifications(prev => [newNotif, ...prev])
  }

  const markNotificationRead = async (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, isRead: true } : n))
    try {
      await apiClient(`/notifications/${notifId}/read`, { method: 'POST' })
    } catch (e) {}
  }

  const markNotificationUnread = async (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, isRead: false } : n))
    try {
      await apiClient(`/notifications/${notifId}/read`, {
        method: 'POST',
        body: { isRead: false }
      })
    } catch (e) {}
    showToast('Notification marked as unread.')
  }

  const markAllNotificationsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
    try {
      await apiClient('/notifications/read-all', { method: 'POST' })
    } catch (e) {}
    showToast('All notifications marked as read.')
  }

  const deleteNotification = async (notifId) => {
    setNotifications(prev => prev.filter(n => n.id !== notifId))
    try {
      await apiClient(`/notifications/${notifId}`, { method: 'DELETE' })
    } catch (e) {}
    showToast('Notification removed.')
  }

  // Settings State
  const [userSettings, setUserSettings] = useState(() => {
    const saved = localStorage.getItem('cc_user_settings')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    return {
      notificationPreferences: {
        eventReminders: true,
        registrationUpdates: true,
        eventChanges: true,
        clubUpdates: true,
        clubEventReminders: true,
        communityActivity: true,
        discussionUpdates: true,
        commentReplies: true,
        discoveryUpdates: true
      },
      privacy: {
        profileVisibility: 'Campus Only',
        showActivity: true
      },
      appearance: {
        theme: 'light'
      },
      language: 'English'
    }
  })

  useEffect(() => {
    localStorage.setItem('cc_user_settings', JSON.stringify(userSettings))
  }, [userSettings])

  const updateUserSettings = (newSettings) => {
    setUserSettings(prev => ({
      ...prev,
      ...newSettings,
      notificationPreferences: {
        ...prev.notificationPreferences,
        ...(newSettings.notificationPreferences || {})
      },
      privacy: {
        ...prev.privacy,
        ...(newSettings.privacy || {})
      },
      appearance: {
        ...prev.appearance,
        ...(newSettings.appearance || {})
      }
    }))
    showToast('Settings saved successfully!')
  }

  const updateUserInterests = (interestsArray) => {
    setUser(prev => ({ ...prev, interests: interestsArray }))
    showToast('Interests updated!')
  }

  // Creator CRUD Actions
  const saveCreatedItem = async (entityType, itemData, isDraft = false) => {
    const status = isDraft ? 'draft' : 'published'
    const itemId = itemData.id || `${entityType}-${Date.now()}`
    const enrichedData = {
      ...itemData,
      id: itemId,
      status
    }

    setCreatedItems(prev => {
      const existingIndex = prev.findIndex(i => i.id === itemId)
      const newItem = {
        id: itemId,
        entityType,
        status,
        data: enrichedData,
        createdAt: existingIndex >= 0 ? prev[existingIndex].createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      if (existingIndex >= 0) {
        const copy = [...prev]
        copy[existingIndex] = newItem
        return copy
      } else {
        return [newItem, ...prev]
      }
    })

    try {
      const endpoint = entityType === 'event' ? '/events' : entityType === 'club' ? '/clubs' : '/communities'
      await apiClient(endpoint, {
        method: 'POST',
        body: enrichedData
      })
    } catch (e) {}

    showToast(isDraft ? 'Draft saved successfully!' : `${entityType.charAt(0).toUpperCase() + entityType.slice(1)} published successfully!`)
    return itemId
  }

  const deleteCreatedItem = async (itemId) => {
    const item = createdItems.find(i => i.id === itemId)
    setCreatedItems(prev => prev.filter(i => i.id !== itemId))
    if (item) {
      try {
        const endpoint = item.entityType === 'event' ? `/events/${itemId}` : item.entityType === 'club' ? `/clubs/${itemId}` : `/communities/${itemId}`
        await apiClient(endpoint, { method: 'DELETE' })
      } catch (e) {}
    }
    showToast('Item deleted successfully.')
  }

  const clearAllNotifications = () => {
    setNotifications([])
    showToast('All notifications cleared.')
  }

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length

  return (
    <CampusContext.Provider value={{
      user,
      updateUserProfile,
      updateUserInterests,
      userSettings,
      updateUserSettings,
      creatorRole,
      setCreatorRole,
      createdItems,
      saveCreatedItem,
      deleteCreatedItem,
      allEvents,
      allClubs,
      allCommunities,
      registeredEvents,
      isRegistered,
      getRegistration,
      draftEnrollment,
      saveDraftEnrollment,
      enrollInEvent,
      savedEventIds,
      toggleSaveEvent,
      joinedClubIds,
      isClubJoined,
      joinClub,
      leaveClub,
      joinedCommunityIds,
      isCommunityJoined,
      joinCommunity,
      leaveCommunity,
      addCommunityPost,
      addCommunityReply,
      toggleLikePost,
      notifications,
      addNotification,
      markNotificationRead,
      markNotificationUnread,
      markAllNotificationsRead,
      deleteNotification,
      clearAllNotifications,
      unreadNotificationsCount,
      toast,
      showToast
    }}>
      {children}
    </CampusContext.Provider>
  )
}
