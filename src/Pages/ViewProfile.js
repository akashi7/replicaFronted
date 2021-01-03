import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Context/HomeContext';
import pic from '../images/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg';
import { Insidenav } from '../Components/Insidenav';


export const UserViewOtherProfiles = () => {
  const history = useHistory();
  const { viewOther, ViewOtherProfile } = useContext(UserContext);
  useEffect(() => {
    (
      async () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('u_pro');
        if (!token) {
          history.push('/');
        }
        else {
          document.title = `${username}`;
          await viewOther(token, username);
        }
      }
    )();
  }, []);

  ;


  const viewTopic = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`http://localhost:4500/user/viewforum?id=${id}`, config)).json();
    if (res.status === 200) {
      localStorage.setItem('f_id', id);
      history.push(`/forum/${id}`);
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push(`/`);
    }

  };

  return (
    <>
      <Insidenav />
      {ViewOtherProfile.profile.map(id => {
        return (
          <>
            <div key={id.id}>
              {id.photo ? <img src={id.photo} className='default_pic' /> : <img src={pic} className='default_pic' />}
              <p>User name : {id.username} </p>
              <p>First name: {id.fname} </p>
              <p>Last names : {id.lname} </p>
              <p>Email : {id.email} </p>

            </div>
          </>
        );
      })}

      {ViewOtherProfile.all.length === 0 ? <p> 0 </p> : ViewOtherProfile.all.map(id => {
        return (
          <>
            <div key={id.id} className="written">
              <p>Forums Written</p>
              <p>Total:{id.allforums} </p>
            </div>
          </>
        );
      })}

      {ViewOtherProfile.forums.length === 0 ? <p>No Forums Yet</p>
        : ViewOtherProfile.forums.map(id => {
          return (
            <>
              <div key={id.id} className="hisFo">
                <h4 className="topic" onClick={(e, v) => { viewTopic(e, id.id); }}>{id.topic} </h4>
              </div>
            </>
          );
        })}
    </>
  );

};