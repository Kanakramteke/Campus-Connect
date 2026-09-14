// Campus Connect - Nagpur Comprehensive Dataset

export const NAGPUR_COLLEGES = [
  { id: 'all', name: 'All Colleges in Nagpur' },
  { id: 'vnit', name: 'VNIT Nagpur', fullName: 'Visvesvaraya National Institute of Technology', location: 'South Ambazari Road, Nagpur' },
  { id: 'rcoem', name: 'RCOEM Nagpur', fullName: 'Shri Ramdeobai College of Engineering & Management', location: 'Katol Road, Nagpur' },
  { id: 'ycce', name: 'YCCE Nagpur', fullName: 'Yeshwantrao Chavan College of Engineering', location: 'Wanadongri, Hingna Road, Nagpur' },
  { id: 'ghrce', name: 'GHRCE Nagpur', fullName: 'G. H. Raisoni College of Engineering', location: 'CRPF Gate No. 3, Digdoh Hills, Nagpur' },
  { id: 'iiitn', name: 'IIIT Nagpur', fullName: 'Indian Institute of Information Technology, Nagpur', location: 'Waranga, Wardha Road, Nagpur' },
  { id: 'sit', name: 'SIT Nagpur', fullName: 'Symbiosis Institute of Technology, Nagpur', location: 'Wathoda Layout, Nagpur' },
  { id: 'pallotti', name: 'Pallotti Nagpur', fullName: 'St. Vincent Pallotti College of Engineering', location: 'Gavansi Manapur, Wardha Road, Nagpur' },
  { id: 'pce', name: 'PCE Nagpur', fullName: 'Priyadarshini College of Engineering', location: 'Hingna Road, Nagpur' },
  { id: 'gcoe', name: 'GCOE Nagpur', fullName: 'Government College of Engineering, Nagpur', location: 'Sector 27, Mihan, Nagpur' },
  { id: 'sbjain', name: 'S.B. Jain Institute', fullName: 'S. B. Jain Institute of Technology, Management & Research', location: 'Katol Road, Nagpur' }
];

