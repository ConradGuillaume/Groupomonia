import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UidContext } from "../AppContext";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../feature/Posts.slice";

const EditDeleteComment = ({ data, comment, postId }) => {
  const [IsAuthor, setISAuthor] = useState(false);
  const [Edit, setEdit] = useState(false);
  const [Text, setText] = useState("");
  const dispatch = useDispatch();
  const uid = useContext(UidContext);
  const [Admin, setAdmin] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    const commentId = comment._id;
    const text = Text;
    if (Text) {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
        data: { commentId, text },
      })
        .then((res) => dispatch(editComment({ postId, commentId, text })))
        .then(() => setText(""))
        .then(() => setEdit(false));
    }
  };
  const handleDelete = (e) => {
    const commentId = comment._id;
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
      data: { commentId },
    })
      .then((res) => dispatch(deleteComment({ postId, commentId })))
      .then(() => setText(""))
      .then(() => setEdit(false));
  };

  console.log(comment.commenterId);
  console.log(uid);
  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId || data.admin === true) {
        setAdmin(true);
        setISAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId, data.admin, true]);

  return (
    <div className="edit-comment">
      {IsAuthor && Edit === false && (
        <button onClick={() => setEdit(!Edit)}>
          <img src="./img/editer.png" alt="edit" />
        </button>
      )}
      {IsAuthor && Edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!Edit)}>
            modifier/supprimer:
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <br />
          <div className="btn-edit">
            <div className="btn">
              <button
                onClick={() => {
                  if (window.confirm("supprimer le commentaire ? ")) {
                    handleDelete();
                  }
                }}
              >
                <img src="./img/delete.png" alt="trash" />
              </button>
            </div>
            <input type="submit" value="valider modifications" />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
