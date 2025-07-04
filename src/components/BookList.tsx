import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchBooks, selectBook, deleteBook } from '../store/slices/bookSlice';
import DatabaseErrorMessage from './DatabaseErrorMessage';
import EditBookForm from './EditBookForm';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Book } from '../types/Book';

interface BookListProps {
  onSelectBook: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({ onSelectBook }) => {
  const dispatch = useAppDispatch();
  const { books, loading, error } = useAppSelector(state => state.books);
  const [editBook, setEditBook] = useState<Book | null>(null);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleSelectBook = (id: string) => {
    dispatch(selectBook(id));
    onSelectBook(id);
  };

  const handleEditBook = (e: React.MouseEvent, book: Book) => {
    e.stopPropagation(); // Prevent triggering the row click
    setEditBook(book);
  };

  const handleDeleteBook = async (e: React.MouseEvent, bookId: string) => {
    e.stopPropagation(); // Prevent triggering the row click
    
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await dispatch(deleteBook(bookId)).unwrap();
      } catch (error) {
        console.error("Failed to delete book:", error);
      }
    }
  };

  const handleRetry = () => {
    dispatch(fetchBooks());
  };

  if (loading) return <div className="p-4 text-center">Loading books...</div>;
  
  // Check for database-related errors
  if (error) {
    const isTableMissingError = error.toLowerCase().includes("table") && 
                               error.toLowerCase().includes("doesn't exist");
    
    if (isTableMissingError || error.toLowerCase().includes("database")) {
      return <DatabaseErrorMessage error={error} onRetry={handleRetry} />;
    }
    
    return (
      <div className="p-4 text-center text-red-500 border border-red-200 rounded-md bg-red-50">
        <p className="font-semibold">Error loading books</p>
        <p className="text-sm mt-2">{error}</p>
        <button 
          onClick={handleRetry}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="book-list">
      <h2 className="text-2xl font-bold mb-4">My Bibliography</h2>
      {books.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No books in your bibliography yet.</p>
      ) : (
        <ul className="divide-y divide-gray-700">
          {books.map(book => (
            <li 
              key={book.id} 
              className="py-4 px-2 hover:bg-[var(--bg-info)] cursor-pointer rounded transition-colors"
            >
              <div className="flex justify-between items-start">
                <div onClick={() => handleSelectBook(book.id)}>
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-gray-400">by {book.author} ({book.year})</p>
                  <p className="text-sm text-gray-500">{book.genre}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${book.isRead ? 'bg-green-800 text-green-200' : 'bg-yellow-800 text-yellow-200'}`}>
                  {book.isRead ? 'Read' : 'Unread'}
                </span>
                <div className="ml-4 flex-shrink-0">
                  <button 
                    onClick={(e) => handleEditBook(e, book)}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => handleDeleteBook(e, book.id)}
                    className="text-red-500 hover:text-red-700 transition-colors ml-2"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {editBook && (
        <EditBookForm 
          book={editBook} 
          onClose={() => setEditBook(null)} 
        />
      )}
    </div>
  );
};

export default BookList;
