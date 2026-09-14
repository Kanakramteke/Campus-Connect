import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CreateModal from '../create/CreateModal'

function Icon({ children, src }){
  if (src) {
    return <img src={src} alt="logo" className="w-20 h-20 rounded-lg object-cover shadow-md" />; // Increased size to 20x20
  }
  return (
    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white font-bold shadow-md text-base">{children}</div>
  );
}

const technicalEvents = [
  {
    id: 1,
    name: "Tech Hackathon 2025",
    headline: "24 Hours of Innovation & Code",
    date: "Nov 15, 2025",
    venue: "Auditorium Hall A",
    college: "VNIT Nagpur",
    image: "/images/events/tech-hackathon.jpg",
    description: "Join us for an exciting 24-hour coding challenge where innovation meets technology.",
    fullDescription: "Get ready for the most exciting 24-hour coding marathon of the year! Tech Hackathon 2025 brings together brilliant minds from across Nagpur to solve real-world problems using cutting-edge technology. Compete for amazing prizes, network with industry experts, and showcase your coding skills. Whether you're into AI, Web Development, or Mobile Apps, there's a track for everyone.",
    organizer: "Dr. Rajesh Kumar",
    contact: "+91 98765 43210",
    email: "rajesh.kumar@vnit.ac.in",
    prizePool: "₹1,00,000",
    participationType: "Team",
    maxTeamMembers: 4,
    registrationFee: "₹499"
  },
  {
    id: 2,
    name: "AI & ML Workshop",
    headline: "Master the Future of Technology",
    date: "Nov 20, 2025",
    venue: "Computer Lab 301",
    college: "YCCE Nagpur",
    image: "/images/events/aiml.jpg",
    description: "Learn the fundamentals of Artificial Intelligence and Machine Learning from industry experts.",
    fullDescription: "Dive deep into the world of Artificial Intelligence and Machine Learning in this comprehensive hands-on workshop. Learn about neural networks, deep learning, and practical applications of AI. This workshop includes live coding sessions, real-world case studies, and interactive Q&A with industry professionals. Perfect for students looking to build a career in AI/ML.",
    organizer: "Prof. Sneha Sharma",
    contact: "+91 98234 56789",
    email: "sneha.sharma@ycce.edu",
    prizePool: "Certificates & Goodies",
    participationType: "Individual",
    maxTeamMembers: 1,
    registrationFee: "₹299"
  },
  {
    id: 3,
    name: "Web Development Bootcamp",
    date: "Nov 25, 2025",
    venue: "Tech Center",
    college: "PCE Nagpur",
    image: "/images/events/web-dev.webp",
    description: "Master modern web technologies with React, Node.js, and cloud deployment.",
    fullDescription: "Transform your web development skills in this intensive 3-day bootcamp. Learn the latest technologies including React, Node.js, Express, MongoDB, and cloud deployment with AWS. Build real-world projects, understand best practices, and get career guidance from experienced developers. By the end of this bootcamp, you'll have a portfolio-ready project and in-demand skills.",
    organizer: "Mr. Amit Deshmukh",
    contact: "+91 97654 32109",
    email: "amit.deshmukh@pce.ac.in",
    prizePool: "Best Project: ₹25,000",
    participationType: "Individual",
    maxTeamMembers: 1,
    registrationFee: "₹399"
  },
  {
    id: 4,
    name: "Business Case Competition",
    date: "Dec 1, 2025",
    venue: "Main Campus",
    college: "RCOEM Nagpur",
    image: "/images/events/business.jpg",
    description: "Solve real-world business challenges and compete for prizes worth ₹50,000.",
    fullDescription: "Put your business acumen to the test! Analyze real-world business scenarios, develop strategic solutions, and present your case to a panel of industry experts and successful entrepreneurs. This competition covers areas like marketing strategy, financial analysis, operations management, and innovative business models. Teams will compete through multiple rounds including case analysis, presentation, and Q&A sessions. Winners receive cash prizes, mentorship opportunities, and potential internship offers from leading companies.",
    organizer: "Dr. Priya Joshi",
    contact: "+91 99887 66554",
    email: "priya.joshi@rcoem.ac.in",
    prizePool: "₹50,000",
    participationType: "Team",
    maxTeamMembers: 3,
    registrationFee: "₹599"
  },
  {
    id: 5,
    name: "Robotics Competition",
    date: "Dec 5, 2025",
    venue: "Engineering Block",
    college: "GH Raisoni Nagpur",
    image: "/images/events/robotics.jpeg",
    description: "Build and compete with autonomous robots in challenging obstacle courses.",
    fullDescription: "Bring your robotics dreams to life! Design, build, and program autonomous robots to navigate complex obstacle courses. This competition tests your mechanical design, programming skills, and problem-solving abilities. Categories include line following, maze solving, and custom challenges. Great opportunity to learn hardware-software integration and work with sensors and actuators.",
    organizer: "Prof. Vikram Patil",
    contact: "+91 98123 45678",
    email: "vikram.patil@ghrce.edu",
    prizePool: "₹75,000",
    participationType: "Team",
    maxTeamMembers: 5,
    registrationFee: "₹699"
  },
  {
    id: 6,
    name: "Cybersecurity Seminar",
    date: "Dec 10, 2025",
    venue: "Conference Room",
    college: "KDKCE Nagpur",
    image: "/images/events/cyber-security.jpg",
    description: "Explore ethical hacking, network security, and latest cybersecurity trends.",
    fullDescription: "In today's digital age, cybersecurity is more important than ever. Learn about ethical hacking, penetration testing, network security, and how to protect systems from cyber threats. This seminar features demonstrations of common vulnerabilities, hands-on exercises in a safe lab environment, and insights from cybersecurity professionals. Understand career paths in cybersecurity and certifications worth pursuing.",
    organizer: "Mr. Sanjay Mehta",
    contact: "+91 96543 21087",
    email: "sanjay.mehta@kdkce.edu",
    prizePool: "Participation Certificates",
    participationType: "Individual",
    maxTeamMembers: 1,
    registrationFee: "₹199"
  },
]

