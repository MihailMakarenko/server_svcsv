const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Route = require("./route");

const Trips = sequelize.define("Trips", {
  TripId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  RouteId: {
    type: DataTypes.INTEGER,
    references: {
      model: Route,
      key: "RouteId",
    },
    allowNull: false,
  },
  StartTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  FinishTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  Price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = Trips;
