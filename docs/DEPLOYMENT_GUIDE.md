# Deployment Guide

## Prerequisites
- GitHub repository connected to Vercel and Render
- MongoDB Atlas cluster created
- Domain names ready (optional)

## 1. MongoDB Atlas Setup
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/atlas/database)
2. Create a database user with read/write permissions
3. Whitelist IP addresses: `0.0.0.0/0` (all) or specific Render/Vercel IPs
4. Get the connection string:
   ```
   mongodb+srv://<user>:<password>@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

## 2. Backend Deployment (Render)
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `portfolio-api` (or your choice)
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid for production)
5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `CLIENT_URL` = your Vercel frontend URL (e.g., `https://your-project.vercel.app`)
   - `PORT` = `10000` (Render default, optional)
6. Click **Create Web Service**
7. Wait for deployment to complete
8. Copy the Render URL (e.g., `https://portfolio-api.onrender.com`)

## 3. Frontend Deployment (Vercel)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New...** → **Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add Environment Variable:
   - `REACT_APP_API_URL` = your Render backend URL (e.g., `https://portfolio-api.onrender.com`)
6. Click **Deploy**
7. Wait for deployment to complete
8. Copy the Vercel URL (e.g., `https://your-project.vercel.app`)

## 4. Post-Deployment Steps
1. **Update CORS**: Go back to Render → Environment Variables → update `CLIENT_URL` with your actual Vercel URL
2. **Seed Database**: Run the seed script locally or via Render's shell:
   ```bash
   npm run seed
   ```
3. **Test Endpoints**:
   - `https://your-backend.onrender.com/api/health`
   - `https://your-backend.onrender.com/api/portfolio/profile`
4. **Test Contact Form**: Submit a test message from the frontend

## 5. Custom Domain (Optional)
### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Render
1. Go to Project Settings → Custom Domains
2. Add your custom domain
3. Update DNS records as instructed

## 6. Monitoring
- **Render**: Check logs in the Render dashboard
- **Vercel**: Check logs in the Vercel dashboard
- **MongoDB Atlas**: Monitor connections and performance in Atlas dashboard

## Troubleshooting
- **CORS Errors**: Ensure `CLIENT_URL` in Render matches your Vercel URL exactly
- **Database Connection**: Verify `MONGO_URI` is correct and IP whitelist includes Render
- **Build Failures**: Check build logs in Vercel/Render dashboards
- **Cold Starts**: Render free tier sleeps after 15 mins of inactivity; first request may be slow