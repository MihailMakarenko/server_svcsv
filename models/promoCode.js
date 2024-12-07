const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const PromoCode = sequelize.define("PromoCode", {
  Code: {
    type: DataTypes.STRING(20),
    allowNull: false,
    primaryKey: true,
  },
  PercentageDiscount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 10,
      max: 100,
    },
  },
});

module.exports = PromoCode;
