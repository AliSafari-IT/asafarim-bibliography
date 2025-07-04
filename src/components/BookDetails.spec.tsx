// tests/BookDetails.test.tsx
import { screen } from '@testing-library/react';
import BookDetails from './BookDetails';
import { useAppSelector } from '../hooks/reduxHooks';
import useFetch from '../hooks/useFetch';
import { vi } from 'vitest';
import { renderComponent } from '../utils/test-utils';

// Mock redux hook
vi.mock('../hooks/reduxHooks', () => ({
  useAppSelector: vi.fn(),
}));

// Mock custom fetch hook
vi.mock('../hooks/useFetch', () => ({
  __esModule: true,
  default: vi.fn(),
}));

const mockBook = {
  title: 'Mocked Book',
  author: 'John Doe',
  year: 2020,
  genre: 'Fiction',
  isRead: true,
};

describe('<BookDetails />', () => {
  let cleanup: () => void;
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });

  it('renders fallback when no bookId is provided', () => {
    (useAppSelector as any).mockReturnValue({ selectedBook: null });
    (useFetch as any).mockReturnValue({ data: null, loading: false, error: null });

    const { unmount } = renderComponent(<BookDetails bookId="" />);
    cleanup = unmount;
    
    expect(screen.getByText(/select a book/i)).toBeInTheDocument();
  });

  it('renders loading state', () => {
    (useAppSelector as any).mockReturnValue({ selectedBook: null });
    (useFetch as any).mockReturnValue({ data: null, loading: true, error: null });

    const { unmount } = renderComponent(<BookDetails bookId="1" />);
    cleanup = unmount;
    
    expect(screen.getByText('Loading book details...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useAppSelector as any).mockReturnValue({ selectedBook: null });
    (useFetch as any).mockReturnValue({ data: null, loading: false, error: { message: 'Failed' } });

    const { unmount } = renderComponent(<BookDetails bookId="1" />);
    cleanup = unmount;
    
    expect(screen.getByText(/error: failed/i)).toBeInTheDocument();
  });

  it('renders BookDetails with fetched data', () => {
    (useAppSelector as any).mockReturnValue({ selectedBook: null });
    (useFetch as any).mockReturnValue({ data: mockBook, loading: false, error: null });

    const { unmount } = renderComponent(<BookDetails bookId="1" />);
    cleanup = unmount;
    
    const bookTitles = screen.getAllByTestId('book-title');
    expect(bookTitles.length).toBeGreaterThan(0);
    expect(bookTitles[0]).toHaveTextContent('Mocked Book');
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('Fiction')).toBeInTheDocument();
    // Use a more specific selector for the 'Read' status to avoid multiple matches
    expect(screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'p' && 
             element?.className.includes('bg-green-800') && 
             content === 'Read';
    })).toBeInTheDocument();
  });

  it('falls back to Redux store when fetch has no data', () => {
    (useAppSelector as any).mockReturnValue({ selectedBook: mockBook });
    (useFetch as any).mockReturnValue({ data: null, loading: false, error: null });

    const { unmount } = renderComponent(<BookDetails bookId="1" />);
    cleanup = unmount;
    
    const bookTitles = screen.getAllByTestId('book-title');
    expect(bookTitles.length).toBeGreaterThan(0);
    expect(bookTitles[0]).toHaveTextContent('Mocked Book');
  });
});
