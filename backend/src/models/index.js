const database = require("../db");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    database.database,
    database.user,
    database.password,
  {
    host: database.host,
    dialect: "mysql",
    operatorsAliases: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.dresseur = require("../models/dresseur.model")(sequelize, Sequelize);

module.exports = db;