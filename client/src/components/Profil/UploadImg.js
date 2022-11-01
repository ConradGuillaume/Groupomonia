import axios from "axios";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../feature/user.slice";
import { UidContext } from "../AppContext";

const UploadImg = () => {
  const [file, setFile] = useState();
  const [upFile, setUpFile] = useState();
  const userData = useSelector((state) => state.getUsers.getUsers);
  const dispatch = useDispatch();
  const uid = useContext(UidContext);

  /* Affichage de la preview de la photo qui va remplacer l'ancienne   */
  function handleChange(e) {
    setUpFile(URL.createObjectURL(e.target.files[0]));
  }

  /*Fonction pour modifier la photo de profil et l'enregistrer dans la BDD  */
  const handlePicture = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);
    await axios
      .put(`${process.env.REACT_APP_API_URL}api/user/${userData._id}`, data)
      .then((res) => {
        console.log(res);
      });
    await axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch(setUserData(res.data));
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
      <label className="hello" htmlFor="file-upload">
        Changer d'image
      </label>
      <input
        className="hello-btn"
        type="file"
        id="file-upload"
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

export default UploadImg;
