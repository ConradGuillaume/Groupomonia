import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../../feature/Posts.slice";
import { timestampParser } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";

const CardComment = ({ post }) => {
  const [Text, setText] = useState("");
  const dispatch = useDispatch();
  /* Récupération data provenant du store redux */
  const usersData = useSelector((state) => state.allUsers.users);
  const userData = useSelector((state) => state.getUsers.getUsers);

  const handleComment = async (e) => {
    e.preventDefault();
    const commenterId = userData._id;
    const text = Text;
    const postId = post._id;
    const commenterPseudo = userData.pseudo;

    if (Text) {
      await axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
        data: { commenterId, text, commenterPseudo },
      }).then(() => setText(""));
      /* Mise a jour de la data modifié*/
      return await axios
        .get(`${process.env.REACT_APP_API_URL}api/post`)
        .then((res) => dispatch(setAllPosts(res.data)));
    }
  };

  return (
    <div className="comments-container">
      {post.comments.map((comment) => {
        /* Récupération des commentaires du post*/
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="left-part">
              <div className="pseudo">
                <img
                  src={usersData
                    .map((user) => {
                      if (user._id === comment.commenterId) return user.picture;
                      else return null;
                    })
                    .join("")}
                  alt="commenter-pic"
                />

                <h3>{comment.commenterPseudo}</h3>
              </div>
              <span>
                {comment.timestamp && timestampParser(comment.timestamp)}
              </span>
            </div>
            <div className="right-part">
              <div className="comment-header"></div>

              <p>{comment.text}</p>
              <EditDeleteComment
                data={userData}
                comment={comment}
                postId={post._id}
              />
            </div>
          </div>
        );
      })}
      {userData._id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            id=""
            onChange={(e) => setText(e.target.value)}
            value={Text}
            placeholder="commenter"
          />
          <br />
          <input type="submit" value="envoyer" />
        </form>
      )}
    </div>
  );
};

export default CardComment;
