import { useState } from 'react';

import './App.css';
import Books from './components/Books';
import SearchBox from './components/SearchBox';
import FavouriteBooks from './components/FavouriteBooks';
import Cart from './components/Cart';

function App() {
	const [searchTerm, setSearchTerm] = useState('');
	const [favouriteBooks, setFavouriteBooks] = useState([]);
	const [cartItems, setCartItems] = useState([]);

	const addFavourite = (book) => {
		if (!favouriteBooks.some((b) => b.title === book.title)) {
			setFavouriteBooks([...favouriteBooks, book]);
		}
	};

	const removeFavourite = (book) => {
		setFavouriteBooks(favouriteBooks.filter((b) => b.title !== book.title));
	};

	const clearFavourites = () => {
		setFavouriteBooks([]);
	};

	const addToCart = (book) => {
		setCartItems((currentItems) => {
			const existingItem = currentItems.find(
				(item) => item.book.title === book.title
			);
			if (existingItem) {
				return currentItems.map((item) =>
					item.book.title === book.title
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			} else {
				return [...currentItems, { book, quantity: 1, id: Date.naw() }];
			}
		});
	};

	const removeFromCart = (bookTitle, removeAll = false) => {
		setCartItems((currentItems) => {
			const existingItem = currentItems.find(
				(item) => item.book.title === bookTitle
			);
			if (!existingItem) return currentItems;

			if (removeAll || existingItem.quantity === 1) {
				return currentItems.filter(
					(item) => item.book.title === bookTitle
				);
			} else {
				return currentItems.map((item) => item.book.title === bookTitle)
					? { ...item, quantity: item.quantity - 1 }
					: item;
			}
		});
	};

	const clearCart = () => {
		setCartItems([]);
	};

	const getTotalPrice = () => {
		return cartItems.reduce(
			((total, item) => total + item.book.price * item.quantity,
			0).toFixed(2)
		);
	};

	return (
		<div>
			<h1>Book Finder</h1>
			<SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			<Books searchTerm={searchTerm} onFavourite={addFavourite} />
			<FavouriteBooks
				favouriteBooks={favouriteBooks}
				removeFavourite={removeFavourite}
			/>
		</div>
	);
}

export default App;
