import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';





export const Homenav = () => {

	const [state, setState] = useState({

	});

	const history = useHistory();
	const push = (e) => {
		e.preventDefault();
		history.push('/signup');
	};
	return (
		<>
			<nav className="Homenav-bar">
				<div className="nav-links">
					<h2 onClick={() => history.push('/')} className="signup_link">Replica</h2>
				</div>
				<ul className="nav-links">
					<li onClick={(e) => push(e)} className="signup_link">Sign Up</li>
					<li onClick={() => history.push('/login')} className="signup_link">Login</li>
					<li onClick={() => history.push('/about')} className="signup_link">About </li>
				</ul>
			</nav>
		</>
	);
};