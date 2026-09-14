const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting Campus Connect Database Seed...')

  // Clear existing data
  await prisma.bookmark.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.postLike.deleteMany()
  await prisma.post.deleteMany()
  await prisma.communityMember.deleteMany()
  await prisma.community.deleteMany()
  await prisma.clubMember.deleteMany()
  await prisma.club.deleteMany()
  await prisma.registration.deleteMany()
  await prisma.event.deleteMany()
  await prisma.user.deleteMany()

  // Hash default password
  const defaultPasswordHash = await bcrypt.hash('password123', 10)

  // 1. Create Users
  const studentUser = await prisma.user.create({
    data: {
      name: 'Kanak Ramteke',
      email: 'kanak.ramteke@vnit.ac.in',
      passwordHash: defaultPasswordHash,
      college: 'VNIT Nagpur',
      phone: '+91 98765 43210',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      interests: JSON.stringify(['AI/ML', 'Hackathons', 'Web Development', 'Robotics', 'Dance']),
      role: 'STUDENT'
    }
  })

  const organizerUser = await prisma.user.create({
    data: {
      name: 'Aarav Sharma',
      email: 'aarav.sharma@vnit.ac.in',
      passwordHash: defaultPasswordHash,
      college: 'VNIT Nagpur',
      phone: '+91 98123 45678',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      interests: JSON.stringify(['Competitive Coding', 'Hackathons']),
      role: 'EVENT_ORGANIZER'
    }
  })

  const clubHeadUser = await prisma.user.create({
    data: {
      name: 'Ananya Deshmukh',
      email: 'ananya.d@rcoem.in',
      passwordHash: defaultPasswordHash,
      college: 'RCOEM Nagpur',
      phone: '+91 97654 32109',
      profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      interests: JSON.stringify(['Music', 'Drama', 'Cultural']),
      role: 'CLUB_HEAD'
    }
  })

  const communityAdminUser = await prisma.user.create({
    data: {
      name: 'Rohan Verma',
      email: 'rohan.v@iiitn.ac.in',
      passwordHash: defaultPasswordHash,
      college: 'IIIT Nagpur',
      phone: '+91 91234 56789',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      interests: JSON.stringify(['Open Source', 'DevOps', 'AI']),
      role: 'COMMUNITY_ADMIN'
    }
  })

  console.log('✅ Users seeded.')

  // 2. Create Events (Technical & Cultural)
  const event1 = await prisma.event.create({
    data: {
      id: 'tech-1',
      title: 'Axis 2026 Hackathon',
      category: 'TECHNICAL',
      tagline: 'Nagpur’s Largest Inter-College 36-Hour Hackathon',
      description: 'Join over 500+ student developers, AI enthusiasts, and designers across Nagpur for a high-octane 36-hour hackathon. Build innovative solutions for real-world problems and win prizes worth ₹1.5 Lakhs.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      date: '2026-10-15',
      time: '09:00 AM',
      location: 'VNIT Campus Auditorium',
      venue: 'Main Academic Block, VNIT Nagpur',
      registrationFee: 299,
      isFree: false,
      seats: 250,
      eligibility: 'All B.Tech / M.Tech / MCA Students',
      organizedBy: 'CSI VNIT Student Chapter',
      college: 'VNIT Nagpur',
      creatorId: organizerUser.id,
      status: 'PUBLISHED',
      whatToExpect: '36 hours of non-stop coding, free meals, mentor sessions with industry experts from Google & Microsoft, and certificates for all finalists.'
    }
  })

  const event2 = await prisma.event.create({
    data: {
      id: 'tech-2',
      title: 'RoboWars Championship',
      category: 'TECHNICAL',
      tagline: 'Ultimate Battle of Bot Builders & Mechatronics Engineers',
      description: 'Design, assemble, and battle custom-built combat robots in an enclosed steel arena. Watch high-speed collisions and engineering marvels.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      date: '2026-10-18',
      time: '11:00 AM',
      location: 'RCOEM Sports Complex',
      venue: 'Indoor Stadium, RCOEM Nagpur',
      registrationFee: 499,
      isFree: false,
      seats: 40,
      eligibility: 'Open to all Engineering Colleges in Maharashtra',
      organizedBy: 'Robotics Club RCOEM',
      college: 'RCOEM Nagpur',
      creatorId: organizerUser.id,
      status: 'PUBLISHED',
      whatToExpect: 'Custom 15kg & 30kg category bot wars, live commentary, technical judging, and cash prizes worth ₹80,000.'
    }
  })

  const event3 = await prisma.event.create({
    data: {
      id: 'cult-1',
      title: 'Aarohi 2026 Cultural Fest',
      category: 'CULTURAL',
      tagline: 'Annual Cultural Extravaganza of Central India',
      description: 'Experience 3 days of mesmerizing music, battle of the bands, street play, pro-shows, and fashion pageants featuring top artists.',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      date: '2026-11-05',
      time: '04:00 PM',
      location: 'VNIT Open Air Theatre',
      venue: 'OAT, VNIT Campus, Nagpur',
      registrationFee: 0,
      isFree: true,
      seats: 2000,
      eligibility: 'All College Students with Valid ID',
      organizedBy: 'VNIT Cultural Council',
      college: 'VNIT Nagpur',
      creatorId: clubHeadUser.id,
      status: 'PUBLISHED',
      whatToExpect: 'Pro-nite concert by renowned Bollywood band, inter-college choreography competition, food street, and art installations.'
    }
  })

  const event4 = await prisma.event.create({
    data: {
      id: 'cult-2',
      title: 'Pratibimb Street Play (Nukkad Natak)',
      category: 'CULTURAL',
      tagline: 'Dramatic Expressions on Social Realities',
      description: 'Inter-college street play contest bringing attention to pressing social issues through high-energy acting and drumbeats.',
      image: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80',
      date: '2026-10-22',
      time: '02:00 PM',
      location: 'YCCE Campus Lawns',
      venue: 'Central Quadrangle, YCCE Nagpur',
      registrationFee: 150,
      isFree: false,
      seats: 15,
      eligibility: 'College Teams (8 to 20 members)',
      organizedBy: 'Drama Society YCCE',
      college: 'YCCE Nagpur',
      creatorId: clubHeadUser.id,
      status: 'PUBLISHED',
      whatToExpect: 'High-energy outdoor performances, jury evaluation by NSD alumni, and national-level trophy.'
    }
  })

  const event5 = await prisma.event.create({
    data: {
      id: 'tech-11',
      title: 'AI & Data Science Summit 2026',
      category: 'TECHNICAL',
      tagline: 'Exploring Generative AI, LLMs & Machine Learning Applications',
      description: 'Hands-on workshops, technical talks, and research paper presentations on frontier artificial intelligence models and industry deployments.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      date: '2026-08-01',
      time: '10:00 AM',
      location: 'IIIT Nagpur Auditorium',
      venue: 'Main Auditorium, IIIT Nagpur',
      registrationFee: 199,
      isFree: false,
      seats: 150,
      eligibility: 'Students & Faculty',
      organizedBy: 'IIITN AI Society',
      college: 'IIIT Nagpur',
      creatorId: organizerUser.id,
      status: 'PUBLISHED',
      whatToExpect: 'Keynote by AI researchers, GPU credits, project showcases, and networking with tech recruiters.'
    }
  })

  console.log('✅ Events seeded.')

  // 3. Create Clubs
  const club1 = await prisma.club.create({
    data: {
      id: 'tclub-1',
      name: 'Google Developer Student Club (GDSC)',
      category: 'TECHNICAL',
      college: 'VNIT Nagpur',
      description: 'Community groups for college and university students interested in Google developer technologies.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      membersCount: 340,
      activities: JSON.stringify(['Android Study Jams', 'Cloud Skill Boosts', 'Solution Challenge Hackathons']),
      leadership: JSON.stringify({ lead: 'Kanak Ramteke', coLead: 'Aarav Sharma' }),
      creatorId: organizerUser.id,
      status: 'PUBLISHED'
    }
  })

  const club2 = await prisma.club.create({
    data: {
      id: 'cclub-2',
      name: 'Octaves Music & Band Club',
      category: 'CULTURAL',
      college: 'RCOEM Nagpur',
      description: 'The official music society of RCOEM representing vocals, instruments, rock band, and classical compositions.',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      membersCount: 180,
      activities: JSON.stringify(['Jamming Sessions', 'Aarohi Battle of Bands', 'Unplugged Acoustic Nights']),
      leadership: JSON.stringify({ lead: 'Ananya Deshmukh', coLead: 'Priya Joshi' }),
      creatorId: clubHeadUser.id,
      status: 'PUBLISHED'
    }
  })

  const club3 = await prisma.club.create({
    data: {
      id: 'oclub-3',
      name: 'Rotaract Youth Club',
      category: 'OTHER',
      college: 'YCCE Nagpur',
      description: 'Youth wing dedicated to community service, leadership development, professional development, and social welfare.',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80',
      membersCount: 220,
      activities: JSON.stringify(['Blood Donation Camps', 'Tree Plantation Drive', 'Youth Leadership Summit']),
      leadership: JSON.stringify({ lead: 'Siddharth Patil', coLead: 'Neha Kulkarni' }),
      creatorId: clubHeadUser.id,
      status: 'PUBLISHED'
    }
  })

  console.log('✅ Clubs seeded.')

  // 4. Create Communities
  const comm1 = await prisma.community.create({
    data: {
      id: 'comm-1',
      name: 'Nagpur Developers Network',
      category: 'Technology',
      college: 'Inter-College Nagpur',
      description: 'Hub for software engineers, web developers, and competitive coders across VNIT, RCOEM, YCCE, and IIIT Nagpur.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      interests: JSON.stringify(['WebDev', 'React', 'Node.js', 'Competitive Coding']),
      creatorId: communityAdminUser.id,
      status: 'PUBLISHED'
    }
  })

  const comm2 = await prisma.community.create({
    data: {
      id: 'comm-2',
      name: 'Startup & Entrepreneurship Cell',
      category: 'Career & Business',
      college: 'Nagpur Region',
      description: 'Connect with aspiring founders, pitch decks, angel investors, and co-founders across Vidarbha campus incubators.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
      interests: JSON.stringify(['Startups', 'Pitching', 'Venture Capital', 'Product Design']),
      creatorId: communityAdminUser.id,
      status: 'PUBLISHED'
    }
  })

  console.log('✅ Communities seeded.')

  // 5. Create Memberships
  await prisma.clubMember.create({
    data: { clubId: club1.id, userId: studentUser.id }
  })
  await prisma.clubMember.create({
    data: { clubId: club2.id, userId: studentUser.id }
  })

  await prisma.communityMember.create({
    data: { communityId: comm1.id, userId: studentUser.id }
  })
  await prisma.communityMember.create({
    data: { communityId: comm2.id, userId: studentUser.id }
  })

  console.log('✅ Memberships seeded.')

  // 6. Create Community Discussions & Comments
  const post1 = await prisma.post.create({
    data: {
      id: 'post-1',
      communityId: comm1.id,
      authorId: studentUser.id,
      authorName: 'Kanak Ramteke',
      authorCollege: 'VNIT Nagpur',
      authorAvatar: studentUser.profileImage,
      title: 'Best resources for learning Next.js 14 & Prisma ORM in 2026?',
      content: 'Hey everyone! Our team is preparing for Axis 2026 Hackathon. What are your top recommendations for full-stack Node/Express + Prisma setups?',
      likesCount: 14
    }
  })

  await prisma.comment.create({
    data: {
      postId: post1.id,
      authorId: communityAdminUser.id,
      authorName: 'Rohan Verma',
      authorCollege: 'IIIT Nagpur',
      authorAvatar: communityAdminUser.profileImage,
      content: 'Check out the official Prisma documentation and Next.js App Router guides. Using TypeScript with Zod validation really speeds up hackathon builds!'
    }
  })

  console.log('✅ Discussions seeded.')

  // 7. Create Event Registrations
  await prisma.registration.create({
    data: {
      id: 'reg-1',
      eventId: event1.id,
      studentId: studentUser.id,
      registrationId: 'CC-REG-2026-8921',
      registrationStatus: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: 'UPI',
      amountPaid: 299,
      transactionId: 'TXN-9948210398'
    }
  })

  await prisma.registration.create({
    data: {
      id: 'reg-2',
      eventId: event3.id,
      studentId: studentUser.id,
      registrationId: 'CC-REG-2026-4102',
      registrationStatus: 'confirmed',
      paymentStatus: 'free',
      paymentMethod: 'Free',
      amountPaid: 0,
      transactionId: 'N/A'
    }
  })

  await prisma.registration.create({
    data: {
      id: 'reg-3',
      eventId: event5.id,
      studentId: studentUser.id,
      registrationId: 'CC-REG-2026-1049',
      registrationStatus: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: 'Card',
      amountPaid: 199,
      transactionId: 'TXN-4820194822'
    }
  })

  console.log('✅ Registrations seeded.')

  // 8. Create Notifications
  await prisma.notification.create({
    data: {
      id: 'notif-1',
      userId: studentUser.id,
      category: 'events',
      type: 'event_registration',
      title: 'Registration Confirmed',
      message: "You're successfully registered for Axis 2026 Hackathon organized by VNIT Nagpur.",
      isRead: false,
      relatedEntityType: 'event',
      relatedEntityId: event1.id,
      actionRoute: 'events',
      actionParams: JSON.stringify({ eventId: event1.id }),
      actionLabel: 'View Event'
    }
  })

  await prisma.notification.create({
    data: {
      id: 'notif-2',
      userId: studentUser.id,
      category: 'payments',
      type: 'payment_success',
      title: 'Payment Successful',
      message: 'Your payment of ₹299 for Axis 2026 Hackathon was confirmed (TXN: TXN-9948210398).',
      isRead: true,
      relatedEntityType: 'event',
      relatedEntityId: event1.id,
      actionRoute: 'my-events',
      actionLabel: 'View Pass'
    }
  })

  await prisma.notification.create({
    data: {
      id: 'notif-3',
      userId: studentUser.id,
      category: 'clubs',
      type: 'club_joined',
      title: 'Welcome to Google Developer Student Club!',
      message: 'You are now an active member of GDSC VNIT Nagpur.',
      isRead: false,
      relatedEntityType: 'club',
      relatedEntityId: club1.id,
      actionRoute: 'club-details',
      actionParams: JSON.stringify({ clubId: club1.id }),
      actionLabel: 'View Club'
    }
  })

  console.log('✅ Notifications seeded.')

  // 9. Create Bookmarks
  await prisma.bookmark.create({
    data: {
      userId: studentUser.id,
      eventId: event2.id
    }
  })

  await prisma.bookmark.create({
    data: {
      userId: studentUser.id,
      eventId: event3.id
    }
  })

  console.log('✅ Bookmarks seeded.')
  console.log('🚀 Campus Connect Database Seeding Completed Successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
