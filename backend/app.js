const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauce");
const path = require("path");
let cors = require("cors");
const app = express();
var helmet = require('helmet');
const rateLimit = require("express-rate-limit");

mongoose
  .connect("mongodb+srv://"+ process.env.DB_USER +":"+ process.env.DB_USER_PASS + "@"+ process.env.PROCESS_ENV_CLUSTER + ".mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(cors());
app.use(helmet());
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", rateLimit({
  windowMs: 12 * 60 * 60 * 1000, // 12 hour duration in milliseconds
  max: 10,
  message: "You exceeded 100 requests in 12 hour limit!",
  headers: true,
}), userRoutes);
app.use("/api/sauces", saucesRoutes);

module.exports = app;
