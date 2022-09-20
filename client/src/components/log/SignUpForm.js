import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [submitForm, setSubmitForm] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPseudo, setErrorPseudo] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const register = async (e) => {
    e.preventDefault();
    setPasswordConfirmError("");
    if (password != controlPassword) {
      setPasswordConfirmError("les mots de passe ne correspondent pas ");
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          setSubmitForm(true);
        })
        .catch((err) => {
          setErrorMail("");
          setErrorPassword("");
          setErrorPseudo("");
          console.log(err.response.data.errors);

          if (err.response.data.errors.email) {
            setErrorMail(err.response.data.errors.email);
          }
          if (err.response.data.errors.pseudo) {
            setErrorPseudo(err.response.data.errors.pseudo);
          }
          if (err.response.data.errors.password) {
            setErrorPassword(err.response.data.errors.password);
          }
        });
    }
  };

  return (
    <>
      {submitForm ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi,veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={register} id="sign-up-form">
          <label htmlFor="pseudo">Nom / Prénom</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <div className="pseudo error">{errorPseudo}</div>
          <br />
          <label htmlFor="email">Adresse Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error">{errorMail}</div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error">{errorPassword}</div>
          <br />
          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error">{passwordConfirmError}</div>
          <br />
          <input type="submit" value={"Valider inscription"} />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
