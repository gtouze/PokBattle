const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var app = require('./app');
var port = process.env.PORT || 3000;
require('./routes/auth.routes')(app);

var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    const all_routes = require('express-list-endpoints');
    console.log(all_routes(app));
});

var corsOptions = {
    origin: "http://localhost:4200/"
};

//app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to pokbattle" });
});

const db = require("./models");

db.sequelize;