const culturalEvents = [
  {
    id: 7,
    name: "Cultural Fest 2025",
    headline: "Celebrate Diversity, Unity, and Creativity",
    date: "Nov 18, 2025",
    venue: "Open Air Theatre",
    college: "VNIT Nagpur",
    image: "/images/events/cultural-fest.jpeg",
    description: "A vibrant celebration of music, dance, drama, and art from diverse cultures.",
    fullDescription: "Experience the biggest cultural extravaganza of the year! Cultural Fest 2025 showcases the rich diversity of Indian and international cultures through performances, exhibitions, and interactive sessions. Enjoy live music concerts, traditional and contemporary dance performances, theater productions, fashion shows, and art exhibitions. Food stalls from different regions will tantalize your taste buds. Don't miss this celebration of creativity and culture!",
    organizer: "Ms. Kavita Rao",
    contact: "+91 98765 12345",
    email: "kavita.rao@vnit.ac.in",
    prizePool: "₹1,50,000",
    participationType: "Team",
    maxTeamMembers: 10,
    registrationFee: "₹799"
  },
  {
    id: 8,
    name: "Music Night",
    headline: "An Evening Under the Stars",
    date: "Nov 22, 2025",
    venue: "Central Lawn",
    college: "LAD College Nagpur",
    image: "/images/events/music-night.jpeg",
    description: "An enchanting evening featuring live bands, solo performances, and musical collaborations.",
    fullDescription: "Get ready for an unforgettable musical journey under the stars! Music Night features performances by talented student bands, solo artists, and special guest musicians. From classical Indian music to rock, jazz, and fusion - experience a diverse range of musical genres. Open mic sessions give aspiring musicians a platform to showcase their talent. Bring your friends and enjoy great music in a vibrant atmosphere.",
    organizer: "Mr. Rohan Kulkarni",
    contact: "+91 97654 23456",
    email: "rohan.kulkarni@ladcollege.edu",
    prizePool: "₹30,000",
    participationType: "Individual",
    maxTeamMembers: 1,
    registrationFee: "₹249"
  },
  {
    id: 9,
    name: "Dance Competition",
    date: "Nov 28, 2025",
    venue: "Main Auditorium",
    college: "YCCE Nagpur",
    image: "/images/events/dance.webp",
    description: "Showcase your dancing skills in solo, duet, and group dance categories.",
    fullDescription: "Move to the rhythm and compete for glory! This dance competition welcomes all styles - classical, contemporary, hip-hop, Bollywood, folk, and fusion. Categories include solo performances, duets, and group choreography. Participants will be judged on technique, creativity, synchronization, and stage presence. Winners receive trophies, certificates, and exciting prizes. Whether you're a seasoned dancer or just starting out, this is your stage to shine!",
    organizer: "Ms. Anjali Pande",
    contact: "+91 98234 67890",
    email: "anjali.pande@ycce.edu",
    prizePool: "₹40,000",
    participationType: "Team",
    maxTeamMembers: 8,
    registrationFee: "₹499"
  },
  {
    id: 10,
    name: "Drama Festival",
    date: "Dec 3, 2025",
    venue: "Theatre Hall",
    college: "Hislop College Nagpur",
    image: "/images/events/drama.jpg",
    description: "Watch captivating theatrical performances from college drama clubs across Nagpur.",
    fullDescription: "Witness the magic of theatre come alive! Drama Festival features compelling performances by talented drama clubs from colleges across Nagpur. From classic plays to contemporary productions, from tragedy to comedy - experience the full spectrum of theatrical arts. This festival celebrates storytelling, acting, direction, and stagecraft. Each performance is a labor of love that will move, inspire, and entertain you. Perfect for theatre enthusiasts and curious newcomers alike.",
    organizer: "Prof. Suresh Bhagat",
    contact: "+91 99887 54321",
    email: "suresh.bhagat@hislop.edu",
    prizePool: "₹35,000",
    participationType: "Team",
    maxTeamMembers: 15,
    registrationFee: "₹599"
  },
  {
    id: 11,
    name: "Art Exhibition",
    date: "Dec 8, 2025",
    venue: "Art Gallery",
    college: "Chitnavis Centre Nagpur",
    image: "/images/events/art.avif",
    description: "Explore stunning artworks including paintings, sculptures, and digital art by student artists.",
    fullDescription: "Immerse yourself in creativity at this spectacular art exhibition! Student artists from across Nagpur present their masterpieces including oil paintings, watercolors, sketches, sculptures, installations, and digital art. Each piece tells a unique story and showcases exceptional talent. The exhibition also features live art demonstrations, interactive workshops, and artist talks. Whether you're an art lover or looking for inspiration, this exhibition will captivate your imagination.",
    organizer: "Ms. Meera Deshpande",
    contact: "+91 98123 98765",
    email: "meera.deshpande@chitnavis.org",
    prizePool: "₹20,000",
    participationType: "Individual",
    maxTeamMembers: 1,
    registrationFee: "₹199"
  },
  {
    id: 12,
    name: "Literary Fest",
    date: "Dec 12, 2025",
    venue: "Library Complex",
    college: "RTM Nagpur University",
    image: "/images/events/literary.jpeg",
    description: "Engage in poetry recitals, book readings, debates, and discussions with renowned authors.",
    fullDescription: "Celebrate the power of words at the Literary Fest! This festival brings together writers, poets, readers, and literature enthusiasts for a day of intellectual exploration. Attend poetry recitals, book readings, panel discussions, and debates on contemporary issues. Interact with renowned authors, participate in creative writing workshops, and explore book stalls featuring diverse genres. Special sessions on publishing, storytelling, and literary criticism. A paradise for book lovers and aspiring writers!",
    organizer: "Dr. Anil Kale",
    contact: "+91 96543 87654",
    email: "anil.kale@rtmnu.ac.in",
    prizePool: "₹25,000",
    participationType: "Individual",
    maxTeamMembers: 1,
    registrationFee: "₹149"
  },
]

