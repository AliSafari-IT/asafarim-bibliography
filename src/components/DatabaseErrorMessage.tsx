import React from 'react';

interface DatabaseErrorMessageProps {
  error: string | null;
  onRetry?: () => void;
}

const DatabaseErrorMessage: React.FC<DatabaseErrorMessageProps> = ({ error, onRetry }) => {
  // Check if the error is related to missing database tables
  const isTableMissingError = error?.toLowerCase().includes("table") && 
                             error?.toLowerCase().includes("doesn't exist");

  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm my-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-red-800">
            {isTableMissingError ? 'Database Tables Not Found' : 'Database Error'}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            {isTableMissingError ? (
              <div>
                <p>The required database tables for the bibliography feature don't exist yet.</p>
                <p className="mt-2">This typically happens when database migrations haven't been applied.</p>
                <div className="mt-4 bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="font-mono text-sm text-gray-700">
                    The API server reported: {error}
                  </p>
                </div>
              </div>
            ) : (
              <p>{error || 'An unknown database error occurred'}</p>
            )}
          </div>
          {onRetry && (
            <div className="mt-4">
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatabaseErrorMessage;
