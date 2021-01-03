import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../Context/HomeContext';
import { useHistory } from 'react-router-dom';



export const MessageUser = () => {
  const { viewSentMessages, viewChat } = useContext(UserContext);
  const history = useHistory();


  const [state, setState] = useState({
    message: '',
    yourMessage: '',
    username: '',
  });




  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('me_us_id');
      const userName = localStorage.getItem('username');
      if (!token) {
        history.push('/');
      }
      else {
        setState({ ...state, username: userName });
        await viewSentMessages(token, id);
      }
    })();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('me_us_id');
    const config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(state)
    };
    const res = await (await fetch(`http://localhost:4500/user/sendMessage?id=${id}`, config)).json();
    if (res.status === 200) {
      // setState({ ...state, yourMessage: res.message });
      // document.getElementById("form-input").reset();
      window.location.reload();
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push(`/`);
    }
  };



  return (
    <>
      {viewChat.chat.length === 0 ? <p>No chat</p>
        : viewChat.chat.map(id => {
          return (
            <>
              <div key={id.id}>
                <div style={{ backgroundColor: "blue", margin: '10px' }}><p>{id.sender_username}</p>
                  {state.username === id.receiver_username ? <p>{id.message}</p> : ""}
                  {state.username === id.sender_username ? <p>{id.sendermessages}</p> : ""}
                </div>

              </div>
            </>
          );
        })}
      <form onSubmit={(e) => sendMessage(e)} id="form-input">
        <textarea cols="35" rows="5" onChange={(e) => setState({ ...state, message: e.target.value })}></textarea>
        <button type="submit">Send</button>
      </form>
    </>
  );
};