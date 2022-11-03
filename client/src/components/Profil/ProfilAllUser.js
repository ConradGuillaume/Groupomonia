import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import dateParser from "../Utils";
import { setOneUser } from "../../feature/OneUser.slice";

const ProfilAllUser = () => {
  const dispatch = useDispatch();
  /// récupération des paramètre dans l'url
  const params = useParams();

  /// useEffect pour casser un appel axios continue
  /// je récupère ma donnée de la BDD filtré par l'id URL et je la place dans un store redux
  useEffect(() => {
    if (params.Id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/user/${params.Id}`)
        .then((res) => {
          dispatch(setOneUser(res.data));
        })
        .catch((err) => {
          if (err) {
            window.location.href = "/404";
          }
        });
    }
  });
  /// je récupère la donné de l'utilisateur et je l'applique
  const OneUser = useSelector((state) => state.getOneUser.getOneUser);

  if (OneUser)
    return (
      <>
        <div className="profil-container">
          <h1>Profil de {OneUser.pseudo} </h1>
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
                <h5>
                  Abonnements :{OneUser.following && OneUser.following.length}
                </h5>
                <h5>
                  abonnés :{OneUser.followers && OneUser.followers.length}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default ProfilAllUser;
