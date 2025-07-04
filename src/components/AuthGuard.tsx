import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * AuthGuard component
 * Wraps protected content that should only be visible to authenticated users
 */
const AuthGuard = ({ children, fallback = null }: AuthGuardProps) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default AuthGuard;
