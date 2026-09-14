# Campus Connect Backend API

Production-ready REST API for Campus Connect built with Node.js, Express.js, PostgreSQL/SQLite, Prisma ORM, JWT Authentication, Zod validation, and Multer file uploads.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL / SQLite (via Prisma)
- **ORM**: Prisma Client v5
- **Authentication**: JWT (JSON Web Tokens) & bcryptjs
- **Validation**: Zod
- **File Uploads**: Multer
- **Security**: Helmet, CORS, dotenv
- **Testing**: Jest + Supertest

---

## Directory Structure

```
backend/
├── src/
│   ├── config/          # Prisma DB & Environment configs
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth, Role, Upload & Error handling
│   ├── routes/          # Express REST API routes
│   ├── services/        # Business logic & Database queries
│   ├── validators/      # Zod validation schemas
│   ├── utils/           # Helper utilities
│   ├── app.js           # Express app instance
│   └── server.js        # Server listener
├── prisma/
│   ├── schema.prisma    # Prisma models & database config
│   └── seed.js          # Database seed script
├── uploads/             # Static file storage directory
├── tests/               # Jest & Supertest API tests
├── .env                 # Environment variables
├── package.json
└── README.md
```

---

## API Endpoints

### Authentication & User Profile
- `POST /api/auth/register` — Register a new student account
- `POST /api/auth/login` — Authenticate user & retrieve JWT token
- `GET /api/auth/me` — Fetch authenticated user profile
- `POST /api/auth/change-password` — Change password securely
- `GET /api/users/me` — Retrieve profile data
- `PATCH /api/users/me` — Update user profile & interests
- `DELETE /api/users/me` — Delete account

### Events & Enrollment
- `GET /api/events` — Fetch events with query filters (`category`, `college`, `search`, `status`)
- `GET /api/events/:id` — Fetch event details by ID
- `POST /api/events` — Create new event (Technical or Cultural)
- `PATCH /api/events/:id` — Update existing event
- `POST /api/events/:id/publish` — Publish event draft
- `DELETE /api/events/:id` — Delete event
- `POST /api/events/:id/register` — Enroll in free or paid event
- `GET /api/events/registrations/my` — Retrieve user's enrolled events
- `POST /api/events/:id/bookmark` — Toggle bookmarking an event
- `GET /api/events/bookmarks/ids` — Get user's bookmarked event IDs

### Clubs
- `GET /api/clubs` — Fetch all clubs
- `GET /api/clubs/:id` — Fetch club details
- `POST /api/clubs` — Create new club
- `PATCH /api/clubs/:id` — Update club
- `POST /api/clubs/:id/publish` — Publish club
- `DELETE /api/clubs/:id` — Delete club
- `POST /api/clubs/:id/join` — Join club
- `DELETE /api/clubs/:id/leave` — Leave club
- `GET /api/clubs/joined/ids` — Get user's joined club IDs

### Communities & Discussions
- `GET /api/communities` — Fetch communities
- `GET /api/communities/:id` — Fetch community details & feed
- `POST /api/communities` — Create community
- `PATCH /api/communities/:id` — Update community
- `POST /api/communities/:id/publish` — Publish community
- `POST /api/communities/:id/join` — Join community
- `DELETE /api/communities/:id/leave` — Leave community
- `GET /api/communities/joined/ids` — Get user's joined community IDs
- `POST /api/communities/:id/posts` — Create discussion post
- `POST /api/communities/posts/:id/comments` — Add comment to post
- `POST /api/communities/posts/:id/like` — Toggle post like

### Notifications
- `GET /api/notifications` — Fetch user notifications
- `PATCH /api/notifications/:id/read` — Mark single notification as read
- `PATCH /api/notifications/read-all` — Mark all notifications as read
- `DELETE /api/notifications/:id` — Delete notification

### Image Upload
- `POST /api/upload` — Upload single image file (JPEG, PNG, WEBP)

---

## Setup & Running Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Database Migration & Seed**:
   ```bash
   npx prisma generate
   npx prisma db push
   node prisma/seed.js
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The backend API will run on `http://localhost:5000`.

4. **Run Test Suite**:
   ```bash
   npm test
   ```
