import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

/**
 * UserProfile component
 * Displays information about the currently logged in user
 */
const UserProfile = () => {
  const { user } = useAuth();
  const [isMockAuth, setIsMockAuth] = useState(false);
  
  // Check if using mock authentication
  useEffect(() => {
    setIsMockAuth(localStorage.getItem('using_mock_auth') === 'true');
  }, [user]);

  if (!user) return null;

  return (
    <div className="flex items-center relative">
      {user.imageUrl && (
        <img
          src={user.imageUrl}
          alt={`${user.name}'s profile`}
          className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
          referrerPolicy="no-referrer"
        />
      )}
      <span
        className="ml-2 text-sm font-medium hidden sm:block"
        style={{ color: "var(--text-primary)" }}
      >
        {user.name}
      </span>
      
      {isMockAuth && (
        <span 
          className="absolute -top-1 -right-1 px-1 py-0.5 text-xs rounded"
          style={{
            backgroundColor: "var(--warning)",
            color: "var(--text-warning)",
            fontSize: "0.65rem"
          }}
          title="Using demo authentication. Configure a Google Client ID to enable real login."
        >
          DEMO
        </span>
      )}
    </div>
  );
};

export default UserProfile;
