import { useEffect } from 'react';
import { initGoogleAuth } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

interface GoogleLoginButtonProps {
  onLoginSuccess?: () => void;
  onLogout?: () => void;
  className?: string;
}

const GoogleLoginButton = ({ onLoginSuccess, onLogout, className = '' }: GoogleLoginButtonProps) => {
  // Use the auth context to get the user state and methods
  const { user, isLoggedIn, login, logout, loading } = useAuth();

  // Initialize Google Auth when component mounts
  useEffect(() => {
    const init = async () => {
      try {
        await initGoogleAuth();
      } catch (error) {
        console.error('Failed to initialize Google Auth:', error);
      }
    };
    
    init();
  }, []);

  const handleLogin = async () => {
    try {
      await login();
      onLoginSuccess?.();
    } catch (error) {
      console.error('Login handler error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      onLogout?.();
    } catch (error) {
      console.error('Logout handler error:', error);
    }
  };

  return isLoggedIn ? (
    <div className={`flex items-center ${className}`}>
      {user && (
        <div className="flex items-center mr-2">
          {user.imageUrl && (
            <img 
              src={user.imageUrl} 
              alt={user.name} 
              className="w-7 h-7 rounded-full mr-2 hidden sm:block"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="text-sm font-medium truncate max-w-[80px] sm:max-w-none" 
               style={{ color: "var(--text-primary)" }}>
            {user.name}
          </div>
        </div>
      )}
      <button
        onClick={handleLogout}
        style={{ 
          backgroundColor: loading ? "var(--bg-tertiary)" : "var(--error)", 
          color: loading ? "var(--text-secondary)" : "white",
          transition: "all 0.2s ease"
        }}
        className="flex items-center px-3 py-1.5 text-sm rounded-md hover:shadow-md"
        disabled={loading}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        <span className="sm:hidden">{loading ? 'Exiting...' : 'Exit'}</span>
        <span className="hidden sm:inline">{loading ? 'Signing out...' : 'Sign Out'}</span>
      </button>
    </div>
  ) : (
    <button
      onClick={handleLogin}
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        border: "1px solid var(--border-primary)",
        transition: "all 0.2s ease"
      }}
      className={`flex items-center justify-center px-3 py-1.5 text-sm rounded-md hover:shadow-md ${className}`}
      disabled={loading}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5 mr-2 hidden sm:block" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="sm:hidden">Login</span>
          <span className="hidden sm:inline">Sign in with Google</span>
        </>
      )}
    </button>
  );
};

export default GoogleLoginButton;
