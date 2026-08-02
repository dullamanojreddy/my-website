# MERN Portfolio — Production Architecture

Production-ready MERN portfolio for **Dulla Manoj Reddy** — Full Stack Developer.

- **Frontend**: React (Create React App) → **Vercel**
- **Backend**: Express + MongoDB Atlas → **Render**
- **Database**: MongoDB Atlas

## Quick Start

### Prerequisites
- Node.js >= 18
- MongoDB Atlas cluster
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/dullamanojreddy/my-website.git
cd my-website

# Install server dependencies
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and CLIENT_URL

# Install client dependencies
cd ../client
npm install
cp .env.example .env
# Edit .env with your backend API URL
```

### Running Locally

```bash
# Terminal 1 — Start backend
cd server
npm run dev

# Terminal 2 — Start frontend
cd client
npm start
```

Frontend: `http://localhost:3000`  
Backend: `http://localhost:5000`

### Seeding Database

```bash
cd server
npm run seed
```

To reset all collections:

```bash
npm run seed:destroy
```

## Project Structure

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
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/portfolio/profile` | Get profile data |
| GET | `/api/portfolio/skills` | Get skills data |
| GET | `/api/portfolio/projects` | Get projects data |
| GET | `/api/portfolio/certifications` | Get certifications data |
| POST | `/api/contact` | Submit contact message |

## Deployment

See [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md) for step-by-step deployment instructions.

### Environment Variables

**Server (`server/.env`)**:
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/portfolio
CLIENT_URL=https://your-frontend-url.vercel.app
```

**Client (`client/.env`)**:
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

## Tech Stack

### Frontend
- React 18
- React Router 6
- Axios
- Lucide React + React Icons
- Custom CSS (aurora/neon theme)

### Backend
- Node.js
- Express 4
- Mongoose 8
- Helmet
- CORS
- express-rate-limit
- express-mongo-sanitize

### Database
- MongoDB Atlas

### Hosting
- Vercel (frontend)
- Render (backend)

## Documentation

- [Project Context](docs/PROJECT_CONTEXT.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
- [API Reference](docs/API_REFERENCE.md)
- [Architecture](docs/ARCHITECTURE.md)

## License

MIT