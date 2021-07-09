const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

var passwordValidator = require('password-validator');

var schema = new passwordValidator();
schema
.is().min(8)                                    
.is().max(40) 
.has().symbols()                                 
.has().uppercase()                              
.has().lowercase()                              
.has().digits(1);

const MaskData = require('maskdata');

const emailMask2Options = {
  maskWith: "*", 
  unmaskedStartCharactersBeforeAt: 3,
  unmaskedEndCharactersAfterAt: 5,
  maskAtTheRate: false
};

exports.signup = (req, res, next) => {
  try {
  if (schema.validate(req.body.password)===true) {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: MaskData.maskEmail2(req.body.email, emailMask2Options),
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
  } else {
    throw error;
  }
  }
  catch(error) {
    res.status(406).json({ error })
  }
};

exports.login = (req, res, next) => {
  User.findOne({ email: MaskData.maskEmail2(req.body.email, emailMask2Options) })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.DB_KEY, { expiresIn: "24h" }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
