# CAAC Project Deployment Guide

## Project Structure

```
CAAC/
├── frontend/          # React Vite SPA (deployed to Vercel)
├── backend/           # Express.js API (deploy separately)
├── package.json       # Monorepo root
├── vercel.json        # Vercel configuration
└── .vercelignore      # Vercel build ignore rules
```

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account connected to your Git repository
- Node.js 18+ and npm 9+

### Deployment Setup

1. **Connect Repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository
   - Select project settings

2. **Configure Project Settings**
   - **Root Directory**: Leave empty (Vercel will auto-detect)
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build:frontend`
   - **Output Directory**: `frontend/dist`

3. **Environment Variables** (in Vercel Dashboard)
   - `VITE_API_URL`: Your backend API URL
   - `VITE_APP_NAME`: CAAC
   - `VITE_ENVIRONMENT`: production
   - `VITE_LOG_LEVEL`: error
   - `VITE_FEATURE_FLAG_DEBUG`: false

4. **Deploy**
   - Click "Deploy"
   - Vercel automatically redeploys on Git push

### Local Development

```bash
# Install dependencies (from root)
npm install

# Run frontend dev server
npm run dev:frontend

# Build frontend
npm run build:frontend

# Build and preview production
cd frontend
npm run build
npm run preview
```

## Backend Deployment

For backend (Express app), use:
- **Render**: [render.com](https://render.com) - Great for Node.js
- **Railway**: [railway.app](https://railway.app)
- **Heroku**: [heroku.com](https://heroku.com)
- **AWS/DigitalOcean**: For production scaling

## Environment Variables

### Production (.env.production)
```
VITE_API_URL=https://your-api.example.com
VITE_ENVIRONMENT=production
VITE_LOG_LEVEL=error
```

### Development (.env.development)
```
VITE_API_URL=http://localhost:3000
VITE_ENVIRONMENT=development
VITE_LOG_LEVEL=debug
```

## Troubleshooting

### White Screen on Vercel
- Check browser console (F12) for errors
- Verify environment variables are set in Vercel dashboard
- Ensure `API_URL` is correct if making API calls

### Build Fails
- Run `npm install` locally to check for dependency issues
- Check build logs in Vercel dashboard
- Verify Node.js version: `node --version`

### 404 Errors on Routes
- Vercel's SPA rewrites are configured in `vercel.json`
- All routes automatically redirect to `/index.html`

## Performance Tips

✅ **Already Configured:**
- Automatic minification with Vite
- Code splitting with React lazy loading
- Image optimization assets
- CSS minification with Tailwind

🚀 **Next Steps:**
- Add analytics (Vercel Web Analytics)
- Enable Vercel Edge Caching
- Consider image optimization service
- Monitor Core Web Vitals

## Git Push → Auto Deploy Flow

```
git push → GitHub → Vercel detects push → 
Build (npm run build:frontend) → Deploy to CDN → Live!
```

---

**Questions?** Check [Vercel Docs](https://vercel.com/docs) or contact your team lead.
