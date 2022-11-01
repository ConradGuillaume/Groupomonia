import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./log/Logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.getUsers.getUsers);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink className="navigate" to="/" tabIndex={0}>
            <div className="logo">
              <h3>Groupomania</h3>
            </div>
          </NavLink>
        </div>
        {uid && userData && (
          <ul className="user-nav">
            <li className="welcome">
              <NavLink className="navigate" to="/profil">
                <span id="welcome-user"> {userData.pseudo} </span>
              </NavLink>
            </li>
            <div className="logo-container">
              <li>
                <NavLink className="navigate" to="/profil">
                  <img src="./img/profil.png" alt="profil" />
                </NavLink>
              </li>
              <li>
                <NavLink className="navigate" to="/home">
                  <img src="./img/home.png" alt="home" />
                </NavLink>
              </li>
              <Logout />
            </div>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
