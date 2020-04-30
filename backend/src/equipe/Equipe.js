var db = require('../db');
var Dresseur = require('./../dresseur/Dresseur');
var Pokemon = require('./../pokemon/Pokemon');
var Capacite = require('./../capacite/Capacite');

var Equipe = {
    getEquipes: function(callback) {
        return db.query('SELECT * from equipe', callback);
    }
    ,
    getEquipe: function(idEquipe, callback) {
        return db.query('SELECT * from equipe WHERE idEquipe=?', idEquipe, callback);
    }
    ,
    createEquipe: function (Equipe, callback) {
        return db.query('INSERT INTO equipe(dresseur, pokemon, capacite1, capacite2) VALUES (?, ?, ?, ?)',
            [Equipe.dresseur, Equipe.pokemon, Equipe.capacite1, Equipe.capacite2], callback);
    }
    ,
    updateEquipe: function (Equipe, callback) {
        return db.query('UPDATE equipe SET dresseur=?, pokemon=?, capacite1=?, capacite2=? WHERE idEquipe=?',
            [Equipe[0].dresseur, Equipe[0].pokemon, Equipe[0].capacite1, 
            Equipe[0].capacite2, Equipe[1]], callback);
    }
    ,
    deleteEquipe: function (idEquipe, callback) {
        return db.query('DELETE FROM equipe WHERE idEquipe=?', idEquipe, callback);
    }
}

module.exports = Equipe;