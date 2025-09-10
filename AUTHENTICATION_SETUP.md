# Google Authentication Setup Guide

## ✅ **Authentication URLs for Google Console**

When setting up Google OAuth in the Google Cloud Console, use these callback URLs:

**Development:**
```
http://localhost:3000/api/auth/callback/google
```

**Production:**
```
https://hmr-builders-web.vercel.app/api/auth/callback/google
```

## 🔧 **Environment Variables Required**

Create a `.env.local` file in your project root with:

```env
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth Configuration  
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

## 🚀 **Features Implemented**

### ✅ **Google Authentication**
- **Login Page:** `/login` - Google sign-in with traditional form fallback
- **Registration Page:** `/get-started` - Google sign-up with traditional form fallback
- **NextAuth.js Integration:** Complete OAuth flow handling
- **Session Management:** Persistent user sessions
- **Redirect Handling:** Automatic redirect to homepage after authentication

### ✅ **Updated Project Details**

**Token Pricing (Specific Values):**
| Project | Token Price | Min Investment | Status |
|---------|-------------|----------------|---------|
| **H1 Tower** | PKR 95,000 | PKR 950,000 | **ACTIVE** |
| **Saima Tower** | PKR 85,000 | PKR 850,000 | COMING SOON |
| **AA Waterfront** | PKR 75,000 | PKR 750,000 | COMING SOON |
| **H&S Residence** | PKR 70,000 | PKR 700,000 | COMING SOON |
| **Saima Marina** | PKR 65,000 | PKR 650,000 | COMING SOON |
| **Gold Crest Bay** | PKR 60,000 | PKR 600,000 | COMING SOON |

**All Projects Updated With:**
- Exact location: `Abdul Sattar Edhi Ave, D.H.A. Phase 8 Zone D, Karachi`
- 1000 tokens per apartment model
- Specific token pricing (no ranges)
- Different pricing tiers for each project
- H1 Tower marked as ACTIVE for investment

## 🔐 **Google Cloud Console Setup Steps**

1. **Go to Google Cloud Console:** https://console.cloud.google.com/
2. **Create/Select Project:** Create new project or select existing
3. **Enable Google+ API:** APIs & Services → Library → Google+ API
4. **Create OAuth Credentials:** 
   - APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID
   - Application Type: Web Application
   - Authorized JavaScript Origins: `http://localhost:3000`, `https://hmr-builders-web.vercel.app`
   - Authorized Redirect URIs: 
     - `http://localhost:3000/api/auth/callback/google`
     - `https://hmr-builders-web.vercel.app/api/auth/callback/google`
5. **Copy Client ID & Secret:** Add to `.env.local`

## 🎯 **Next Steps**

1. **Set up Google OAuth credentials**
2. **Add environment variables**
3. **Test authentication flow**
4. **Deploy to Vercel with production environment variables**

The authentication system is fully implemented and ready for Google OAuth configuration!

