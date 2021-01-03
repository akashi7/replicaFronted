import React, { useState } from 'react';
import { Homenav } from '../Components/Homenavbar';
import { useHistory } from 'react-router-dom';

export const ToLogin = () => {
  const history = useHistory();
  const [state, setState] = useState({
    email: '',
    password: '',
    loading: false,
    err: ''
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    };
    const res = await (await fetch(`http://localhost:4500/auth/U-login`, config)).json();
    if (res.status === 200) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', res.username);
      history.push('/dashboard');
    }
    else if (res.status === 408) {
      setState({ ...state, err: "User doesn't Exist" });
    }
    else if (res.status === 419) {
      setState({ ...state, err: "Wrong Password" });
    }
    else if (res.status === 409) {
      setState({ ...state, err: res.error });
    }
  };
  return (
    <>
      <div className="bo">
        <Homenav />
        <div className="sign">
          <form className="signup-form" onSubmit={(e) => handleSubmit(e)}>
            {state.err ? <div className="errors">
              {state.err}
            </div> : ""}
            <input type="text" placeholder="Email" required onChange={(e) => setState({ ...state, email: e.target.value })} />
            <input type="password" placeholder="Password" required onChange={(e) => setState({ ...state, password: e.target.value })} />
            {state.loading ? <button type="submit" className="sign-btn">Loading...</button> : <button type="submit" className="sign-btn">Log In</button>}
          </form>
        </div>

      </div>
    </>);
};