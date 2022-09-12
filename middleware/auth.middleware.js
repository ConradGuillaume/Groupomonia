const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        console.log("decoded Token" + decodedToken.id);
        let user = UserModel.findById(decodedToken.id);
        res.locals.user = user;
        console.log(res.locals.user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.send(200).json("no token");
        } else {
          console.log(decodedToken.id);
          next();
        }
      }
    );
  } else {
    console.log("No token");
  }
};
