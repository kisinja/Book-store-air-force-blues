import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books }) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16'>
            {
                books && books.map(book => (
                    <BookCard key={book.id} book={book} />
                ))
            }
        </div>
    );
};

export default BookList;