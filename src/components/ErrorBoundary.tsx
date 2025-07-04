import React, { useState, useEffect } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorState {
  hasError: boolean;
  error: Error | null;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, fallback }) => {
  const [errorState, setErrorState] = useState<ErrorState>({ hasError: false, error: null });

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setErrorState({ hasError: true, error: event.error });
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (errorState.hasError) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h2 className="text-lg font-semibold text-red-700">Something went wrong</h2>
        <p className="mt-2 text-sm text-red-600">{errorState.error?.message}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
