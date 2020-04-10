var db = require('../db');

var Capacite = {
    getCapacites: function(callback) {
        return db.query('SELECT * from capacite', callback);
    }
    ,
    getCapacite: function(idCapacite, callback) {
        return db.query('SELECT * from capacite WHERE idCapacite=?', idCapacite, callback);
    }
    ,
    createCapacite: function (Capacite, callback) {
        return db.query('INSERT INTO capacite(nom, puissance, precisionCapacite, type, pokemon_fk) VALUES (?, ?, ?, ?, ?)',
            [Capacite.nom, Capacite.puissance, Capacite.precisionCapacite, Capacite.type, Capacite.pokemon_fk], callback);
    }
    ,
    updateCapacite: function (Capacite, callback) {
        return db.query('UPDATE capacite SET nom=?, puissance=?, precisionCapacite=?, type=?, pokemon_fk=? WHERE idCapacite=?',
            [Capacite[0].nom, Capacite[0].puissance, Capacite[0].precisionCapacite, 
            Capacite[0].type, Capacite[0].pokemon_fk, Capacite[1]], callback);
    }
    ,
    deleteCapacite: function (idCapacite, callback) {
        return db.query('DELETE FROM capacite WHERE idCapacite=?', idCapacite, callback);
    }
}

module.exports = Capacite;