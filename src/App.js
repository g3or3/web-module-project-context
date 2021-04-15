import React, { useEffect, useRef, useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const localCart = useRef([]);

	const addItem = (item) => {
		// add the given item to the cart
		if (!cart.find((i) => i.id === item.id)) setCart([...cart, item]);
	};

	const removeItem = (id) => {
		setCart(cart.filter((item) => item.id !== id));
		if (localCart.current.length === 1) localStorage.setItem("cart", []);
	};

	useEffect(() => {
		localCart.current = cart;
		if (localCart.current.length)
			localStorage.setItem("cart", JSON.stringify(localCart.current));
	}, [cart]);

	useEffect(() => {
		if (localStorage.getItem("cart"))
			setCart(JSON.parse(localStorage.getItem("cart")));
	}, []);

	return (
		<ProductContext.Provider value={{ products, addItem, removeItem }}>
			<CartContext.Provider value={{ cart }}>
				<div className="App">
					<Navigation />

					{/* Routes */}
					<Route exact path="/">
						<Products />
					</Route>

					<Route path="/cart">
						<ShoppingCart />
					</Route>
				</div>
			</CartContext.Provider>
		</ProductContext.Provider>
	);
}

export default App;
