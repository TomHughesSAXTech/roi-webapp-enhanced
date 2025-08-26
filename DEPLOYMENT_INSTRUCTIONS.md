# ROI Calculator - Automatic Deployment Setup

## 🚀 Automatic Deployment Configured

I've set up GitHub Actions to automatically deploy your ROI calculator to production whenever you push changes to the main branch.

## 📋 Setup Required

To complete the automatic deployment setup, you need to add the Azure Static Web Apps deployment token as a GitHub secret:

### Step 1: Get Your Deployment Token

1. Go to the [Azure Portal](https://portal.azure.com)
2. Navigate to your Static Web App resource (roi.saxtechnology.com)
3. Go to **Settings** > **Configuration**
4. Copy the **Deployment Token**

### Step 2: Add GitHub Secret

1. Go to your GitHub repository: https://github.com/TomHughesSAXTech/roi-webapp-enhanced
2. Click **Settings** (repository settings, not your account)
3. Click **Secrets and variables** > **Actions**
4. Click **New repository secret**
5. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
6. Value: Paste your deployment token from Step 1
7. Click **Add secret**

### Step 3: Test Automatic Deployment

Once the secret is added:
1. Push any change to the main branch
2. Go to **Actions** tab in your GitHub repo
3. Watch the deployment workflow run
4. Your changes will automatically deploy to https://roi.saxtechnology.com

## 🔄 Current Status

- ✅ GitHub Actions workflow created
- ✅ Workflow configured for main branch deployment
- ✅ Latest Greer Walker updates ready to deploy
- ⏳ **PENDING**: Add deployment token as GitHub secret

## 📁 What Gets Deployed

The workflow deploys everything in the `/public` folder:
- `index.html` (your enhanced ROI calculator)
- `staticwebapp.config.json` (authentication config)
- `auth-widget.js` (authentication widget)
- All other static assets

## 🛠️ Manual Deployment (Backup Option)

If you need to deploy manually before setting up the automatic deployment:

```bash
# Install Static Web Apps CLI if not installed
npm install -g @azure/static-web-apps-cli

# Deploy manually (requires deployment token)
swa deploy --deployment-token "YOUR_TOKEN" --app-location public --output-location public --env production
```

## 🔍 Monitoring Deployments

After setup, you can monitor deployments at:
- **GitHub Actions**: https://github.com/TomHughesSAXTech/roi-webapp-enhanced/actions
- **Azure Portal**: Your Static Web App deployment history

## 🆘 Troubleshooting

**Deployment fails?**
- Check that the GitHub secret name exactly matches: `AZURE_STATIC_WEB_APPS_API_TOKEN`
- Verify the deployment token is valid and not expired
- Check the Actions log for specific error messages

**Need to disable automatic deployment?**
- Delete or rename the `.github/workflows/azure-static-web-apps-deploy.yml` file

---

**Next Action Required**: Add the deployment token as a GitHub secret to enable automatic deployment!
