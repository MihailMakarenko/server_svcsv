const { sequelize } = require("../db"); // Убедитесь, что путь правильный
const RegisterBook = require("../models/registerBook");
const Bus = require("../models/buses");
const Trip = require("../models/trips");

class SeedRegisterBook {
  async seed() {
    const registerBooks = [
      { DateTime: new Date("2024-12-21"), TripId: 1, BusId: 1 },
      { DateTime: new Date("2024-01-02"), TripId: 1, BusId: 4 },
      { DateTime: new Date("2024-01-01"), TripId: 2, BusId: 2 },
      { DateTime: new Date("2024-01-02"), TripId: 3, BusId: 3 },
      { DateTime: new Date("2024-01-05"), TripId: 4, BusId: 4 },
      { DateTime: new Date("2024-01-06"), TripId: 5, BusId: 1 },
      { DateTime: new Date("2024-01-07"), TripId: 6, BusId: 2 },
      { DateTime: new Date("2024-01-08"), TripId: 7, BusId: 3 },
      { DateTime: new Date("2024-01-09"), TripId: 8, BusId: 4 },
      { DateTime: new Date("2024-01-10"), TripId: 9, BusId: 1 },
      { DateTime: new Date("2024-01-11"), TripId: 10, BusId: 2 },
      { DateTime: new Date("2024-01-12"), TripId: 11, BusId: 3 },
      { DateTime: new Date("2024-01-13"), TripId: 12, BusId: 4 },
      { DateTime: new Date("2024-01-14"), TripId: 13, BusId: 1 },
      { DateTime: new Date("2024-01-15"), TripId: 14, BusId: 2 },
      { DateTime: new Date("2024-01-16"), TripId: 15, BusId: 3 },
      { DateTime: new Date("2024-01-17"), TripId: 16, BusId: 4 },
      { DateTime: new Date("2024-01-18"), TripId: 17, BusId: 1 },
      { DateTime: new Date("2024-01-19"), TripId: 18, BusId: 2 },
      { DateTime: new Date("2024-01-20"), TripId: 19, BusId: 3 },
      { DateTime: new Date("2024-01-21"), TripId: 20, BusId: 4 },
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
