import React, { useContext } from "react";
import Log from "../components/log";
import { UidContext } from "../components/AppContext";
const Profil = () => {
  const uid = useContext(UidContext);
  return (
    <div className="profil-page">
      {uid ? (
        <h1>JE SUIS CONNECTE YOUPIH ET JAI UN GROS JETON </h1>
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/cowork.jpg" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
