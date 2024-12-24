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
      {
        RouteId: 5,
        StartTime: "07:30:00",
        FinishTime: "09:30:00",
        Price: 200.0,
      },
      {
        RouteId: 5,
        StartTime: "16:00:00",
        FinishTime: "18:00:00",
        Price: 250.0,
      },
      {
        RouteId: 6,
        StartTime: "11:00:00",
        FinishTime: "13:00:00",
        Price: 500.0,
      },
      {
        RouteId: 6,
        StartTime: "15:30:00",
        FinishTime: "17:30:00",
        Price: 550.0,
      },
      {
        RouteId: 7,
        StartTime: "09:00:00",
        FinishTime: "11:00:00",
        Price: 300.0,
      },
      {
        RouteId: 8,
        StartTime: "12:00:00",
        FinishTime: "14:00:00",
        Price: 450.0,
      },
      {
        RouteId: 8,
        StartTime: "17:00:00",
        FinishTime: "19:00:00",
        Price: 480.0,
      },
      {
        RouteId: 9,
        StartTime: "10:30:00",
        FinishTime: "12:00:00",
        Price: 400.0,
      },
      {
        RouteId: 10,
        StartTime: "13:30:00",
        FinishTime: "15:30:00",
        Price: 350.0,
      },
      {
        RouteId: 10,
        StartTime: "18:00:00",
        FinishTime: "20:00:00",
        Price: 370.0,
      },
      {
        RouteId: 11,
        StartTime: "06:00:00",
        FinishTime: "08:00:00",
        Price: 220.0,
      },
      {
        RouteId: 12,
        StartTime: "14:30:00",
        FinishTime: "16:30:00",
        Price: 600.0,
      },
      {
        RouteId: 13,
        StartTime: "08:30:00",
        FinishTime: "10:30:00",
        Price: 320.0,
      },
      {
        RouteId: 14,
        StartTime: "11:15:00",
        FinishTime: "13:15:00",
        Price: 540.0,
      },
      {
        RouteId: 15,
        StartTime: "17:30:00",
        FinishTime: "19:30:00",
        Price: 450.0,
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
