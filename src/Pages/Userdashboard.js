import React, { useEffect, useContext, useState } from 'react';
import { Insidenav } from '../Components/Insidenav';
import { UserContext } from '../Context/HomeContext';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

export const Dashboard = () => {


  const [state, setState] = useState({
    username: '',
    deletedSuccessfully: false

  });
  const history = useHistory();
  const { homeView, homePage } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      const userName = localStorage.getItem('username');
      if (!token) {
        history.push('/');
      }
      else {
        setState({ ...state, username: userName });
        await homeView();
        document.title = "dashboard";
      }
    })();
  }, []);

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
    const res = await (await fetch(`https://replicaback.herokuapp.com/user/viewforum?id=${id}`, config)).json();
    if (res.status === 200) {
      localStorage.setItem('f_id', id);
      history.push(`/forum/${id}`);
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push(`/`);
    }

  };


  const deleteForum = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`https://replicaback.herokuapp.com/user/deleteforum?id=${id}`, config)).json();
    if (res.status === 200) {
      setState({ ...state, deletedSuccessfully: true });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push(`/`);
    }
  };
  const pushToEditForum = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`https://replicaback.herokuapp.com/user/viewEditForumTopic?id=${id}`, config)).json();
    if (res.status === 200) {
      localStorage.setItem("tp_id", res.Id);
      history.push(`/ForumTopic/${res.Id}`);
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push(`/`);
    }
  };

  const viewUserProfile = async (e, username) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`https://replicaback.herokuapp.com/user/viewOtherProfile?username=${username}`, config)).json();
    if (res.status === 200) {
      localStorage.setItem('u_pro', res.username);
      history.push(`/U_profile/${res.username}`);
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push(`/`);
    }

  };


  return (
    <>
      <div>
        <Insidenav />
        {state.deletedSuccessfully ? <p style={{ color: "darkgreen" }}> Forum deleted Successfully !! </p> : ""}
        <div>
          {homePage.forums.length === 0 ? <p>No forums Yet</p> :
            homePage.forums.map(id => {
              return (
                <div key={id.id} className="allForums">
                  <h4 onClick={(e, v) => { viewTopic(e, id.id); }} className="topic">{id.topic}</h4>
                  {(id.username === state.username) || (id.username === 'admin') ? <p className="viewp">{id.username} </p> : <p onClick={(e, f) => viewUserProfile(e, id.username)} className="viewpro"  >By : {id.username}</p>}
                  <p>At : {moment(id.createdat).fromNow()}</p>
                  {id.username === state.username ? <button type="button" style={{ backgroundColor: "red" }} onClick={(e, i) => { deleteForum(e, id.id); }}   >Delete</button> : ""}
                  {id.username === state.username ? <button type="button" style={{ backgroundColor: "Yellow" }} onClick={(e, i) => { pushToEditForum(e, id.id); }} >Edit</button> : ""}
                </div>
              );
            })}
        </div>
        {state.deletedSuccessfully ? <p style={{ color: "darkgreen" }}> Forum deleted Successfully !! </p> : ""}

      </div>
    </>
  );
};