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

  const handleEdit = (e) => {
    e.preventDefault();
    const commentId = comment._id;
    const text = Text;

    /* modification du commentaire */

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

  /* suppression du commentaire */

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

  /* Condition qui vérifie qui fait la demande de modification / suppression */
  /* Rappel UID est l'id provenant du Token fournis a la connexion de l'utilisateur */

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId || data.admin === true) {
        setISAuthor(true);
      }
    };
    checkAuthor();
  });

  return (
    <div className="edit-comment">
      {/*affichage ou non selon authorisation  */}
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
