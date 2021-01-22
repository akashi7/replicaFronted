import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';



export const Insidenav = () => {
  const [state, setState] = useState({

  });
  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    history.push('/');
  };
  function pushToProfile(e) {
    e.preventDefault();
    history.push('/profile');
  }
  return (
    <>
      <nav className="Homenav-bar">
        <div className="nav-links">
          <h2 onClick={() => history.push('/dashboard')} className="signup_link">Home</h2>
        </div>

        <ul className="nav-links">
          <li onClick={(e) => pushToProfile(e)} className="signup_link">Profile</li>
          <li onClick={() => logOut()} className="signup_link">Log Out</li>
        </ul>
      </nav>
    </>
  );
};