import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/reduxHooks';
import { addBook } from '../store/slices/bookSlice';
import { BookFormData } from '../types/Book';
import DatabaseErrorMessage from './DatabaseErrorMessage';

const initialFormData: BookFormData = {
  title: '',
  author: '',
  year: new Date().getFullYear(),
  genre: '',
  isRead: false,
  createdBy: '',
  isActive: true
};

const BookForm: React.FC = () => {
  const [formData, setFormData] = useState<BookFormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : name === 'year' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      await dispatch(addBook(formData)).unwrap();
      setFormData(initialFormData);
      navigate('/');
    } catch (error: any) {
      console.error('Failed to add book:', error);
      setError(typeof error === 'string' ? error : error?.message || 'An unknown error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Book</h2>
      
      {error && (
        <div className="mb-6">
          <DatabaseErrorMessage error={error} onRetry={handleRetry} />
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" style={{ color: "var(--text-primary)" }} htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            style={{ 
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
              borderColor: "var(--border-primary)"
            }}
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Book title"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" style={{ color: "var(--text-primary)" }} htmlFor="author">
            Author
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            style={{ 
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
              borderColor: "var(--border-primary)"
            }}
            id="author"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            placeholder="Author name"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" style={{ color: "var(--text-primary)" }} htmlFor="year">
            Year
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            style={{ 
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
              borderColor: "var(--border-primary)"
            }}
            id="year"
            type="number"
            name="year"
            min="1000"
            max={new Date().getFullYear()}
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" style={{ color: "var(--text-primary)" }} htmlFor="genre">
            Genre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            style={{ 
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
              borderColor: "var(--border-primary)"
            }}
            id="genre"
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            placeholder="Book genre"
          />
        </div>
        
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isRead"
              checked={formData.isRead}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>I have read this book</span>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "white",
              transition: "background-color 0.2s ease"
            }}
            className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-md"
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Adding...' : 'Add Book'}
          </button>
          <button
            style={{
              backgroundColor: "var(--bg-tertiary)",
              color: "var(--text-primary)",
              transition: "background-color 0.2s ease"
            }}
            className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-md"
            type="button"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
