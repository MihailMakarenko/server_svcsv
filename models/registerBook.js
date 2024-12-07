const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Bus = require("./buses");
const Trip = require("./trips");

const RegisterBook = sequelize.define("RegisterBook", {
  RegisterBookId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  DateTime: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  TripId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Trip,
      key: "TripId",
    },
  },
  BusId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Bus,
      key: "BusId",
    },
  },
});

module.exports = RegisterBook;
