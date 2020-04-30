var express = require('express');
var app = express();

var DresseurController = require('./dresseur/DresseurController');
var CapaciteController = require('./capacite/CapaciteController');
var EquipeController = require('./equipe/EquipeController');
var PokemonController = require('./pokemon/PokemonController');

app.use('/dresseurs', DresseurController);
app.use('/capacites', CapaciteController);
app.use('/equipes', EquipeController);
app.use('/pokemons', PokemonController);

module.exports = app;
