import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFollowUser, setUnFollowUser } from "../../feature/user.slice";
import { isEmpty } from "../Utils";

const FollowHandler = ({ idToFollow, type }) => {
  const userData = useSelector((state) => state.getUsers.getUsers);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();
  const [unFollow, setunFollow] = useState(false);
  const [follow, setfollow] = useState(true);
  /* le follow est envoyé dans la BDD et dans le store redux */
  const handleFollow = () => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}api/user/follow/${userData._id}`,
        { idToFollow }
      )
      .then((res) => dispatch(setFollowUser(idToFollow)))
      .catch((err) => console.log(err));

    setIsFollowed(true);
  };

  /* le UnFollow est envoyé dans la BDD et dans le store redux */

  const handleUnfollow = () => {
    const idToUnFollow = idToFollow;
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}api/user/unfollow/${userData._id}`,
        { idToUnFollow }
      )
      .then((res) => dispatch(setUnFollowUser(idToUnFollow)))
      .catch((err) => console.log(err));
    setIsFollowed(true);
  };

  /*Vérifie que userData.FOllowing n'est pas vide alors je lance la fonction   */
  useEffect(() => {
    if (!isEmpty(userData.following.includes(idToFollow))) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);
  return (
    <>
      {/* si isFOllowed et si userData n'est pas vie   sont true =>  */}
      {isFollowed && !isEmpty(userData) && (
        <div
          onMouseEnter={() => setunFollow(true) + setfollow(false)}
          onMouseLeave={() => setunFollow(false) + setfollow(true)}
          onClick={handleUnfollow}
        >
          {/* Type me permet de réutilliser ma fonction follow unfollow dans mon projet sous différents visuel  */}
          {type === "card" && <img src="./img/checked.png" alt="checked" />}
          {type === "suggestion" && follow && (
            <button className="unFollow-btn">Abonné</button>
          )}
          {type === "suggestion" && unFollow && (
            <button className="unFollow-btn">désabonné</button>
          )}
        </div>
      )}
      {/* si isFOllowed est false  et userData n'est pas vide  => */}
      {isFollowed === false && !isEmpty(userData) && (
        <div onClick={handleFollow}>
          {type === "card" && <img src="./img/unchecked.png" alt="unchecked" />}
          {type === "suggestion" && (
            <button className="follow-btn">Suivre</button>
          )}
        </div>
      )}
    </>
  );
};

export default FollowHandler;
