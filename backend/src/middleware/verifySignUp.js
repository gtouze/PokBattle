const db = require("../models");
const ROLES = db.ROLES;
const Dresseur = db.dresseur;


checkDuplicateDresseur= (req, res, next) => {
    Dresseur.findOne({
      where: {
        username: req.body.username
      }
    }).then(Dresseur => {
      if (Dresseur) {
        res.status(400).send({
          message: "Erreu, ce dresseur existe déja !"
        });
        return;
      }
    next();
    });
  };

  const verifySignUp = {
    checkDuplicateDresseur: checkDuplicateDresseur,
  };
  
  module.exports = verifySignUp;