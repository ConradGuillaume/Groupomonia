import React, { useContext } from "react";
import Log from "../components/log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

//ICI le UID vérifie l'identité de la personne qui veux accéder au profil
const Profil = () => {
  const uid = useContext(UidContext);
  return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
          <div className="img-container">
            <img src="./img/groupomonia.png" alt="img-log" />
          </div>
          <Log signin={false} signup={true} />
        </div>
      )}
    </div>
  );
};

export default Profil;
