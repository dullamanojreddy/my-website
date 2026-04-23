# Personal Portfolio Website (MERN Stack)

This project is a full MERN stack personal portfolio website for **Dulla Manoj Reddy**.
It includes dynamic profile information, skills, projects, certifications, and contact form submission.

## Tech Stack

- Frontend: React, React Router, React Icons, Axios
- Backend: Node.js, Express
- Database: MongoDB Atlas (Mongoose)

## Folder Structure

project/
- client/
  - src/
    - components/
    - pages/
    - services/
    - App.js
    - index.js
- server/
  - config/
  - controllers/
  - middleware/
  - models/
  - routes/
  - server.js
- assets/
- .env.example
- package.json

## Features Implemented

- Responsive React navigation with active links and hamburger menu
- Pages: Home, About, Qualifications, Skills, Certifications, Contact
- Dynamic data fetching from backend APIs
- Qualifications table with status badges
- Skills progress bars with icons
- Certification cards + modal certificate preview
- Controlled contact form with frontend validation
- Backend validation (mobile exactly 10 digits, no empty fields)
- MongoDB collections: profile, skills, projects, certifications, messages
- Loading indicators and error messages

## Required APIs

- GET /api/profile
- GET /api/skills
- GET /api/projects
- POST /api/contact

Additional APIs used:
- GET /api/qualifications
- GET /api/certifications
- GET /api/health

## Setup Instructions

### 1) Configure Environment

Create `.env` inside `server/`:

MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
CLIENT_URL=http://localhost:3000

Create `.env` inside `client/` (optional):

REACT_APP_API_BASE_URL=http://localhost:5000

### 2) Install Dependencies

At project root:

npm run install:all

### 3) Run Application

At project root:

npm run dev

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Deployment Guide

### Frontend (Netlify/Vercel/GitHub Pages)

- Deploy `client/`
- Set environment variable:
  - REACT_APP_API_BASE_URL=https://your-backend-url

### Backend (Render/Railway/Cyclic)

- Deploy `server/`
- Set environment variables:
  - MONGODB_URI
  - PORT
  - CLIENT_URL

### Database (MongoDB Atlas)

- Create cluster and database
- Add network access and DB user
- Copy connection string into `MONGODB_URI`

## Submission Checklist

- GitHub repository link: ADD_YOUR_REPO_LINK
- Live frontend URL: ADD_FRONTEND_URL
- Backend API URL: ADD_BACKEND_URL
