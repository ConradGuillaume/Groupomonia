import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unLikePost } from "../../feature/Posts.slice";
import { UidContext } from "../AppContext";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.getUsers.getUsers);

  const dispatch = useDispatch();

  const like = () => {
    const userId = userData._id;
    const postId = post._id;
    axios
      .patch(`${process.env.REACT_APP_API_URL}api/post/like-post/${post._id}`, {
        id: userId,
      })
      .then((res) => {
        dispatch(likePost({ postId, userId }));
        console.log(res);
      })
      .catch((err) => console.log(err));
    setLiked(true);
  };

  const unLike = () => {
    const userId = userData._id;
    const postId = post._id;
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}api/post/unlike-post/${post._id}`,
        {
          id: userId,
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(unLikePost({ postId, userId }));
      })
      .catch((err) => console.log(err));
    setLiked(false);
  };

  /*test si l'id utilisateur (uid) est présent  dans ce cas le coeur seras noir setLiked true
  si je n'ai pas encore like le post il seras false et je pourrais donc liker le post */

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.likers, liked]);

  return (
    <button className="like-container">
      {uid && liked === false && (
        <img src="./img/heart-empty.png" alt="like" onClick={like} />
      )}
      {uid && liked && (
        <img src="./img/heart.png" alt="unlike" onClick={unLike} />
      )}
      <span>{post.likers.length}</span>
    </button>
  );
};

export default LikeButton;
