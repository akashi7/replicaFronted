import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Context/HomeContext';
import { Homenav } from '../Components/Homenavbar';

export const Aftersignup = () => {
  const history = useHistory();
  const { afterSignup, userAfterSignup } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const username = localStorage.getItem('username');
      if (!username) {
        history.push('/');
      }
      else {
        await afterSignup(username);
      }
    })();
  }, []);

  return (
    <>
      <div>
        <Homenav />
        <div className="after">
          {userAfterSignup.profile.length === 0 ? <p>No user sorry</p> : userAfterSignup.profile.map(id => {
            return (
              <div key={id.id}>
                <p>Thank you {id.fname} {id.lname} now Sign In </p>
                <button type="button" onClick={() => { history.push('/login'); }}  > Log In</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};