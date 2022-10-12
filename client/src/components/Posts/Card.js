import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Routes } from "react-router-dom";
import { setAllPosts, updatePost } from "../../feature/Posts.slice";
import FollowHandler from "../Profil/FollowHandler";
import dateParser, { isEmpty } from "../Utils";
import CardComment from "./CardComment";
import Delete from "./Delete";
import LikeButton from "./LikeButton";
import { createContext } from "react";

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
  const [file, setFile] = useState();
  const [upFile, setUpFile] = useState();
  const [IdValue, SetIdValue] = useState();

  function handleChange(e) {
    console.log(e.target.files[0]);
    setUpFile(URL.createObjectURL(e.target.files[0]));
  }

  const updateItem = async (e) => {
     e.preventDefault();
    const message = TextUpdate;
    const postId = post._id;
    const data = new FormData();
    console.log(file);
    console.log(postId);
    console.log(userData.pseudo);
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);
    data.append("message", message);
    if (data || TextUpdate) {
      await axios
        .put(`${process.env.REACT_APP_API_URL}api/post/${post._id}`, data, {
          message,
        })
        .then(() => dispatch(updatePost({ message, postId })))
        .then((res) => console.log("c'est PHOTO", res))
        .catch((err) => console.log(err));

      await axios
        .get(`${process.env.REACT_APP_API_URL}api/post`)
        .then((res) => dispatch(setAllPosts(res.data)));
    }
    /*if (TextUpdate) {
      axios
        .put(`${process.env.REACT_APP_API_URL}api/post/${post._id}`, {
          message,
        })
        .then(() => dispatch(updatePost({ message, postId })))
        .then((res) => console.log("c'est moi", res))
        .catch((err) => console.log(err));
    }
    setIsUpdated(false);*/
    setIsUpdated(false);
  };

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
              <Link to={`/Public/${post.posterId}`}>
                <img
                  src={usersData
                    .map((user) => {
                      if (user._id === post.posterId) return user.picture;
                    })
                    .join("")}
                  alt="poster-pic"
                />
              </Link>
            </div>
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {usersData.map((user) => {
                    if (user._id === post.posterId) {
                      return user.pseudo;
                    } else return null;
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
                      <form
                        id="upload-form"
                        action=""
                        onChange={handleChange}
                        onSubmit={updateItem}
                        className="upload-pic"
                      >
                        <label htmlFor="file">Changer d'image</label>
                        <input
                          type="file"
                          id="file"
                          name="file"
                          accept=".jpg,.jpeg,png"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                        <img className="img-prev" src={upFile} alt="" />
                        <br />
                        <input type="submit" value="Envoyer" />
                      </form>
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
export const UserContext = createContext();
export const UserProvider = (props) => {
  const [PictureId, setPictureId] = useState();
  return (
    <UserContext.Provider value={PictureId}>
      {props.children}
    </UserContext.Provider>
  );
};
export default Card;
