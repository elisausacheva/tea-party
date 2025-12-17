'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tea extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userID" });
    }
  }
  Tea.init({
    name: DataTypes.STRING,
    sort: DataTypes.STRING,
    location: DataTypes.STRING,
    img: DataTypes.STRING,
    desc: DataTypes.TEXT,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tea',
  });
  return Tea;
};