# Vercel Deployment Guide

## Quick Deploy (Recommended)

Your code is already on GitHub! Deploy to Vercel in 2 minutes:

### Option 1: One-Click Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel**: https://vercel.com/new
2. **Import your GitHub repository**:
   - Click "Import Git Repository"
   - Select: `vishwanadh-mandala/quantum-research-erp`
   - Click "Import"
3. **Configure Project**:
   - Framework Preset: **Vite** (auto-detected)
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (auto-detected)
4. **Click "Deploy"**
5. **Done!** Your app will be live in ~2 minutes

Your deployment URL will be: `https://quantum-research-erp-{random}.vercel.app`

---

## Option 2: Deploy via Vercel CLI

If you prefer command line:

```bash
# Login to Vercel (run this once)
vercel login

# Deploy to production
cd "c:\Users\vishw\Downloads\po-demo-client"
vercel --prod
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No**
- What's your project's name? `quantum-research-erp`
- In which directory is your code located? `./`
- Want to override the settings? **No**

---

## Post-Deployment

### Your Live URLs:
- **GitHub Repository**: https://github.com/vishwanadh-mandala/quantum-research-erp
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Live Application**: Will be provided after deployment

### Demo Accounts:
Once deployed, use these accounts to login:
- **Admin**: admin@quantumresearch.com / admin123
- **Manager**: manager@quantumresearch.com / manager123
- **User**: user@quantumresearch.com / user123

### Custom Domain (Optional)
After deployment, you can add a custom domain in Vercel Dashboard:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain (e.g., erp.quantumresearch.com)

---

## What's Deployed

Your Quantum Research ERP includes:
- ✅ Purchase Order Management (Create/Edit/List)
- ✅ Sales Order Management (Create/Edit/List)
- ✅ Contract Management
- ✅ Account Management
- ✅ User Authentication
- ✅ Animated Quantum Research Branding
- ✅ Beautiful Forms with Validations
- ✅ Responsive Design
- ✅ Huge Dummy Data for Demo

---

## Troubleshooting

### Build fails on Vercel?
Check the build logs in Vercel dashboard. Common issues:
- Missing dependencies: Add them to package.json
- Build timeout: Contact Vercel support for longer build times

### Routes not working?
The `vercel.json` file handles this with SPA routing.

### Need help?
- Vercel Docs: https://vercel.com/docs
- Contact: support@vercel.com

---

## Environment Variables (if needed later)

When you add backend/API later, set environment variables in Vercel:
1. Go to Project Settings → Environment Variables
2. Add variables like:
   - `VITE_API_URL`
   - `VITE_API_KEY`
   - etc.

---

**Next Step**: Go to https://vercel.com/new and import your GitHub repository!
