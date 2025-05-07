import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookList from '../components/BookList';
import { books } from '../assets';
import { FaSearch } from 'react-icons/fa';

const BookCatalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBooks, setFilteredBooks] = useState(books);

    useEffect(() => {
        setFilteredBooks(books);
    }, []);

    useEffect(() => {
        // Filter books whenever searchTerm changes
        if (searchTerm.trim() === '') {
            setFilteredBooks(books);
            return;
        }

        const filtered = books.filter(book => {
            const searchLower = searchTerm.toLowerCase();
            return (
                book.title.toLowerCase().includes(searchLower) ||
                book.author.toLowerCase().includes(searchLower) ||
                book.category.toLowerCase().includes(searchLower) ||
                book.description.toLowerCase().includes(searchLower)
            );
        });

        setFilteredBooks(filtered);
    }, [searchTerm]);

    const handleClearSearch = () => {
        setSearchTerm('');
        setFilteredBooks(books);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Search Header */}
            {/* <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Find Your Next Read</h2>
                <p className="text-gray-600 max-w-lg mx-auto">
                    Search our collection of {books.length}+ books by title, author, or genre
                </p>
            </div> */}

            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-12">
                <div className="relative flex items-center w-full">
                    <input
                        type="text"
                        placeholder="Search for books, authors, categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-4 pl-12 pr-6 text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                        autoComplete="off"
                    />

                    {searchTerm && (
                        <button
                            onClick={handleClearSearch}
                            className="absolute right-16 text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Clear search"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                    <button
                        className="absolute right-2 bg-indigo-600 text-white w-12 h-12 rounded-full hover:bg-indigo-700 transition-colors flex items-center justify-center"
                        onClick={() => { }} // Search is already handled by onChange
                    >
                        <FaSearch className="" />
                    </button>
                </div>

                {/* Search Suggestions */}
                {searchTerm && filteredBooks.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                        {filteredBooks.slice(0, 5).map(book => (
                            <Link
                                key={book.id}
                                to={`/books/${book.id}`}
                                className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                            >
                                <div className="flex items-center">
                                    <img
                                        src={book.coverImage}
                                        alt={book.title}
                                        className="w-10 h-14 object-cover rounded mr-3"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-800">{book.title}</p>
                                        <p className="text-sm text-gray-500">{book.author}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Results Section */}
            <div className="mb-8 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                    {searchTerm ? `Search Results (${filteredBooks.length})` : 'Our Library'}
                </h3>
                {searchTerm && (
                    <button
                        onClick={handleClearSearch}
                        className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm"
                    >
                        Clear search
                        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Book List */}
            {filteredBooks.length > 0 ? (
                <BookList books={filteredBooks} />
            ) : (
                <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-600">No books found matching your search</h3>
                    <button
                        onClick={handleClearSearch}
                        className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        Clear search and show all books
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookCatalog;