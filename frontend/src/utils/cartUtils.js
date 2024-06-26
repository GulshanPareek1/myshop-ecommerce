export const addDecimals = (num) => {
	return (Math.round(num * 100) / 100).toFixed(2);
};

// here update cart is basically updating localstorage
export const updateCart = (state) => {
	//calculate items price
	state.itemsPrice = addDecimals(
		state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);

	//calculate shipping price (if order is above $100 then free otherwise $10 charges )
	state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

	// calculate tax price (14% tax)
	state.taxPrice = addDecimals(Number(state.itemsPrice * 0.14).toFixed(2));

	// calculate total price
	state.totalPrice = (
		Number(state.itemsPrice) +
		Number(state.shippingPrice) +
		Number(state.taxPrice)
	).toFixed(2);

	localStorage.setItem("cart", JSON.stringify(state));
	return state;
};
