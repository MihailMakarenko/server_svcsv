const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User", {
  UserId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  FirstName: { type: DataTypes.STRING(50), allowNull: false },
  LastName: { type: DataTypes.STRING(50), allowNull: false },
  Email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  PhoneNumber: { type: DataTypes.STRING(20), allowNull: false },
  isGetNotifications: { type: DataTypes.BOOLEAN, allowNull: false },
  isGetNewsletter: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  Password: { type: DataTypes.STRING(128), allowNull: false }, // Увеличил размер для хранения хэша
  Role: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: "user",
    validate: {
      isIn: [["admin", "user"]], // Проверка на допустимые значения
    },
  },
});

module.exports = User;
