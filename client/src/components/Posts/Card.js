import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../feature/Posts.slice";
import FollowHandler from "../Profil/FollowHandler";
import dateParser, { isEmpty } from "../Utils";
import CardComment from "./CardComment";
import Delete from "./Delete";
import LikeButton from "./LikeButton";

import { render } from "react-dom";
import Lottie from "lottie-web";
import comment from "../../../src/lotties/comment.json";
import UploadImg from "../Profil/UploadImg";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [IsUpdated, setIsUpdated] = useState(false);
  const [TextUpdate, setTextUpdate] = useState(null);
  const [ShowComments, setShowComments] = useState(false);
  const [updateImg, setupdateImg] = useState(false);
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.allUsers.users);
  const userData = useSelector((state) => state.getUsers.getUsers);
  const container = useRef(null);

  const updateItem = () => {
    const message = TextUpdate;
    const postId = post._id;
    if (TextUpdate) {
      axios
        .put(`${process.env.REACT_APP_API_URL}api/post/${post._id}`, {
          message,
        })

        .then((res) => dispatch(updatePost({ message, postId })))
        .catch((err) => console.log(err));
    }
    setIsUpdated(false);
  };
  console.log(usersData);
  console.log("PostLikers", post.likers);
  useEffect(() => {
    !isEmpty(usersData) && setIsLoading(false);
  }, [usersData]);
  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-right">
            <div className="card-left">
              <img
                src={usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.picture;
                  })
                  .join("")}
                alt="poster-pic"
              />
            </div>
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {usersData.map((user) => {
                    if (user._id === post.posterId) return user.pseudo;
                    else return null;
                  })}
                </h3>
                <FollowHandler idToFollow={post.posterId} type={"card"} />
              </div>
              <span className="timeStamp">{dateParser(post.createdAt)}</span>
            </div>
            {IsUpdated === false && <p>{post.message}</p>}
            {IsUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modification
                  </button>
                  <button
                    onClick={() => {
                      setupdateImg(true);
                    }}
                    className="btn"
                  >
                    Modifier ma photo
                  </button>
                  {updateImg && (
                    <span className="modal-pic">
                      
                    </span>
                  )}
                </div>
              </div>
            )}
            <div className="pic-container">
              {post.picture && (
                <img src={post.picture} alt="card-pic" className="card-pic" />
              )}
              {post.video && (
                <iframe
                  width="500"
                  height="300"
                  src={post.video}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={post._id}
                ></iframe>
              )}
            </div>
            {userData._id === post.posterId && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!IsUpdated)}>
                  <img
                    className="edit-delete"
                    src="./img/editer.png"
                    alt="Edit"
                  />
                </div>
                <Delete id={post._id} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!ShowComments)}
                  src="./img/comment2.png"
                  alt="comment"
                />
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
            </div>
            {ShowComments && <CardComment post={post} />}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
