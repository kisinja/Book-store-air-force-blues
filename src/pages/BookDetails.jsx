import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar, FaArrowLeft, FaBookOpen, FaShoppingCart } from 'react-icons/fa';
import { books } from '../assets';
import BookCard from '../components/BookCard';

const BookDetails = () => {
    const params = useParams();
    console.log(params);
    const navigate = useNavigate();
    const book = books.find(book => book.id === parseInt(params.bookId));


    if (!book) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Book Not Found</h1>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Books
                </button>
            </div>
        );
    }

    // Calculate star rating display
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FaStar key={i} className="text-yellow-400 opacity-50" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-400" />);
            }
        }

        return stars;
    };

    return (
        <>
            {/* Back Button */}
            <div className="container mx-auto px-4 py-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center bg-indigo-600 hover:bg-indigo-800 transition-colors py-2 px-3 text-white rounded-xl"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Catalog
                </button>
            </div>

            {/* Book Details Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-6xl mx-auto">
                    <div className="md:flex">
                        {/* Book Cover */}
                        <div className="md:w-1/3 p-6 flex justify-center bg-gray-100 w-full">
                            <img
                                src={book.coverImage}
                                alt={book.title}
                                className="h-auto max-h-96 w-full object-contain rounded-lg shadow-md"
                            />
                        </div>

                        {/* Book Info */}
                        <div className="md:w-2/3 p-8">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mb-2">
                                        {book.category}
                                    </span>
                                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
                                    <h2 className="text-xl text-gray-600 mb-4">by {book.author}</h2>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-indigo-600">${book.price}</p>
                                    {book.stock > 0 ? (
                                        <p className="text-green-600 text-sm">In Stock ({book.stock} available)</p>
                                    ) : (
                                        <p className="text-red-600 text-sm">Out of Stock</p>
                                    )}
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center my-4">
                                <div className="flex mr-2">
                                    {renderStars(book.rating)}
                                </div>
                                <span className="text-gray-600 text-sm">
                                    {book.rating.toFixed(1)} ({Math.floor(book.rating * 10)} reviews)
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 my-6">
                                <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
                                    <FaShoppingCart className="mr-2" />
                                    Add to Cart
                                </button>
                                <button className="flex-1 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
                                    <FaBookOpen className="mr-2" />
                                    Preview
                                </button>
                            </div>

                            {/* Details Tabs */}
                            <div className="mt-8">
                                <div className="border-b border-gray-200">
                                    <nav className="flex -mb-px">
                                        <button className="mr-8 py-4 px-1 border-b-2 border-indigo-500 font-medium text-sm text-indigo-600">
                                            Description
                                        </button>
                                        <button className="mr-8 py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                            Details
                                        </button>
                                        <button className="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                            Reviews
                                        </button>
                                    </nav>
                                </div>

                                <div className="py-6">
                                    <p className="text-gray-700 leading-relaxed">{book.description}</p>

                                    {/* Additional Details */}
                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Publisher</h3>
                                            <p className="mt-1 text-sm text-gray-900">{book.publisher}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Published</h3>
                                            <p className="mt-1 text-sm text-gray-900">{book.publishedYear}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Pages</h3>
                                            <p className="mt-1 text-sm text-gray-900">{book.pages}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Language</h3>
                                            <p className="mt-1 text-sm text-gray-900">{book.language}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">ISBN</h3>
                                            <p className="mt-1 text-sm text-gray-900">{book.isbn}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Books Section */}
                <div className="mt-16 py-6 px-12 bg-gray-100 rounded-lg h-max">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Related to '{book.title}'</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                        {books
                            .filter(b => b.category === book.category && b.id !== book.id)
                            .slice(0, 4)
                            .map(relatedBook => (
                                <BookCard key={relatedBook.id} book={relatedBook} setFeaturedCollection={() => { }} />
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookDetails;