const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");
const Trip = require("./trips");

const Favourites = sequelize.define("Favourites", {
  FavouriteId: {
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
  TripId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Trip,
      key: "TripId",
    },
  },
});

module.exports = Favourites;
