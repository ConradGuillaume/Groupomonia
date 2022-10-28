import React from "react";
import axios from "axios";
import cookie from "js-cookie";

const Logout = () => {
  //kill du cookie dans le front 
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };
// Kill du cookie dans le back 
  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/profil";
  };

  return (
    <li onClick={logout}>
      <img className="logout" src="./img/logout.png" alt="logout" />
    </li>
  );
};

export default Logout;
