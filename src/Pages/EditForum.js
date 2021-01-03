import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Context/HomeContext';
import { Insidenav } from '../Components/Insidenav';


export const EditForum = () => {
  const { viewEditForum, userViewEditForum } = useContext(UserContext);
  const history = useHistory();
  const [state, setState] = useState({
    newcomment: "",
    editSucces: false
  });
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('edi_id');
      if (!token) {
        history.push('/');
      }
      else {
        await viewEditForum(id, token);
      }
    })();
  }, []);

  const editComment = async (e, id) => {
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
    const res = await (await fetch(`http://localhost:4500/user/editcomment?id=${id}`, config)).json();
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
      <div>
        <Insidenav />
        <div>
          {userViewEditForum.message.map(id => {
            return (
              <>
                {state.editSucces ? <p style={{ color: 'darkgreen' }}> comment Edited Successfully</p> : ""}
                <div key={id.id}>
                  <form onSubmit={(e, k) => editComment(e, id.id)} className="comment-form">
                    <textarea cols='40' rows='10' required onChange={(e) => { setState({ ...state, newcomment: e.target.value }); }}>{id.comment}</textarea>
                    <button type="submit" className="comment-btn">Edit</button>
                  </form>
                </div>
              </>
            );
          })}
        </div>
      </div>


    </>
  );
};