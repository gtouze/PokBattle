const db = require('../db');

const Dresseur = {
    getDresseurs: function(callback) {
        return db.query('SELECT * from dresseur', callback);
    }
    ,
    getDresseur: function(id, callback) {
        return db.query('SELECT * from dresseur WHERE id=?', id, callback);
    }
    ,
    getDresseurbyUsername: function(username, callback) {
        return db.query('SELECT * from dresseur WHERE username=?', username, callback);
    }
    ,
    createDresseur: function (Dresseur, callback) {
        return db.query('INSERT INTO dresseur(username, password, description, sexe) VALUES (?, ?, ?, ?)',
            [Dresseur.username, Dresseur.password, Dresseur.description, Dresseur.sexe], callback);
    }
    ,
    updateDresseur: function (Dresseur, callback) {
        return db.query('UPDATE dresseur SET username=?, password=?, description=?, sexe=? WHERE id=?',
            [Dresseur[0].username, Dresseur[0].password, Dresseur[0].description, Dresseur[0].sexe, Dresseur[1]], callback);
    }
    ,
    deleteDresseur: function (id, callback) {
        return db.query('DELETE FROM dresseur WHERE id=?', id, callback);
    }
}

module.exports = Dresseur;
