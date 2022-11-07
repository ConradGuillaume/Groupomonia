const express = require("express"); // framework node.js  https://www.npmjs.com/package/express
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const bodyParser = require("body-parser"); // body parsing   https://www.npmjs.com/package/body-parser
const cookieParser = require("cookie-parser"); // cookies parsing  https://www.npmjs.com/package/cookie-parser
require("dotenv").config({ path: "./config/.env" }); // variable d'environnement  https://www.npmjs.com/package/dotenv
require("./config/db");
//MIDDLEWARE DE VERIFICATION AUTHENTIFICATION
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const app = express();
const cors = require("cors");
const path = require("path");
const helmet = require("helmet"); // hide API stacks in browser  https://www.npmjs.com/package/helmet

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Token avec l'id utilisateur //tout les get passe par checkUser qui vérifie l'id de l'utilisateur pour donner accès
app.get("*", checkUser);
// MIDDLEWARE pour l'authentification de l'utilisateur à la connexion
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._conditions._id);
});
// routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
//server

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
