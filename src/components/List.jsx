function List({ items, renderItem, emptyMessage = 'No Items Found' }) {
	if (!items.length) return <p>{emptyMessage}</p>;

	return (
		<div>
			{items.map((item, index) => (
				<div key={index}>{renderItem(item)}</div>
			))}
		</div>
	);
}

export default List;
