const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Trip = require("./trips");

const Schedule = sequelize.define("Schedule", {
  ScheduleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Monday: { type: DataTypes.BOOLEAN, defaultValue: false },
  Tuesday: { type: DataTypes.BOOLEAN, defaultValue: false },
  Wednesday: { type: DataTypes.BOOLEAN, defaultValue: false },
  Thursday: { type: DataTypes.BOOLEAN, defaultValue: false },
  Friday: { type: DataTypes.BOOLEAN, defaultValue: false },
  Saturday: { type: DataTypes.BOOLEAN, defaultValue: false },
  Sunday: { type: DataTypes.BOOLEAN, defaultValue: false },
  TripId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Trip,
      key: "TripId",
    },
  },
});

module.exports = Schedule;
