const express = require("express");
const bodyParser = require("body-parser");

var app = require('./app');
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize;

app.get("/", (req, res) => {
res.json({ message: "Welcome to pokbattle" });
});

require('./routes/auth.routes')(app);
require('./routes/dresseur.routes')(app);

var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    const all_routes = require('express-list-endpoints');
    console.log(all_routes(app));
});
