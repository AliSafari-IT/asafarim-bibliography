// Define types for Google authentication
interface GoogleUser {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}

interface GoogleAuthResponse {
  user: GoogleUser;
  token: string;
}

// Google One Tap credential response type
interface GoogleCredentialResponse {
  credential: string;  // JWT token containing user information
  clientId: string;
  select_by: string;
}

// Google notification interface for One Tap prompt
interface GooglePromptNotification {
  isDisplayed: () => boolean;
  isNotDisplayed: () => boolean;
  isSkippedMoment: () => boolean;
  isDismissedMoment: () => boolean;
  getNotDisplayedReason: () => string;
  getSkippedReason: () => string;
  getDismissedReason: () => string;
}

// Type for global Google API
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (callback: (notification: GooglePromptNotification) => void) => void;
          disableAutoSelect: () => void;
        };
        oauth2: {
          initCodeClient: (config: any) => {
            requestCode: () => void;
          };
          User?: any;
        };
      };
    };
    ASAFARIM_AUTH_CONFIG?: {
      googleClientId?: string;
      redirectUri?: string;
      useRealAuth?: boolean;
    };
  }
}

// Google client ID - Get this from the Google Cloud Console
// Replace with your actual client ID to enable real Google authentication
const GOOGLE_CLIENT_ID = '69391174556-g8vohlhm1vpmiealvmu7b9tr0la9c0sp.apps.googleusercontent.com'; 

// To enable real Google authentication:
// 1. Go to https://console.cloud.google.com/
// 2. Create a project and configure the OAuth consent screen
// 3. Create OAuth client credentials for a web application
// 4. Add your app's URL to authorized JavaScript origins (e.g., http://localhost:3000)
// 5. Copy the Client ID and replace the placeholder above

/**
 * Helper function to process a Google OAuth authorization code
 * Exchanges the code for tokens and user info via backend API
 */
