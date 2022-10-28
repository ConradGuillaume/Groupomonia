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
    //Vérification mot de passe indentique
    if (password !== controlPassword) {
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
        //Envoie des données une fois juste et vérifié
        .then((res) => {
          setSubmitForm(true);
        })
        //Récuperation des erreurs provenant du Back  et interprétation en temps réel dans le front
        .catch((err) => {
          console.log(err);
          setErrorMail("");
          setErrorPassword("");
          setErrorPseudo("");

          if (err.response.data.messagePseudo) {
            setErrorPseudo(err.response.data.messagePseudo);
          } else if (err.response.data.messagePseudoIncorrect) {
            setErrorPseudo(err.response.data.messagePseudoIncorrect);
          }
          if (err.response.data.messageNoMail) {
            setErrorMail(err.response.data.messageNoMail);
          } else if (err.response.data.messageMailIncorrect) {
            setErrorMail(err.response.data.messageMailIncorrect);
          }
          if (err.response.data.messagePassNull) {
            setErrorPassword(err.response.data.messagePassNull);
          } else if (err.response.data.messageInvalidPass) {
            setErrorPassword(err.response.data.messageInvalidPass);
          }
        });
    }
  };
  // si enregistrement validé  redirection vers SigneInForm
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
