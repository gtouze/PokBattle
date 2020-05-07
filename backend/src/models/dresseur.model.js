module.exports = (sequelize, Sequelize) => {
  const Dresseur = sequelize.define("dresseur", {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });
  
  return Dresseur;
};