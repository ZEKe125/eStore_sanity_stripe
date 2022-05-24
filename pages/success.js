import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";
import { BsBagCheckFill } from "react-icons/bs";
import { runFireworks } from "../lib/utils";

function Success() {
	const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
	const [order, setOrder] = useState(null);

	useEffect(() => {
		localStorage.clear();
		setCartItems([]);
		setTotalPrice(0);
		setTotalQuantities(0);
		runFireworks();
	}, []);

	return (
		<div className="success-wrapper">
			<div className="success">
				<p className="icon">
					<BsBagCheckFill />
				</p>
				<h2>Thank you for your Order</h2>
				<p className="email-msg">check your email inbox for the receipt.</p>
				<p className="description">
					If you have any questions, please email{" "}
					<a className="email" href="mailto:willmakeemail@example.com">
						willmakeemail@example.com
					</a>
					<Link href={"/"}>
						<button type="button" width="280" className="btn">
							Continue Shopping
						</button>
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Success;