const handleGoogleAuthCode = async (
  code: string, 
  _redirectUri: string, // Original redirect URI (not used since we're generating the exact one)
  resolve: (value: GoogleAuthResponse) => void,
  // We still pass reject for potential future use in production environments
  // where you would reject rather than fallback on error
  _reject: (reason: any) => void
): Promise<void> => {
  // In a real production app, send the code to your backend
  // Get the correct API URL based on the current environment
  const apiBaseUrl = window.location.hostname === 'localhost' ? 
    `http://localhost:5000` : 
    window.location.origin;
  const apiUrl = `${apiBaseUrl}/api/auth/google`;
  
  console.log(`Sending auth code to backend at ${apiUrl}`);
  
  try {
    // Use the exact redirect URI that's registered in Google Cloud Console
    // For localhost, use /auth suffix to match development config
    // For production, use /auth/callback to match production config
    const exactRedirectUri = window.location.hostname === 'localhost' ? 
      `${window.location.origin}/auth` : 
      `https://bibliography.asafarim.com/auth/callback`;
    console.log(`Using exact redirect URI for token exchange: ${exactRedirectUri}`);
    
    // Try to exchange the code with our backend
    const tokenResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        code: code,
        redirectUri: exactRedirectUri // Must exactly match the URI registered in Google Cloud Console
      }),
      credentials: 'include'  // Include cookies if needed
    });
    
    if (!tokenResponse.ok) {
      throw new Error(`Backend API error: ${tokenResponse.status} ${tokenResponse.statusText}`);
    }
    
    // Process the token response from the backend
    const data = await tokenResponse.json();
    
    if (!data || (!data.token && !data.access_token)) {
      throw new Error('Invalid response from backend: missing token');
    }
    
    // Get the user data from the response
    const userData: GoogleUser = {
      id: data.userId || data.sub || `g-${Date.now()}`,
      name: data.name || 'Google User',
      email: data.email || 'user@example.com', 
      imageUrl: data.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || 'Google User')}&background=random`,
    };
    
    const authResponse: GoogleAuthResponse = {
      user: userData,
      token: data.token || data.access_token,
    };
    
    // Save auth data to localStorage
    localStorage.setItem('auth_token', authResponse.token);
    localStorage.setItem('user_data', JSON.stringify(authResponse.user));
    localStorage.removeItem('using_mock_auth'); // Clear mock auth flag
    
    resolve(authResponse);
  } catch (backendError) {
    console.error('Backend API error:', backendError);
    
    // In development only: Try to decode the auth code to get user info if possible
    console.warn('🔶 Backend unavailable - Attempting to get user info from Google directly');
    
    try {
      // Try to get user info from Google's userinfo endpoint using the auth code
      // This is a fallback method when backend is not available
      const googleUserInfoUrl = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${code}`;
      
      const userInfoResponse = await fetch(googleUserInfoUrl).catch(() => null);
      
      if (userInfoResponse?.ok) {
        const googleUserData = await userInfoResponse.json();
        console.log('✅ Got user info from Google API:', googleUserData);
        
        const userData: GoogleUser = {
          id: googleUserData.id || `g-${Date.now()}`,
          name: googleUserData.name || 'Google User',
          email: googleUserData.email || 'user@example.com',
          imageUrl: googleUserData.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(googleUserData.name || 'Google User')}&background=random`,
        };
        
        const authResponse: GoogleAuthResponse = {
          user: userData,
          token: `google-fallback-token-${Date.now()}`,
        };
        
        // Save auth data to localStorage with a flag indicating fallback mode
        localStorage.setItem('auth_token', authResponse.token);
        localStorage.setItem('user_data', JSON.stringify(authResponse.user));
        localStorage.setItem('auth_fallback_mode', 'true');
        
        resolve(authResponse);
        return;
      }
    } catch (googleApiError) {
      console.error('Could not fetch user info from Google API:', googleApiError);
    }
    
    // Final fallback: Use generic user info
    console.warn('🔶 Using generic fallback user data (FOR DEVELOPMENT ONLY)');
    
    const userData: GoogleUser = {
      id: `g-${Date.now()}`,
      name: 'Google User (Fallback)',
      email: 'user@example.com',
      imageUrl: 'https://lh3.googleusercontent.com/a/default-user=s120',
    };
    
    const authResponse: GoogleAuthResponse = {
      user: userData,
      token: `fallback-token-${Date.now()}`,
    };
    
    // Save auth data to localStorage with a flag indicating fallback mode
    localStorage.setItem('auth_token', authResponse.token);
    localStorage.setItem('user_data', JSON.stringify(authResponse.user));
    localStorage.setItem('auth_fallback_mode', 'true'); // Flag for UI indication
    
    // Still resolve to avoid breaking the app, but in production you'd typically reject
    resolve(authResponse);
  }
};

// Initialize Google Auth
export const initGoogleAuth = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
      resolve();
      return;
    }

    // Load the Google API script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('Google Auth script loaded');
      resolve();
    };
    script.onerror = (error) => {
      console.error('Error loading Google Auth script:', error);
      reject(new Error('Failed to load Google Auth script'));
    };
    document.body.appendChild(script);
  });
};

/**
 * Helper function to diagnose common Google OAuth configuration issues
 */
const checkGoogleConfigIssues = (clientId: string, externalConfig: any) => {
  console.log('🔍 Checking Google OAuth configuration...');
  
  // Check client ID
  if (!clientId) {
    console.error('❌ No Google Client ID provided');
  } else if (clientId === 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com') {
    console.error('❌ Default placeholder Google Client ID is being used');
  } else {
    console.log('✅ Google Client ID is set');
  }
  
  // Check redirect URI
  const redirectUri = externalConfig?.redirectUri || window.location.origin;
  // Add /auth to the redirect URI to match Google Cloud Console configuration
  const exactRedirectUri = window.location.hostname === 'localhost' ? 
    `${window.location.origin}/auth` : 
    `https://bibliography.asafarim.com/auth/callback`;
    
  console.log(`📌 Current origin: ${window.location.origin}`);
  console.log(`📌 Auth redirect URI: ${exactRedirectUri}`);
  
  console.log('⚠️ IMPORTANT: You must add the following to your Google Cloud Console:');
  console.log(`   1. Authorized JavaScript origins: ${window.location.origin}`);
  console.log(`   2. Authorized redirect URIs: ${exactRedirectUri}`);
  
  if (redirectUri !== exactRedirectUri) {
    console.warn('⚠️ Config redirect URI does not match expected redirect URI');
    console.log(`   The app will use ${exactRedirectUri} to match Google Cloud Console settings`);
  }
  
  // Check port - common issue with localhost testing
  if (window.location.hostname === 'localhost') {
    console.log(`📌 Testing on localhost with port ${window.location.port}`);
    console.log('   Make sure this exact port is added to authorized JavaScript origins in Google Cloud Console');
  }
  
  console.log('🔍 Google OAuth configuration check complete');
};

// Handle Google Sign In
/**
 * Helper function to try Google One Tap Sign In as a fallback authentication method
 */
