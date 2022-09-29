import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import axios from "axios";
import dateParser from "../Utils";
import { editBio } from "../../feature/user.slice";
import { setUsers } from "../../feature/users.slice";
import FollowHandler from "./FollowHandler";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.getUsers.getUsers);
  const usersData = useSelector((state) => state.allUsers.users);
  const [updateImg, setupdateImg] = useState(false);
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);
  const dispatch = useDispatch();
  const handleUpdate = () => {
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userData._id,
      data: { bio },
    })
      .then((res) => dispatch(editBio(bio)))
      .catch((err) => console.log(err));

    setUpdateForm(false);
  };

  // userData && console.log(userData.bio);
  return (
    userData && (
      <div className="profil-container">
        <LeftNav />
        <h1>profil de {userData.pseudo}</h1>
        <div className="update-container">
          <div className="left-part">
            <div className="profil-update">
              <h3>photo de profil</h3>
              <img id="user-pic" src={userData.picture} alt="user-pic" />
              <button
                onClick={() => {
                  setupdateImg(true);
                }}
                className="modify-picture"
              >
                Modifier ma photo
              </button>
              {updateImg && (
                <span className="modal-pic">
                  <UploadImg />
                </span>
              )}
            </div>
          </div>
          <div className="right-part">
            <div className="bio-update">
              <h3>bio</h3>
              {updateForm === false && (
                <>
                  <p onClick={() => setUpdateForm(!updateForm)}>
                    {userData.bio}
                  </p>
                  <button onClick={() => setUpdateForm(!updateForm)}>
                    Modifier bio
                  </button>
                </>
              )}
              {updateForm && (
                <>
                  <textarea
                    type="text"
                    defaultValue={userData.bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                  <button onClick={handleUpdate}>valider modification </button>
                </>
              )}
              <h4 id="member">
                Membre depuis le: {dateParser(userData.createdAt)}
              </h4>
              <h5 onClick={() => setFollowingPopup(true)}>
                Abonnements : {userData.following && userData.following.length}
              </h5>
              <h5 onClick={() => setFollowersPopup(true)}>
                Abonnés : {userData.followers && userData.followers.length}
              </h5>
            </div>
          </div>
        </div>
        {followingPopup && (
          <div className="popup-profil-container">
            <div className="modal">
              <h3> Abonnements</h3>
              <span className="cross" onClick={() => setFollowingPopup(false)}>
                &#10005;
              </span>
              <ul>
                {usersData.map((user) => {
                  for (let i = 0; i < userData.following.length; i++)
                    if (user._id === userData.following[i]) {
                      return (
                        <li key={user._id}>
                          <img src={user.picture} alt="pic" />
                          <h4>{user.pseudo}</h4>
                          <div className="follow-handler">
                            <FollowHandler
                              idToFollow={user._id}
                              type={"suggestion"}
                            />
                          </div>
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
              <span className="cross" onClick={() => setFollowersPopup(false)}>
                &#10005;
              </span>
              <ul>
                {usersData.map((user) => {
                  for (let i = 0; i < userData.followers.length; i++)
                    if (user._id === userData.followers[i]) {
                      return (
                        <li key={user._id}>
                          <img src={user.picture} alt="pic" />
                          <h4>{user.pseudo}</h4>
                          <div className="follow-handler">
                            <FollowHandler
                              idToFollow={user._id}
                              type={"suggestion"}
                            />
                          </div>
                        </li>
                      );
                    }
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default UpdateProfil;
