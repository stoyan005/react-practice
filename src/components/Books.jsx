import { useEffect, useState } from 'react';

import './books.css';
import List from './List';
import BookCard from './BookCard';

function Books({ searchTerm, onFavourite, onAddToCart, favouriteBooks }) {
	const [books, setBooks] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch('/books.json')
			.then((res) => {
				if (!res.ok) throw new Error('Failed to fetch books.json');
				return res.json();
			})
			.then((data) => {
				setBooks(data.books);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	if (loading) return <div className="section">Loading books....</div>;
	if (error) return <div className="section">Error: {error}</div>;

	const filteredBooks = books.filter((book) =>
		book.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="section">
			<div className="section-header">
				<h2>Books List ({filteredBooks.length})</h2>
			</div>
			<div className="books-grid">
				{filteredBooks.map((book) => (
					<BookCard
						key={book.title}
						book={book}
						onFavourite={onFavourite}
						onAddToCart={onAddToCart}
						isFavourited={favouriteBooks.some(
							(fave) => fave.title === book.title
						)}
					/>
				))}
			</div>
		</div>
	);
}

export default Books;
