import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Log from "../components/log";
import ProfilAllUser from "../components/Profil/ProfilAllUser";

const ProfilPublic = () => {
  const uid = useContext(UidContext);
  return (
    <>
      <div>{uid && <ProfilAllUser />}</div>
    </>
  );
};

export default ProfilPublic;
