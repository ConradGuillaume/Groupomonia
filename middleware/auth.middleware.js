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
        //console.log("decoded Token" + decodedToken.id);
        let user = UserModel.findById(decodedToken.id);
        //console.log("USER", user);
        res.locals.user = user;
        //console.log("LOCAL USER",res.locals.user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
module.exports.requireAuth = (req, res, next) => {
  try {
    //console.log("HELLO req COOKIE", req.cookies.jwt);
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const userId = decodedToken.id;
    //console.log("TOKENDEC", decodedToken);
    //console.log("UserId", userId);
    req.auth = {
      userId: userId,
    };
    console.log("req.auth ICI", req.auth);
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