const nagpurColleges = [
  "VNIT Nagpur",
  "YCCE Nagpur",
  "PCE Nagpur",
  "RCOEM Nagpur",
  "GH Raisoni Nagpur",
  "KDKCE Nagpur",
  "LAD College Nagpur",
  "Hislop College Nagpur",
  "RTM Nagpur University",
  "Priyadarshini College of Engineering Nagpur",
  "Shri Ramdeobaba College Nagpur",
  "JD College of Engineering Nagpur",
  "Tulsiramji Gaikwad-Patil College Nagpur",
  "St. Vincent Pallotti College Nagpur",
  "Dharampeth M.P. Deo Memorial Science College Nagpur"
]

export default function EventsPage({ userName, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('technical')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [userCreatedEvents, setUserCreatedEvents] = useState([])
  const [userCreatedCommunities, setUserCreatedCommunities] = useState([])
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contact: '',
    college: '',
    teamMembers: [''],
    paymentMode: ''
  })
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    accountNumber: '',
    ifscCode: ''
  })

  const displayedEvents = selectedCategory === 'technical' ? technicalEvents : culturalEvents

  // Combine default events with user-created events
  const allDisplayedEvents = [
    ...userCreatedEvents.filter(event => event.category === selectedCategory),
    ...displayedEvents
  ]

  const handleEventCreated = (newEvent) => {
    setUserCreatedEvents(prev => [newEvent, ...prev])
    // Show success message
    alert('🎉 Event published successfully! Your event is now visible on the Events page.')
  }

  const handleCommunityCreated = (newCommunity) => {
    setUserCreatedCommunities(prev => [newCommunity, ...prev])
    alert('🎉 Community created successfully! It will appear in the Communities section.')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTeamMemberChange = (index, value) => {
    const newTeamMembers = [...formData.teamMembers]
    newTeamMembers[index] = value
    setFormData(prev => ({ ...prev, teamMembers: newTeamMembers }))
  }

  const addTeamMember = () => {
    if (selectedEvent && formData.teamMembers.length < selectedEvent.maxTeamMembers - 1) {
      setFormData(prev => ({ ...prev, teamMembers: [...prev.teamMembers, ''] }))
    }
  }

  const removeTeamMember = (index) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }))
  }

  const handleRegisterClick = () => {
    setShowRegistrationForm(true)
    setFormData({
      fullName: '',
      email: '',
      contact: '',
      college: '',
      teamMembers: [''],
      paymentMode: ''
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setShowRegistrationForm(false)
    setShowPayment(true)
  }

  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target
    setPaymentDetails(prev => ({ ...prev, [name]: value }))
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    // Simulate payment processing
    setTimeout(() => {
      setShowPayment(false)
      setShowSuccess(true)
    }, 1500)
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    setSelectedEvent(null)
    setFormData({
      fullName: '',
      email: '',
      contact: '',
      college: '',
      teamMembers: [''],
      paymentMode: ''
    })
    setPaymentDetails({
      upiId: '',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      accountNumber: '',
      ifscCode: ''
    })
  }

  const quickNav = [
    { id: 'events', label: 'Events', onClick: () => onNavigate && onNavigate('events') },
    { id: 'communities', label: 'Communities', onClick: () => onNavigate && onNavigate('communities') },
    { id: 'discussions', label: 'Discussions', onClick: () => onNavigate && onNavigate('discussions') },
    { id: 'teams', label: 'Form Teams', onClick: () => onNavigate && onNavigate('teams') }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ECE4D7' }}> {/* Added background color */}
      {/* Top Navigation */}
      <nav className="sticky top-0 z-40" style={{ backgroundColor: '#EBE2DB' }}> {/* Updated header background color */}
        <div className="max-w-full px-6 py-3 md:py-4 flex items-center justify-between border-b-4 border-black backdrop-blur"> {/* Reduced padding for smaller header */}
          {/* Left: Logo and Name */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate && onNavigate('landing')}
              className="mr-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              title="Back to Home"
            >
              <span className="text-2xl">←</span>
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('landing')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Icon src="/images/branding/logo.png" />
              <span className="font-extrabold text-2xl md:text-3xl text-slate-900">CampusConnect</span>
            </button>
          </div>

          {/* Right: Navigation Buttons, Create Button, and Profile */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-3">
              {quickNav.map((n) => (
                <button
                  key={n.id}
                  onClick={n.onClick}
                  className={`px-5 py-2.5 rounded-lg font-bold text-base transition-colors ${n.id === 'events' ? 'bg-cyan-500 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                >
                  {n.label}
                </button>
              ))}
            </div>
            <button className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors" title="Wishlist">
              <span className="text-2xl">❤️</span>
            </button>
            <button className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors" title="Notifications">
              <span className="text-2xl">🔔</span>
            </button>
            <div className="relative">
              <button onClick={()=>setMenuOpen(v=>!v)} className="w-14 h-14 rounded-full bg-slate-300 grid place-items-center hover:bg-slate-400 transition-colors">
                <span className="text-2xl font-bold text-slate-700">{userName?.[0] || 'U'}</span>
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:8}} className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow ring-1 ring-slate-200 p-2">
                    <a className="block px-3 py-2 rounded-lg hover:bg-slate-50">My Profile</a>

                    <a className="block px-3 py-2 rounded-lg hover:bg-slate-50">Logout</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content with Sidebar and Cards */}
      <div className="flex gap-6">
        {/* Left Sidebar Panel - Full Length */}
        <aside className="w-80 flex-shrink-0" style={{ backgroundColor: '#F8F3EA' }}> {/* Updated sidebar background color */}
          <div className="shadow-lg p-4 min-h-screen"> {/* Removed redundant background color */}
            <nav className="space-y-2">
              <button 
                onClick={() => setShowCreateModal(true)}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-100 font-semibold text-slate-700 transition-colors flex items-center gap-3"
              >
                <span className="text-xl">➕</span>
                <span>Create</span>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-100 font-semibold text-slate-700 transition-colors flex items-center gap-3">
                <span className="text-xl">📊</span>
                <span>Your Activity</span>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-100 font-semibold text-slate-700 transition-colors flex items-center gap-3">
                <span className="text-xl">📅</span>
                <span>Calendar</span>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-100 font-semibold text-slate-700 transition-colors flex items-center gap-3">
                <span className="text-xl">🔍</span>
                <span>Discover</span>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-100 font-semibold text-slate-700 transition-colors flex items-center gap-3">
                <span className="text-xl">💾</span>
                <span>Saved Items</span>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-100 font-semibold text-slate-700 transition-colors flex items-center gap-3">
                <span className="text-xl">❓</span>
                <span>Help/Support</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Right Content Area - Search Bar and Events */}
        <div className="flex-1">
          {/* Page Title */}
          <section className="px-6 pt-8 pb-4">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Events in Nagpur</h1>
              <p className="text-lg text-slate-600">Discover amazing events happening across colleges in Nagpur</p>
            </div>
          </section>

          {/* Search Bar Section */}
          <section className="px-6 py-4">
            <div className="relative max-w-5xl mx-auto">
              <input 
                type="text" 
                className="w-full rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 pl-16 pr-6 py-6 text-xl focus:outline-none focus:ring-2 focus:ring-primary" 
                placeholder="Search events in Nagpur…" 
              />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl text-slate-400">🔍</span>
            </div>
          </section>

          {/* Category Buttons */}
          <section className="px-6 pb-6">
            <div className="max-w-5xl mx-auto flex gap-4 justify-center">
              <button 
                onClick={() => setSelectedCategory('technical')}
                className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
                  selectedCategory === 'technical' 
                    ? 'bg-cyan-500 text-white shadow-lg scale-105' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Technical Events
              </button>
              <button 
                onClick={() => setSelectedCategory('cultural')}
                className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
                  selectedCategory === 'cultural' 
                    ? 'bg-purple-500 text-white shadow-lg scale-105' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Cultural Events
              </button>
            </div>
          </section>

          {/* Events Grid */}
          <section className="px-6 pb-16">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allDisplayedEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer relative"
                  onClick={() => setSelectedEvent(event)}
                >
                  {/* Badge for user-created events */}
                  {userCreatedEvents.some(e => e.id === event.id) && (
                    <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      NEW
                    </div>
                  )}
                  
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{event.name}</h3>
                    
                    {/* Event Headline - shown only if exists */}
                    {event.headline && (
                      <p className="text-sm font-semibold text-cyan-600 mb-3 italic">
                        "{event.headline}"
                      </p>
                    )}
                    
                    {/* Brief description on card */}
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="text-lg">📅</span>
                        <span className="font-medium text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="text-lg">📍</span>
                        <span className="font-medium text-sm">{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="text-lg">🏛️</span>
                        <span className="font-medium text-sm">{event.college}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="text-lg">👥</span>
                        <span className="font-medium text-sm">
                          {event.participationType === 'Team' 
                            ? `Team (Max ${event.maxTeamMembers})` 
                            : 'Individual'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="text-lg">💰</span>
                        <span className="text-sm font-bold text-cyan-600">
                          {event.registrationFee}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                      }}
                      className={`w-full py-3 rounded-lg font-bold text-white transition-colors ${
                        selectedCategory === 'technical' 
                          ? 'bg-cyan-500 hover:bg-cyan-600' 
                          : 'bg-purple-500 hover:bg-purple-600'
                      }`}
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 py-8"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl max-h-[85vh] rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header with Image */}
              <div className="relative h-48 flex-shrink-0">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-slate-700 font-bold shadow-lg text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{selectedEvent.name}</h2>
                
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🏛️</span>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">College</p>
                      <p className="font-semibold text-slate-800">{selectedEvent.college}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📅</span>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Date</p>
                      <p className="font-semibold text-slate-800">{selectedEvent.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📍</span>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Venue</p>
                      <p className="font-semibold text-slate-800">{selectedEvent.venue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🏆</span>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Prize Pool</p>
                      <p className="font-semibold text-slate-800">{selectedEvent.prizePool}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">👤</span>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Organizer</p>
                      <p className="font-semibold text-slate-800">{selectedEvent.organizer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📧</span>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Email</p>
                      <p className="font-semibold text-slate-800 text-xs break-all">{selectedEvent.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 col-span-2 bg-gradient-to-r from-cyan-50 to-purple-50 p-2 rounded-lg">
                    <span className="text-xl">👥</span>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Participation Type</p>
                      <p className="font-semibold text-slate-800 text-sm">
                        {selectedEvent.participationType === 'Team' 
                          ? `Team Event (Max ${selectedEvent.maxTeamMembers} members)` 
                          : 'Individual Event'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 col-span-2 bg-gradient-to-r from-green-50 to-emerald-50 p-2 rounded-lg">
                    <span className="text-xl">💰</span>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Registration Fee</p>
                      <p className="font-bold text-xl text-green-600">{selectedEvent.registrationFee}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-base font-bold text-slate-900 mb-2">About This Event</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{selectedEvent.fullDescription}</p>
                </div>

                <div className="bg-slate-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📞</span>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Contact</p>
                      <p className="font-semibold text-slate-800 text-sm">{selectedEvent.contact}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={handleRegisterClick}
                    className={`flex-1 py-3 rounded-lg font-bold text-white text-base transition-colors ${
                      selectedCategory === 'technical' 
                        ? 'bg-cyan-500 hover:bg-cyan-600' 
                        : 'bg-purple-500 hover:bg-purple-600'
                    }`}
                  >
                    Register Now
                  </button>
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="px-5 py-3 rounded-lg font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Registration Form Modal */}
      <AnimatePresence>
        {showRegistrationForm && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowRegistrationForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-white border-b border-slate-200 p-6 z-10 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Event Registration</h2>
                    <p className="text-slate-600 mt-1">{selectedEvent.name}</p>
                  </div>
                  <button
                    onClick={() => setShowRegistrationForm(false)}
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email ID */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="10-digit mobile number"
                  />
                </div>

                {/* College Name Dropdown */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    College Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors bg-white"
                  >
                    <option value="">Select your college</option>
                    {nagpurColleges.map((college) => (
                      <option key={college} value={college}>
                        {college}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Team Members - Only for Team Events */}
                {selectedEvent.participationType === 'Team' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Team Members Names
                      <span className="text-slate-500 font-normal ml-2">
                        (excluding you, max {selectedEvent.maxTeamMembers - 1} members)
                      </span>
                    </label>
                    {formData.teamMembers.map((member, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={member}
                          onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                          className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                          placeholder={`Team member ${index + 1} name`}
                        />
                        {formData.teamMembers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTeamMember(index)}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors font-semibold"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    {formData.teamMembers.length < selectedEvent.maxTeamMembers - 1 && (
                      <button
                        type="button"
                        onClick={addTeamMember}
                        className="mt-2 px-4 py-2 bg-cyan-100 text-cyan-600 rounded-xl hover:bg-cyan-200 transition-colors font-semibold"
                      >
                        + Add Team Member
                      </button>
                    )}
                  </div>
                )}

                {/* Payment Mode */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Payment Mode <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {['UPI', 'Credit Card', 'Debit Card', 'Net Banking'].map((mode) => (
                      <label key={mode} className="flex items-center gap-3 p-3 border-2 border-slate-200 rounded-xl hover:border-cyan-300 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="paymentMode"
                          value={mode}
                          checked={formData.paymentMode === mode}
                          onChange={handleInputChange}
                          required
                          className="w-4 h-4 text-cyan-500 focus:ring-cyan-500"
                        />
                        <span className="text-slate-700">{mode}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className={`flex-1 px-8 py-4 rounded-xl font-bold text-white transition-colors ${
                      selectedCategory === 'technical' 
                        ? 'bg-cyan-500 hover:bg-cyan-600' 
                        : 'bg-purple-500 hover:bg-purple-600'
                    }`}
                  >
                    Proceed to Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRegistrationForm(false)}
                    className="px-8 py-4 rounded-xl font-bold border-2 border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPayment(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-6 z-10 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Payment</h2>
                    <p className="text-white/90 mt-1">Complete your registration payment</p>
                  </div>
                  <button
                    onClick={() => setShowPayment(false)}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <form onSubmit={handlePaymentSubmit} className="p-6 space-y-5">
                {/* Registration Summary */}
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <h3 className="font-bold text-slate-800 mb-2">Registration Summary</h3>
                  <div className="space-y-1 text-sm text-slate-600">
                    <p><span className="font-semibold">Event:</span> {selectedEvent.name}</p>
                    <p><span className="font-semibold">Name:</span> {formData.fullName}</p>
                    <p><span className="font-semibold">Email:</span> {formData.email}</p>
                    <p><span className="font-semibold">College:</span> {formData.college}</p>
                    <p><span className="font-semibold">Payment Mode:</span> {formData.paymentMode}</p>
                  </div>
                </div>

                {/* UPI Payment */}
                {formData.paymentMode === 'UPI' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      UPI ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="upiId"
                      value={paymentDetails.upiId}
                      onChange={handlePaymentDetailsChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="yourname@upi"
                    />
                    <div className="mt-4 p-4 bg-cyan-50 rounded-xl text-center">
                      <p className="text-sm text-slate-600 mb-2">Scan QR Code to Pay</p>
                      <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center border-2 border-slate-200">
                        <span className="text-6xl">📱</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-2">Or enter your UPI ID above</p>
                    </div>
                  </div>
                )}

                {/* Credit/Debit Card Payment */}
                {(formData.paymentMode === 'Credit Card' || formData.paymentMode === 'Debit Card') && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Card Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={handlePaymentDetailsChange}
                        required
                        maxLength="16"
                        pattern="[0-9]{16}"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Cardholder Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={paymentDetails.cardName}
                        onChange={handlePaymentDetailsChange}
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                        placeholder="Name on card"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Expiry Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentDetails.expiryDate}
                          onChange={handlePaymentDetailsChange}
                          required
                          placeholder="MM/YY"
                          maxLength="5"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          CVV <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          name="cvv"
                          value={paymentDetails.cvv}
                          onChange={handlePaymentDetailsChange}
                          required
                          maxLength="3"
                          pattern="[0-9]{3}"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Net Banking Payment */}
                {formData.paymentMode === 'Net Banking' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Select Your Bank <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors bg-white"
                      >
                        <option value="">Choose your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="pnb">Punjab National Bank</option>
                        <option value="bob">Bank of Baroda</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Account Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={paymentDetails.accountNumber}
                        onChange={handlePaymentDetailsChange}
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                        placeholder="Enter account number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        IFSC Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="ifscCode"
                        value={paymentDetails.ifscCode}
                        onChange={handlePaymentDetailsChange}
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                        placeholder="Enter IFSC code"
                      />
                    </div>
                  </div>
                )}

                {/* Amount */}
                <div className="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-600 mb-1">Registration Fee</p>
                  <p className="text-3xl font-bold text-slate-800">{selectedEvent.registrationFee}</p>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 transition-all"
                  >
                    Pay Now
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPayment(false)}
                    className="px-8 py-4 rounded-xl font-bold border-2 border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={handleSuccessClose}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center"
              >
                <span className="text-5xl">✓</span>
              </motion.div>
              
              <h2 className="text-3xl font-bold text-slate-800 mb-3">Registered Successfully!</h2>
              <p className="text-slate-600 mb-6">
                Your registration for <span className="font-semibold">{selectedEvent?.name}</span> has been confirmed.
              </p>
              
              <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left">
                <p className="text-sm text-slate-600 mb-2">
                  <span className="font-semibold">Registration ID:</span> REG{Date.now().toString().slice(-8)}
                </p>
                <p className="text-sm text-slate-600">
                  A confirmation email has been sent to <span className="font-semibold">{formData.email}</span>
                </p>
              </div>

              <button
                onClick={handleSuccessClose}
                className="w-full px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 transition-all"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Modal */}
      <CreateModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onEventCreated={handleEventCreated}
        onCommunityCreated={handleCommunityCreated}
      />
    </div>
  )
}
