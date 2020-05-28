const db = require('../db');

const Equipe = {
    getEquipes: function(callback) {
        return db.query('SELECT * from equipe', callback);
    }
    ,
    getEquipesDresseur: function(dresseurId, callback) {
        return db.query('SELECT * from equipe WHERE dresseur=?', dresseurId, callback);
    }
    ,
    createEquipe: function (Equipe, callback) {
        return db.query('INSERT INTO equipe(nomEquipe, dresseur, pokemon, capacite1, capacite2) VALUES (?, ?, ?, ?, ?)',
            [Equipe.nomEquipe, Equipe.dresseur, Equipe.pokemon, Equipe.capacite1, Equipe.capacite2], callback);
    }
    ,
    updateEquipe: function (Equipe, callback) {
        return db.query('UPDATE equipe SET nomEquipe=? dresseur=?, pokemon=?, capacite1=?, capacite2=? WHERE idEquipe=?',
            [Equipe[0].nomEquipe, Equipe[0].dresseur, Equipe[0].pokemon,
            Equipe[0].capacite1, Equipe[0].capacite2, Equipe[1]], callback);
    }
    ,
    deleteEquipe: function (idEquipe, callback) {
        return db.query('DELETE FROM equipe WHERE idEquipe=?', idEquipe, callback);
    }
}

module.exports = Equipe;