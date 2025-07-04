import { useAuth } from "../contexts/AuthContext";

/**
 * UserProfile component
 * Displays information about the currently logged in user
 */
const UserProfile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center">
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
    </div>
  );
};

export default UserProfile;
