var express = require('express');
var app = express();

var DresseurController = require('./dresseur/DresseurController');
var CapaciteController = require('./capacite/CapaciteController');

app.use('/dresseurs', DresseurController);
app.use('/capacites', CapaciteController);

module.exports = app;
