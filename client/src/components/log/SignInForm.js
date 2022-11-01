import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [emailError, SetEmailError] = useState("");
  const [passwordError, SetPasswordError] = useState("");
  const handleLogin = (e) => {
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
        if (res) window.location = "/home";
      })
      //Gestion des erreur en Front et en back
      .catch((err) => {
        SetEmailError();
        SetPasswordError();
        if (email.length === 0) {
          SetEmailError("Veuillez remplir l'email");
        } else if (err.response.status === 404) {
          SetEmailError(err.response.data.message);
        }
        if (password.length === 0) {
          SetPasswordError("Veuillez remplir le mot-de-passe");
        } else if (err.response.status === 401) {
          SetPasswordError(err.response.data.message);
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
      <div className="email error">{emailError}</div>
      <br />
      <label htmlFor="password">Mot de passe</label>

      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => SetPassword(e.target.value)}
        value={password}
      />
      <div className="password error">{passwordError}</div>
      <br />
      <input type="submit" value={"Se connecter"} />
    </form>
  );
};

export default SignInForm;
