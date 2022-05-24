import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";

function Navbar() {
	const { showCart, setShowCart, totalQuantities } = useStateContext();
	const storeName = "Zeke's Supply Co.";
	return (
		<div className="navbar-container">
			<p className="nav-title">
				<Link href="/">{storeName}</Link>
			</p>

			<button
				type="button"
				className="cart-icon"
				onClick={() => setShowCart(true)}>
				<AiOutlineShopping />
				<span className="cart-item-qty">{totalQuantities}</span>
			</button>

			{showCart && <Cart />}
		</div>
	);
}

export default Navbar;
