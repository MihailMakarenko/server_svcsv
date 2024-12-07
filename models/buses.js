const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Buses = sequelize.define("Buses", {
  BusId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  BusNumber: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  NameCompany: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  Model: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  Capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 18,
      max: 54,
    },
  },
});

module.exports = Buses;
