import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/reduxHooks';
import { updateBook } from '../store/slices/bookSlice';
import { Book, BookFormData } from '../types/Book';

interface EditBookFormProps {
  book: Book;
  onClose: () => void;
}

const EditBookForm: React.FC<EditBookFormProps> = ({ book, onClose }) => {
  const dispatch = useAppDispatch();  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    year: book.year,
    genre: book.genre,
    isRead: book.isRead,
    isActive: book.isActive,
    createdBy: book.createdBy,
    // Include all the required fields from the book entity
    isDeleted: book.isDeleted,
    id: book.id, // Make sure ID is included
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : name === 'year' 
          ? parseInt(value, 10) 
          : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof BookFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BookFormData, string>> = {};
    
    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author?.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!formData.year) {
      newErrors.year = 'Year is required';
    } else if (formData.year < 1000 || formData.year > new Date().getFullYear()) {
      newErrors.year = `Year must be between 1000 and ${new Date().getFullYear()}`;
    }
    
    if (!formData.genre?.trim()) {
      newErrors.genre = 'Genre is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare the full book data for update, preserving all existing fields
      const fullBookData = {
        ...book, // Include all original fields from the book
        ...formData, // Override with form data
        updatedAt: new Date(), // Update the timestamp as Date object, not string
        updatedBy: 'Frontend User'
      };
      
      await dispatch(updateBook({ id: book.id, bookData: fullBookData })).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to update book:', error);
      // You could set a form submission error here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit Book</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-2 bg-gray-700 rounded ${errors.title ? 'border border-red-500' : 'border border-gray-600'}`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium mb-1">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`w-full p-2 bg-gray-700 rounded ${errors.author ? 'border border-red-500' : 'border border-gray-600'}`}
            />
            {errors.author && <p className="mt-1 text-sm text-red-500">{errors.author}</p>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="year" className="block text-sm font-medium mb-1">
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={`w-full p-2 bg-gray-700 rounded ${errors.year ? 'border border-red-500' : 'border border-gray-600'}`}
            />
            {errors.year && <p className="mt-1 text-sm text-red-500">{errors.year}</p>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="genre" className="block text-sm font-medium mb-1">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className={`w-full p-2 bg-gray-700 rounded ${errors.genre ? 'border border-red-500' : 'border border-gray-600'}`}
            />
            {errors.genre && <p className="mt-1 text-sm text-red-500">{errors.genre}</p>}
          </div>
          
          <div className="mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isRead"
                checked={formData.isRead}
                onChange={handleChange}
                className="mr-2"
              />
              <span>I have read this book</span>
            </label>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookForm;
