const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors());

const DresseurController = require('./dresseur/DresseurController');
const CapaciteController = require('./capacite/CapaciteController');
const EquipeController = require('./equipe/EquipeController');
const PokemonController = require('./pokemon/PokemonController');

app.use('/dresseurs', DresseurController);
app.use('/capacites', CapaciteController);
app.use('/equipes', EquipeController);
app.use('/pokemons', PokemonController);

module.exports = app;
