import BookCard from './BookCard';

function FavouriteBooks({
	favouriteBooks,
	removeFavourite,
	onAddToCart,
	onClearAll,
}) {
	return (
		<div className="section">
			<div className="section-header">
				<h2>Favourite Books ({favouriteBooks.length})</h2>
				{favouriteBooks.length > 0 && (
					<button className="clear-btn" onClick={onClearAll}>
						Clear All
					</button>
				)}
			</div>
			{favouriteBooks.length === 0 ? (
				<p>You have no favourite books yet.</p>
			) : (
				<div className="books-grid">
					{favouriteBooks.map((book) => (
						<BookCard
							key={book.title}
							book={book}
							onAddToCart={onAddToCart}
							onRemoveFavourite={removeFavourite}
							showRemove={true}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default FavouriteBooks;
