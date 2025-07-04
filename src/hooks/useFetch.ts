import { useState, useEffect, useCallback } from 'react';

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseFetchOptions {
  headers?: HeadersInit;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  mode?: RequestMode;
  immediate?: boolean;
}

function useFetch<T = any>(url: string, options: UseFetchOptions = {}) {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: options.immediate !== false,
    error: null,
  });

  const [fetchCount, setFetchCount] = useState(0);

  const fetchData = useCallback(async (fetchOptions: UseFetchOptions = {}) => {
    // Combine the original options with any new options
    const combinedOptions = { ...options, ...fetchOptions };
    
    // Don't fetch if URL is empty
    if (!url) return;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Prepare the request options
      const requestOptions: RequestInit = {
        method: combinedOptions.method || 'GET',
        headers: combinedOptions.headers || {
          'Content-Type': 'application/json',
        },
        credentials: combinedOptions.credentials,
        cache: combinedOptions.cache,
        mode: combinedOptions.mode,
      };

      // Add body for non-GET requests
      if (combinedOptions.body && requestOptions.method !== 'GET') {
        requestOptions.body = 
          typeof combinedOptions.body === 'string' 
            ? combinedOptions.body 
            : JSON.stringify(combinedOptions.body);
      }

      const response = await fetch(url, requestOptions);

      // Handle non-2xx responses
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response based on content type
      const contentType = response.headers.get('content-type');
      let data: T;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else if (contentType && contentType.includes('text/')) {
        data = await response.text() as unknown as T;
      } else {
        data = await response.blob() as unknown as T;
      }

      setState({
        data,
        loading: false,
        error: null,
      });

      return { data, response };
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error(String(error)),
      });

      return { error };
    }
  }, [url, options]);

  // Trigger fetch on mount or when dependencies change
  useEffect(() => {
    if (options.immediate !== false) {
      fetchData();
    }
  }, [url, fetchCount, fetchData]);

  // Function to manually trigger a fetch
  const refetch = useCallback((fetchOptions: UseFetchOptions = {}) => {
    setFetchCount(count => count + 1);
    return fetchData(fetchOptions);
  }, [fetchData]);

  return {
    ...state,
    refetch,
  };
}

export default useFetch;
