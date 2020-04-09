var db = require('../db');

var Dresseur = {
    getDresseurs: function(callback) {
        return db.query('SELECT * from dresseur', callback);
    },
    createDresseur: function (Dresseur, callback) {
        return db.query('INSERT INTO `dresseur`(`pseudo`, `description`) VALUES (?, ?)',[Dresseur.pseudo, Dresseur.description], callback);
    }
}

module.exports = Dresseur;
