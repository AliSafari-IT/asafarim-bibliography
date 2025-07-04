interface GoogleAuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
  };
  token: string;
}

export const initGoogleAuth = (): Promise<void> => {
  return new Promise((resolve) => {
    // Load the Google API script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

export const handleGoogleLogin = async (): Promise<GoogleAuthResponse | null> => {
  try {
    // Mock response for demonstration purposes
    const mockResponse: GoogleAuthResponse = {
      user: {
        id: 'google-user-id',
        name: 'Google User',
        email: 'user@gmail.com',
        imageUrl: 'https://via.placeholder.com/150',
      },
      token: 'mock-jwt-token',
    };
    
    localStorage.setItem('auth_token', mockResponse.token);
    localStorage.setItem('user_data', JSON.stringify(mockResponse.user));
    
    return mockResponse;
  } catch (error) {
    console.error('Google login error:', error);
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

export const logout = (): void => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_data');
  // Redirect to home page or login page
  window.location.href = '/';
};
