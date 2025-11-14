function BookCard({
	book,
	onFavourite,
	onAddToCart,
	onRemoveFavourite,
	showRemove = false,
	draggable = true,
	isFavourited = false,
}) {
	const handleDragStart = (e) => {
		if (draggable) {
			e.dataTransfer.setData('application/json', JSON.stringify(book));
		}
	};

	return (
		<div
			className="book-card"
			draggable={draggable}
			onDragStart={handleDragStart}
		>
			<img
				src={book.image}
				alt={book.title}
				className="book-image"
				onError={(e) => {
					e.target.style.display = 'none';
				}}
			/>
			<div className="book-info">
				<div className="book-title">{book.title}</div>
				<div className="book-author">By: {book.author}</div>
				<div className="book-meta">
					Published: {book.publication_year}
				</div>
				<div className="book-price">£{book.price}</div>
				<div className="book-actions">
					{showRemove ? (
						<button
							className="btn btn-danger"
							onClick={() => onRemoveFavourite(book)}
						>
							Remove
						</button>
					) : (
						<button
							className={`btn ${
								isFavourited ? 'btn-disabled' : 'btn-primary'
							}`}
							onClick={() => !isFavourited && onFavourite(book)}
							disabled={isFavourited}
						>
							{isFavourited ? 'Favourited' : 'Add to Favourites'}
						</button>
					)}
					<button
						className="btn btn-primary"
						onClick={() => onAddToCart(book)}
					>
						Add To Cart
					</button>
				</div>
			</div>
		</div>
	);
}

export default BookCard;
