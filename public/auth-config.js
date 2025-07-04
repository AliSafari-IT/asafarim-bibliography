// This file allows you to configure authentication settings
// Edit this file to use real Google authentication instead of the mock version

// Google OAuth Client ID - Get this from your Google Cloud Console
window.ASAFARIM_AUTH_CONFIG = {
  googleClientId: '69391174556-g8vohlhm1vpmiealvmu7b9tr0la9c0sp.apps.googleusercontent.com', // Set to your Google Client ID to enable real authentication
  useRealAuth: true,   // Set to true to use real authentication
  redirectUri: 'http://localhost:3004'  // Updated to match the port your app is running on
};

// How to configure real Google authentication:
// 1. Get your Google Client ID from https://console.cloud.google.com/
// 2. Replace the null value above with your actual Client ID (keep the quotes)
// 3. Set useRealAuth to true
// 4. Reload the application

// Example:
// window.ASAFARIM_AUTH_CONFIG = {
//   googleClientId: '123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com',
//   useRealAuth: true,
// };
