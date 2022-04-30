import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

function HeroBanner({ heroBanner }) {
	return (
		<div className="hero-banner-container">
			<div>
				<p className="beats-solo">{heroBanner.smallText}</p>
				<h3>{heroBanner.midText}</h3>
				<h1 className="">{heroBanner.largeText2}</h1>
				<img
					src={urlFor(heroBanner.image)}
					className="hero-banner-image"
					alt="headphones"
				/>

				<div>
					<Link href={`/product/${heroBanner.product}`}>
						<button type="button">{heroBanner.buttonText}</button>
					</Link>
					<div className="desc">
						<h5>Description</h5>
						<p>{heroBanner.desc}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HeroBanner;
