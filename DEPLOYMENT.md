# Deployment Guide

Complete instructions for deploying Compliance Tracker to production.

## Prerequisites

✧ GitHub account with your code repository
✧ Render account (https://render.com)
✧ Vercel account (https://vercel.com)
✧ Supabase PostgreSQL database connection string

## Backend Deployment (Render)

### Step 1: Push Code to GitHub

```bash
# Initialize git if not done
git init

# Add all files
git add -A

# Commit
git commit -m "feat: initial deployment configuration"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/complianceTracker.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to https://render.com and sign in
2. Click "New +" → "Web Service"
3. Select "Deploy an existing repository" or "Build and deploy from Git"
4. Connect your GitHub repository
5. Fill in deployment settings:
   - Name: `compliance-tracker-api`
   - Environment: `Node`
   - Build Command: `npm install && npx prisma generate`
   - Start Command: `node src/index.js`
   - Runtime: `Node 18` or higher
6. Add environment variables:
   - `DATABASE_URL`: Your Supabase connection string (from `.env`)
   - `NODE_ENV`: `production`
   - `PORT`: Leave blank (Render assigns automatically)
7. Select plan: **Free** tier is available
8. Click "Create Web Service"

### Step 3: Verify Backend Deployment

Once deployed, Render will provide a URL like: `https://compliance-tracker-api.onrender.com`

Test the API:

```bash
# Health check
curl https://compliance-tracker-api.onrender.com/api/health

# Database check
curl https://compliance-tracker-api.onrender.com/api/db-health
```

> Note: Free tier services sleep after 15 minutes of inactivity. First request will take 30-60 seconds to wake up.

### Backend Environment Variables on Render

| Variable       | Value            | Source             |
| -------------- | ---------------- | ------------------ |
| `DATABASE_URL` | postgresql://... | Supabase dashboard |
| `NODE_ENV`     | production       | Set to this value  |
| `PORT`         | Automatic        | Leave blank        |

---

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Production

Create a `.env.production` file in the frontend directory:

```bash
VITE_API_URL=https://compliance-tracker-api.onrender.com/api
```

Or update in Vercel dashboard after deployment.

### Step 2: Deploy on Vercel

1. Go to https://vercel.com and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select `frontend` folder as root directory:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables:
   - `VITE_API_URL`: `https://compliance-tracker-api.onrender.com/api`
6. Click "Deploy"

Vercel will automatically deploy on every push to main branch.

### Step 3: Verify Frontend Deployment

Vercel provides a URL like: `https://compliance-tracker.vercel.app`

✧ Check that the app loads
✧ Verify clients list displays
✧ Test creating a new task
✧ Check browser console for errors

---

## Post-Deployment Configuration

### Update CORS on Backend

If frontend and backend have different domains, CORS is already enabled. Verify in `backend/src/index.js`:

```javascript
app.use(cors()); // Allows all origins
```

For production, you can restrict to specific domain:

```javascript
app.use(
  cors({
    origin: "https://your-frontend-url.vercel.app",
    credentials: true,
  }),
);
```

Update in Render environment if needed.

### Database Migrations

Render runs build command which includes `npx prisma generate`. If you need to run migrations:

1. Go to Render dashboard → Your Web Service
2. Click "Shell" tab
3. Run: `npx prisma migrate deploy`

Or run locally before pushing code.

---

## Environment Variables Reference

### Backend (.env or Render Dashboard)

```
DATABASE_URL=postgresql://user:password@host:port/database
NODE_ENV=production
PORT=10000
```

### Frontend (Vercel Environment Variables)

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## Monitoring & Troubleshooting

### Render Dashboard

✧ Logs: Real-time server logs
✧ Metrics: CPU, memory, requests
✧ Health: Service status and uptime
✧ Rebuild: Redeploy from latest commit

### Vercel Dashboard

✧ Deployments: View all deployment history
✧ Analytics: Traffic and performance metrics
✧ Logs: Build and runtime logs
✧ Rollback: Deploy previous versions

### Common Issues

**Error: Cannot reach database**

- Check DATABASE_URL in Render environment variables
- Verify Supabase project is not paused
- Check IP whitelist allows Render IPs

**Error: CORS blocked**

- Verify CORS middleware is applied before routes
- Check frontend VITE_API_URL matches backend URL
- Add trailing `/api` to API URL

**Frontend shows blank or old version**

- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Check Vercel deployment logs for build errors

**Slow first request**

- Free tier services sleep after 15 minutes
- First request wakes the service (30-60 seconds)
- Upgrade plan for always-on performance

---

## Domain Configuration

### Connect Custom Domain to Vercel

1. Buy domain (GoDaddy, Namecheap, etc.)
2. In Vercel dashboard → Settings → Domains
3. Add custom domain
4. Update DNS records per Vercel instructions
5. SSL certificate automatically generated

### Connect Custom Domain to Render

1. In Render dashboard → Web Service → Settings
2. Add custom domain
3. Update DNS records per Render instructions
4. SSL certificate automatically generated

---

## Continuous Deployment

Both Render and Vercel auto-deploy on git push:

```bash
# Make changes locally
git add .
git commit -m "fix: update task filtering"
git push origin main

# Render and Vercel automatically rebuild and deploy
# Monitor via their dashboards
```

---

## Rollback to Previous Version

### Render

1. Dashboard → Deployments
2. Click previous deployment
3. Click "Deploy"

### Vercel

1. Dashboard → Deployments
2. Click desired version
3. "Promote to Production"

---

## Scaling & Upgrades

**Current Setup**

- Render: Free tier (single instance, pauses after 15 min inactivity)
- Vercel: Free tier (unlimited deployments, serverless functions)
- Supabase: Free/paid PostgreSQL

**For Production**

- Upgrade Render to Starter/Standard plan ($7+/month)
- Keep Vercel Pro ($20/month) for team collaboration
- Upgrade Supabase based on database size and connections

---

## Final Checklist

✧ Code pushed to GitHub
✧ Backend deployed on Render
✧ Frontend deployed on Vercel
✧ Environment variables configured
✧ CORS working (frontend can reach backend)
✧ Database connection verified
✧ Health endpoints responding
✧ Full app workflow tested (create client, add task, update status)
✧ No console errors in browser
✧ No errors in Render logs

## Support

For deployment issues:

- Render docs: https://render.com/docs
- Vercel docs: https://vercel.com/docs
- Supabase docs: https://supabase.com/docs
