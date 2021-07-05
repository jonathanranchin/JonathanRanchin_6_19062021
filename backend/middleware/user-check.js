const jwt = require("jsonwebtoken");
const Sauce = require('../models/sauce');


module.exports = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            try {
                const token = req.headers.authorization.split(" ")[1];
                const decodedToken = jwt.verify(token, process.env.DB_PASS);
                const userId = decodedToken.userId;
                if(sauce.userId !== userId) {
                throw "Invalid user ID";
            } 
            else {
                next();
            }
            }  
            catch {
              res.status(403).json({
                error: new Error("Invalid request!"),
              });
            }
    })
    
};