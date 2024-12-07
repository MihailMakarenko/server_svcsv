// Файл: seedSchedule.js
const { sequelize } = require("../db"); // Убедитесь, что путь правильный
const Schedule = require("../models/schedule"); // Импорт модели Schedule
const Trip = require("../models/trips"); // Импорт модели Trips

class SeedSchedule {
  async seed() {
    const schedules = [
      {
        TripId: 1,
        Monday: true,
        Tuesday: true,
        Wednesday: false,
        Thursday: true,
        Friday: false,
        Saturday: true,
        Sunday: false,
      },
      {
        TripId: 2,
        Monday: false,
        Tuesday: true,
        Wednesday: true,
        Thursday: false,
        Friday: true,
        Saturday: false,
        Sunday: true,
      },
      {
        TripId: 3,
        Monday: true,
        Tuesday: false,
        Wednesday: true,
        Thursday: true,
        Friday: true,
        Saturday: false,
        Sunday: false,
      },
      {
        TripId: 4,
        Monday: true,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: true,
      },
    ];

    try {
      const existingSchedules = await Schedule.findAll();

      if (existingSchedules.length === 0) {
        await Schedule.bulkCreate(schedules);
        console.log("База данных расписания успешно заполнена.");
      } else {
        console.log(
          "База данных расписания уже содержит записи. Новые записи не будут добавлены."
        );
      }
    } catch (error) {
      console.error("Ошибка при заполнении базы данных расписания:", error);
    }
  }
}

module.exports = SeedSchedule;
