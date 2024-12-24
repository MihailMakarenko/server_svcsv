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
      {
        TripId: 5,
        Monday: false,
        Tuesday: true,
        Wednesday: true,
        Thursday: true,
        Friday: false,
        Saturday: true,
        Sunday: false,
      },
      {
        TripId: 6,
        Monday: true,
        Tuesday: false,
        Wednesday: true,
        Thursday: false,
        Friday: true,
        Saturday: false,
        Sunday: true,
      },
      {
        TripId: 7,
        Monday: false,
        Tuesday: true,
        Wednesday: false,
        Thursday: true,
        Friday: false,
        Saturday: true,
        Sunday: true,
      },
      {
        TripId: 8,
        Monday: true,
        Tuesday: true,
        Wednesday: true,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: true,
      },
      {
        TripId: 9,
        Monday: false,
        Tuesday: false,
        Wednesday: true,
        Thursday: true,
        Friday: true,
        Saturday: false,
        Sunday: false,
      },
      {
        TripId: 10,
        Monday: true,
        Tuesday: false,
        Wednesday: true,
        Thursday: true,
        Friday: false,
        Saturday: true,
        Sunday: false,
      },
      {
        TripId: 11,
        Monday: false,
        Tuesday: true,
        Wednesday: false,
        Thursday: true,
        Friday: false,
        Saturday: true,
        Sunday: true,
      },
      {
        TripId: 12,
        Monday: true,
        Tuesday: false,
        Wednesday: true,
        Thursday: false,
        Friday: true,
        Saturday: false,
        Sunday: true,
      },
      {
        TripId: 13,
        Monday: true,
        Tuesday: true,
        Wednesday: false,
        Thursday: false,
        Friday: true,
        Saturday: true,
        Sunday: false,
      },
      {
        TripId: 14,
        Monday: false,
        Tuesday: true,
        Wednesday: true,
        Thursday: false,
        Friday: false,
        Saturday: true,
        Sunday: true,
      },
      {
        TripId: 15,
        Monday: true,
        Tuesday: false,
        Wednesday: true,
        Thursday: true,
        Friday: false,
        Saturday: false,
        Sunday: true,
      },
      {
        TripId: 16,
        Monday: false,
        Tuesday: true,
        Wednesday: false,
        Thursday: true,
        Friday: true,
        Saturday: true,
        Sunday: false,
      },
      {
        TripId: 17,
        Monday: true,
        Tuesday: false,
        Wednesday: true,
        Thursday: false,
        Friday: true,
        Saturday: false,
        Sunday: true,
      },
      {
        TripId: 18,
        Monday: false,
        Tuesday: true,
        Wednesday: true,
        Thursday: false,
        Friday: true,
        Saturday: false,
        Sunday: true,
      },
      {
        TripId: 19,
        Monday: true,
        Tuesday: false,
        Wednesday: true,
        Thursday: true,
        Friday: false,
        Saturday: true,
        Sunday: false,
      },
      {
        TripId: 20,
        Monday: false,
        Tuesday: true,
        Wednesday: false,
        Thursday: true,
        Friday: true,
        Saturday: true,
        Sunday: false,
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
