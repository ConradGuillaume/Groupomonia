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
    /*if (pseudo.length === 0) {
      console.log(pseudo.length);
      setErrorPseudo("veuillez rentrer un Nom / Prénom");
    } else if (pseudo.length > 0 && (pseudo.length < 1 || pseudo.length > 40)) {
      setErrorPseudo("le nom / Prénom doit faire entre 1 et 40 caractères");
    } else if (!pseudo.match(/^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/)) {
      setErrorPseudo(
        "Le Nom / Prénom ne doit pas contenir de caractère spéciaux "
      );
    }
    /* if (email.length === 0) {
      setErrorMail("veuillez rentrer une adresse e-mail ");
    } else if (
      !email.match(
        /^((\w[^\W]+)[.-]?){1,}@(([0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3})|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setErrorMail(
        "l'email n'est pas valide merci de le remplir correctement "
      );
    }*/
    /* if (password.length === 0) {
      setErrorPassword("veuillez rentrer un mot de passe ");
    } else if (
      password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    ) {
      setErrorPassword(
        "Minimum 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre"
      );
    }*/
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
