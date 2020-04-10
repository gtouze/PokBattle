var db = require('../db');

var Dresseur = {
    getDresseurs: function(callback) {
        return db.query('SELECT * from dresseur', callback);
    }
    ,
    getDresseur: function(id, callback) {
        return db.query('SELECT * from dresseur WHERE id=?', id, callback);
    }
    ,
    createDresseur: function (Dresseur, callback) {
        return db.query('INSERT INTO dresseur(pseudo, password, description, sexe) VALUES (?, ?, ?, ?)',
            [Dresseur.pseudo, Dresseur.password, Dresseur.description, Dresseur.sexe], callback);
    }
    ,
    updateDresseur: function (Dresseur, callback) {
        return db.query('UPDATE dresseur SET pseudo=?, password=?, description=?, sexe=? WHERE id=?',
            [Dresseur[0].pseudo, Dresseur[0].password, Dresseur[0].description, Dresseur[0].sexe, Dresseur[1]], callback);
    }
    ,
    deleteDresseur: function (id, callback) {
        return db.query('DELETE FROM dresseur WHERE id=?', id, callback);
    }
}

module.exports = Dresseur;
