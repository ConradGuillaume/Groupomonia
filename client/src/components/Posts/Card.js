import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setAllPosts, updatePost } from "../../feature/Posts.slice";
import FollowHandler from "../Profil/FollowHandler";
import dateParser, { isEmpty } from "../Utils";
import CardComment from "./CardComment";
import Delete from "./Delete";
import LikeButton from "./LikeButton";
import { createContext } from "react";

const Card = ({ post }) => {
  //IsLoading est un spinner qui se retire quand la data est présente
  const [isLoading, setIsLoading] = useState(true);
  const [IsUpdated, setIsUpdated] = useState(false);
  const [TextUpdate, setTextUpdate] = useState(null);
  const [ShowComments, setShowComments] = useState(false);
  const [updateImg, setupdateImg] = useState(false);
  const dispatch = useDispatch();
  //récupération de la data Utilisateur et Autre-Utilisateur dans le store redux
  const usersData = useSelector((state) => state.allUsers.users);
  const userData = useSelector((state) => state.getUsers.getUsers);
  const [file, setFile] = useState();
  const [upFile, setUpFile] = useState();
  //isAllowed ici est une fonction qui vérifie le droit a la modification admin ou user
  const isAllowed =
    userData && (userData._id === post.posterId || userData.admin === true);

  function handleChange(e) {
    setUpFile(URL.createObjectURL(e.target.files[0]));
  }
  if (TextUpdate === null) {
    setTextUpdate(post.message);
  }

  const updateItem = async (e) => {
    e.preventDefault();
    const message = TextUpdate;
    const postId = post._id;
    const data = new FormData();
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
        .then()
        .catch((err) => console.log(err));

      await axios
        .get(`${process.env.REACT_APP_API_URL}api/post`)
        .then((res) => dispatch(setAllPosts(res.data)));
    }

    setIsUpdated(false);
  };

  // isEmpty est une fonction dans Utils qui permet de vérifier si la data est présente
  //useEffect ici vérifie si la data est présente et met fin au spinner loading
  useEffect(() => {
    !isEmpty(usersData) && setIsLoading(false);
  }, [usersData]);
  return (
    <li className="card-container" key={post._id}>
      {/*spinner de chargement */}
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-right">
            <div className="card-left">
              <Link to={`/Public/${post.posterId}`}>
                {/*redirection vers le profil d'autrre Utilisateurs utilisation de useParams */}
                <button className="tab-nav-btn-pic">
                  {/*recupération des pictures Utilisateurs  */}
                  <img
                    tabIndex="0"
                    src={usersData
                      .map((user) => {
                        if (user._id === post.posterId) {
                          return user.picture;
                        }
                        return null;
                      })
                      .join("")}
                    alt="poster-pic"
                  />
                </button>
              </Link>
            </div>
            <div className="card-header">
              <div className="pseudo">
                {/* Récupération des Pseudos */}
                <h3>
                  {usersData.map((user) => {
                    if (user._id === post.posterId) {
                      return user.pseudo;
                    } else return null;
                  })}
                </h3>
                {/* Condition => l'utilisateur connecté n'a pas accès au bouton abonné pour lui même */}
                {userData._id !== post.posterId && (
                  <FollowHandler idToFollow={post.posterId} type={"card"} />
                )}
              </div>
              <span className="timeStamp">{dateParser(post.createdAt)}</span>
            </div>
            {/* modification du Post  */}
            {IsUpdated === false && <p>{post.message}</p>}
            {IsUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="bn" onClick={updateItem}>
                    Valider modification
                  </button>
                  <button
                    onClick={() => {
                      setupdateImg(true);
                    }}
                    className="bn"
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
              {/* gestion des paramètres video Youtube */}
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
            {/* isAllowed ici est une condition qui vérifie si la personne à les droits d'accès aux modification (utilisateur / admin) */}
            {isAllowed && (
              <div className="button-container">
                <button id="modify" onClick={() => setIsUpdated(!IsUpdated)}>
                  <img
                    className="edit-delete"
                    src="./img/editer.png"
                    alt="Edit"
                  />
                </button>
                <Delete id={post._id} />
              </div>
            )}
            <div className="card-footer">
              {/* modal commentaire et bouton like */}
              <button
                className="comment-icon"
                onClick={() => setShowComments(!ShowComments)}
              >
                <img
                  onClick={() => setShowComments(!ShowComments)}
                  src="./img/comment2.png"
                  alt="comment"
                />
                <span>{post.comments.length}</span>
              </button>
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

export default Card;