export const TECHNICAL_EVENTS = [
  {
    id: 'tech-1',
    title: 'HackNova 2026',
    tagline: 'Build. Innovate. Compete.',
    category: 'Hackathon',
    type: 'technical',
    organizingCollege: 'VNIT Nagpur',
    collegeId: 'vnit',
    date: '2026-10-15',
    time: '09:00 AM - 09:00 AM (24 Hours)',
    venue: 'Auditorium Complex, VNIT Campus, Nagpur',
    venueAddress: 'South Ambazari Road, VNIT Campus, Nagpur, Maharashtra 440010',
    location: 'VNIT Campus, Nagpur',
    registrationFee: 299,
    isFree: false,
    teamSize: '2 - 4 Members',
    registrationDeadline: '2026-10-10',
    eligibility: 'Open to all Engineering, Tech & Computer Science Undergraduates',
    seatsAvailable: 45,
    totalCapacity: 120,
    status: 'open',
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    description: 'HackNova 2026 is Nagpur\'s flagship 24-hour inter-college hackathon bringing together the brightest student minds to solve real-world problems in AI, Web3, Smart Cities, and Healthcare. Participants will build functioning software prototypes with live technical mentorship.',
    expectations: [
      { title: 'Live Problem Solving', desc: 'Work on practical real-world challenges with your team under 24 hours.' },
      { title: 'Expert Mentorship', desc: 'Learn from experienced software architects and industry tech mentors.' },
      { title: 'Inter-College Networking', desc: 'Connect with 120+ student developers across Nagpur campuses.' },
      { title: 'Recognition & Prizes', desc: 'Compete for ₹85,000+ total prize pool and incubation opportunities.' }
    ],
    schedule: [
      { time: '09:00 AM', title: 'Reporting & Check-in', desc: 'Badges distribution & breakfast at VNIT OAT.' },
      { time: '10:00 AM', title: 'Opening Keynote', desc: 'Problem statement release & sponsor briefings.' },
      { time: '01:00 PM', title: 'Mentoring Round 1', desc: 'First progress checkpoint & code architecture feedback.' },
      { time: '08:00 PM', title: 'Mid-Way Evaluation', desc: 'Dinner & checkpoint 2 evaluations.' },
      { time: '07:00 AM (Day 2)', title: 'Final Code Freeze', desc: 'Git repository freeze & presentation deck submission.' },
      { time: '10:00 AM (Day 2)', title: 'Grand Finale & Prizes', desc: 'Top 8 teams demo to judges followed by award distribution.' }
    ],
    rules: [
      'Participants must carry a valid college ID card.',
      'All project code must be written during the 24-hour hackathon window.',
      'Teams must consist of 2 to 4 registered members.',
      'Plagiarism or pre-built complete repositories will lead to immediate disqualification.',
      'Participants must follow the organizers\' conduct guidelines.'
    ],
    prizes: ['1st Prize: ₹50,000 + Incubation Support', '2nd Prize: ₹25,000 + Swag Kits', '3rd Prize: ₹10,000 + Goodies'],
    organizer: {
      name: 'Department of Computer Science & Engineering, VNIT',
      description: 'Student-led technical society organizing national tech competitions and research symposia.',
      contactPerson: 'Aditya Deshmukh (Student Lead)',
      email: 'hacknova@vnit.ac.in',
      phone: '+91 98765 43210'
    },
    tags: ['AI/ML', 'Web Development', 'Hackathon', 'Open Source'],
    popular: true,
    upcomingDays: 3
  },
  {
    id: 'tech-2',
    title: 'RoboWars & Line Follower Showdown',
    tagline: 'Metal Meets Might.',
    category: 'Robotics',
    type: 'technical',
    organizingCollege: 'RCOEM Nagpur',
    collegeId: 'rcoem',
    date: '2026-10-22',
    time: '10:00 AM - 05:00 PM',
    venue: 'Main Sports Complex, RCOEM Campus, Nagpur',
    venueAddress: 'Katol Road, Gittikhadan, Nagpur, Maharashtra 440013',
    location: 'RCOEM Campus, Nagpur',
    registrationFee: 499,
    isFree: false,
    teamSize: '1 - 5 Members',
    registrationDeadline: '2026-10-18',
    eligibility: 'Engineering & Diploma Students across Nagpur',
    seatsAvailable: 18,
    totalCapacity: 60,
    status: 'open',
    banner: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    description: 'High-octane robotics battle featuring wireless bot fights in reinforced steel arenas, obstacle navigators, and high-speed autonomous line follower robots.',
    expectations: [
      { title: 'Robot Fighting Arena', desc: 'Custom 15kg wireless combat bots fighting in a protected arena.' },
      { title: 'Autonomous Track', desc: 'Precision line follower bots navigating high-speed optical tracks.' },
      { title: 'Hardware Mentorship', desc: 'On-site technical support for motor drivers & RF modules.' }
    ],
    schedule: [
      { time: '10:00 AM', title: 'Bot Inspection', desc: 'Weight, dimensions, and wireless safety check.' },
      { time: '11:30 AM', title: 'Line Follower Heats', desc: 'Timed qualifiers on black track.' },
      { time: '02:00 PM', title: 'RoboWars Knockouts', desc: 'Head-to-head 15kg bot combat.' },
      { time: '04:30 PM', title: 'Final Showdown', desc: 'Championship match & trophy presentation.' }
    ],
    rules: [
      'Bot weight must not exceed 15 kg for RoboWars.',
      'Wireless control frequency must operate on standard 2.4GHz.',
      'Line follower bots must be 100% autonomous without remote control.'
    ],
    prizes: ['RoboWars Champion: ₹40,000', 'RoboWars Runner-up: ₹20,000', 'Line Follower Winner: ₹15,000'],
    organizer: {
      name: 'Robotics & Automation Club, RCOEM',
      description: 'Premier hardware society advancing autonomous robotics and mechatronics in Central India.',
      contactPerson: 'Prof. S. R. Kulkarni',
      email: 'robotics@rcoem.ac.in',
      phone: '+91 97654 32109'
    },
    tags: ['Robotics', 'Hardware', 'Automation'],
    popular: true,
    upcomingDays: 10
  },
  {
    id: 'tech-3',
    title: 'AI & Generative Models Masterclass',
    tagline: 'Master LLMs & RAG Architectures.',
    category: 'Workshop',
    type: 'technical',
    organizingCollege: 'IIIT Nagpur',
    collegeId: 'iiitn',
    date: '2026-10-05',
    time: '11:00 AM - 04:00 PM',
    venue: 'Seminar Hall 2, IIIT Nagpur Campus',
    venueAddress: 'Waranga, Wardha Road, Nagpur, Maharashtra 441108',
    location: 'IIIT Nagpur Campus',
    registrationFee: 0,
    isFree: true,
    teamSize: 'Individual',
    registrationDeadline: '2026-10-03',
    eligibility: 'All Undergraduates interested in Artificial Intelligence',
    seatsAvailable: 80,
    totalCapacity: 200,
    status: 'open',
    banner: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    description: 'Hands-on practical workshop covering LLM fine-tuning, RAG (Retrieval-Augmented Generation) architectures, vector databases, and building production-ready AI applications using Python & LangChain.',
    expectations: [
      { title: 'Hands-on Coding', desc: 'Build RAG pipelines using Python and LangChain during the session.' },
      { title: 'Free Cloud Credits', desc: 'Get Google Colab Pro credits for model execution.' },
      { title: 'Verified Certificate', desc: 'Receive official AI Cell certification from IIIT Nagpur.' }
    ],
    schedule: [
      { time: '11:00 AM', title: 'Transformers & LLMs Intro', desc: 'Understanding attention mechanisms & prompt engineering.' },
      { time: '01:00 PM', title: 'Networking Lunch', desc: 'Free refreshments & peer interaction.' },
      { time: '02:00 PM', title: 'RAG Architecture Lab', desc: 'Building vector store & querying custom documents.' },
      { time: '03:45 PM', title: 'Q&A & Certificates', desc: 'Wrap-up & digital badge distribution.' }
    ],
    rules: [
      'Participants must bring their own laptop with Python 3.10+ pre-installed.',
      'Active Google Colab account recommended.'
    ],
    prizes: ['Free Cloud Credits for Top Project', 'AI Developer Badges'],
    organizer: {
      name: 'AI & Data Science Society, IIIT Nagpur',
      description: 'Student AI research chapter dedicated to modern machine learning applications.',
      contactPerson: 'Dr. Harshita Sharma',
      email: 'aiclub@iiitn.ac.in',
      phone: '+91 99887 76655'
    },
    tags: ['AI/ML', 'Workshop', 'Python'],
    popular: true,
    upcomingDays: 2
  },
  {
    id: 'tech-4',
    title: 'CyberShield CTF Challenge',
    tagline: 'Hack The Flag. Defend The Mesh.',
    category: 'Cybersecurity',
    type: 'technical',
    organizingCollege: 'YCCE Nagpur',
    collegeId: 'ycce',
    date: '2026-11-02',
    time: '09:00 AM - 06:00 PM',
    venue: 'Computer Center, YCCE Wanadongri, Nagpur',
    venueAddress: 'Hingna Road, Wanadongri, Nagpur, Maharashtra 441110',
    location: 'YCCE Wanadongri, Nagpur',
    registrationFee: 199,
    isFree: false,
    teamSize: '1 - 3 Members',
    registrationDeadline: '2026-10-30',
    eligibility: 'Students interested in Ethical Hacking & Cybersecurity',
    seatsAvailable: 30,
    totalCapacity: 100,
    status: 'open',
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    description: 'Jeopardy-style CTF challenge covering Web Exploitation, Reverse Engineering, Cryptography, Forensics, OSINT, and Binary Exploitation.',
    expectations: [
      { title: 'Live Scoreboard', desc: 'Real-time leaderboard tracking challenge flag submissions.' },
      { title: 'Diverse Categories', desc: 'Web sec, crypto, reverse engineering, and forensics.' },
      { title: 'Industry Vouchers', desc: 'Security certification vouchers for top performers.' }
    ],
    schedule: [
      { time: '09:00 AM', title: 'Credential Distribution', desc: 'Platform login setup & rules brief.' },
      { time: '10:00 AM', title: 'CTF Kickoff', desc: 'Challenges open on CTF platform.' },
      { time: '05:00 PM', title: 'Scoreboard Freeze', desc: 'Final challenge submissions.' },
      { time: '05:30 PM', title: 'Solution Walkthroughs', desc: 'Top team write-ups & prize ceremony.' }
    ],
    rules: [
      'No attacks allowed on CTF platform infrastructure.',
      'Brute forcing flag submission endpoints will lead to penalty.'
    ],
    prizes: ['1st Rank: ₹20,000 + Security Course Voucher', '2nd Rank: ₹10,000'],
    organizer: {
      name: 'CyberSecurity Club, YCCE',
      description: 'Ethical hacking & network defense student alliance.',
      contactPerson: 'Rohan Patil',
      email: 'ctf@ycce.edu',
      phone: '+91 98221 12345'
    },
    tags: ['Cybersecurity', 'CTF', 'Ethical Hacking'],
    popular: false,
    upcomingDays: 14
  },
  {
    id: 'tech-5',
    title: 'CodeSprint Speed Coding Contest',
    tagline: 'Code Fast. Rank High.',
    category: 'Coding Competition',
    type: 'technical',
    organizingCollege: 'GHRCE Nagpur',
    collegeId: 'ghrce',
    date: '2026-10-18',
    time: '02:00 PM - 05:00 PM',
    venue: 'IT Lab 4, GHRCE Digdoh Hills, Nagpur',
    venueAddress: 'CRPF Gate No. 3, Hingna Road, Digdoh Hills, Nagpur, Maharashtra 440016',
    location: 'GHRCE Digdoh Hills, Nagpur',
    registrationFee: 150,
    isFree: false,
    teamSize: 'Individual',
    registrationDeadline: '2026-10-16',
    eligibility: 'Open to all Undergraduates',
    seatsAvailable: 50,
    totalCapacity: 150,
    status: 'open',
    banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    description: 'Fast-paced algorithmic coding competition on CodeChef / HackerRank testing Data Structures & Algorithms under tight time constraints.',
    expectations: [
      { title: 'Algorithmic Speed', desc: 'Solve 5 DSA problems under 3 hours.' },
      { title: 'Automated Testing', desc: 'Instant test-case evaluation on platform.' }
    ],
    schedule: [
      { time: '01:30 PM', title: 'Lab Seating', desc: 'Terminal login & environment setup.' },
      { time: '02:00 PM', title: 'Contest Start', desc: 'Problem set released.' },
      { time: '05:00 PM', title: 'Leaderboard Finalization', desc: 'Automated ranking review & prize announcement.' }
    ],
    rules: [
      'Supported languages: C++, Java, Python, C#.',
      'Plagiarism detection software active on all code submissions.'
    ],
    prizes: ['1st Rank: ₹15,000', '2nd Rank: ₹8,000'],
    organizer: {
      name: 'ACM Student Chapter, GHRCE',
      description: 'Competitive programming society organizing weekly algorithmic rounds.',
      contactPerson: 'Aniket Verma',
      email: 'acm@ghrce.edu',
      phone: '+91 91234 56789'
    },
    tags: ['Competitive Programming', 'DSA', 'Algorithms'],
    popular: true,
    upcomingDays: 6
  }
];

