const db = require("../models");
const config = require("../config/auth.config");
const Dresseur = db.dresseur;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    Dresseur.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(() => {
      res.send({ message: "Inscription réussi!" });
    })

    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
    Dresseur.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(dresseur => {
        if (!dresseur) {
          return res.status(404).send({ message: "Dresseur introuvable!" });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          dresseur.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Mot de pass incorrect!"
          });
        }
  
        var token = jwt.sign({ id: dresseur.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
          id: dresseur.id,
          username: dresseur.username,
          accessToken: token
        });
        
      })
      .catch(err => {
        res.status(500).send({ message: err.message + dresseur.password });
      });
  };

 /* exports.signin = (req, res) => {
    Dresseur.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(dresseurs => {
        if (!dresseurs) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          dresseurs.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
          id: user.id,
          username: user.username,
          accessToken: token
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };*/