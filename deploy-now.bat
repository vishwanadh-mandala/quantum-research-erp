@echo off
echo ========================================
echo Quantum Research ERP - Vercel Deployment
echo ========================================
echo.

cd /d "c:\Users\vishw\Downloads\po-demo-client"

echo Step 1: Login to Vercel
echo.
echo A browser window will open. Please:
echo 1. Login with your GitHub account
echo 2. Authorize Vercel CLI
echo 3. Come back to this window
echo.
pause

vercel login

echo.
echo Step 2: Deploy to Production
echo.
echo Follow the prompts:
echo - Set up and deploy? YES
echo - Which scope? Select your account
echo - Link to existing project? NO
echo - Project name? quantum-research-erp
echo - Directory? ./ (just press Enter)
echo - Override settings? NO
echo.
pause

vercel --prod

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Your app is now live!
echo Check the URL printed above.
echo.
pause
