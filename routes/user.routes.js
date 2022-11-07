const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const multer = require("../middleware/multer");
//const emaileValidator = require("../middleware/emailValidator");

router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", multer, userController.updateUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

module.exports = router;
