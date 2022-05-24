// import React, { createContext, useContext, useState, useEffect } from "react";
// import { toast } from "react-hot-toast";

// const Context = createContext();

// export const StateContext = ({ children }) => {
// 	const [showCart, setshowCart] = useState(false);
// 	const [cartItems, setCartItems] = useState([]);
// 	const [totalPrice, settotalPrice] = useState(0);
// 	const [totalQuantities, setTotalQuantities] = useState(0);
// 	const [qty, setQty] = useState(1);

// 	let foundProduct;
// 	let index;

// 	const onAdd = (product, quantity) => {
// 		const checkProductInCart = cartItems.find(
// 			(item) => item._id === product._id
// 		);

// 		settotalPrice(
// 			(prevTotalPrice) => prevTotalPrice + product.price * quantity
// 		);
// 		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

// 		if (checkProductInCart) {
// 			const updatedCartItems = cartItems.map((cartProduct) => {
// 				if (cartProduct._id === product._id)
// 					return {
// 						...cartProduct,
// 						quantity: cartProduct.quantity + quantity,
// 					};
// 			});

// 			setCartItems(updatedCartItems);
// 		} else {
// 			product.quantity = quantity;
// 			setCartItems([...cartItems, { ...product }]);
// 		}
// 		toast.success(`${qty} ${product.name} added to the cart`);
// 	};

// 	const toggleCartItemQuantity = (id, value) => {
// 		foundProduct = cartItems.find((item) => item._id === id);
// 		index = cartItems.findIndex((product) => product._id === id);
// 		const newItems = cartItems.splice(index, 1);
// 		if (value === "inc") {
// 			let newCartItems = [
// 				...newItems,
// 				{ ...product, quantity: product.quantity + 1 },
// 			];

// 			setCartItems(newCartItems);
// 			settotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
// 			setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
// 		} else if (value === "dec") {
// 			if (foundProduct.quantity > 1) {
// 				let newCartItems = [
// 					...newItems,
// 					{ ...product, quantity: product.quantity + 1 },
// 				];

// 				setCartItems(newCartItems);
// 				settotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
// 				setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
// 			}
// 		}
// 	};

// 	const incQty = () => {
// 		setQty((prevQty) => prevQty + 1);
// 	};
// 	const decQty = () => {
// 		setQty((prevQty) => {
// 			if (prevQty - 1 < 1) return 1;

// 			return prevQty - 1;
// 		});
// 	};

// 	return (
// 		<Context.Provider
// 			value={{
// 				showCart,
// 				setshowCart,
// 				cartItems,
// 				totalPrice,
// 				totalQuantities,
// 				qty,
// 				incQty,
// 				decQty,
// 				onAdd,
// 				toggleCartItemQuantity,
// 			}}>
// 			{children}
// 		</Context.Provider>
// 	);
// };

// export const useStateContext = () => useContext(Context);

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);

	let foundProduct;
	let index;

	useEffect(() => {
		if (localStorage.getItem("cartItems") == 0) return;
		console.log("hi");
		setCartItems(JSON.parse(localStorage.getItem("cartItems")));
		setTotalPrice(JSON.parse(localStorage.getItem("totalPrice")));
		setTotalQuantities(JSON.parse(localStorage.getItem("totalQuantities")));
	}, []);

	useEffect(() => {
		if (!cartItems) {
			setShowCart(false);
			setCartItems([]);
			setTotalPrice(0);
			setTotalQuantities(0);
			setQty(1);
			return;
		}
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
		localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
		localStorage.setItem("totalQuantities", JSON.stringify(totalQuantities));
	}, [cartItems, totalPrice, totalQuantities]);

	const onAdd = (product, quantity) => {
		// console.log(cartItems);

		const checkProductInCart = cartItems?.find(
			(item) => item._id === product._id
		);

		setTotalPrice(
			(prevTotalPrice) => prevTotalPrice + product.price * quantity
		);
		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

		if (checkProductInCart) {
			const updatedCartItems = cartItems.map((cartProduct) => {
				if (cartProduct._id === product._id)
					return {
						...cartProduct,
						quantity: cartProduct.quantity + quantity,
					};
			});

			setCartItems(updatedCartItems);
		} else {
			product.quantity = quantity;

			setCartItems([...cartItems, { ...product }]);
		}

		toast.success(`${qty} ${product.name} added to the cart.`);
	};

	const onRemove = (product) => {
		foundProduct = cartItems.find((item) => item._id === product._id);
		const newCartItems = cartItems.filter((item) => item._id !== product._id);

		setTotalPrice(
			(prevTotalPrice) =>
				prevTotalPrice - foundProduct.price * foundProduct.quantity
		);
		setTotalQuantities(
			(prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
		);
		setCartItems(newCartItems);
	};

	const toggleCartItemQuantity = (id, value) => {
		foundProduct = cartItems.find((item) => item._id === id);
		index = cartItems.findIndex((product) => product._id === id);
		const newCartItems = cartItems.filter((item) => item._id !== id);

		if (value === "inc") {
			setCartItems([
				...newCartItems,
				{ ...foundProduct, quantity: foundProduct.quantity + 1 },
			]);
			setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
			setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
		} else if (value === "dec") {
			if (foundProduct.quantity > 1) {
				setCartItems([
					...newCartItems,
					{ ...foundProduct, quantity: foundProduct.quantity - 1 },
				]);
				setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
				setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
			}
		}
	};

	const incQty = () => {
		setQty((prevQty) => prevQty + 1);
	};

	const decQty = () => {
		setQty((prevQty) => {
			if (prevQty - 1 < 1) return 1;

			return prevQty - 1;
		});
	};

	return (
		<Context.Provider
			value={{
				showCart,
				setShowCart,
				cartItems,
				totalPrice,
				totalQuantities,
				qty,
				incQty,
				decQty,
				onAdd,
				toggleCartItemQuantity,
				onRemove,
				setCartItems,
				setTotalPrice,
				setTotalQuantities,
			}}>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
