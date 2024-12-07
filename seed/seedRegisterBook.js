const { sequelize } = require("../db"); // Убедитесь, что путь правильный
const RegisterBook = require("../models/registerBook");
const Bus = require("../models/buses");
const Trip = require("../models/trips");

class SeedRegisterBook {
  async seed() {
    const registerBooks = [
      { DateTime: new Date("2024-01-01"), TripId: 1, BusId: 1 },
      { DateTime: new Date("2024-01-02"), TripId: 1, BusId: 4 },
      { DateTime: new Date("2024-01-01"), TripId: 2, BusId: 2 },
      { DateTime: new Date("2024-12-02"), TripId: 3, BusId: 3 },
      { DateTime: new Date("2024-01-05"), TripId: 4, BusId: 4 },
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
