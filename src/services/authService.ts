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

// Google client ID - Replace with your actual client ID from Google Developer Console
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

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

// Handle Google Sign In
export const handleGoogleLogin = async (): Promise<GoogleAuthResponse | null> => {
  try {
    // For development/demo purposes, use a mock response if no client ID is set
    if (GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com') {
      console.warn('Using mock Google login because no client ID is set');
      return handleMockGoogleLogin();
    }

    // Initialize Google client
    await initGoogleAuth();
    
    return new Promise((resolve, reject) => {
      try {
        // @ts-ignore - Google client is loaded via script
        const client = google.accounts.oauth2.initCodeClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'email profile',
          callback: async (response: any) => {
            if (response.code) {
              // Exchange the code for tokens on your backend
              try {
                // In a real app, you would send this to your backend:
                // const tokenResponse = await fetch('/api/auth/google', {
                //   method: 'POST',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify({ code: response.code }),
                // });
                // const data = await tokenResponse.json();
                
                // For demo, create a simulated successful response
                const userData: GoogleUser = {
                  id: 'g-' + Math.random().toString(36).substring(2, 15),
                  name: 'Google User',
                  email: 'user@gmail.com',
                  imageUrl: 'https://lh3.googleusercontent.com/a/default-user=s120',
                };
                
                const authResponse: GoogleAuthResponse = {
                  user: userData,
                  token: 'google-oauth-token-' + Date.now(),
                };
                
                // Save auth data to localStorage
                localStorage.setItem('auth_token', authResponse.token);
                localStorage.setItem('user_data', JSON.stringify(authResponse.user));
                
                resolve(authResponse);
              } catch (error) {
                console.error('Error exchanging code for tokens:', error);
                reject(error);
              }
            } else {
              reject(new Error('No authorization code received'));
            }
          },
        });
        
        // Request authorization code
        client.requestCode();
      } catch (error) {
        console.error('Failed to initialize Google auth client:', error);
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
    // Simulate network delay
    setTimeout(() => {
      const mockResponse: GoogleAuthResponse = {
        user: {
          id: 'google-user-id-' + Math.random().toString(36).substring(2, 9),
          name: 'Demo User',
          email: 'demo@example.com',
          imageUrl: 'https://ui-avatars.com/api/?name=Demo+User&background=random',
        },
        token: 'mock-jwt-token-' + Date.now(),
      };
      
      localStorage.setItem('auth_token', mockResponse.token);
      localStorage.setItem('user_data', JSON.stringify(mockResponse.user));
      
      resolve(mockResponse);
    }, 800); // Add delay to simulate network request
  });
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('auth_token') !== null;
};

export const getCurrentUser = (): GoogleAuthResponse['user'] | null => {
  const userData = localStorage.getItem('user_data');
  return userData ? JSON.parse(userData) : null;
};

export const logout = (): Promise<void> => {
  return new Promise<void>((resolve) => {
    // Clear local storage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    // If we're using real Google auth, try to sign out from Google too
    // @ts-ignore - Google client may be loaded via script
    if (window.google?.accounts?.oauth2) {
      // @ts-ignore
      google.accounts.id.disableAutoSelect();
    }
    
    // No need to redirect, let the app handle navigation
    resolve();
  });
};
