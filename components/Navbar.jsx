import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

function Navbar() {
	return (
		<div className="navbar-container">
			<p>
				<Link href="/"> JSM Zeke's Electronocs</Link>
			</p>

			<button type="button" className="cart-icon" onClick="">
				<AiOutlineShopping />
				<span className="cart-item-qty">2</span>
			</button>
		</div>
	);
}

export default Navbar;
