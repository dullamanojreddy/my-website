# Architecture

## System Overview
```
┌─────────────┐     HTTPS      ┌─────────────┐     MongoDB     ┌──────────────┐
│   Browser   │ ──────────────▶│   Vercel    │ ──────────────▶│  MongoDB     │
│  (Client)   │ ◀──────────────│  (Frontend) │ ◀──────────────│   Atlas      │
└─────────────┘                └──────┬──────┘                └──────────────┘
                                      │
                                      │ HTTPS /api/*
                                      ▼
                               ┌─────────────┐
                               │   Render    │
                               │  (Backend)  │
                               └─────────────┘
```

## Frontend Architecture (Vercel)
- **Framework**: React 18 with Create React App
- **Routing**: React Router v6
- **State**: React hooks (useState, useEffect, useCallback)
- **HTTP**: Axios with interceptors
- **Icons**: Lucide React + React Icons
- **Styling**: Custom CSS with CSS variables (aurora/neon theme)
- **Build**: `npm run build` → `build/` directory
- **Hosting**: Vercel (CDN, edge functions, preview deployments)

### Key Frontend Files
- `client/src/services/api.js` — Axios instance + API methods
- `client/src/pages/*` — Route components
- `client/src/components/*` — Reusable UI components
- `client/src/styles.css` — Global styles + theme variables

## Backend Architecture (Render)
- **Framework**: Express 4
- **Database**: MongoDB Atlas via Mongoose 8
- **Security**: Helmet, CORS, express-mongo-sanitize, express-rate-limit
- **Error Handling**: Custom ApiError class + global error handler
- **Async**: express-async-errors + asyncWrapper utility

### Backend Directory Structure
```
server/
├── src/
│   ├── config/
│   │   ├── env.js          # Environment validation
│   │   └── db.js           # MongoDB connection
│   ├── models/             # Mongoose schemas
│   │   ├── Profile.js
│   │   ├── Skill.js
│   │   ├── Project.js
│   │   ├── Qualification.js
│   │   ├── Certificate.js
│   │   └── Message.js
│   ├── services/           # Business logic
│   │   ├── portfolioService.js
│   │   ├── messageService.js
│   │   └── portfolioFallbackData.js
│   ├── controllers/        # Request handlers
│   │   ├── portfolioController.js
│   │   └── contactController.js
│   ├── routes/             # Route definitions
│   │   ├── portfolioRoutes.js
│   │   └── contactRoutes.js
│   ├── middleware/         # Express middleware
│   │   ├── security.js
│   │   ├── error.js
│   │   └── notFound.js
│   ├── utils/              # Helpers
│   │   ├── asyncWrapper.js
│   │   └── ApiError.js
│   ├── seed/               # Database seeding
│   │   └── seed.js
│   └── app.js              # Express app setup
├── server.js               # Entry point
└── package.json
```

## Data Flow

### Portfolio Data
1. Client requests `GET /api/portfolio/profile`
2. Express routes to `portfolioController.getProfileHandler`
3. Controller calls `portfolioService.getProfile()`
4. Service checks MongoDB connection:
   - **If connected**: Fetches latest profile from Atlas
   - **If disconnected**: Returns bundled fallback data
5. Response: `{ success: true, data: {...} }`

### Contact Form
1. Client submits form → `POST /api/contact`
2. Express routes to `contactController.createContactMessage`
3. Controller validates input via `messageService.createMessage()`
4. Service saves to MongoDB `messages` collection
5. Response: `{ success: true, message: "Message received successfully." }`

## Security Architecture
- **Helmet**: Sets secure HTTP headers (CSP, HSTS, etc.)
- **CORS**: Restricts origins to configured `CLIENT_URL`
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Mongo Sanitization**: Prevents NoSQL injection
- **Input Validation**: express-validator on all inputs
- **Environment Validation**: Fails fast if `MONGO_URI` or `CLIENT_URL` missing in production

## Deployment Architecture

### Vercel (Frontend)
- **Root Directory**: `client`
- **Build**: `npm run build`
- **Output**: `build/`
- **Env**: `REACT_APP_API_URL` = Render backend URL
- **CDN**: Static assets served from Vercel edge network

### Render (Backend)
- **Root Directory**: `server`
- **Build**: `npm install`
- **Start**: `npm start`
- **Env**: `MONGO_URI`, `CLIENT_URL`, `NODE_ENV=production`
- **Auto-Deploy**: Triggered on push to main branch

### MongoDB Atlas
- **Cluster**: M0 Sandbox (free) or higher
- **Database**: `portfolio`
- **Collections**: profiles, skills, projects, qualifications, certificates, messages
- **Backup**: Automated daily snapshots

## Scalability Considerations
- **Frontend**: Vercel scales automatically via CDN
- **Backend**: Render can scale to paid plan with more instances
- **Database**: MongoDB Atlas supports horizontal scaling via sharding
- **Caching**: Add Redis for session/data caching in future
- **Queue**: Add BullMQ for async contact form processing in future

## Monitoring
- **Vercel Analytics**: Frontend performance metrics
- **Render Logs**: Backend request/error logs
- **MongoDB Atlas Metrics**: Connection count, operation latency
- **Uptime**: UptimeRobot or similar for health checks