"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userID" });
      this.belongsTo(models.Teas, { foreignKey: "teaID" });
    }
  }
  Comment.init(
    {
      text: DataTypes.TEXT,
      userID: DataTypes.INTEGER,
      teaID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
