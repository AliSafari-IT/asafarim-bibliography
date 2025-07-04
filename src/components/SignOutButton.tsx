import { useAuth } from "../contexts/AuthContext";

/**
 * SignOutButton component
 * A standalone button that handles user sign out
 */
const SignOutButton = () => {
  const { logout, loading } = useAuth();

  return (
    <button
      onClick={logout}
      className="ml-3 flex items-center px-3 py-1.5 text-sm rounded-md hover:shadow-md transition-colors"
      style={{
        backgroundColor: loading ? "var(--bg-tertiary)" : "var(--error)",
        color: loading ? "var(--text-secondary)" : "white"
      }}
      disabled={loading}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      <span className="hidden sm:inline">{loading ? "Signing out..." : "Sign Out"}</span>
      <span className="sm:hidden">Exit</span>
    </button>
  );
};

export default SignOutButton;
