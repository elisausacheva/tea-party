"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Tea }) {
      this.hasMany(Tea, { foreignKey: "userID" });
      // У одного user'а может быть много
      // за это отвечает "hasMany"
    }

    toJSON() {
    const values = { ...this.get() };
    delete values.password;
    delete values.createdAt;
    delete values.updatedAt;
    return values;
  }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