export const CULTURAL_EVENTS = [
  {
    id: 'cult-1',
    title: 'Aarohi 2026 - Inter-College Cultural Fest',
    tagline: 'Unleash The Creator Within.',
    category: 'Cultural Fest',
    type: 'cultural',
    organizingCollege: 'VNIT Nagpur',
    collegeId: 'vnit',
    date: '2026-11-12',
    time: '05:00 PM - 10:00 PM',
    venue: 'VNIT Open Air Theatre (OAT), Nagpur',
    venueAddress: 'South Ambazari Road, VNIT Campus, Nagpur, Maharashtra 440010',
    location: 'VNIT Campus, Nagpur',
    registrationFee: 199,
    isFree: false,
    teamSize: 'Individual / Group',
    registrationDeadline: '2026-11-08',
    eligibility: 'All College Students across Nagpur & Central India',
    seatsAvailable: 250,
    totalCapacity: 1000,
    status: 'open',
    banner: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    description: 'Central India\'s largest youth cultural festival featuring Celebrity Concert Night, Battle of the Bands, Group Dance Championship, and Fashion Parade across the illuminated VNIT OAT stadium.',
    expectations: [
      { title: 'Celebrity Night', desc: 'Live musical concert featuring top indie & Bollywood artists.' },
      { title: 'Group Dance Championship', desc: 'High-energy choreography battles on grand stage.' },
      { title: 'Battle of the Bands', desc: 'Live rock and fusion band competitions.' },
      { title: 'Art & Food Stalls', desc: '20+ student art displays and gourmet food pop-ups.' }
    ],
    schedule: [
      { time: '05:00 PM', title: 'Gates Open', desc: 'Security check-in & opening ceremony.' },
      { time: '06:00 PM', title: 'Fashion Show', desc: 'Sustainable couture & theme ramp walk.' },
      { time: '07:30 PM', title: 'Battle of the Bands', desc: 'Top 5 band finalists live.' },
      { time: '09:00 PM', title: 'Celebrity Concert', desc: 'Grand headline musical performance.' }
    ],
    rules: [
      'Valid college ID card mandatory at main OAT gate.',
      'Performers must submit audio tracks 24 hours prior to event.'
    ],
    prizes: ['Best Group Dance: ₹30,000', 'Battle of the Bands Winner: ₹25,000'],
    organizer: {
      name: 'Cultural Affairs Committee, VNIT Nagpur',
      description: 'Student body responsible for organizing Central India\'s largest college cultural festival.',
      contactPerson: 'Snehal Kulkarni',
      email: 'aarohi@vnit.ac.in',
      phone: '+91 98900 11223'
    },
    tags: ['Dance', 'Music', 'Fest', 'Fashion'],
    popular: true,
    upcomingDays: 18
  },
  {
    id: 'cult-2',
    title: 'Sur-Sangam Inter-College Singing Contest',
    tagline: 'Melodies That Touch The Soul.',
    category: 'Music',
    type: 'cultural',
    organizingCollege: 'RCOEM Nagpur',
    collegeId: 'rcoem',
    date: '2026-10-28',
    time: '04:00 PM - 08:30 PM',
    venue: 'Industrial Auditorium, RCOEM, Nagpur',
    venueAddress: 'Katol Road, Gittikhadan, Nagpur, Maharashtra 440013',
    location: 'RCOEM Campus, Nagpur',
    registrationFee: 149,
    isFree: false,
    teamSize: 'Solo / Duet',
    registrationDeadline: '2026-10-25',
    eligibility: 'Undergraduate & Postgraduate Students',
    seatsAvailable: 20,
    totalCapacity: 60,
    status: 'open',
    banner: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    description: 'Celebrate classical, semi-classical, Bollywood, and Western vocal music in Nagpur\'s premier student vocal championship with professional sound engineering.',
    expectations: [
      { title: 'Professional Acoustics', desc: 'Perform in a state-of-the-art auditorium with sound engineers.' },
      { title: 'Renowned Jury', desc: 'Evaluated by AIR classical singers and music composers.' }
    ],
    schedule: [
      { time: '04:00 PM', title: 'Solo Round 1', desc: 'Acoustic vocal performances.' },
      { time: '06:00 PM', title: 'Duet Showcase', desc: 'Harmonic duet vocals.' },
      { time: '07:30 PM', title: 'Final Round', desc: 'Top 6 finalists & award distribution.' }
    ],
    rules: [
      'Karaoke track or maximum 2 instrumental accompanists permitted.',
      'Performance duration limit: 4 minutes.'
    ],
    prizes: ['1st Prize (Solo): ₹12,000', '1st Prize (Duet): ₹15,000'],
    organizer: {
      name: 'Music Club, RCOEM',
      description: 'Vocal and instrumental student music society.',
      contactPerson: 'Varun Joshi',
      email: 'music@rcoem.ac.in',
      phone: '+91 97633 44556'
    },
    tags: ['Music', 'Singing', 'Vocal'],
    popular: false,
    upcomingDays: 12
  },
  {
    id: 'cult-3',
    title: 'Beat-Drop Street Dance & Crew Battle',
    tagline: 'Own The Stage. Drop The Beat.',
    category: 'Dance',
    type: 'cultural',
    organizingCollege: 'SIT Nagpur',
    collegeId: 'sit',
    date: '2026-10-10',
    time: '03:00 PM - 08:00 PM',
    venue: 'SIT Amphitheatre, Wathoda, Nagpur',
    venueAddress: 'Wathoda Layout, Near Ring Road, Nagpur, Maharashtra 440009',
    location: 'SIT Wathoda Layout, Nagpur',
    registrationFee: 250,
    isFree: false,
    teamSize: '3 - 12 Members',
    registrationDeadline: '2026-10-08',
    eligibility: 'College Dance Crews across Nagpur',
    seatsAvailable: 12,
    totalCapacity: 30,
    status: 'open',
    banner: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80',
    description: 'High energy 1v1 street battles and group crew performances in Hip-Hop, Popping, Breaking, Krump, and Contemporary dance styles.',
    expectations: [
      { title: '1v1 All-Style Battles', desc: 'Spontaneous improvisational cypher battles.' },
      { title: 'Crew Routines', desc: 'Synchronized team choreography on amphitheatre stage.' }
    ],
    schedule: [
      { time: '03:00 PM', title: 'Cypher Warmups', desc: 'Open floor practice.' },
      { time: '04:00 PM', title: 'Crew Routines', desc: 'Main team performances.' },
      { time: '06:30 PM', title: '1v1 Battles', desc: 'Knockout battles & DJ jams.' }
    ],
    rules: [
      'Crew performance duration: 4 to 7 minutes.',
      'Profanity in music or gestures strictly prohibited.'
    ],
    prizes: ['Champion Crew: ₹25,000', '1v1 Battle Winner: ₹8,000'],
    organizer: {
      name: 'Dance Society, SIT Nagpur',
      description: 'Hip-hop & street style dance collective.',
      contactPerson: 'Nisha Pillai',
      email: 'dance@sitnagpur.edu.in',
      phone: '+91 99112 23344'
    },
    tags: ['Dance', 'Hip-Hop', 'Street Battle'],
    popular: true,
    upcomingDays: 4
  },
  {
    id: 'cult-4',
    title: 'Rangmanch Inter-College Drama & Nukkad Natak Slam',
    tagline: 'Expressions That Spark Revolution.',
    category: 'Drama',
    type: 'cultural',
    organizingCollege: 'GHRCE Nagpur',
    collegeId: 'ghrce',
    date: '2026-10-20',
    time: '11:00 AM - 05:00 PM',
    venue: 'Open Air Amphitheatre, GHRCE Digdoh Hills, Nagpur',
    venueAddress: 'CRPF Gate No. 3, Hingna Road, Digdoh Hills, Nagpur, Maharashtra 440016',
    location: 'GHRCE Digdoh Hills, Nagpur',
    registrationFee: 0,
    isFree: true,
    teamSize: '5 - 15 Members',
    registrationDeadline: '2026-10-16',
    eligibility: 'All Theatre Societies & Student Groups across Nagpur',
    seatsAvailable: 85,
    totalCapacity: 300,
    status: 'open',
    banner: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
    description: 'Powerful street play (Nukkad Natak) and stage drama competition addressing contemporary social issues, environmental conservation, youth mental health, and civic awareness.',
    expectations: [
      { title: 'Social Message Impact', desc: 'Perform original street plays driving social awareness.' },
      { title: 'Dramatic Production', desc: 'Evaluated on voice modulation, script strength, and ensemble acting.' },
      { title: 'Live Audience Interaction', desc: 'High-energy outdoor amphitheatre crowd engagement.' }
    ],
    schedule: [
      { time: '11:00 AM', title: 'Stage Call & Setup', desc: 'Props check & performance order draw.' },
      { time: '12:00 PM', title: 'Street Play Round', desc: 'Outdoor Nukkad Natak performances.' },
      { time: '03:30 PM', title: 'Mono-Act Showcase', desc: 'Individual dramatic monologues.' },
      { time: '04:45 PM', title: 'Judges Evaluation', desc: 'Trophy ceremony & feedback session.' }
    ],
    rules: [
      'Street play performance duration limit: 12 to 15 minutes.',
      'Only acoustic instruments (dholak, manjira, gulal) permitted for street plays.',
      'Scripts must be original and approved prior to event day.'
    ],
    prizes: ['Best Street Play Team: ₹20,000', 'Best Stage Play: ₹15,000', 'Best Mono-Actor: ₹5,000'],
    organizer: {
      name: 'Rangmanch Theatre Club, GHRCE',
      description: 'Student dramatic society dedicated to street theatre & social commentary.',
      contactPerson: 'Saurabh Muley',
      email: 'rangmanch@ghrce.edu',
      phone: '+91 94221 88990'
    },
    tags: ['Drama', 'Nukkad Natak', 'Theatre'],
    popular: true,
    upcomingDays: 8
  },
  {
    id: 'cult-5',
    title: 'Canvas & Lens Fine Art & Photography Exhibition',
    tagline: 'Freeze Time. Color Reality.',
    category: 'Fine Arts',
    type: 'cultural',
    organizingCollege: 'PCE Nagpur',
    collegeId: 'pce',
    date: '2026-11-05',
    time: '10:00 AM - 06:00 PM',
    venue: 'Art Gallery & Central Lawn, PCE Campus, Nagpur',
    venueAddress: 'Hingna Road, Priyadarshini Campus, Nagpur, Maharashtra 440019',
    location: 'PCE Campus, Nagpur',
    registrationFee: 99,
    isFree: false,
    teamSize: 'Individual',
    registrationDeadline: '2026-11-02',
    eligibility: 'Student Artists & Photographers across Nagpur',
    seatsAvailable: 40,
    totalCapacity: 100,
    status: 'open',
    banner: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    description: 'Inter-college fine arts gallery and photojournalism showcase. Features live canvas painting, digital illustration, photo walks, and portraiture competitions.',
    expectations: [
      { title: 'Live Canvas Painting', desc: '2-hour themed painting challenge on easel canvas.' },
      { title: 'Photojournalism Walk', desc: 'Capture Nagpur campus culture in real-time photo walk.' },
      { title: 'Gallery Showcase', desc: 'Selected artwork displayed in 3-day public exhibition.' }
    ],
    schedule: [
      { time: '10:00 AM', title: 'Gallery Inauguration', desc: 'Exhibition opens to public visitors.' },
      { time: '11:30 AM', title: 'Live Painting Challenge', desc: 'Theme reveal & canvas painting start.' },
      { time: '02:30 PM', title: 'Photo Walk Critique', desc: 'Professional photographers evaluate submitted shots.' },
      { time: '05:30 PM', title: 'Award Presentation', desc: 'Exhibition awards & certificate distribution.' }
    ],
    rules: [
      'Art materials for live painting will be provided at venue.',
      'Photography entries must retain EXIF metadata for verification.'
    ],
    prizes: ['Best Canvas Artwork: ₹10,000', 'Best Photograph: ₹8,000', 'Digital Art Award: ₹5,000'],
    organizer: {
      name: 'Fine Arts Society, PCE Nagpur',
      description: 'Creative collective fostering visual arts and photography in Central India.',
      contactPerson: 'Megha Randive',
      email: 'finearts@pce.edu.in',
      phone: '+91 97644 33221'
    },
    tags: ['Art', 'Photography', 'Exhibition'],
    popular: false,
    upcomingDays: 15
  },
  {
    id: 'cult-6',
    title: 'Kavyanjali Open Mic & Poetry Slam',
    tagline: 'Words That Resonate.',
    category: 'Poetry',
    type: 'cultural',
    organizingCollege: 'GCOE Nagpur',
    collegeId: 'gcoe',
    date: '2026-10-14',
    time: '04:30 PM - 08:00 PM',
    venue: 'Student Activity Center, GCOE Campus, Mihan, Nagpur',
    venueAddress: 'Sector 27, Mihan, Nagpur, Maharashtra 441108',
    location: 'GCOE Mihan, Nagpur',
    registrationFee: 0,
    isFree: true,
    teamSize: 'Individual',
    registrationDeadline: '2026-10-12',
    eligibility: 'Student Poets, Storytellers & Standup Comedians',
    seatsAvailable: 35,
    totalCapacity: 120,
    status: 'open',
    banner: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    description: 'An intimate evening of spoken word poetry, Hindi/Marathi Shayari, storytelling, and acoustic open-mic performances celebrating Nagpur\'s rich literary heritage.',
    expectations: [
      { title: 'Spoken Word Stage', desc: 'Express your original poems, ghazals, and stories.' },
      { title: 'Acoustic Ambience', desc: 'Warm candle-lit indoor stage with acoustic guitar background.' },
      { title: 'Published Anthology', desc: 'Top 10 poems published in Campus Connect Annual Zine.' }
    ],
    schedule: [
      { time: '04:30 PM', title: 'Acoustic Prelude', desc: 'Guitar tunes & audience seating.' },
      { time: '05:00 PM', title: 'Poetry Slam Round 1', desc: 'Spoken word & Hindi/Marathi Shayari.' },
      { time: '06:45 PM', title: 'Storytelling & Comedy', desc: 'Short narrative & open-mic segment.' },
      { time: '07:45 PM', title: 'Closing & Zine Reveal', desc: 'Top poet awards & zine compilation.' }
    ],
    rules: [
      'Original content only in English, Hindi, or Marathi.',
      'Performance duration strictly capped at 3 minutes per poet.'
    ],
    prizes: ['Poet of the Night: ₹7,000', 'Best Storyteller: ₹5,000', 'Zine Publication'],
    organizer: {
      name: 'Literary & Debating Society, GCOE',
      description: 'Student literary club promoting creative writing, public speaking, and poetry.',
      contactPerson: 'Pranav Taksande',
      email: 'literary@gcoen.ac.in',
      phone: '+91 93700 55443'
    },
    tags: ['Poetry', 'Open Mic', 'Storytelling'],
    popular: false,
    upcomingDays: 5
  }
];

