/*const validator = require("email-validator");
module.exports = (req, res, next) => {
  const { email } = req.body;
  if (validator.validate(email)) {
    next();
  } else return res.status(400).json({ message: "l'email  n'est pas valide" });
};
