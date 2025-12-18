"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ User, Tea }) {
      this.belongsTo(User, { foreignKey: "userID" });
      this.belongsTo(Tea, { foreignKey: "teaID" });
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
