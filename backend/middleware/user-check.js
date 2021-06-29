const jwt = require("jsonwebtoken");
const Sauce = require('../models/sauce');


module.exports = (req, res, next) => {

    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            console.log(sauce.userId);
            if(sauce.userId !== req.body.userId) {
                throw "Invalid user ID";
            }
    })
        .catch(error => res.status(400).json({ error }));
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "process.env.DB_PASS");
    const userId = decodedToken.userId;
    console.log(userId);
    if (req.body.userId !== decodedToken.userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(403).json({
      error: new Error("Invalid request!"),
    });
  }
};