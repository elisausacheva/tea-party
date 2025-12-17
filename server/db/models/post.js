"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "authorId" });
      // Тут мы указываем, что у поста может быть один пользователь
      // за это отвечает "belongsTo"
    }
  }

  Post.init(
    {
      title: DataTypes.STRING,
      img: DataTypes.STRING,
      desc: DataTypes.STRING,
      like: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );

  return Post;
};