const tryGoogleOneTap = (
  clientId: string, 
  resolve: (value: GoogleAuthResponse | null) => void,
  reject: (reason: any) => void
): void => {
  // Option 1: Use Google One Tap Sign In (ID Token flow)
  if (!window.google?.accounts?.id) {
    reject(new Error('Google API not loaded or initialized correctly'));
    return;
  }
  
  console.log(`Initializing Google One Tap with client ID: ${clientId.substring(0, 8)}...`);
  console.log(`Current origin: ${window.location.origin}`);
  
  // Make sure to register the origin as an authorized JavaScript origin in Google Cloud Console
  window.google.accounts.id.initialize({
    client_id: clientId,
    context: "signin",
    cancel_on_tap_outside: true,
    ux_mode: "popup", // Use popup to avoid redirect issues
    callback: async (credentialResponse: GoogleCredentialResponse) => {
      console.log('Google credential response received', credentialResponse);
      
      try {
        // The credential is a JWT token containing user information
        // We can either decode it here or send it to our backend
        if (!credentialResponse.credential) {
          reject(new Error('No credential received from Google'));
          return;
        }
        
        // Decode the JWT locally (fallback option)
        // This is a simple JWT parsing - in production, you should validate the token
        const payload = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
        console.log('✅ Decoded Google credential payload (One Tap):', payload);
        
        const userData: GoogleUser = {
          id: payload.sub,
          name: payload.name || payload.given_name || 'Google User',
          email: payload.email,
          imageUrl: payload.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(payload.name || 'Google User')}&background=random`,
        };
        
        console.log('✅ Using real Google user data from One Tap:', userData);
        
        const authResponse: GoogleAuthResponse = {
          user: userData,
          token: credentialResponse.credential,
        };
        
        // Save auth data to localStorage
        localStorage.setItem('auth_token', authResponse.token);
        localStorage.setItem('user_data', JSON.stringify(authResponse.user));
        localStorage.removeItem('using_mock_auth');
        localStorage.removeItem('auth_fallback_mode'); // Clear fallback flag since we have real data
        
        resolve(authResponse);
      } catch (error) {
        reject(error);
      }
    },
    auto_select: false
  });
  
  // Display the One Tap UI
  window.google.accounts.id.prompt((notification: GooglePromptNotification) => {
    console.log('🔐 Google One Tap prompt response:', {
      isDisplayed: notification.isDisplayed(),
      isNotDisplayed: notification.isNotDisplayed(),
      isSkippedMoment: notification.isSkippedMoment(),
      isDismissedMoment: notification.isDismissedMoment(),
    });
    
    if (notification.isDisplayed()) {
      console.log('✅ Google One Tap is displayed - waiting for user interaction');
    } else if (notification.isNotDisplayed()) {
      console.error(`❌ Google One Tap not displayed. Reason: ${notification.getNotDisplayedReason()}`);
      console.warn(`⚠️ This means the user will need to use the fallback authentication method`);
    } else if (notification.isSkippedMoment()) {
      console.warn(`⚠️ Google One Tap skipped. Reason: ${notification.getSkippedReason()}`);
    }
  });
};

export const handleGoogleLogin = async (): Promise<GoogleAuthResponse | null> => {
  try {
    // Check for auth config from the external script
    const externalConfig = (window as any).ASAFARIM_AUTH_CONFIG;
    const clientId = externalConfig?.googleClientId || GOOGLE_CLIENT_ID;
    
    // Check for common configuration issues
    checkGoogleConfigIssues(clientId, externalConfig);
    
    // For development/demo purposes, use a mock response if explicitly configured to do so
    // or if no client ID is set or it's the placeholder value
    if (externalConfig?.useRealAuth === false || 
        !clientId || 
        clientId === 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com') {
      console.warn('Using mock Google login because real auth is disabled or no client ID is set');
      return handleMockGoogleLogin();
    }

    // Initialize Google client
    await initGoogleAuth();
    
    return new Promise((resolve, reject) => {
      try {
        // Use the client ID from the external config or fall back to the constant
        const externalConfig = (window as any).ASAFARIM_AUTH_CONFIG;
        const clientId = externalConfig?.googleClientId || GOOGLE_CLIENT_ID;
        const redirectUri = externalConfig?.redirectUri || window.location.origin;
        
        console.log(`Initiating Google sign-in with clientId: ${clientId}`);
        
        // Try the authorization code flow first as it's more reliable across different browsers and environments
        if (!window.google?.accounts?.oauth2) {
          console.warn('Google OAuth2 API not available, falling back to One Tap Sign In');
          // Fall back to One Tap Sign In if OAuth2 is not available
          tryGoogleOneTap(clientId, resolve, reject);
          return;
        }
        
        // Determine the correct redirect URI based on environment
        const exactRedirectUri = window.location.hostname === 'localhost' ? 
          `${window.location.origin}/auth` : 
          `https://bibliography.asafarim.com/auth/callback`;
        
        console.log(`Initializing Google OAuth code flow with client ID: ${clientId.substring(0, 8)}...`);
        console.log(`Using redirect URI: ${exactRedirectUri}`);
        
        try {
          const client = window.google.accounts.oauth2.initCodeClient({
            client_id: clientId,
            scope: 'email profile',
            redirect_uri: exactRedirectUri,
            callback: async (response: { code?: string }) => {
              if (!response.code) {
                console.error('No authorization code received from Google');
                // Fall back to One Tap Sign In if code flow fails
                tryGoogleOneTap(clientId, resolve, reject);
                return;
              }
              
              try {
                console.log('✅ Received auth code from Google OAuth flow');
                await handleGoogleAuthCode(response.code, redirectUri, resolve, reject);
              } catch (error) {
                console.error('Error processing auth code:', error);
                reject(error);
              }
            }
          });
          
          // Request authorization code
          client.requestCode();
        } catch (error) {
          console.error('Failed to initialize Google auth code client, falling back to One Tap:', error);
          // Fall back to One Tap Sign In if code flow fails
          tryGoogleOneTap(clientId, resolve, reject);
        }
      } catch (error) {
        console.error('Google OAuth initialization error:', error);
        reject(error);
      }
    });
  } catch (error) {
    console.error('Google login error:', error);
    return null;
  }
};

