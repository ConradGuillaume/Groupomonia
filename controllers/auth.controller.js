const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const validatePassword = (password) => {
  const regexPassword =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^s]){9,16}$/;
  // 1 number, 1 uppercase letters, 1 lowercase letters, 1 non-alpha numeric number, between 8 and 16 characters with no space
  return regexPassword.test(password);
};
const validatePseudo = (pseudo) => {
  const regexPseudo = /^[a-zA-Z0-9\s_.-]*$/;
  return regexPseudo.test(pseudo);
};
const validateMail = (email) => {
  const regexMail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexMail.test(email);
};

const maxAge = 1 * 24 * 60 * 60 * 1000; // 24h
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const isValidPassword = validatePassword(req.body.password);
  const isValidPseudo = validatePseudo(req.body.pseudo);
  const isValidMail = validateMail(req.body.email);
  if (req.body.pseudo.length === 0) {
    return res.status(401).json({
      messagePseudo: "pseudo manquant",
    });
  } else if (!isValidPseudo) {
    return res.status(400).json({
      messagePseudoIncorrect:
        "pseudo incorrect, exemple:  Nom Prénom  ou Surnom ",
    });
  } else if (req.body.email.length === 0) {
    return res.status(400).json({
      messageNoMail: "Veuillez renseigner une adresse e-mail",
    });
  } else if (!isValidMail) {
    return res.status(400).json({
      messageMailIncorrect:
        "l'adresse e-mail renseigné est incorrect, exemple:  mail@mail.com ",
    });
  } else if (req.body.password.length === 0) {
    return res.status(400).json({
      messagePassNull: "Veuillez renseigner un mot-de-passe",
    });
  } else if (!isValidPassword) {
    return res.status(400).json({
      messageInvalidPass:
        "le mot de passe doit contenir : 1 nombre, 1 lettre majuscule, 1 lettre minuscule, 1 non-alpha numeric number, entre 9 et 16 caractères sans espace",
    });
  }

  const user = new User({
    pseudo: req.body.pseudo,
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then(() => res.status(201).json({ message: "utilisateur créé !" }))
    .catch((err) => {
      const error = err;
      res.status(400).send({ error });
    });
};

exports.signIn = (req, res) => {
  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res.status(404).json({ message: "utilisateur inexistant" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res.status(401).json({
                message: "mot de passe incorrecte",
              });
            } else {
              const token = createToken(user._id);
              res.cookie("jwt", token, { httpOnly: true, maxAge }); //httponly true consultable uniquement par notre serveur
              res.status(200).json({ userId: user._id });
            }
          })
          .catch((err) => {
            res.status(400).json({ err });
          });
      }
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
