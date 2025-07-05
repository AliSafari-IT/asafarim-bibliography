import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchBooks } from '../store/slices/bookSlice';
import { Book } from '../types/Book';
import DatabaseErrorMessage from '../components/DatabaseErrorMessage';
import { DocumentDuplicateIcon, PrinterIcon } from '@heroicons/react/24/outline';

const ReferencesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { books, loading, error } = useAppSelector(state => state.books);
  const [sortBy, setSortBy] = useState<'author' | 'year' | 'title'>('author');
  const [filterByGenre, setFilterByGenre] = useState<string>('all');
  const [citationStyle, setCitationStyle] = useState<'apa' | 'mla' | 'chicago'>('apa');

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Get unique genres for filtering
  const genres = Array.from(new Set(books.map(book => book.genre)));

  // Filter and sort books
  const filteredAndSortedBooks = books
    .filter(book => filterByGenre === 'all' || book.genre === filterByGenre)
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
    });

  // Format citation based on style
  const formatCitation = (book: Book): string => {
    switch (citationStyle) {
      case 'apa':
        return `${book.author} (${book.year}). ${book.title}. ${book.genre}.`;
      case 'mla':
        return `${book.author}. ${book.title}. ${book.genre}, ${book.year}.`;
      case 'chicago':
        return `${book.author}. ${book.title}. ${book.genre}, ${book.year}.`;
      default:
        return `${book.author} (${book.year}). ${book.title}. ${book.genre}.`;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You might want to show a toast notification here
  };

  const copyAllReferences = () => {
    const allReferences = filteredAndSortedBooks
      .map(book => formatCitation(book))
      .join('\n\n');
    copyToClipboard(allReferences);
  };

  const printReferences = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const content = `
        <html>
          <head>
            <title>References</title>
            <style>
              body { font-family: 'Times New Roman', serif; margin: 40px; line-height: 1.6; }
              h1 { text-align: center; margin-bottom: 30px; }
              .reference { margin-bottom: 15px; text-indent: -0.5in; padding-left: 0.5in; }
              .citation-style { text-align: center; margin-bottom: 20px; font-style: italic; }
            </style>
          </head>
          <body>
            <h1>References</h1>
            <div class="citation-style">Citation Style: ${citationStyle.toUpperCase()}</div>
            ${filteredAndSortedBooks.map(book => `<div class="reference">${formatCitation(book)}</div>`).join('')}
          </body>
        </html>
      `;
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.print();
    }
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My References
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Academic citations for your bibliography collection
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Sort by */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-by" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Sort by:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'author' | 'year' | 'title')}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="author">Author</option>
                <option value="year">Year</option>
                <option value="title">Title</option>
              </select>
            </div>

            {/* Filter by genre */}
            <div className="flex items-center gap-2">
              <label htmlFor="filter-genre" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Genre:
              </label>
              <select
                id="filter-genre"
                value={filterByGenre}
                onChange={(e) => setFilterByGenre(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {/* Citation style */}
            <div className="flex items-center gap-2">
              <label htmlFor="citation-style" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Citation Style:
              </label>
              <select
                id="citation-style"
                value={citationStyle}
                onChange={(e) => setCitationStyle(e.target.value as 'apa' | 'mla' | 'chicago')}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="apa">APA</option>
                <option value="mla">MLA</option>
                <option value="chicago">Chicago</option>
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={copyAllReferences}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              title="Copy all references"
            >
              <DocumentDuplicateIcon className="h-4 w-4" />
              Copy All
            </button>
            <button
              onClick={printReferences}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              title="Print references"
            >
              <PrinterIcon className="h-4 w-4" />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* References List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            References ({filteredAndSortedBooks.length})
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Citation Style: {citationStyle.toUpperCase()}
          </div>
        </div>

        {filteredAndSortedBooks.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>No references found matching your criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedBooks.map((book, index) => (
              <div
                key={book.id}
                className="group relative p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Reference #{index + 1}
                    </div>
                    <div className="font-mono text-gray-900 dark:text-white leading-relaxed">
                      {formatCitation(book)}
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className={`px-2 py-1 rounded-full ${book.isRead ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                        {book.isRead ? 'Read' : 'Unread'}
                      </span>
                      <span>Genre: {book.genre}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(formatCitation(book))}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-blue-600 transition-all"
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

      {/* Citation Guide */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          Citation Format Guide
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="font-medium text-blue-800 dark:text-blue-200">APA Style</h4>
            <p className="text-blue-700 dark:text-blue-300">
              Author, A. A. (Year). Title of work. Publisher.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-blue-800 dark:text-blue-200">MLA Style</h4>
            <p className="text-blue-700 dark:text-blue-300">
              Author, First. Title of Work. Publisher, Year.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-blue-800 dark:text-blue-200">Chicago Style</h4>
            <p className="text-blue-700 dark:text-blue-300">
              Author, First. Title of Work. Publisher, Year.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferencesPage;
