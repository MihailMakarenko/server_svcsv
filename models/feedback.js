const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Trip = require("./trips");

const Feedback = sequelize.define("Feedback", {
  FeedbackId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5,
    },
  },
  TripId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Trip,
      key: "TripId",
    },
  },
});

module.exports = Feedback;