export const TECHNICAL_CLUBS = [
  {
    id: 'tclub-1',
    name: 'VNIT AI & Robotics Society',
    type: 'technical',
    category: 'Technical',
    subcategory: 'AI & Robotics',
    college: 'VNIT Nagpur',
    collegeId: 'vnit',
    logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=300&q=80',
    banner: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    membersCount: 342,
    establishedYear: 2022,
    shortDescription: 'Pioneering artificial intelligence research, autonomous drones, and humanoid robotics in Central India.',
    description: 'The VNIT AI & Robotics Society is a student-driven tech organization dedicated to hands-on learning in Machine Learning, Computer Vision, ROS (Robot Operating System), and Mechatronics. Members work on real-world industry projects, compete in national robotics challenges, and host workshops for tech enthusiasts across Nagpur.',
    activities: [
      { title: 'Workshops & Bootcamps', desc: 'Hands-on PyTorch, OpenCV & ROS 2 technical training sessions.', icon: 'Cpu' },
      { title: 'Autonomous Projects', desc: 'Building campus delivery bots, aerial mapping drones, and AI vision models.', icon: 'Bot' },
      { title: 'RoboWars & Hackathons', desc: 'Organizing inter-college combat bot battles and AI model showdowns.', icon: 'Zap' },
      { title: 'Research & Mentorship', desc: 'Paper reading circles, ML mentorship, and conference submissions.', icon: 'BookOpen' }
    ],
    stats: { members: 342, eventsHosted: 18, activeSince: '2022', college: 'VNIT Nagpur' },
    team: [
      { name: 'Aditya Deshmukh', role: 'President', year: '4th Year CSE', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdityaDeshmukh' },
      { name: 'Ananya Sharma', role: 'Vice President', year: '3rd Year ECE', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnanyaSharma' },
      { name: 'Siddharth Rao', role: 'Technical Lead', year: '3rd Year Mech', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SiddharthRao' },
      { name: 'Dr. A. V. Kulkarni', role: 'Faculty Advisor', year: 'Professor, CSE', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DrKulkarni' }
    ],
    upcomingEventIds: ['tech-1', 'tech-2'],
    pastEvents: [
      { title: 'AI Model Optimization Summit 2025', date: '15 Nov 2025', venue: 'VNIT Campus' },
      { title: 'BotWars 2025 Winter Arena', date: '20 Dec 2025', venue: 'Sports Complex, VNIT' }
    ]
  },
  {
    id: 'tclub-2',
    name: 'RCOEM CodeCraft Developers',
    type: 'technical',
    category: 'Technical',
    subcategory: 'Coding & Web',
    college: 'RCOEM Nagpur',
    collegeId: 'rcoem',
    logo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=300&q=80',
    banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    membersCount: 290,
    establishedYear: 2021,
    shortDescription: 'Full-stack web development, open-source software, and competitive programming hub.',
    description: 'CodeCraft is RCOEM\'s premier software development society. We empower student coders to build production-grade web applications, contribute to global open-source projects, and master data structures and algorithms.',
    activities: [
      { title: 'Full-Stack Sprints', desc: 'Building React, Next.js & Node.js web apps in team sprints.', icon: 'Code' },
      { title: 'DSA Practice Nights', desc: 'Weekly competitive programming problem solving on CodeChef & LeetCode.', icon: 'Terminal' },
      { title: 'Hack-a-Fest', desc: '24-hour inter-college hackathons with industry tech leads.', icon: 'Laptop' }
    ],
    stats: { members: 290, eventsHosted: 14, activeSince: '2021', college: 'RCOEM Nagpur' },
    team: [
      { name: 'Rohan Agrawal', role: 'President', year: '4th Year IT', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RohanAgrawal' },
      { name: 'Neha Verma', role: 'Vice President', year: '3rd Year CSE', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NehaVerma' },
      { name: 'Prof. S. R. Tate', role: 'Faculty Coordinator', year: 'Assistant Professor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProfTate' }
    ],
    upcomingEventIds: ['tech-5'],
    pastEvents: [
      { title: 'Web3 & React Bootcamp 2025', date: '10 Dec 2025', venue: 'RCOEM Computer Lab' }
    ]
  },
  {
    id: 'tclub-3',
    name: 'IIITN CyberShield Alliance',
    type: 'technical',
    category: 'Technical',
    subcategory: 'Cybersecurity',
    college: 'IIIT Nagpur',
    collegeId: 'iiitn',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=300&q=80',
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    membersCount: 215,
    establishedYear: 2023,
    shortDescription: 'Ethical hacking, CTF challenges, network security, and cryptography research.',
    description: 'CyberShield Alliance is IIIT Nagpur\'s cybersecurity initiative focusing on offensive and defensive security techniques. Members practice CTF challenges, learn web application penetration testing, and explore binary exploitation.',
    activities: [
      { title: 'CTF Competitions', desc: 'Jeopardy and Attack-Defense CTF tournaments.', icon: 'Shield' },
      { title: 'Penetration Testing', desc: 'Ethical hacking & web vulnerability discovery labs.', icon: 'Lock' }
    ],
    stats: { members: 215, eventsHosted: 11, activeSince: '2023', college: 'IIIT Nagpur' },
    team: [
      { name: 'Priya Joshi', role: 'President', year: '3rd Year CSD', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaJoshi' },
      { name: 'Dr. Harshita Sharma', role: 'Faculty Lead', year: 'Assoc. Professor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HarshitaSharma' }
    ],
    upcomingEventIds: ['tech-4'],
    pastEvents: [
      { title: 'Beginner CTF Workshop', date: '05 Jan 2026', venue: 'IIITN Campus' }
    ]
  }
];

export const CULTURAL_CLUBS = [
  {
    id: 'cclub-1',
    name: 'Rhythms Dance Society',
    type: 'cultural',
    category: 'Cultural',
    subcategory: 'Dance',
    college: 'YCCE Nagpur',
    collegeId: 'ycce',
    logo: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=300&q=80',
    banner: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80',
    membersCount: 180,
    establishedYear: 2020,
    shortDescription: 'Versatile dance crew mastering Western, Classical, Folk, and Hip-Hop choreography.',
    description: 'Rhythms Dance Society is the premier dance collective at YCCE. Representing the institution at major inter-college fests across Maharashtra, Rhythms offers intensive choreography workshops, flash mobs, and street battle training.',
    activities: [
      { title: 'Dance Bootcamps', desc: 'Hip-hop, contemporary & Bollywood choreography workshops.', icon: 'Sparkles' },
      { title: 'Fest Showcases', desc: 'Headline dance routines for annual cultural festivals.', icon: 'Award' },
      { title: 'Cypher Battles', desc: '1v1 all-styles street dance battles and jam sessions.', icon: 'Flame' }
    ],
    stats: { members: 180, eventsHosted: 16, activeSince: '2020', college: 'YCCE Nagpur' },
    team: [
      { name: 'Tanvi Deshpande', role: 'President', year: '4th Year Mechanical', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TanviDeshpande' },
      { name: 'Rahul Nair', role: 'Choreography Lead', year: '3rd Year Civil', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RahulNair' }
    ],
    upcomingEventIds: ['cult-1'],
    pastEvents: [
      { title: 'Street Dance Cypher 2025', date: '22 Dec 2025', venue: 'YCCE Amphitheatre' }
    ]
  },
  {
    id: 'cclub-2',
    name: 'Symphonics Music Club',
    type: 'cultural',
    category: 'Cultural',
    subcategory: 'Music',
    college: 'VNIT Nagpur',
    collegeId: 'vnit',
    logo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80',
    banner: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    membersCount: 220,
    establishedYear: 2019,
    shortDescription: 'Vocalists, instrumentalists, and band collectives celebrating rock, classical, and fusion music.',
    description: 'Symphonics brings together VNIT\'s passionate musicians. From acoustic jam sessions under campus trees to grand Battle of the Bands performances, Symphonics nurtures musical talent across genres.',
    activities: [
      { title: 'Jam Nights', desc: 'Weekly acoustic jams & open-mic sessions.', icon: 'Music' },
      { title: 'Band Competitions', desc: 'Inter-college rock band battles & fusion showcases.', icon: 'Radio' }
    ],
    stats: { members: 220, eventsHosted: 21, activeSince: '2019', college: 'VNIT Nagpur' },
    team: [
      { name: 'Kushal Patel', role: 'President', year: '4th Year Electrical', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KushalPatel' }
    ],
    upcomingEventIds: ['cult-2'],
    pastEvents: [
      { title: 'Unplugged Night 2025', date: '18 Nov 2025', venue: 'VNIT OAT' }
    ]
  },
  {
    id: 'cclub-3',
    name: 'Natraj Drama & Theatre Society',
    type: 'cultural',
    category: 'Cultural',
    subcategory: 'Drama & Theatre',
    college: 'RCOEM Nagpur',
    collegeId: 'rcoem',
    logo: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=300&q=80',
    banner: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1200&q=80',
    membersCount: 140,
    establishedYear: 2021,
    shortDescription: 'Street plays (Nukkad Natak), stage dramas, scriptwriting, and mime performances.',
    description: 'Natraj is RCOEM\'s theatrical society creating impact through street plays (Nukkad Natak), stage dramas, and mono-acting. The club highlights social causes and artistic storytelling.',
    activities: [
      { title: 'Nukkad Natak', desc: 'Street play performances spreading social awareness.', icon: 'Users' },
      { title: 'Stage Production', desc: 'Full-length annual stage plays and scriptwriting.', icon: 'Film' }
    ],
    stats: { members: 140, eventsHosted: 12, activeSince: '2021', college: 'RCOEM Nagpur' },
    team: [
      { name: 'Manish Tiwari', role: 'President', year: '3rd Year ENTC', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ManishTiwari' }
    ],
    upcomingEventIds: ['cult-3'],
    pastEvents: [
      { title: 'Inter-College Nukkad Meet', date: '04 Dec 2025', venue: 'RCOEM Grounds' }
    ]
  }
];

export const OTHER_CLUBS = [
  {
    id: 'oclub-1',
    name: 'Aperture Photography Club',
    type: 'other',
    category: 'Other',
    subcategory: 'Photography & Film',
    college: 'SIT Nagpur',
    collegeId: 'sit',
    logo: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=300&q=80',
    banner: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    membersCount: 195,
    establishedYear: 2022,
    shortDescription: 'Visual storytelling, DSLR & mobile photography, photo walks, and short film production.',
    description: 'Aperture captures the vibrant campus life of SIT Nagpur. From cityscape photo walks in Nagpur to event coverage and filmmaking workshops, Aperture helps students sharpen their visual lens.',
    activities: [
      { title: 'Photo Walks', desc: 'Guided photography walks across Nagpur landmarks.', icon: 'Camera' },
      { title: 'Short Film Contests', desc: 'Filmmaking challenges and video editing workshops.', icon: 'Video' }
    ],
    stats: { members: 195, eventsHosted: 15, activeSince: '2022', college: 'SIT Nagpur' },
    team: [
      { name: 'Riya Kulkarni', role: 'President', year: '3rd Year Tech', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RiyaKulkarni' }
    ],
    upcomingEventIds: [],
    pastEvents: [
      { title: 'Nagpur Heritage Photo Walk', date: '12 Jan 2026', venue: 'Futala Lake, Nagpur' }
    ]
  },
  {
    id: 'oclub-2',
    name: 'E-Cell Entrepreneurship Hub',
    type: 'other',
    category: 'Other',
    subcategory: 'Entrepreneurship',
    college: 'GHRCE Nagpur',
    collegeId: 'ghrce',
    logo: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=300&q=80',
    banner: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    membersCount: 310,
    establishedYear: 2020,
    shortDescription: 'Fostering student startups, pitch competitions, angel investor meets, and innovation labs.',
    description: 'E-Cell GHRCE fuels the spirit of entrepreneurship among students. We connect student founders with incubators, conduct pitch competitions, and host founder talks.',
    activities: [
      { title: 'Startup Pitching', desc: 'Pitch competitions with real seed funding opportunities.', icon: 'Briefcase' },
      { title: 'Founder Keynotes', desc: 'Interactive sessions with successful alumni entrepreneurs.', icon: 'TrendingUp' }
    ],
    stats: { members: 310, eventsHosted: 22, activeSince: '2020', college: 'GHRCE Nagpur' },
    team: [
      { name: 'Varun Saxena', role: 'President', year: '4th Year Management', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VarunSaxena' }
    ],
    upcomingEventIds: [],
    pastEvents: [
      { title: 'E-Summit Nagpur 2025', date: '08 Nov 2025', venue: 'GHRCE Auditorium' }
    ]
  }
];

export const COMMUNITIES = [
  {
    id: 'comm-1',
    name: 'Nagpur AI & Machine Learning Community',
    category: 'Technology',
    subcategory: 'AI & ML',
    college: 'VNIT Nagpur',
    collegeId: 'vnit',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    membersCount: 1250,
    activeMembers: 340,
    postCount: 48,
    eventCount: 12,
    activityStatus: 'High Activity',
    shortDescription: 'Inter-college network of 1,200+ Nagpur students learning, sharing papers, and building AI models together.',
    description: 'The Nagpur AI & ML Community connects tech enthusiasts across VNIT, RCOEM, IIITN, YCCE, and other colleges in Nagpur. We host paper reading sessions, Kaggle competitions, open-source model sprints, and AI ethics discussions.',
    interests: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'PyTorch', 'LLMs', 'Open Source'],
    popularPosts: [
      {
        id: 'post-101',
        author: 'Aditya Deshmukh',
        college: 'VNIT Nagpur',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdityaDeshmukh',
        timestamp: '2 hours ago',
        title: 'Anyone forming a team for the HackNova AI Track?',
        content: 'We are building a Retrieval-Augmented Generation (RAG) assistant for medical documentation. Looking for 1 frontend developer (React) and 1 PyTorch dev. Hit reply if interested!',
        likes: 24,
        userLiked: false,
        repliesCount: 3,
        replies: [
          { author: 'Ananya Sharma', college: 'RCOEM Nagpur', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnanyaSharma', timestamp: '1 hour ago', content: 'Hey Aditya! I work with React & Tailwind. Would love to join!' },
          { author: 'Rohan Patil', college: 'YCCE Nagpur', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RohanPatil', timestamp: '30 mins ago', content: 'I have experience with LangChain & FAISS vector db. Count me in!' }
        ]
      },
      {
        id: 'post-102',
        author: 'Priya Sharma',
        college: 'IIIT Nagpur',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaSharma',
        timestamp: '1 day ago',
        title: 'Best open-source LLM quantization for local laptop deployment?',
        content: 'I am running experiments on Llama-3 8B quantized with GGUF vs AWQ. Ollama seems super fast for local prototyping. What quantization methods are you using for student projects?',
        likes: 18,
        userLiked: true,
        repliesCount: 2,
        replies: [
          { author: 'Kanak Ramteke', college: 'VNIT Nagpur', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kanak', timestamp: '18 hours ago', content: 'Q4_K_M GGUF via llama.cpp gives great balance between VRAM usage and perplexity for 8B models!' }
        ]
      }
    ]
  },
  {
    id: 'comm-2',
    name: 'Nagpur Full-Stack Developers Hub',
    category: 'Coding',
    subcategory: 'Web & Mobile',
    college: 'RCOEM Nagpur',
    collegeId: 'rcoem',
    logo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    membersCount: 890,
    activeMembers: 210,
    postCount: 36,
    eventCount: 8,
    activityStatus: 'Very Active',
    shortDescription: 'Hub for Web, Mobile, and Cloud developers building production-ready apps across Nagpur campuses.',
    description: 'Dedicated to modern software engineering, web frameworks (React, Next.js, Node.js), mobile development (Flutter, React Native), and cloud architectures (GCP, AWS). Members share code snippets, perform PR reviews, and collaborate on open-source tools.',
    interests: ['Web Development', 'React', 'Node.js', 'TypeScript', 'Flutter', 'Cloud Computing'],
    popularPosts: [
      {
        id: 'post-201',
        author: 'Kanak Ramteke',
        college: 'VNIT Nagpur',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kanak',
        timestamp: '3 hours ago',
        title: 'Best architecture for zero-reload SPA routing in modern Vite React apps?',
        content: 'When building multi-phase student apps, combining contextual state routing with React Router URL syncing ensures both fast UI switches and deep-linking support. Here is a clean pattern we implemented in Campus Connect!',
        likes: 31,
        userLiked: true,
        repliesCount: 2,
        replies: [
          { author: 'Siddharth Rao', college: 'RCOEM Nagpur', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed-[#374375]', timestamp: '2 hours ago', content: 'Super helpful pattern! Contextual fallback state keeps UX lightning fast.' }
        ]
      }
    ]
  },
  {
    id: 'comm-3',
    name: 'Nagpur CyberSec Circle',
    category: 'Technology',
    subcategory: 'Cybersecurity',
    college: 'IIIT Nagpur',
    collegeId: 'iiitn',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    membersCount: 450,
    activeMembers: 120,
    postCount: 22,
    eventCount: 6,
    activityStatus: 'Active',
    shortDescription: 'Alliance of ethical hackers, CTF players, and network defense enthusiasts across Nagpur.',
    description: 'CyberSec Circle brings together students interested in ethical hacking, CTF challenges, web penetration testing, reverse engineering, and cryptography. We host weekend wargames and writeups.',
    interests: ['Cybersecurity', 'Ethical Hacking', 'CTF Challenges', 'Cryptography', 'Network Defense'],
    popularPosts: [
      {
        id: 'post-301',
        author: 'Rohan Patil',
        college: 'IIIT Nagpur',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RohanPatil',
        timestamp: '1 day ago',
        title: 'PicoCTF 2026 practice session this Saturday!',
        content: 'We will be solving Web Exploitation & Reverse Engineering challenges together on Discord. Beginners welcome!',
        likes: 19,
        userLiked: false,
        repliesCount: 1,
        replies: []
      }
    ]
  },
  {
    id: 'comm-4',
    name: 'Nagpur Founders & Innovators Network',
    category: 'Entrepreneurship',
    subcategory: 'Startups',
    college: 'GHRCE Nagpur',
    collegeId: 'ghrce',
    logo: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    membersCount: 670,
    activeMembers: 180,
    postCount: 29,
    eventCount: 9,
    activityStatus: 'Very Active',
    shortDescription: 'Inter-college startup network connecting student founders with mentors, incubators, and investors.',
    description: 'Fostering student entrepreneurship across Nagpur colleges. Connect with co-founders, validate business ideas, pitch to incubators, and get guidance on grants and seed funding.',
    interests: ['Startups', 'Pitching', 'Venture Capital', 'Product Design', 'Business Strategy'],
    popularPosts: [
      {
        id: 'post-401',
        author: 'Varun Saxena',
        college: 'GHRCE Nagpur',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VarunSaxena',
        timestamp: '5 hours ago',
        title: 'Looking for a technical co-founder for an AI EdTech startup in Nagpur',
        content: 'We have validated our MVP with 500+ college students and secured incubator mentorship. Need a full-stack lead. DM for details!',
        likes: 27,
        userLiked: false,
        repliesCount: 4,
        replies: []
      }
    ]
  },
  {
    id: 'comm-5',
    name: 'Nagpur Student Photographers & Designers',
    category: 'Design',
    subcategory: 'Visual Arts',
    college: 'SIT Nagpur',
    collegeId: 'sit',
    logo: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80',
    membersCount: 520,
    activeMembers: 140,
    postCount: 41,
    eventCount: 11,
    activityStatus: 'High Activity',
    shortDescription: 'Creative collective of UI/UX designers, visual artists, and photographers in Nagpur.',
    description: 'Share your photography portfolios, Figma UI designs, digital art, and short films. We organize monthly photowalks around Futala Lake, Sitabuldi Fort, and Deekshabhoomi.',
    interests: ['UI/UX Design', 'Photography', 'Figma', 'Visual Arts', 'Filmmaking'],
    popularPosts: [
      {
        id: 'post-501',
        author: 'Riya Kulkarni',
        college: 'SIT Nagpur',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RiyaKulkarni',
        timestamp: '1 day ago',
        title: 'Futala Lake Sunset Photo Walk this Sunday 5 PM!',
        content: 'Bring your DSLR, mirrorless, or smartphone camera! Great lighting, free composition tips, and coffee afterwards.',
        likes: 42,
        userLiked: true,
        repliesCount: 5,
        replies: []
      }
    ]
  },
  {
    id: 'comm-6',
    name: 'Nagpur Campus Music & Jamming Hub',
    category: 'Music',
    subcategory: 'Arts & Music',
    college: 'VNIT Nagpur',
    collegeId: 'vnit',
    logo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    membersCount: 780,
    activeMembers: 190,
    postCount: 32,
    eventCount: 14,
    activityStatus: 'Very Active',
    shortDescription: 'Musical network of vocalists, guitarists, drummers, and sound producers collaborating across campuses.',
    description: 'From acoustic jams under campus trees to rock band collaborations, this community connects student musicians, songwriters, and audio engineers across Nagpur.',
    interests: ['Music Production', 'Live Jamming', 'Vocals', 'Acoustic', 'Rock Bands'],
    popularPosts: [
      {
        id: 'post-601',
        author: 'Kushal Patel',
        college: 'VNIT Nagpur',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KushalPatel',
        timestamp: '2 days ago',
        title: 'Looking for a bassist for an upcoming Rock Band Battle',
        content: 'We play alternative rock & Hindi fusion. Practice sessions held twice a week at VNIT OAT.',
        likes: 22,
        userLiked: false,
        repliesCount: 2,
        replies: []
      }
    ]
  },
  {
    id: 'comm-7',
    name: 'Nagpur Collegiate Esports & Gaming',
    category: 'Gaming',
    subcategory: 'Esports',
    college: 'YCCE Nagpur',
    collegeId: 'ycce',
    logo: '🎮',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    membersCount: 940,
    activeMembers: 310,
    postCount: 54,
    eventCount: 15,
    activityStatus: 'High Activity',
    shortDescription: 'Inter-college esports arena for competitive Valorant, BGMI, Rocket League, and FIFA players.',
    description: 'Connect with fellow gamers, find scrimmage partners, join inter-college tournaments, and discuss game strategy and esports news.',
    interests: ['Esports', 'Valorant', 'Competitive Gaming', 'Game Development', 'Streaming'],
    popularPosts: [
      {
        id: 'post-701',
        author: 'Tanvi Deshpande',
        college: 'YCCE Nagpur',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TanviDeshpande',
        timestamp: '4 hours ago',
        title: '5v5 Valorant Inter-College Showdown - Registrations open!',
        content: 'Custom lobby tournament this weekend with live stream commentary on YouTube.',
        likes: 38,
        userLiked: true,
        repliesCount: 6,
        replies: []
      }
    ]
  },
  {
    id: 'comm-8',
    name: 'Nagpur Student Adventurers & Trekkers',
    category: 'Sports',
    subcategory: 'Outdoor & Fitness',
    college: 'Pallotti Nagpur',
    collegeId: 'pallotti',
    logo: '🏔️',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    membersCount: 360,
    activeMembers: 95,
    postCount: 19,
    eventCount: 7,
    activityStatus: 'Active',
    shortDescription: 'Outdoor enthusiast community organizing weekend treks, camping, and nature walks around Vidarbha.',
    description: 'Explore the natural beauty of Vidarbha! We organize group treks to Ramtek Fort, Pench, Nagzira, and Chikhaldara during weekends.',
    interests: ['Trekking', 'Camping', 'Nature Walks', 'Adventure Sports', 'Fitness'],
    popularPosts: [
      {
        id: 'post-801',
        author: 'Nisha Pillai',
        college: 'Pallotti Nagpur',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NishaPillai',
        timestamp: '3 days ago',
        title: 'Ramtek Fort Monsoon Sunrise Trek - Next Sunday!',
        content: 'Shared bus transport from Variety Square, Nagpur. Carry water bottle and raincoat!',
        likes: 29,
        userLiked: false,
        repliesCount: 3,
        replies: []
      }
    ]
  },
  {
    id: 'comm-9',
    name: 'Nagpur GATE & Higher Studies Prep',
    category: 'Academic',
    subcategory: 'Career & Exams',
    college: 'GCOE Nagpur',
    collegeId: 'gcoe',
    logo: '📚',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    membersCount: 610,
    activeMembers: 150,
    postCount: 28,
    eventCount: 5,
    activityStatus: 'Active',
    shortDescription: 'Peer study group sharing notes, mock tests, and strategies for GATE, CAT, and GRE aspirants.',
    description: 'A focused study community for engineering students preparing for GATE (CS/EC/ME/EE), CAT, GRE, and PSU recruitment exams.',
    interests: ['GATE Prep', 'Higher Studies', 'Engineering Mathematics', 'Mock Tests', 'Career Guidance'],
    popularPosts: [
      {
        id: 'post-901',
        author: 'Manish Tiwari',
        college: 'GCOE Nagpur',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ManishTiwari',
        timestamp: '1 day ago',
        title: 'Free GATE CS Algorithm & Operating Systems notes PDF shared!',
        content: 'Handwritten notes covering memory management, process scheduling, and dynamic programming.',
        likes: 54,
        userLiked: true,
        repliesCount: 8,
        replies: []
      }
    ]
  },
  {
    id: 'comm-10',
    name: 'Nagpur Literature & Debating Forum',
    category: 'Literature',
    subcategory: 'Debate & Writing',
    college: 'S.B. Jain Institute',
    collegeId: 'sbjain',
    logo: '📖',
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    membersCount: 280,
    activeMembers: 80,
    postCount: 16,
    eventCount: 4,
    activityStatus: 'Active',
    shortDescription: 'Book clubs, parliamentary debate practice, creative writing, and poetry slams.',
    description: 'For students who love words! We host weekly book exchanges, parliamentary debating practice, essay writing challenges, and open-mic poetry sessions.',
    interests: ['Debating', 'Creative Writing', 'Book Club', 'Poetry', 'Public Speaking'],
    popularPosts: [
      {
        id: 'post-1001',
        author: 'Tanvi Deshpande',
        college: 'S.B. Jain Institute',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TanviDeshpande',
        timestamp: '4 days ago',
        title: 'Monthly Book Recommendation: What are you reading this September?',
        content: 'Share your top sci-fi or tech non-fiction picks in the replies below!',
        likes: 16,
        userLiked: false,
        repliesCount: 4,
        replies: []
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-101',
    userId: 'student01',
    type: 'event_reminder',
    category: 'events',
    title: 'Event Starting Tomorrow',
    message: 'TechNova Hackathon 2026 starts tomorrow at 10:00 AM at VNIT Auditorium. Prepare your laptops!',
    relatedEntityType: 'event',
    relatedEntityId: 'tech-1',
    actionRoute: 'events',
    actionParams: { eventId: 'tech-1' },
    actionLabel: 'View Event',
    isRead: false,
    createdAt: '2026-09-14T09:15:00.000Z',
    timestamp: '1 hour ago'
  },
  {
    id: 'notif-102',
    userId: 'student01',
    type: 'payment_success',
    category: 'payments',
    title: 'Payment Successful',
    message: 'Your payment of ₹299 for TechNova Hackathon 2026 was confirmed via UPI (TXN-9948210398).',
    relatedEntityType: 'event',
    relatedEntityId: 'tech-1',
    actionRoute: 'my-events',
    actionLabel: 'View Pass',
    isRead: false,
    createdAt: '2026-09-14T08:30:00.000Z',
    timestamp: '2 hours ago'
  },
  {
    id: 'notif-103',
    userId: 'student01',
    type: 'community_comment',
    category: 'communities',
    title: 'New Reply on Your Post',
    message: 'Ananya Sharma (RCOEM) replied: "Hey Kanak! Would love to join your HackNova team!"',
    relatedEntityType: 'community',
    relatedEntityId: 'comm-1',
    actionRoute: 'community-details',
    actionParams: { communityId: 'comm-1' },
    actionLabel: 'View Discussion',
    isRead: false,
    createdAt: '2026-09-14T07:45:00.000Z',
    timestamp: '3 hours ago'
  },
  {
    id: 'notif-104',
    userId: 'student01',
    type: 'club_announcement',
    category: 'clubs',
    title: 'New Club Event Announced',
    message: 'VNIT AI & Robotics Society announced "Autonomous Drones Workshop" scheduled for Sept 22.',
    relatedEntityType: 'club',
    relatedEntityId: 'tclub-1',
    actionRoute: 'club-details',
    actionParams: { clubId: 'tclub-1' },
    actionLabel: 'View Club',
    isRead: false,
    createdAt: '2026-09-13T16:20:00.000Z',
    timestamp: 'Yesterday'
  },
  {
    id: 'notif-105',
    userId: 'student01',
    type: 'event_registration',
    category: 'events',
    title: 'Registration Confirmed',
    message: 'You successfully registered for Natraj Inter-College Drama Fest at RCOEM Campus.',
    relatedEntityType: 'event',
    relatedEntityId: 'cult-1',
    actionRoute: 'events',
    actionParams: { eventId: 'cult-1' },
    actionLabel: 'View Event',
    isRead: true,
    createdAt: '2026-09-12T14:10:00.000Z',
    timestamp: '2 days ago'
  },
  {
    id: 'notif-106',
    userId: 'student01',
    type: 'club_joined',
    category: 'clubs',
    title: 'Welcome to Rhythms Dance Society',
    message: 'Your membership in Rhythms Dance Society (YCCE) is confirmed. Check out weekly practice sessions!',
    relatedEntityType: 'club',
    relatedEntityId: 'cclub-2',
    actionRoute: 'club-details',
    actionParams: { clubId: 'cclub-2' },
    actionLabel: 'Explore Club',
    isRead: true,
    createdAt: '2026-09-11T11:00:00.000Z',
    timestamp: '3 days ago'
  },
  {
    id: 'notif-107',
    userId: 'student01',
    type: 'community_joined',
    category: 'communities',
    title: 'Welcome to Nagpur Full-Stack Developers Hub',
    message: 'You have joined 890+ developers sharing React, Flutter, and Cloud projects.',
    relatedEntityType: 'community',
    relatedEntityId: 'comm-2',
    actionRoute: 'community-details',
    actionParams: { communityId: 'comm-2' },
    actionLabel: 'View Community',
    isRead: true,
    createdAt: '2026-09-10T15:30:00.000Z',
    timestamp: '4 days ago'
  },
  {
    id: 'notif-108',
    userId: 'student01',
    type: 'system',
    category: 'system',
    title: 'Welcome to Campus Connect Nagpur',
    message: 'Explore technical hackathons, cultural fests, clubs, and communities across 10+ Nagpur colleges.',
    relatedEntityType: 'system',
    relatedEntityId: null,
    actionRoute: 'dashboard',
    actionLabel: 'Explore Dashboard',
    isRead: true,
    createdAt: '2026-09-08T09:00:00.000Z',
    timestamp: '6 days ago'
  }
]
