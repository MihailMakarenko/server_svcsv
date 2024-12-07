const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");

const Callback = sequelize.define("Callback", {
  CallbackId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "UserId",
    },
  },
  Status: { type: DataTypes.STRING(20), allowNull: false },
  DateTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Callback;
