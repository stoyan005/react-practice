import List from './List';

function FavouriteBooks({ favouriteBooks, removeFavourite }) {
	return (
		<>
			<h2>Favourite Books</h2>
			<List
				items={favouriteBooks}
				emptyMessage="You have no favourite books yet."
				renderItem={(book) => (
					<>
						<strong>{book.title}</strong>
						<button onClick={() => removeFavourite(book)}>
							Remove
						</button>
					</>
				)}
			/>
		</>
	);
}

export default FavouriteBooks;
