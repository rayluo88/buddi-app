# Buddi MVP - Deployment Guide

**Quick Start:** Get your demo live in 5 minutes

---

## Option 1: Vercel (Recommended - Easiest)

### Step 1: Install Vercel CLI (if not already installed)

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

This will open your browser for authentication. You can:
- Sign in with GitHub
- Sign in with GitLab
- Sign in with Bitbucket
- Sign in with email

### Step 3: Deploy

```bash
cd /Users/raymondluo/Documents/jobs/moe-ai-spm/assignment_mvp/buddi-app
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your personal account
- **Link to existing project?** → No
- **Project name?** → `buddi-mvp` (or your choice)
- **Directory?** → `./` (default)
- **Override settings?** → No

### Step 4: Deploy to Production

```bash
vercel --prod
```

**You'll get a live URL like:** `https://buddi-mvp.vercel.app`

### Deployment Configuration

The `vercel.json` file is already configured with:
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ Framework: Vite
- ✅ SPA routing (all routes → index.html)
- ✅ Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)

---

## Option 2: Netlify

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify

```bash
netlify login
```

### Step 3: Deploy

```bash
netlify deploy --prod
```

Follow the prompts:
- **Create & configure a new site?** → Yes
- **Team?** → Your personal account
- **Site name?** → `buddi-mvp` (or your choice)
- **Publish directory?** → `dist`

**You'll get a live URL like:** `https://buddi-mvp.netlify.app`

### Alternative: Netlify UI

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Deploy manually"
3. Drag and drop the `dist` folder
4. Done! Instant deployment

---

## Option 3: GitHub Pages

### Step 1: Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Step 2: Add deploy script to package.json

```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

### Step 3: Build and deploy

```bash
npm run build
npm run deploy
```

**You'll get a live URL like:** `https://[your-username].github.io/buddi-app`

---

## Option 4: Local Preview (Offline Demo)

If you just need to demo locally without internet:

```bash
# Build for production
npm run build

# Preview locally
npm run preview
```

**Access at:** `http://localhost:4173`

This is perfect for:
- Testing before deployment
- Offline stakeholder presentations
- Internal demos without public URL

---

## Post-Deployment Checklist

After deploying, verify:

- [ ] All 3 personas load correctly (Wei Ling, Ms. Priya, Mr. Tan)
- [ ] Role switching works smoothly
- [ ] Bilingual switching functional (EN ↔ ZH)
- [ ] Student dashboard displays correctly
- [ ] Counselor priority queue loads all 35 students
- [ ] Teacher dashboard shows charts and privacy banner
- [ ] Mobile responsive (test on phone/tablet)
- [ ] All animations working (confetti, transitions)

**Test on multiple browsers:**
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge

---

## Sharing the Demo

Once deployed, share the URL with stakeholders:

**Email Template:**

```
Subject: Buddi Student Wellbeing MVP - Live Demo Ready

Hi [Stakeholder Name],

The Buddi Student Wellbeing MVP is now live and ready for your review:

🔗 Demo URL: [Your Vercel/Netlify URL]

**Quick Start:**
1. Choose a persona (Wei Ling / Ms. Priya / Mr. Tan)
2. Explore the features for that role
3. Switch roles using the top-right dropdown

**Demo Scenarios:**
- Student Journey (Wei Ling): 10 minutes
- Counselor Dashboard (Ms. Priya): 12 minutes
- Teacher Dashboard (Mr. Tan): 8 minutes

For a guided walkthrough, see the DEMO_GUIDE.md attached.

**Key Features to Try:**
✅ Daily mood check-in with gamification
✅ CBT exercises and mindfulness sessions
✅ AI-powered risk detection for counselors
✅ Privacy-protected teacher analytics
✅ Bilingual support (EN/ZH)

Looking forward to your feedback!

Best regards,
[Your Name]
```

---

## Troubleshooting

