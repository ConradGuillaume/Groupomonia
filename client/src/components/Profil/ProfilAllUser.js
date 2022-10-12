import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import dateParser, { isEmpty } from "../Utils";
import LeftNav from "../LeftNav";
import { setUsers } from "../../feature/users.slice";
const ProfilAllUser = () => {
  const params = useParams();
  const usersData = useSelector((state) => state.allUsers.users);
  const findUser = usersData.find((user) => user._id === params.Id);
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  if (usersData) {
    return (
      <>
        <div className="profil-container">
          <LeftNav />
          <h1></h1>
          <div className="update-container">
            <div className="left-part">
              <div className="profil-update">
                <h3>{findUser.pseudo}</h3>
                <img id="user-pic" src={findUser.picture} alt="" />
              </div>
            </div>
            <div className="right-part">
              <div className="bio-update">
                <h3>bio</h3>
                <p>{findUser.bio}</p>
                <h4 id="member">
                  membre depuis le :{dateParser(findUser.createdAt)}
                </h4>
                <h5 onClick={() => setFollowingPopup(true)}>
                  {" "}
                  Abonnements :{findUser.following && findUser.following.length}
                </h5>
                <h5 onClick={() => setFollowersPopup(true)}>
                  abonnés :{findUser.followers && findUser.followers.length}
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
                    for (let i = 0; i < findUser.following.length; i++)
                      if (user._id === findUser.following[i]) {
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
                    for (let i = 0; i < findUser.followers.length; i++)
                      if (user._id === findUser.followers[i]) {
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