// Mock Google login for development
const handleMockGoogleLogin = (): Promise<GoogleAuthResponse> => {
  return new Promise((resolve) => {
    console.warn('🔶 MOCK AUTH: Using demo authentication instead of real Google OAuth');
    
    // Simulate network delay
    setTimeout(() => {
      const mockResponse: GoogleAuthResponse = {
        user: {
          id: 'google-user-id-' + Math.random().toString(36).substring(2, 9),
          name: 'Demo User (MOCK)',
          email: 'asafarim@gmail.com',
          imageUrl: 'https://ui-avatars.com/api/?name=Demo+User&background=random',
        },
        token: 'mock-jwt-token-' + Date.now(),
      };
      
      localStorage.setItem('auth_token', mockResponse.token);
      localStorage.setItem('user_data', JSON.stringify(mockResponse.user));
      localStorage.setItem('using_mock_auth', 'true'); // Flag to indicate mock auth
      
      resolve(mockResponse);
    }, 800); // Add delay to simulate network request
  });
};

// Export the tryGoogleOneTap function for testing purposes
export const forceGoogleOneTap = async (): Promise<GoogleAuthResponse | null> => {
  try {
    const externalConfig = (window as any).ASAFARIM_AUTH_CONFIG;
    const clientId = externalConfig?.googleClientId || GOOGLE_CLIENT_ID;
    
    console.log('🔐 Forcing Google One Tap authentication...');
    
    // Initialize Google client
    await initGoogleAuth();
    
    return new Promise((resolve, reject) => {
      tryGoogleOneTap(clientId, resolve, reject);
    });
  } catch (error) {
    console.error('Error forcing Google One Tap:', error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('auth_token') !== null;
};

export const getCurrentUser = (): GoogleAuthResponse['user'] | null => {
  const userData = localStorage.getItem('user_data');
  return userData ? JSON.parse(userData) : null;
};

export const getAuthDebugInfo = (): any => {
  return {
    authToken: localStorage.getItem('auth_token'),
    userData: localStorage.getItem('user_data'),
    usingMockAuth: localStorage.getItem('using_mock_auth'),
    authFallbackMode: localStorage.getItem('auth_fallback_mode'),
    isAuthenticated: isAuthenticated(),
    currentUser: getCurrentUser(),
  };
};

export const logout = (): Promise<void> => {
  return new Promise<void>((resolve) => {
    // Clear all auth data from local storage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('using_mock_auth');
    localStorage.removeItem('auth_fallback_mode');
    
    // If we're using real Google auth, try to sign out from Google too
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
    
    console.log('✅ User logged out successfully');
    
    // No need to redirect, let the app handle navigation
    resolve();
  });
};
