import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * This component handles the callback from Google OAuth
 * It extracts the authorization code from the URL and processes it
 */
const GoogleAuthCallback: React.FC = () => {
  const [status, setStatus] = useState<string>('Processing authentication...');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract code from URL parameters
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    
    if (error) {
      console.error('Google OAuth error:', error);
      setStatus('Authentication failed');
      setError(`Error: ${error}`);
      // Redirect to login page after a delay
      setTimeout(() => navigate('/auth'), 2000);
      return;
    }

    if (code) {
      console.log('Authorization code received, processing...');
      setStatus('Authorization code received, processing...');
      
      // The actual code handling is done in authService.ts through the browser redirect
      // This component mainly handles error cases and provides feedback
      
      // Redirect to home page
      setTimeout(() => {
        navigate('/');
      }, 500);
    } else {
      setStatus('No authorization code found');
      setError('Missing authorization code in the callback URL');
      // Redirect to login page after a delay
      setTimeout(() => navigate('/auth'), 2000);
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Google Authentication</h2>
        <p className="mb-4">{status}</p>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleAuthCallback;
