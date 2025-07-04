# Google OAuth Integration

This document describes how to set up Google OAuth for the ASafariM Bibliography application.

## Configuration

To enable Google OAuth in the application, you need to:

1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/)
2. Configure the OAuth consent screen
3. Create OAuth 2.0 client credentials
4. Update the application with your client ID

## Step 1: Create a Google Cloud project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on "Select a project" at the top of the page
3. Click "New Project"
4. Enter a project name (e.g., "ASafariM Bibliography")
5. Click "Create"

## Step 2: Configure OAuth consent screen

1. Select your new project
2. Go to "APIs & Services" > "OAuth consent screen"
3. Select the user type (Internal or External)
4. Fill in the required information:
   - App name
   - User support email
   - Developer contact information
5. Click "Save and Continue"
6. Add the scopes "email" and "profile"
7. Click "Save and Continue"
8. Add test users if needed
9. Click "Save and Continue" to complete the setup

## Step 3: Create OAuth client ID

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application" as the application type
4. Enter a name (e.g., "ASafariM Bibliography Web Client")
5. Add authorized JavaScript origins:
   - Development: `http://localhost:3000` (or your local development URL)
   - Production: Your production URL
6. Add authorized redirect URIs:
   - Development: `http://localhost:3000` (or your local development URL)
   - Production: Your production URL
7. Click "Create"
8. Note your Client ID (you'll need it for the next step)

## Step 4: Update the application

1. Open `src/services/authService.ts`
2. Replace the `GOOGLE_CLIENT_ID` constant with your actual client ID:

```typescript
// Google client ID - Replace with your actual client ID from Google Developer Console
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
```

## Testing

During development, the application will use mock authentication if you haven't set a valid client ID. This allows development to proceed without requiring OAuth setup.

## Next Steps

For a complete Google OAuth implementation with backend integration:

1. Create an endpoint in your backend to exchange the authorization code for tokens
2. Update the `handleGoogleLogin` function to send the code to your backend
3. Implement token verification and user creation/retrieval in your backend

## Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Sign-In for Websites](https://developers.google.com/identity/sign-in/web/sign-in)
