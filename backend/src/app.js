var express = require('express');
var app = express();

var DresseurController = require('./dresseur/DresseurController');
app.use('/dresseurs', DresseurController);

module.exports = app;
