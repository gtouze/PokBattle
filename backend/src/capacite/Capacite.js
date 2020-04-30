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
        return db.query('INSERT INTO capacite(nom, puissance, precisionCapacite, type) VALUES (?, ?, ?, ?)',
            [Capacite.nom, Capacite.puissance, Capacite.precisionCapacite, Capacite.type], callback);
    }
    ,
    updateCapacite: function (Capacite, callback) {
        return db.query('UPDATE capacite SET nom=?, puissance=?, precisionCapacite=?, type=? WHERE idCapacite=?',
            [Capacite[0].nom, Capacite[0].puissance, Capacite[0].precisionCapacite, 
            Capacite[0].type, Capacite[1]], callback);
    }
    ,
    deleteCapacite: function (idCapacite, callback) {
        return db.query('DELETE FROM capacite WHERE idCapacite=?', idCapacite, callback);
    }
}

module.exports = Capacite;