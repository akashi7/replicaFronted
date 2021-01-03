import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Context/HomeContext';
import { Insidenav } from '../Components/Insidenav';


export const EditForumTopic = () => {
  const history = useHistory();
  const { viewEditForumTopic, userEditForumTopic } = useContext(UserContext);


  const [state, setState] = useState({
    topic: '',
    editSucces: false
  });

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('tp_id');
      if (!token) {
        history.push('/');
      }
      else {
        await viewEditForumTopic(token, id);
        document.title = "Edit topic";
      }
    })();
  }, []);

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(state)
    };
    const res = await (await fetch(`http://localhost:4500/user/editforum?id=${id}`, config)).json();
    if (res.status === 200) {
      setState({ ...state, editSucces: true });
      setTimeout(() => {
        history.goBack();
      }, 3000);

    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push(`/`);
    }

  };
  return (
    <>
      <Insidenav />
      {state.editSucces ? <p style={{ color: "darkgreen" }}>Topic Changed Successfully!!</p> : ""}
      <p>Edit Topic</p>
      { userEditForumTopic.forum.map(id => {
        return (
          <>
            <div key={id.id}>
              <form onSubmit={(e, i) => { handleSubmit(e, id.id); }} className="comment-form">
                <textarea cols='40' rows='10' required onChange={(e) => { setState({ ...state, topic: e.target.value }); }}>{id.topic}</textarea>
                <button type="submit" className="comment-btn">Edit</button>
              </form>
            </div>
          </>
        );
      })}
    </>
  );
};