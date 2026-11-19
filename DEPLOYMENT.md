# Deployment Guide

## Option 1: Deploy to Render (Recommended - Free Tier)

### Step 1: Create a GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Render
1. Go to [render.com](https://render.com) and sign up
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the deployment:
   - **Name:** portfolio-website
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

### Step 3: Add Environment Variables
In Render dashboard, go to your service → Environment:
- Add `NODE_ENV=production`
- (Optional) Add email config if you want contact emails

### Step 4: Deploy
Click "Deploy" and wait for your site to go live!

---

## Option 2: Deploy to Railway

### Step 1: Create GitHub Repository (same as above)

### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app) and sign up with GitHub
2. Click "Create New Project" → "Deploy from GitHub repo"
3. Select your portfolio-website repository
4. Railway auto-detects Node.js and deploys automatically

### Step 3: Custom Domain (Optional)
- In Railway dashboard, go to Settings → Domain
- Add your custom domain

---

## Option 3: Deploy to Vercel (Alternative)

⚠️ **Note:** Vercel is optimized for static/serverless. For a full backend, Render/Railway is better.

---

## Local Testing Before Deployment

Test production build locally:
```bash
cd server
npm install
npm run build
npm start
```

Then visit `http://localhost:5001` in your browser.

---

## Troubleshooting

### Database Issues
- The SQLite database is stored in `server/database.sqlite`
- On deployed platforms, the database file persists in the instance's file system
- For persistent storage, consider migrating to PostgreSQL or MongoDB

### Email Not Sending
- Add email credentials to environment variables
- Use Gmail app-specific password (not main password)

### Static Files Not Showing
- Ensure `frontend/` folder paths are correct
- Check that express.static() is pointing to the right directory

---

## Next Steps

1. **Domain:** Register a domain name (Namecheap, GoDaddy)
2. **SSL:** Most platforms provide free SSL certificates
3. **Monitoring:** Use platform's built-in monitoring tools
4. **Auto-deploys:** GitHub integration auto-deploys on push to main branch
