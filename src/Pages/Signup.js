import React, { useState } from 'react';
import { Homenav } from '../Components/Homenavbar';
import { useHistory } from 'react-router-dom';


export const SignUp = () => {
  const history = useHistory();
  const [state, setState] = useState({
    username: "",
    password: '',
    confirmpassword: '',
    email: '',
    fname: "",
    lname: '',
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
    const res = await (await fetch(`http://localhost:4500/auth/U-signup`, config)).json();
    if (res.status === 200) {
      localStorage.setItem('username', res.username);
      history.push('/aftersignup');
    }
    else if (res.status === 410) {
      setState({ ...state, err: "Email arleady Exist" });
    }
    else if (res.status === 419) {
      setState({ ...state, err: "Passwords do not match" });
    }
    else if (res.status === 411) {
      setState({ ...state, err: "Username arleady Exist" });
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
            <input type="text" placeholder="Username" required onChange={(e) => setState({ ...state, username: e.target.value })} />
            <input type="text" placeholder="First name" required onChange={(e) => setState({ ...state, fname: e.target.value })} />
            <input type="text" placeholder="Last name" required onChange={(e) => setState({ ...state, lname: e.target.value })} />
            <input type="password" placeholder="Password" required onChange={(e) => setState({ ...state, password: e.target.value })} />
            <input type="password" placeholder="confirm password" required onChange={(e) => setState({ ...state, confirmpassword: e.target.value })} />
            <button type="submit" className="sign-btn">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};