import { useEffect, useState } from 'react';

import './books.css';
import List from './List';

function Books({ searchTerm, onFavourite }) {
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

	if (loading) return <p>Loading books....</p>;
	if (error) return <p>Error: {error}</p>;

	const filteredBooks = books.filter((book) =>
		book.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<h2>Books List</h2>
			<List
				items={filteredBooks}
				renderItem={(book) => (
					<>
						<strong>{book.title}</strong> - {book.author} -
						{book.publication_year}
						<button onClick={() => onFavourite(book)}>
							Add to Favourite
						</button>
					</>
				)}
			/>
		</div>
	);
}

export default Books;
