import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Context/HomeContext';

import { InsidenavAdmin } from '../Components/AdminNav';

export const Admindashboard = () => {
  const history = useHistory();
  const { allUsers, adminViewUsers } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        history.push('/');
      }
      else {
        await adminViewUsers(token);
      }
    })();
  }, []);
  const viewUser = async (id) => {
    const token = localStorage.getItem('token');
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`https://replicaback.herokuapp.com/admin/user?id=${id}`, config)).json();
    if (res.status === 200) {
      localStorage.setItem('a_id', id);
      history.push(`/viewuser/${res.username}`);
    }
    else if (res.status === 401) {
      history.push(`/`);
    }
  };
  return (
    <>
      <div>
        <InsidenavAdmin />
        <div className="allusers">
          {allUsers.people.map(id => {
            return (
              <div key={id.id} className="UserOne">
                <p onClick={(i) => viewUser(id.id)}>username : {id.username}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};