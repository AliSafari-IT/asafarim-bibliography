import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useAuth } from '../contexts/AuthContext';

const AuthPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div 
        className="w-full max-w-md p-8 rounded-lg shadow-lg"
        style={{ 
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-primary)",
          borderWidth: "1px",
          borderStyle: "solid"
        }}
      >
        <h1 
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: "var(--text-primary)" }}
        >
          Sign in to ASafariM Bibliography
        </h1>
        
        <p 
          className="mb-8 text-center"
          style={{ color: "var(--text-secondary)" }}
        >
          Access your personal book collection and manage your bibliography.
        </p>
        
        <div className="flex justify-center">
          <GoogleLoginButton 
            className="w-full justify-center py-2.5"
            onLoginSuccess={() => navigate('/')}
          />
        </div>
        
        <p 
          className="mt-8 text-sm text-center"
          style={{ color: "var(--text-secondary)" }}
        >
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
