import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act } from 'react';
import { Provider } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
import { TestRenderer } from '../utils/test-utils';

// Define a more comprehensive BookState that matches your actual implementation
interface Book {
  id: string;
  title: string;
  author: string;
}

interface BookState {
  books: Book[];
  selectedBook: Book | null;
  loading: boolean;
  error: string | null;
}

// Create a more realistic initial state
const initialState: BookState = {
  books: [],
  selectedBook: null,
  loading: false,
  error: null
};

// Create a mock slice with more actions to test different scenarios
const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setLoading: (state: BookState) => {
      state.loading = true;
    },
    setError: (state: BookState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addBook: (state: BookState, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
      state.loading = false;
    },
    selectBook: (state: BookState, action: PayloadAction<string>) => {
      state.selectedBook = state.books.find(book => book.id === action.payload) || null;
    },
    clearSelectedBook: (state: BookState) => {
      state.selectedBook = null;
    }
  }
});

// Create a mock store that matches the actual store structure
const createMockStore = () => configureStore({
  reducer: {
    books: bookSlice.reducer
  }
});

// Type for our mock store state
type MockStoreState = ReturnType<ReturnType<typeof createMockStore>['getState']>;

// Extract action creators for easier testing
const { setLoading, setError, addBook, selectBook, clearSelectedBook } = bookSlice.actions;

