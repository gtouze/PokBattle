const database = require("../db");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    "pokbattle",
    "root",
    "admin",
  {
    host: database.host,
    dialect: "mysql",
    operatorsAliases: false,
    define: {
      timestamps: false
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.dresseur = require("../models/dresseur.model")(sequelize, Sequelize);

module.exports = db;