import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import ProfilAllUser from "../components/Profil/ProfilAllUser";
//ICI uid est utilisé pour s'assurer que la personne qui ai accès au profil d'un utilisateur soit bien connecté
const ProfilPublic = () => {
  const uid = useContext(UidContext);
  return (
    <>
      <div>{uid && <ProfilAllUser />}</div>
    </>
  );
};

export default ProfilPublic;
