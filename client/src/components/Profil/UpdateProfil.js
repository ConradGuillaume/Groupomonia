import React from "react";
import LeftNav from "../LeftNav";
import { useSelector } from "react-redux";
import UploadImg from "./UploadImg";
const UpdateProfil = () => {
  const userData = useSelector((state) => state.getUsers.getUsers);

  return (
    userData && (
      <div className="profil-container">
        <LeftNav />
        <h1>profil de {userData.pseudo}</h1>
        <div className="update-container">
          <div className="left-part">
            <h3>photo de profil</h3>
            <img src={userData.picture} alt="user-pic" />
            <UploadImg />
          </div>
        </div>
      </div>
    )
  );
};

export default UpdateProfil;
