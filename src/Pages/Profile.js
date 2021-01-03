import React, { useEffect, useContext, useState } from 'react';
import { Insidenav } from '../Components/Insidenav';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Context/HomeContext';

import pic from '../images/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg';
import deleteImage from '../images/61848.png';
import editIcon from '../images/edit-icon_1626685.jpg';



export const userProfile = () => {
  const { userViewProfile, profile } = useContext(UserContext);
  const history = useHistory();
  const [state, setState] = useState({
    deletedSuccessfully: false,
    posted: false,
    topic: '',
    content: "",
    photo: {},
    show: false,
    uploadError: false
  });
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        history.push('/');
      }
      else {
        await profile(token);
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
    const res = await (await fetch(`http://localhost:4500/user/deleteforum?id=${id}`, config)).json();
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
    const res = await (await fetch(`http://localhost:4500/user/viewEditForumTopic?id=${id}`, config)).json();
    if (res.status === 200) {
      localStorage.setItem("tp_id", res.Id);
      history.push(`/ForumTopic/${res.Id}`);
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push(`/`);
    }
  };


  const postYourTopic = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(state)
    };
    const res = await (await fetch(`http://localhost:4500/user/createforum`, config)).json();
    if (res.status === 200) {
      setState({ ...state, posted: true });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push(`/`);
    }
  };

  const uploadPic = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    let formData = new FormData();
    formData.append('photo', state.photo[0]);
    const config = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    };
    const res = await (await fetch(`http://localhost:4500/user/uploadphoto`, config)).json();
    if (res.status === 200) {
      window.location.reload();
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push(`/`);
    }
    else if (res.status === 405) {
      setState({ ...state, uploadError: true });
    }

  };



  return (
    <>
      <div className="profilepage">
        <Insidenav />
        <div >
          {state.uploadError ? <div style={{ color: "white", backgroundColor: "red", width: "100%" }}>Upload Error</div> : ""}
          {state.posted ? <div style={{ color: "white", backgroundColor: "darkgreen", width: "100%" }}> Forum posted Successfully !! </div> : ""}
          {state.deletedSuccessfully ? <div style={{ color: "white", backgroundColor: "darkgreen", width: "100%" }}> Forum deleted Successfully !! </div> : ""}
        </div>
        <div className='wholeProfile'>
          <div className="profile_center">
            <div>
              {userViewProfile.profile.map(id => {
                return (
                  <>
                    <div key={id.id}>
                      {id.photo ? <img src={id.photo} className='default_pic' /> : <img src={pic} className='default_pic' />}

                      <p>Username:{id.username}</p>
                      <p>First name {id.fname} </p>
                      <p>Last name{id.lname} </p>
                      <p>Email:{id.email} </p>

                      <form onSubmit={(e) => uploadPic(e)} className="photo-form">
                        <input type="file" required hidden id="file-u" accept="image/*" onChange={e => setState({ ...state, photo: e.target.files })} />
                        <label for="file-u" className="choosefile">Click to Edit Photo </label>
                        <button type="submit" className="comment-btn">Upload</button>
                      </form>

                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="forum_side">
            <h3>Your Forums</h3>
            {userViewProfile.forums.length === 0 ? <p>You Wrote 0 forums</p>
              : userViewProfile.forums.map(id => {
                return (
                  <>
                    <div key={id.id} className="yourF">
                      <h4 onClick={(e, v) => { viewTopic(e, id.id); }} className="topic">{id.topic}</h4>
                      <img src={deleteImage} className='delete_img' onClick={(e, i) => { deleteForum(e, id.id); }} />
                      <img src={editIcon} className='edit_img' onClick={(e, i) => { pushToEditForum(e, id.id); }} />
                    </div>
                  </>
                );
              })}
          </div>
          <div className="downform">
            <h3>Post a Forum</h3>
            <form onSubmit={(e) => postYourTopic(e)} className="postTopic">
              <textarea rows="4" cols="15" required onChange={(e) => setState({ ...state, topic: e.target.value })} placeholder="Enter Topic"></textarea>
              <textarea rows="15" cols="35" required onChange={(e) => setState({ ...state, content: e.target.value })} placeholder="Elaborate content"></textarea>
              <button type="submit" className="pst">Post</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};