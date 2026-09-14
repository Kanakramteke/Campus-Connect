# CampusConnect 🎓

CampusConnect is a full-stack student platform connecting college campuses across Nagpur (VNIT Nagpur, RCOEM, YCCE, GHRIET, IIIT Nagpur). It enables students to discover technical hackathons, cultural fests, campus clubs, and inter-college communities.

---

## 📁 Project Structure

```
Project/
├── backend/                  # Node.js + Express.js REST API Service
│   ├── prisma/               # Prisma Schema & Database Seeder (dev.db / PostgreSQL)
│   ├── src/
│   │   ├── config/           # Database & Environment Configuration
│   │   ├── controllers/      # Express API Controllers
│   │   ├── middleware/       # Auth (JWT), Role Authorization, Multer Uploads & Error Handler
│   │   ├── routes/           # REST Route Definitions (/api/auth, /api/users, /api/events, etc.)
│   │   ├── services/         # Prisma Database Operations & Business Logic
│   │   ├── validators/       # Zod Validation Schemas
│   │   ├── utils/            # API Response Helpers
│   │   ├── app.js            # Express Application Setup
│   │   └── server.js         # HTTP Server Listener (Port 5000)
│   ├── uploads/              # Local Image Media Storage
│   ├── tests/                # Jest + Supertest Integration Tests
│   ├── .env                  # Environment Variables
│   └── package.json          # Node Dependencies & Scripts
│
├── frontend/                 # React 18 + Vite UI
│   ├── src/                  # Source Code
│   │   ├── api/              # Centralized API Client Layer
│   │   ├── components/       # Reusable Component Architecture
│   │   ├── context/          # CampusContext State Management
│   │   ├── pages/            # Page Views (Dashboard, Events, Clubs, Communities, Notifications, Profile, Settings, Creator)
│   │   ├── App.jsx           # Main Router & Application Shell
│   │   └── main.jsx          # React DOM Mount Entry Point
│   ├── index.html            # HTML Shell
│   └── package.json          # Frontend Dependencies
```

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Lucide Icons, Framer Motion, Vanilla CSS / Tailwind
- **Backend**: Node.js, Express.js
- **Database & ORM**: PostgreSQL / SQLite, Prisma ORM
- **Authentication & Security**: JWT (JSON Web Tokens), bcryptjs, Helmet, CORS, dotenv
- **Validation**: Zod
- **File Uploads**: Multer
- **Testing**: Jest, Supertest

---

## 🚀 Quick Start Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (v9 or higher)

---

### 1. Backend Setup & Startup (Node.js + Express + Prisma)

1. **Navigate to Backend Directory**:
   ```bash
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Initialize Prisma Database & Seed Nagpur Campus Data**:
   ```bash
   npx prisma generate
   npx prisma db push
   node prisma/seed.js
   ```

4. **Start Backend REST API Server (Port 5000)**:
   ```bash
   npm run dev
   ```

5. **Run Backend Test Suite**:
   ```bash
   npm test
   ```

---

### 2. Frontend Setup & Startup (React + Vite)

1. **Navigate to Frontend Directory**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server (Port 5173)**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Default Demo Accounts

| Role | Email | Password |
| :--- | :--- | :--- |
| **Student** | `kanak.ramteke@vnit.ac.in` | `password123` |
| **Event Organizer** | `aarav.sharma@vnit.ac.in` | `password123` |
| **Club Head** | `ananya.d@rcoem.in` | `password123` |
| **Community Admin** | `rohan.v@iiitn.ac.in` | `password123` |

---

## 🌟 Key Application Features

- **Authentication & Persistence**: Secure registration and login with bcrypt hashing, JWT tokens, and instant profile hydration.
- **Role-Based Creator System**: Creator workflow for Organizers, Club Heads, and Community Admins with Draft, Preview, and Publishing capability.
- **Events Engine**: Technical & Cultural event discovery, registration, sandbox payment, registration passes, and bookmarks.
- **Campus Clubs & Communities**: Inter-college student organizations with persistent memberships and active discussion feeds.
- **Notifications Hub**: System, event, registration, and membership activity notifications with unread state tracking.
