import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

function Footer() {
	const footerText = "2022 Zeke's Supply Co. all rights reserved.";
	return (
		<div className="footer-container">
			<p>{footerText}</p>
			<p className="icons">
				<AiFillInstagram />
				<AiOutlineTwitter />
			</p>
		</div>
	);
}

export default Footer;
