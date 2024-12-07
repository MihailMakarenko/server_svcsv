const { sequelize } = require("../db"); // Убедитесь, что путь правильный
const Trips = require("../models/trips"); // Импорт модели Trips
const Route = require("../models/route"); // Импорт модели Route

class SeedTrips {
  async seed() {
    const trips = [
      {
        RouteId: 1,
        StartTime: "08:00:00",
        FinishTime: "12:00:00",
        Price: 150.0,
      },
      {
        RouteId: 1,
        StartTime: "14:00:00",
        FinishTime: "18:00:00",
        Price: 999.0,
      },
      {
        RouteId: 2,
        StartTime: "09:30:00",
        FinishTime: "11:30:00",
        Price: 800.0,
      },
      {
        RouteId: 3,
        StartTime: "10:00:00",
        FinishTime: "12:30:00",
        Price: 600.0,
      },
      {
        RouteId: 4,
        StartTime: "13:00:00",
        FinishTime: "15:00:00",
        Price: 700.0,
      },
    ];

    try {
      const existingTrips = await Trips.findAll();

      if (existingTrips.length === 0) {
        await Trips.bulkCreate(trips);
        console.log("База данных поездок успешно заполнена.");
      } else {
        console.log(
          "База данных поездок уже содержит записи. Новые записи не будут добавлены."
        );
      }
    } catch (error) {
      console.error("Ошибка при заполнении базы данных поездок:", error);
    }
  }
}

module.exports = SeedTrips;
