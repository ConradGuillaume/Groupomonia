import React from "react";
import LeftNav from "../components/LeftNav";
import ProfilAllUser from "../components/Profil/ProfilAllUser";
import { UserProvider } from "../components/Posts/Card";
import { useParams } from "react-router-dom";

const ProfilPublic = () => {
  return (
    <>
      <div>
        <ProfilAllUser />
      </div>
    </>
  );
};

export default ProfilPublic;
