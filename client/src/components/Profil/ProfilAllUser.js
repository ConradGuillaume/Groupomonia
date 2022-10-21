import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import dateParser, { isEmpty } from "../Utils";
import LeftNav from "../LeftNav";
import { setUsers } from "../../feature/users.slice";
import { setOneUser } from "../../feature/OneUser.slice";

const ProfilAllUser = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const usersData = useSelector((state) => state.allUsers.users);

  useEffect(() => {
    if (params.Id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/user/${params.Id}`)
        .then((res) => {
          dispatch(setOneUser(res.data));
        });
    }
  }, []);

  const OneUser = useSelector((state) => state.getOneUser.getOneUser);
  console.log(OneUser);
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  if (OneUser) {
    return (
      <>
        <div className="profil-container">
          <h1></h1>
          <div className="update-container">
            <div className="left-part">
              <div className="profil-update">
                <h3>{OneUser.pseudo}</h3>
                <img id="user-pic" src={OneUser.picture} alt="" />
              </div>
            </div>
            <div className="right-part">
              <div className="bio-update">
                <h3>bio</h3>
                <p>{OneUser.bio}</p>
                <h4 id="member">
                  membre depuis le :{dateParser(OneUser.createdAt)}
                </h4>
                <h5 onClick={() => setFollowingPopup(true)}>
                  {" "}
                  Abonnements :{OneUser.following && OneUser.following.length}
                </h5>
                <h5 onClick={() => setFollowersPopup(true)}>
                  abonnés :{OneUser.followers && OneUser.followers.length}
                </h5>
              </div>
            </div>
          </div>

          {followingPopup && (
            <div className="popup-profil-container">
              <div className="modal">
                <h3> Abonnements</h3>
                <span
                  className="cross"
                  onClick={() => setFollowingPopup(false)}
                >
                  &#10005;
                </span>
                <ul>
                  {usersData.map((user) => {
                    for (let i = 0; i < OneUser.following.length; i++)
                      if (user._id === OneUser.following[i]) {
                        return (
                          <li key={user._id}>
                            <img src={user.picture} alt="pic" />
                            <h4>{user.pseudo}</h4>
                          </li>
                        );
                      }
                  })}
                </ul>
              </div>
            </div>
          )}
          {followersPopup && (
            <div className="popup-profil-container">
              <div className="modal">
                <h3>Abonné(e)s</h3>
                <span
                  className="cross"
                  onClick={() => setFollowersPopup(false)}
                >
                  &#10005;
                </span>
                <ul>
                  {usersData.map((user) => {
                    for (let i = 0; i < OneUser.followers.length; i++)
                      if (user._id === OneUser.followers[i]) {
                        return (
                          <li key={user._id}>
                            <img src={user.picture} alt="pic" />
                            <h4>{user.pseudo}</h4>
                          </li>
                        );
                      }
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
};

export default ProfilAllUser;
