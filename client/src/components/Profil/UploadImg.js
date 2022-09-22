import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const UploadImg = () => {
  const [file, setFile] = useState();

  const userData = useSelector((state) => state.getUsers.getUsers);

  const handlePicture = (e) => {
    e.preventDefault();
    console.log(e.target);
    const data = new FormData();
    console.log(data);
    console.log(userData.pseudo);
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);
    axios
      .put(`${process.env.REACT_APP_API_URL}api/user/${userData._id}`, data)
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer d'image</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg,.jpeg,png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;
