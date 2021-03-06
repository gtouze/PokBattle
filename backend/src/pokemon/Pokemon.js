const db = require('../db');

const Pokemon = {
    getPokemons: function(callback) {
        return db.query('SELECT * from pokemon', callback);
    }
    ,
    getPokemon: function(idPokemon, callback) {
        return db.query('SELECT * from pokemon WHERE idPokemon=?', idPokemon, callback);
    }
}

module.exports = Pokemon;