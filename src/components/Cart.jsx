import { useState } from 'react';

function Cart({
	cartItems,
	removeFromCart,
	onDrop,
	totalPrice,
	totalItemsCount,
	onClearAll,
}) {
	const [isDragOver, setIsDragOver] = useState(false);

	const handleDragOver = (e) => {
		e.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		setIsDragOver(false);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		setIsDragOver(false);

		try {
			const bookData = e.dataTransfer.getData('application/json');
			if (bookData) {
				const book = JSON.parse(bookData);
				onDrop(book);
			}
		} catch (error) {
			console.error('Error Parsing dropped data:', error);
		}
	};

	const removeOneInstance = (bookTitle) => {
		removeFromCart(bookTitle, false);
	};

	const removeAllInstances = (bookTitle) => {
		removeFromCart(bookTitle, true);
	};

	return (
		<div className="cart">
			<div className="section-header">
				<h2>Shopping Cart ({totalItemsCount})</h2>
				{cartItems.length > 0 && (
					<button className="clear-btn" onClick={onClearAll}>
						Clear All
					</button>
				)}
			</div>

			<div
				className={`cart-drop-zone ${isDragOver ? 'drag-over' : ''}`}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				Drag books here to add to cart.
			</div>
			{cartItems.length === 0 ? (
				<div className="empty-cart">Your cart is empty.</div>
			) : (
				<>
					{cartItems.map((item) => (
						<div key={item.id} className="cart-item">
							<img
								src={item.book.image}
								alt={item.book.title}
								className="cart-item-image"
								onError={(e) => {
									e.target.style.display = '';
								}}
							/>
							<div className="cart-item-info">
								<div className="cart-item-title">
									{item.book.title}
								</div>
								<div className="cart-item-price">
									£{item.book.price} * {item.quantity}
								</div>
								<div className="cart-item-quantity">
									Total: £
									{(item.book.price * item.quantity).toFixed(
										2
									)}
								</div>
							</div>
							<div className="cart-item-actions">
								<div className="quantity-controls">
									<button
										className="quantity-btn"
										onClick={() =>
											removeOneInstance(item.book.title)
										}
										title="Remove one item"
									>
										-
									</button>
									<span>{item.quantity}</span>
									<button
										className="quantity-btn"
										onClick={() => onDrop(item.book)}
										title="Add one more item"
									>
										+
									</button>
								</div>
								<button
									className="btn btn-danger"
									onClick={() =>
										removeAllInstances(item.book.title)
									}
									title="Remove all items of this book"
								>
									X
								</button>
							</div>
						</div>
					))}
					<div className="cart-total">Total: £{totalPrice}</div>
				</>
			)}
		</div>
	);
}

export default Cart;
