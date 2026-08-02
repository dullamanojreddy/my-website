# Project Context

## Project Overview
Production-ready MERN portfolio for **Dulla Manoj Reddy** — Full Stack Developer.  
Frontend: React (Create React App) hosted on **Vercel**.  
Backend: Express + MongoDB Atlas hosted on **Render**.  
Database: MongoDB Atlas.

## Tech Stack
- **Frontend**: React 18, React Router 6, Axios, Lucide React, React Icons
- **Backend**: Node.js, Express 4, Mongoose 8
- **Database**: MongoDB Atlas
- **Hosting**: Vercel (frontend), Render (backend)
- **Security**: Helmet, CORS, express-mongo-sanitize, express-rate-limit

## Folder Structure
```
portfolio/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── data/
│   │   ├── utils/
│   │   ├── context/
│   │   └── App.js
│   ├── .env
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── seed/
│   │   └── app.js
│   ├── server.js
│   ├── .env
│   └── package.json
├── docs/
│   ├── PROJECT_CONTEXT.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── API_REFERENCE.md
│   └── ARCHITECTURE.md
├── README.md
└── .gitignore
```

## Database Schema
- **profiles**: name, role, tagline, email, mobile, about[], photoPath
- **skills**: name, proficiency, icon, category, points[]
- **projects**: title, description, techStack[], demoUrl, githubUrl, featured, emoji
- **qualifications**: education, institution, score, status
- **certificates**: title, issuer, score, status, certificatePath
- **messages**: name, email, mobile, message

## API List
- `GET /api/health`
- `GET /api/portfolio/profile`
- `GET /api/portfolio/skills`
- `GET /api/portfolio/projects`
- `GET /api/portfolio/certifications`
- `POST /api/contact`

## Deployment URLs
- Frontend: `https://<your-project>.vercel.app`
- Backend: `https://<your-project>.onrender.com`

## Completed Work
- [x] Favicon fix for GitHub Pages
- [x] Contact API 500 error handling
- [x] Skills page redesign (expertise cards)
- [x] Vercel asset path fix (`homepage: "."`)
- [x] Production server restructure (`src/` architecture)
- [x] Security middleware (Helmet, CORS, rate limiting, sanitization)
- [x] MongoDB Atlas schema and seed scripts
- [x] Client service layer cleanup

## Pending Tasks
- [ ] Deploy backend to Render
- [ ] Configure Vercel environment variable `REACT_APP_API_URL`
- [ ] Run seed script on production database
- [ ] Verify CORS and contact form end-to-end

## Bugs
- None currently known.

## Current Status
Frontend and backend are production-ready locally. Deployments need environment configuration.

## Future Roadmap
- Add admin dashboard for content management
- Add blog section
- Add dark/light theme toggle
- Add analytics