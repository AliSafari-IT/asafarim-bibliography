// bookSlice.spec.ts
import { configureStore } from '@reduxjs/toolkit';
import bookReducer, { fetchBooks, addBook, selectBook, clearSelectedBook, toggleReadStatus, removeBook } from './bookSlice';
import { vi } from 'vitest';
import type { Book, BookFormData } from '../../types/Book';

interface RootState {
  books: {
    books: Book[];
    selectedBook: Book | null;
    loading: boolean;
    error: string | null;
  }
}

const mockBook: Book = {
  id: '1',
  title: 'Test Book',
  author: 'Test Author',
  year: 2023,
  genre: 'Test Genre',
  isRead: false,
  createdBy: 'Test User',
  updatedBy: 'Test User',
  deletedBy: undefined,
  isActive: true,
  isDeleted: false
};

const mockApiResponse = {
  $id: '1',
  $values: [mockBook]
};

describe('bookSlice', () => {
  let store: ReturnType<typeof configureStore<{ books: ReturnType<typeof bookReducer> }>>;

  beforeEach(() => {
    store = configureStore({ reducer: { books: bookReducer } });
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should handle initial state', () => {
    expect(store.getState()).toEqual<RootState>({
      books: {
        books: [],
        selectedBook: null,
        loading: false,
        error: null
      }
    });
  });

  describe('reducers', () => {
    beforeEach(() => {
      store = configureStore({
        reducer: { books: bookReducer },
        preloadedState: {
          books: {
            books: [mockBook],
            selectedBook: null,
            loading: false,
            error: null
          }
        }
      });
    });

    it('should handle selectBook', () => {
      store.dispatch(selectBook('1'));
      expect(store.getState().books.selectedBook).toEqual(mockBook);
    });

    it('should handle clearSelectedBook', () => {
      store.dispatch(selectBook('1'));
      store.dispatch(clearSelectedBook());
      expect(store.getState().books.selectedBook).toBeNull();
    });

    it('should handle toggleReadStatus', () => {
      store.dispatch(toggleReadStatus('1'));
      expect(store.getState().books.books[0].isRead).toBe(true);
    });

    it('should handle removeBook', () => {
      store.dispatch(removeBook('1'));
      expect(store.getState().books.books).toHaveLength(0);
    });
  });

  describe('async thunks', () => {
    describe('fetchBooks', () => {
      it('should handle successful fetch', async () => {
        (global.fetch as any).mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockApiResponse)
        });

        await store.dispatch(fetchBooks());
        const state = store.getState().books;
        
        expect(state.books).toEqual([mockBook]);
        expect(state.loading).toBe(false);
        expect(state.error).toBeNull();
      });

      it('should handle fetch error', async () => {
        (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

        await store.dispatch(fetchBooks());
        const state = store.getState().books;
        
        expect(state.error).toBe('Network error');
        expect(state.loading).toBe(false);
      });

      it('should handle timeout error', async () => {
        const abortError = new DOMException('AbortError', 'AbortError');
        (global.fetch as any).mockRejectedValueOnce(abortError);

        await store.dispatch(fetchBooks());
        const state = store.getState().books;
        
        expect(state.error).toBe('Request timed out. The API server might be unavailable.');
        expect(state.loading).toBe(false);
      });
    });

    describe('addBook', () => {
      const newBook: BookFormData = {
        title: 'New Book',
        author: 'New Author',
        year: 2023,
        genre: 'New Genre',
        isRead: false,
        createdBy: 'Test User',
        isActive: true
      };

      it('should handle successful addition', async () => {
        (global.fetch as any).mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockBook)
        });

        await store.dispatch(addBook(newBook));
        const state = store.getState().books;
        
        expect(state.books).toContainEqual(mockBook);
        expect(state.loading).toBe(false);
        expect(state.error).toBeNull();
      });

      it('should handle addition error', async () => {
        (global.fetch as any).mockRejectedValueOnce(new Error('Server error'));

        await store.dispatch(addBook(newBook));
        const state = store.getState().books;
        
        expect(state.error).toBe('Server error');
        expect(state.loading).toBe(false);
      });
    });
  });
});