### Build Fails on Vercel/Netlify

**Error:** `npm ERR! code ELIFECYCLE`

**Fix:**
```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install

# Try build locally first
npm run build
```

### 404 on Page Refresh

**Problem:** Navigating to `/counselor` directly gives 404

**Fix:** Already configured in `vercel.json` with rewrites. For Netlify, create `_redirects`:

```
/*    /index.html   200
```

### Large Bundle Warning

**Warning:** Chunks larger than 500 KB

**Note:** This is expected due to Recharts library. Current bundle (877 KB / 270 KB gzipped) is acceptable for demo.

**Future optimization:**
- Code-splitting by route
- Lazy load Recharts for teacher dashboard only
- Dynamic imports for i18n translations

### Slow First Load

**Problem:** Initial load takes >3 seconds

**Fix:** Already optimized with Vite. For further optimization:
- Enable Vercel/Netlify CDN (automatic)
- Preload critical assets
- Use `<link rel="preconnect">` for fonts

---

## Environment Variables (None Required)

This MVP has **no environment variables** - it's a fully client-side demo with synthetic data.

For production (future), you would add:
- `VITE_API_URL` - Backend API endpoint
- `VITE_CLAUDE_API_KEY` - AI integration key
- `VITE_LTI_CLIENT_ID` - SLS integration
- `VITE_SENTRY_DSN` - Error tracking

---

## Custom Domain (Optional)

### Vercel Custom Domain

1. Go to Vercel dashboard → Your project → Settings → Domains
2. Add domain: `buddi.moe.edu.sg` (example)
3. Update DNS records with your provider
4. Done! SSL automatically configured

### Netlify Custom Domain

1. Go to Netlify dashboard → Your site → Domain settings
2. Add custom domain
3. Update DNS records
4. SSL automatically configured

---

## Monitoring & Analytics

### Vercel Analytics (Built-in)

- Automatically enabled for all deployments
- View in Vercel dashboard → Analytics tab
- Tracks: page views, unique visitors, top pages

### Google Analytics (Optional)

Add to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Deployment Costs

### Vercel
- **Free tier:** 100 GB bandwidth/month
- **Pro:** $20/month (if needed for team features)
- **Estimated cost for demo:** $0 (free tier sufficient)

### Netlify
- **Free tier:** 100 GB bandwidth/month
- **Pro:** $19/month
- **Estimated cost for demo:** $0 (free tier sufficient)

### GitHub Pages
- **Cost:** $0 (always free for public repos)

---

## Updating the Deployment

After making changes:

```bash
# Vercel
npm run build
vercel --prod

# Netlify
npm run build
netlify deploy --prod

# GitHub Pages
npm run build
npm run deploy
```

---

## Demo Day Checklist

Before presenting to stakeholders:

- [ ] Deploy to Vercel/Netlify (get live URL)
- [ ] Test demo flow end-to-end (all 3 personas)
- [ ] Verify internet connectivity at venue
- [ ] Prepare backup (screenshots in PowerPoint)
- [ ] Print DEMO_GUIDE.md for reference
- [ ] Share demo URL in advance (optional)
- [ ] Test on presentation laptop/projector
- [ ] Have backup browser tabs open
- [ ] Prepare Q&A talking points

---

## Rollback Plan

If something goes wrong after deployment:

### Vercel
```bash
# List previous deployments
vercel list

# Rollback to previous version
vercel rollback [deployment-url]
```

### Netlify
```bash
# Go to Netlify dashboard → Deploys → click previous deploy → "Publish deploy"
```

---

## Need Help?

**Vercel Documentation:** https://vercel.com/docs
**Netlify Documentation:** https://docs.netlify.com
**Vite Deployment:** https://vitejs.dev/guide/static-deploy.html

---

**Ready to deploy?** Just run `vercel --prod` and you'll have a live demo in 2 minutes!

**Last Updated:** December 12, 2025
