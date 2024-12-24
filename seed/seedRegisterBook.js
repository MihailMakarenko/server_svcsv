const { sequelize } = require("../db"); // Убедитесь, что путь правильный
const RegisterBook = require("../models/registerBook");
const Bus = require("../models/buses");
const Trip = require("../models/trips");

class SeedRegisterBook {
  async seed() {
    const registerBooks = [
      { DateTime: new Date("2024-12-24"), TripId: 1, BusId: 1 },
      { DateTime: new Date("2024-12-25"), TripId: 1, BusId: 4 },
      { DateTime: new Date("2024-12-26"), TripId: 2, BusId: 2 },
      { DateTime: new Date("2024-12-26"), TripId: 3, BusId: 3 },
      { DateTime: new Date("2024-12-27"), TripId: 4, BusId: 4 },
      { DateTime: new Date("2024-12-27"), TripId: 5, BusId: 1 },
      { DateTime: new Date("2024-12-26"), TripId: 6, BusId: 2 },
      { DateTime: new Date("2024-12-26"), TripId: 7, BusId: 3 },
      { DateTime: new Date("2024-12-27"), TripId: 8, BusId: 4 },
      { DateTime: new Date("2024-12-28"), TripId: 9, BusId: 1 },
      { DateTime: new Date("2024-12-29"), TripId: 10, BusId: 2 },
      { DateTime: new Date("2024-12-27"), TripId: 11, BusId: 3 },
      { DateTime: new Date("2024-12-26"), TripId: 12, BusId: 4 },
      { DateTime: new Date("2024-12-27"), TripId: 13, BusId: 1 },
      { DateTime: new Date("2024-12-29"), TripId: 14, BusId: 2 },
      { DateTime: new Date("2024-12-27"), TripId: 15, BusId: 3 },
      { DateTime: new Date("2024-12-26"), TripId: 16, BusId: 4 },
      { DateTime: new Date("2024-12-26"), TripId: 17, BusId: 1 },
      { DateTime: new Date("2024-12-29"), TripId: 18, BusId: 2 },
      { DateTime: new Date("2024-12-27"), TripId: 19, BusId: 3 },
      { DateTime: new Date("2024-12-29"), TripId: 20, BusId: 4 },
    ];

    try {
      // Проверяем, есть ли уже записи в RegisterBook
      const count = await RegisterBook.count();

      if (count === 0) {
        await RegisterBook.bulkCreate(registerBooks);
        console.log("База данных регистраций успешно заполнена.");
      } else {
        console.log("Записи уже существуют в базе данных регистраций.");
      }
    } catch (error) {
      console.error("Ошибка при заполнении базы данных регистраций:", error);
    }
  }
}

module.exports = SeedRegisterBook;
