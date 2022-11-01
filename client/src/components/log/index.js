import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const Log = (props) => {
  const [signUpModal, SetSignUpModal] = useState(props.signup);
  const [signInModal, SetSignInModal] = useState(props.signin);
  //Gestion des modals de connection
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
        <div className="btn-contain">
          <button onClick={handleModals} className="btn" id="register">
            s'inscrire
          </button>

          <button onClick={handleModals} className="btn" id="login">
            se connecter
          </button>
        </div>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;
