module.exports = (sequelize, Sequelize) => {
  const Dresseur = sequelize.define("dresseurs", {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });
  
  return Dresseur;
};