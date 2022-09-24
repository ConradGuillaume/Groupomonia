import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import axios from "axios";
import dateParser from "../Utils";
import { editBio } from "../../feature/Bio.slice";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.getUsers.getUsers);
  const bioEnd = useSelector((state) => state.editBio.bio);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    axios
      .put(`${process.env.REACT_APP_API_URL}api/user/${userData._id}`, {
        bio: bio,
      })
      .then((res) => dispatch(editBio(bio)))
      .catch((err) => console.log(err));
    setUpdateForm(false);
  };
  return (
    userData && (
      <div className="profil-container">
        <LeftNav />
        <h1>profil de {userData.pseudo}</h1>
        <div className="update-container">
          <div className="left-part">
            <h3>photo de profil</h3>
            <img id="user-pic" src={userData.picture} alt="user-pic" />
            <UploadImg />
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
                  >
                    {bioEnd}
                  </textarea>
                  <button onClick={handleUpdate}>valider modification </button>
                </>
              )}
              <h4 id="member">
                Membre depuis le: {dateParser(userData.createdAt)}
              </h4>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UpdateProfil;
