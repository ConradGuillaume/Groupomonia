import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const handleLogin = (e) => {
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    e.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res) window.location = "/profil";
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.status);
        if (err.response.status === 404) {
          emailError.innerHTML = err.response.data.message;
        } else if (err.response.status === 401) {
          passwordError.innerHTML = err.response.data.message;
        }
      });
  };
  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>

      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => SetEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>

      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => SetPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value={"Se connecter"} />
    </form>
  );
};

export default SignInForm;
