import React from 'react';
import { useAppSelector } from '../hooks/reduxHooks';
import useFetch from '../hooks/useFetch';
import { Book } from '../types/Book';

interface BookDetailsProps {
  bookId: string;
}

const BookDetails: React.FC<BookDetailsProps> = ({ bookId }) => {
  // For demo purposes, we'll use both Redux and useFetch to show both approaches
  const { selectedBook } = useAppSelector(state => state.books);
  
  // This would be used in a real app with an actual API
  const { data: fetchedBook, loading, error } = useFetch<Book>(
    `/api/books/${bookId}`,
    { immediate: false } // Don't actually fetch since we're using mock data
  );

  // Use the Redux store data for this demo
  const book = fetchedBook || selectedBook;

  if (!bookId) return <div>Select a book to view details</div>;
  if (loading) return <div>Loading book details...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="book-details">
      <h2 className="text-2xl font-bold mb-4" data-testid="book-title">{book.title}</h2>

      <div className="bg-[var(--bg-secondary)] rounded-lg p-6 shadow-lg">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-300">Author</h3>
          <p className="text-white">{book.author}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-300">Year</h3>
          <p className="text-white">{book.year}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-300">Genre</h3>
          <p className="text-white">{book.genre}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-300">Status</h3>
          <p className={`inline-block px-3 py-1 rounded-full ${book.isRead ? 'bg-green-800 text-green-200' : 'bg-yellow-800 text-yellow-200'}`}>
            {book.isRead ? 'Read' : 'Unread'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
