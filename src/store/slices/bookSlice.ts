import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Book, BookFormData } from '../../types/Book';

interface BookState {
  books: Book[];
  selectedBook: Book | null;
  loading: boolean;
  error: string | null;
}

const initialState: BookState = {
  books: [],
  selectedBook: null,
  loading: false,
  error: null,
};

// Async thunk for fetching books
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      // Add timeout to handle potential connection issues
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch('/api/books', {
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `Failed to fetch books: ${response.status} ${response.statusText}`
        );
      }
      
      const data = await response.json();
      // The API returns { $id: "1", $values: [] } format, handle that case
      return Array.isArray(data) ? data : (data.$values || []);
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return rejectWithValue('Request timed out. The API server might be unavailable.');
      }
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

// Async thunk for adding a book
export const addBook = createAsyncThunk(
  'books/addBook',
  async (book: BookFormData, { rejectWithValue }) => {
    try {
      // Add timeout to handle potential connection issues
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...book,
          createdBy: 'Frontend User',
          isActive: true,
          isDeleted: false
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `Failed to add book: ${response.status} ${response.statusText}`
        );
      }
      
      return await response.json();
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return rejectWithValue('Request timed out. The API server might be unavailable.');
      }
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

// Async thunk for updating a book
export const updateBook = createAsyncThunk(
  'books/updateBook',
  async ({ id, bookData }: { id: string; bookData: Partial<Book> }, { rejectWithValue }) => {
    try {
      // Add timeout to handle potential connection issues
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookData,
          id: id, // Ensure ID is included and matches URL parameter
          // Make sure all required fields are present
          updatedAt: bookData.updatedAt || new Date().toISOString(),
          updatedBy: bookData.updatedBy || 'Frontend User',
          // These fields are from BaseEntity and might be required
          createdBy: bookData.createdBy || 'Frontend User',
          isActive: bookData.isActive !== undefined ? bookData.isActive : true,
          isDeleted: bookData.isDeleted !== undefined ? bookData.isDeleted : false,
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `Failed to update book: ${response.status} ${response.statusText}`
        );
      }
      
      return await response.json();
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return rejectWithValue('Request timed out. The API server might be unavailable.');
      }
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

// Async thunk for deleting a book
export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (id: string, { rejectWithValue }) => {
    try {
      // Add timeout to handle potential connection issues
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `Failed to delete book: ${response.status} ${response.statusText}`
        );
      }
      
      return id;
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return rejectWithValue('Request timed out. The API server might be unavailable.');
      }
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    selectBook: (state, action: PayloadAction<string>) => {
      state.selectedBook = state.books.find(book => book.id === action.payload) || null;
    },
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
    toggleReadStatus: (state, action: PayloadAction<string>) => {
      const book = state.books.find(book => book.id === action.payload);
      if (book) {
        book.isRead = !book.isRead;
      }
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(book => book.id !== action.payload);
      if (state.selectedBook?.id === action.payload) {
        state.selectedBook = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchBooks
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle addBook
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle updateBook
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.books.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
        if (state.selectedBook?.id === action.payload.id) {
          state.selectedBook = action.payload;
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle deleteBook
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter(book => book.id !== action.payload);
        if (state.selectedBook?.id === action.payload) {
          state.selectedBook = null;
        }
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { selectBook, clearSelectedBook, toggleReadStatus, removeBook } = bookSlice.actions;
export default bookSlice.reducer;
