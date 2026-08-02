# API Reference

Base URL: `/api`

## Health Check
**`GET /health`**

Response:
```json
{
  "success": true,
  "message": "Portfolio API is running."
}
```

## Portfolio Routes
Base path: `/api/portfolio`

### Get Profile
**`GET /profile`**

Response:
```json
{
  "success": true,
  "data": {
    "name": "Dulla Manoj Reddy",
    "role": "Full Stack Developer",
    "tagline": "...",
    "email": "dullamanojreddy@gmail.com",
    "mobile": "9966007804",
    "about": ["..."],
    "photoPath": "/assets/myphoto.jpg"
  }
}
```

### Get Skills
**`GET /skills`**

Response:
```json
{
  "success": true,
  "data": [
    {
      "name": "Full Stack Development",
      "proficiency": 90,
      "icon": "stack",
      "category": "Development",
      "points": ["React.js", "Node.js", "Express.js", "REST APIs"]
    }
  ]
}
```

### Get Projects
**`GET /projects`**

Response:
```json
{
  "success": true,
  "data": [
    {
      "title": "Personal Portfolio Website",
      "description": "...",
      "techStack": ["React", "Node.js", "Express", "MongoDB"],
      "demoUrl": "",
      "githubUrl": "https://github.com/dullamanojreddy/my-website",
      "featured": true,
      "emoji": "💼"
    }
  ]
}
```

### Get Certifications
**`GET /certifications`**

Response:
```json
{
  "success": true,
  "data": [
    {
      "title": "Programming in Modern C++",
      "issuer": "NPTEL",
      "score": "67%",
      "status": "Completed",
      "certificatePath": "/assets/certificate-Programming in Modern C++.pdf"
    }
  ]
}
```

## Contact Routes
Base path: `/api/contact`

### Submit Contact Message
**`POST /`**

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "1234567890",
  "message": "Hello, I'd like to connect."
}
```

Response:
```json
{
  "success": true,
  "message": "Message received successfully.",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "message": "Hello, I'd like to connect.",
    "_id": "...",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

## Error Responses
All errors follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

Common status codes:
- `400` — Bad request / validation error
- `404` — Route not found
- `409` — Duplicate key
- `500` — Internal server error
- `503` — Service unavailable (database not ready)