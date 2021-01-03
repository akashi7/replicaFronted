import React from 'react';
import { Homenav } from '../Components/Homenavbar';
import { Footer } from '../Components/Footer';

export const Homepage = () => {

	return (
		<>
			<div className="bo">
				<Homenav />
				<div className="home1">
					<h1 style={{ color: "white" }}>Replica</h1>
				</div>
			</div>
			<Footer />
		</>

	);
};