import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Context/HomeContext';
import pic from '../images/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg';
import { InsidenavAdmin } from '../Components/AdminNav';


export const AdminViewOne = () => {
  const history = useHistory();
  const { oneUser, adminViewOneUser } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('a_id');
      if (!token) {
        history.push('/');
      }
      else {
        await adminViewOneUser(token, id);
      }
    })();
  }, []);
  return (
    <>
      <div>
        <InsidenavAdmin />
        <div>
          {oneUser.userPro.map(id => {
            return (
              <>
                <div key={id.id}>
                  {id.photo ? <img src={id.photo} className='default_pic' /> : <img src={pic} className='default_pic' />}
                  <p>Username:{id.username}</p>
                  <p>First name {id.fname} </p>
                  <p>Last name{id.lname} </p>
                  <p>Email:{id.email} </p>
                </div>
              </>
            );
          })}
        </div>
      </div>

    </>
  );
};