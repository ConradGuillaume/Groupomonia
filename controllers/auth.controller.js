const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");

const maxAge = 3 * 24 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
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
                message: "paire identifiant/mot de passe incorrecte",
              });
            } else {
              const token = createToken(user._id);
              res.cookie("jwt", token, { httpOnly: true, maxAge });
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