describe("Redux Hooks", () => {
  // Test useAppDispatch hook
  describe("useAppDispatch", () => {
    let store: ReturnType<typeof createMockStore>;
    let renderer: TestRenderer;
    
    beforeEach(() => {
      store = createMockStore();
      renderer = new TestRenderer();
    });
    
    afterEach(() => {
      renderer.unmount();
      vi.clearAllMocks();
    });
    
    it("should return a dispatch function", () => {
      // Create a custom hook component to test useAppDispatch
      const TestComponent = () => {
        const dispatch = useAppDispatch();
        // @ts-ignore - Adding a property to window for testing purposes
        window.testDispatch = dispatch;
        return null;
      };
      
      act(() => {
        renderer.render(
          <Provider store={store}>
            <TestComponent />
          </Provider>
        );
      });
      
      // @ts-ignore - Accessing the property we added to window
      expect(window.testDispatch).toBeDefined();
      // @ts-ignore
      expect(typeof window.testDispatch).toBe("function");
    });
    
    it("should correctly dispatch actions", () => {
      // Create a spy on the store's dispatch method
      const dispatchSpy = vi.spyOn(store, 'dispatch');
      
      // Create a custom hook component to test useAppDispatch
      const TestComponent = () => {
        const dispatch = useAppDispatch();
        // Dispatch an action in the component
        React.useEffect(() => {
          dispatch(setLoading());
        }, [dispatch]);
        return null;
      };
      
      act(() => {
        renderer.render(
          <Provider store={store}>
            <TestComponent />
          </Provider>
        );
      });
      
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(setLoading());
    });
    
    it("should dispatch actions with payloads", () => {
      // Create a spy on the store's dispatch method
      const dispatchSpy = vi.spyOn(store, 'dispatch');
      
      const testBook: Book = { id: '1', title: 'Test Book', author: 'Test Author' };
      
      // Create a custom hook component to test useAppDispatch
      const TestComponent = () => {
        const dispatch = useAppDispatch();
        // Dispatch an action with payload in the component
        React.useEffect(() => {
          dispatch(addBook(testBook));
        }, [dispatch]);
        return null;
      };
      
      act(() => {
        renderer.render(
          <Provider store={store}>
            <TestComponent />
          </Provider>
        );
      });
      
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(addBook(testBook));
    });
  });
  
  // Test useAppSelector hook
  describe("useAppSelector", () => {
    let store: ReturnType<typeof createMockStore>;
    let renderer: TestRenderer;
    
    beforeEach(() => {
      store = createMockStore();
      renderer = new TestRenderer();
    });
    
    afterEach(() => {
      renderer.unmount();
    });
    
    it("should select loading state from the store", () => {
      // Create a component that uses the selector
      const TestComponent = () => {
        const loading = useAppSelector((state: MockStoreState) => state.books.loading);
        // @ts-ignore - Adding a property to window for testing purposes
        window.testLoading = loading;
        return null;
      };
      
      act(() => {
        renderer.render(
          <Provider store={store}>
            <TestComponent />
          </Provider>
        );
      });
      
      // @ts-ignore
      expect(window.testLoading).toBe(false);
      
      // Update the store directly to test if selector updates
      act(() => {
        store.dispatch(setLoading());
        // Re-render to update the component with new state
        renderer.render(
          <Provider store={store}>
            <TestComponent />
          </Provider>
        );
      });
      
      // @ts-ignore
      expect(window.testLoading).toBe(true);
    });
    
    it("should select books array from the store", () => {
      // Create a component that uses the selector
      const TestComponent = () => {
        const books = useAppSelector((state: MockStoreState) => state.books.books);
        // @ts-ignore - Adding a property to window for testing purposes
        window.testBooks = books;
        return null;
      };
      
      act(() => {
        renderer.render(
          <Provider store={store}>
            <TestComponent />
          </Provider>
        );
      });
      
      // @ts-ignore
      expect(window.testBooks).toEqual([]);
      
      const testBook: Book = { id: '1', title: 'Test Book', author: 'Test Author' };
      
      // Add a book to the store
      act(() => {
        store.dispatch(addBook(testBook));
        // Re-render to update the component with new state
        renderer.render(
          <Provider store={store}>
            <TestComponent />
          </Provider>
        );
      });
      
      // @ts-ignore
      expect(window.testBooks).toEqual([testBook]);
    });
    
    it("should select error state from the store", () => {
      // Create a component that uses the selector
      const TestComponent = () => {
        const error = useAppSelector((state: MockStoreState) => state.books.error);
        // @ts-ignore - Adding a property to window for testing purposes
        window.testError = error;
        return null;
      };
      
      act(() => {
        renderer.render(
          <Provider store={store}>
            <TestComponent />
          </Provider>
        );
      });
      
      // @ts-ignore
      expect(window.testError).toBeNull();
      
      const errorMessage = "Failed to fetch books";
      
      // Set an error in the store
      act(() => {
        store.dispatch(setError(errorMessage));
        // Re-render to update the component with new state
        renderer.render(
          <Provider store={store}>
            <TestComponent />
          </Provider>
        );
      });
      
      // @ts-ignore
      expect(window.testError).toBe(errorMessage);
    });
    
    it("should select selectedBook from the store", () => {
      // Create a component that uses the selector
      const TestComponent = () => {
        const selectedBook = useAppSelector((state: MockStoreState) => state.books.selectedBook);
        // @ts-ignore - Adding a property to window for testing purposes
        window.testSelectedBook = selectedBook;
        return null;
      };
      
      act(() => {
        renderer.render(
          <Provider store={store}>
            <TestComponent />
          </Provider>
        );
      });
      
      // @ts-ignore
      expect(window.testSelectedBook).toBeNull();
      
      // Add multiple books
      const books: Book[] = [
        { id: '1', title: 'Book 1', author: 'Author 1' },
        { id: '2', title: 'Book 2', author: 'Author 2' },
        { id: '3', title: 'Book 3', author: 'Author 3' }
      ];
      
      // Add books and select one
      act(() => {
        books.forEach(book => store.dispatch(addBook(book)));
        store.dispatch(selectBook('2'));
        // Re-render to update the component with new state
        renderer.render(
          <Provider store={store}>
            <TestComponent />
          </Provider>
        );
      });
      
      // @ts-ignore
      expect(window.testSelectedBook).toEqual(books[1]);
      
      // Clear selected book
      act(() => {
        store.dispatch(clearSelectedBook());
        // Re-render to update the component with new state
        renderer.render(
          <Provider store={store}>
            <TestComponent />
          </Provider>
        );
      });
      
      // @ts-ignore
      expect(window.testSelectedBook).toBeNull();
    });
  });
});
