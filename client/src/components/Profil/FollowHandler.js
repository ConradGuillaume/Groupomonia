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
  const handleFollow = () => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}api/user/follow/${userData._id}`,
        { idToFollow }
      )
      .then((res) => dispatch(setFollowUser(idToFollow)))
      .catch((err) => console.log(err));
    console.log(idToFollow);

    setIsFollowed(true);
  };
  // console.log(hello);
  const handleUnfollow = () => {
    const idToUnFollow = idToFollow;
    console.log(idToUnFollow);
    console.log(userData._id);
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}api/user/unfollow/${userData._id}`,
        { idToUnFollow }
      )
      .then((res) => dispatch(setUnFollowUser(idToUnFollow)))
      .catch((err) => console.log(err));
    setIsFollowed(true);
  };

  useEffect(() => {
    if (!isEmpty(userData.following.includes(idToFollow))) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);
  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <button
          onMouseEnter={() => setunFollow(true) + setfollow(false)}
          onMouseLeave={() => setunFollow(false) + setfollow(true)}
          onClick={handleUnfollow}
        >
          {type === "card" && <img src="./img/checked.png" alt="checked" />}
          {type === "suggestion" && follow && (
            <button className="unFollow-btn">Abonné</button>
          )}
          {type === "suggestion" && unFollow && (
            <button className="unFollow-btn">désabonné</button>
          )}
        </button>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <button onClick={handleFollow}>
          {type === "card" && <img src="./img/unchecked.png" alt="unchecked" />}
          {type === "suggestion" && (
            <button className="follow-btn">Suivre</button>
          )}
        </button>
      )}
    </>
  );
};

export default FollowHandler;
