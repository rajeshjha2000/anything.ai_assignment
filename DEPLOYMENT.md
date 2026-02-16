# Deployment Guide

## Deploy to Render.com (FREE)

### Step 1: Setup MongoDB Atlas (Free)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Create a database user with username and password
5. Whitelist all IPs: `0.0.0.0/0`
6. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/taskmanagement`)

### Step 2: Deploy to Render

1. Go to https://render.com and sign up with GitHub
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `https://github.com/rajeshjha2000/anything.ai_assignment`
4. Configure:
   - **Name**: task-management-api
   - **Root Directory**: backend
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node

5. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: any random string (e.g., `mysecretkey12345`)
   - `JWT_EXPIRE`: `7d`
   - `NODE_ENV`: `production`

6. Click "Create Web Service"

### Step 3: Wait for Deployment

- Render will build and deploy your app (takes 5-10 minutes)
- You'll get a public URL like: `https://task-management-api.onrender.com`

### Step 4: Access Swagger Documentation

Your Swagger docs will be available at:
```
https://your-app-name.onrender.com/api-docs
```

Share this URL with recruiters!

---

## Alternative: Quick Deploy with Railway

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables (same as above)
6. Deploy!

---

## Alternative: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Import your GitHub repository
3. Set root directory to `frontend`
4. Add environment variable:
   - `VITE_API_URL`: Your deployed backend URL
5. Deploy!

---

## After Deployment

Update your README.md with:
- Live API URL
- Live Swagger Documentation URL
- Live Frontend URL (if deployed)
