const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");
const RegisterBook = require("./registerBook");
const PromoCode = require("./promoCode");

const Tickets = sequelize.define("Tickets", {
  TicketId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Status: { type: DataTypes.STRING(20), allowNull: false },
  Promocode: {
    type: DataTypes.STRING(20),
    allowNull: true,
    references: {
      model: PromoCode,
      key: "Code",
    },
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "UserId",
    },
  },
  RegisterId: {
    type: DataTypes.INTEGER,
    references: {
      model: RegisterBook,
      key: "RegisterBookId",
    },
  },
  Seats: {
    type: DataTypes.ARRAY(DataTypes.INTEGER), // Adding the Seats field as an array of integers
    allowNull: false, // You can set this to false if you want to make it mandatory
  },
});

module.exports = Tickets;
