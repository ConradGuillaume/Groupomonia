import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ModifiedCardImage = () => {
  const [file, setFile] = useState();
  const [upFile, setUpFile] = useState();
  const userData = useSelector((state) => state.getUsers.getUsers);
  function handleChange(e) {
    console.log(e.target.files[0]);
    setUpFile(URL.createObjectURL(e.target.files[0]));
  }

  const handlePicture = (e) => {
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
    <form
      id="upload-form"
      action=""
      onChange={handleChange}
      onSubmit={handlePicture}
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
  );
};

export default ModifiedCardImage;
