const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Подключение к базе данных

const Route = sequelize.define("Route", {
  RouteId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  StartCity: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  FinishCity: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Distance: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

module.exports = Route;
