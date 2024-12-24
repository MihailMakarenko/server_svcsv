const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Trip = require("./trips");
const Ticket = require("./tickets");

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
      min: 0,
      max: 5,
    },
  },
  TicketId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ticket,
      key: "TicketId",
    },
  },
});

module.exports = Feedback;
