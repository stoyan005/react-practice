import { useState } from 'react';

import './App.css';
import Books from './components/Books';
import SearchBox from './components/SearchBox';
import FavouriteBooks from './components/FavouriteBooks';

function App() {
	const [searchTerm, setSearchTerm] = useState('');
	const [favouriteBooks, setFavouriteBooks] = useState([]);
	const [cartItems, setCartItems] = useState([]);

	// ! ADD TO FAVOURITES LIST //
	const addFavourite = (book) => {
		if (!favouriteBooks.some((b) => b.title === book.title)) {
			setFavouriteBooks([...favouriteBooks, book]);
		}
	};

	// ! REMOVE FROM FAVOURITES LIST //
	const removeFavourite = (book) => {
		setFavouriteBooks(favouriteBooks.filter((b) => b.title !== book.title));
	};

	// ! CLEAR FAVOURITES LIST //
	const clearFavourites = () => {
		setFavouriteBooks([]);
	};

	// ! ADD TO CART //
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

	// ! REMOVE FROM CART //
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

	// ! CLEAR CART //
	const clearCart = () => {
		setCartItems([]);
	};

	// ! TOTAL PRICE //
	const getTotalPrice = () => {
		return cartItems.reduce(
			((total, item) => total + item.book.price * item.quantity,
			0).toFixed(2)
		);
	};

	// ! TOTAL ITEMs //
	const getTotalItemsCount = () => {
		return cartItems.reduce((total, item) => total + item.quantity, 0);
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
