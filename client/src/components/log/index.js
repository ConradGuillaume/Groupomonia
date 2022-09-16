import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
const Log = (props) => {
  const [signUpModal, SetSignUpModal] = useState(props.signup);
  const [signInModal, SetSignInModal] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      SetSignInModal(false);
      SetSignUpModal(true);
    } else if (e.target.id === "login") {
      SetSignUpModal(false);
      SetSignInModal(true);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? "activ-btn" : null}
          >
            s'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signInModal ? "activ-btn" : null}
          >
            se connecter
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;
