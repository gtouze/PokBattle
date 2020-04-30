const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const Dresseur = db.dresseur;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
};

const authJwt = {
    verifyToken: verifyToken,
};
module.exports = authJwt;