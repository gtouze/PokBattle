const db = require("../models");
const Dresseur = db.dresseur;


checkDuplicateDresseur= (req, res, next) => {
  console.log(req.body);
  Dresseur.findOne({
    where: {
      username: req.body.username 
    }
  }).then(Dresseur => {
    if (Dresseur) {
      res.status(400).send({
        message: "Erreur, ce dresseur existe déja !"
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