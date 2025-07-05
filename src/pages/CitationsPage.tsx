import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchBooks } from '../store/slices/bookSlice';
import { Book } from '../types/Book';
import DatabaseErrorMessage from '../components/DatabaseErrorMessage';
import { 
  DocumentDuplicateIcon, 
  CheckIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';

const CitationsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { books, loading, error } = useAppSelector(state => state.books);
  const [citationStyle, setCitationStyle] = useState<'apa' | 'mla' | 'chicago' | 'harvard'>('apa');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'author' | 'year' | 'title'>('author');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Filter books based on search query
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'author':
        return a.author.localeCompare(b.author);
      case 'year':
        return b.year - a.year;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Format citation based on style
  const formatCitation = (book: Book, style: string): string => {
    switch (style) {
      case 'apa':
        return `${book.author} (${book.year}). *${book.title}*. ${book.genre}.`;
      case 'mla':
        return `${book.author}. *${book.title}*. ${book.genre}, ${book.year}.`;
      case 'chicago':
        return `${book.author}. "${book.title}." ${book.genre}, ${book.year}.`;
      case 'harvard':
        return `${book.author} ${book.year}, *${book.title}*, ${book.genre}.`;
      default:
        return `${book.author} (${book.year}). *${book.title}*. ${book.genre}.`;
    }
  };

  // Generate bibliography from selected books
  const generateBibliography = (): string => {
    const selectedBooksData = books.filter(book => selectedBooks.has(book.id));
    const sortedSelected = selectedBooksData.sort((a, b) => {
      switch (sortBy) {
        case 'author':
          return a.author.localeCompare(b.author);
        case 'year':
          return b.year - a.year;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return sortedSelected.map(book => formatCitation(book, citationStyle)).join('\n\n');
  };

  // Handle book selection
  const toggleBookSelection = (bookId: string) => {
    const newSelected = new Set(selectedBooks);
    if (newSelected.has(bookId)) {
      newSelected.delete(bookId);
    } else {
      newSelected.add(bookId);
    }
    setSelectedBooks(newSelected);
  };

  // Select all filtered books
  const selectAllBooks = () => {
    const allFilteredIds = new Set(sortedBooks.map(book => book.id));
    setSelectedBooks(allFilteredIds);
  };

  // Clear all selections
  const clearAllSelections = () => {
    setSelectedBooks(new Set());
  };

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You might want to show a toast notification here
  };

  // Copy single citation
  const copyCitation = (book: Book) => {
    copyToClipboard(formatCitation(book, citationStyle));
  };

  // Copy bibliography
  const copyBibliography = () => {
    copyToClipboard(generateBibliography());
  };

  // Export bibliography
  const exportBibliography = () => {
    const content = generateBibliography();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bibliography-${citationStyle}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <DatabaseErrorMessage error={error} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Citation Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generate properly formatted citations for your bibliography
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Sort by */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'author' | 'year' | 'title')}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="author">Sort by Author</option>
            <option value="year">Sort by Year</option>
            <option value="title">Sort by Title</option>
          </select>

          {/* Citation style */}
          <select
            value={citationStyle}
            onChange={(e) => setCitationStyle(e.target.value as 'apa' | 'mla' | 'chicago' | 'harvard')}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="apa">APA Style</option>
            <option value="mla">MLA Style</option>
            <option value="chicago">Chicago Style</option>
            <option value="harvard">Harvard Style</option>
          </select>

          {/* Preview toggle */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`px-4 py-2 rounded-md transition-colors ${
              showPreview 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>

        {/* Selection controls */}
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {selectedBooks.size} of {sortedBooks.length} selected
            </span>
            <button
              onClick={selectAllBooks}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Select All
            </button>
            <button
              onClick={clearAllSelections}
              className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Clear All
            </button>
          </div>

          {selectedBooks.size > 0 && (
            <div className="flex gap-2">
              <button
                onClick={copyBibliography}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <ClipboardDocumentIcon className="h-4 w-4" />
                Copy Bibliography
              </button>
              <button
                onClick={exportBibliography}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                <DocumentDuplicateIcon className="h-4 w-4" />
                Export
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Book List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpenIcon className="h-6 w-6" />
              Available Books ({sortedBooks.length})
            </h2>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {sortedBooks.length === 0 ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                {searchQuery ? 'No books found matching your search.' : 'No books available.'}
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {sortedBooks.map((book) => (
                  <div
                    key={book.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleBookSelection(book.id)}
                        className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedBooks.has(book.id)
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-gray-300 dark:border-gray-600 hover:border-blue-600'
                        }`}
                      >
                        {selectedBooks.has(book.id) && (
                          <CheckIcon className="h-3 w-3" />
                        )}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          by {book.author} ({book.year})
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {book.genre}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => copyCitation(book)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Copy citation"
                      >
                        <DocumentDuplicateIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Bibliography Preview ({citationStyle.toUpperCase()})
              </h2>
            </div>
            
            <div className="p-6">
              {selectedBooks.size === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  Select books to preview citations
                </p>
              ) : (
                <div className="space-y-4">
                  {books
                    .filter(book => selectedBooks.has(book.id))
                    .sort((a, b) => {
                      switch (sortBy) {
                        case 'author':
                          return a.author.localeCompare(b.author);
                        case 'year':
                          return b.year - a.year;
                        case 'title':
                          return a.title.localeCompare(b.title);
                        default:
                          return 0;
                      }
                    })
                    .map((book, index) => (
                      <div
                        key={book.id}
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Entry #{index + 1}
                        </div>
                        <div 
                          className="font-mono text-gray-900 dark:text-white leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: formatCitation(book, citationStyle).replace(/\*(.*?)\*/g, '<em>$1</em>')
                          }}
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Citation Style Guide */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
          Citation Style Examples
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="font-medium text-blue-800 dark:text-blue-200">APA Style</h4>
            <p className="text-blue-700 dark:text-blue-300">
              Author, A. A. (Year). <em>Title of work</em>. Publisher.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-blue-800 dark:text-blue-200">MLA Style</h4>
            <p className="text-blue-700 dark:text-blue-300">
              Author, First. <em>Title of Work</em>. Publisher, Year.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-blue-800 dark:text-blue-200">Chicago Style</h4>
            <p className="text-blue-700 dark:text-blue-300">
              Author, First. "Title of Work." Publisher, Year.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-blue-800 dark:text-blue-200">Harvard Style</h4>
            <p className="text-blue-700 dark:text-blue-300">
              Author, A Year, <em>Title of work</em>, Publisher.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitationsPage;
