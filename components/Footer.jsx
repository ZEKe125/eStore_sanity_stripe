import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

function Footer() {
	return (
		<div className="footer-container">
			<p>2022 Zeke's Supply Co. all rights reserved</p>
			<p className="icons">
				<AiFillInstagram />
				<AiOutlineTwitter />
			</p>
		</div>
	);
}

export default Footer;
