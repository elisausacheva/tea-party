"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tea extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "userID" });
    }
  }
  Tea.init(
    {
      name: DataTypes.STRING,
      sort: DataTypes.STRING,
      location: DataTypes.STRING,
      img: DataTypes.STRING,
      desc: DataTypes.TEXT,
      userID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tea",
    }
  );
  return Tea;
};
