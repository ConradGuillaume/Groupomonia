import React from "react";
import { NavLink } from "react-router-dom";

const LeftNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink to="/" className="active-left-nav">
            <img src="./img/home.png" alt="home" />
          </NavLink>
          <br />
          <NavLink to="/" className="active-left-nav">
            <img src="./img/profil.png" alt="profil" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
