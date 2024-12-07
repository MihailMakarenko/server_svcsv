const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");

const Passengers = sequelize.define("Passengers", {
  PassengerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  FirstName: { type: DataTypes.STRING(50), allowNull: false },
  LastName: { type: DataTypes.STRING(50), allowNull: false },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "UserId",
    },
  },
});

module.exports = Passengers;
