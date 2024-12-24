const Callback = require("../models/callback"); // Путь к модели Callback
const User = require("../models/user"); // Путь к модели User (если необходимо)

class SeedCallbacks {
  async seed() {
    const callbacks = [
      {
        UserId: 1,
        Status: "Получен",
        DateTime: new Date("2023-12-01T10:00:00Z"),
      },
      {
        UserId: 2,
        Status: "Закрыт",
        DateTime: new Date("2023-12-02T11:30:00Z"),
      },
      {
        UserId: 3,
        Status: "Получен",
        DateTime: new Date("2023-12-03T09:15:00Z"),
      },
      {
        UserId: 4,
        Status: "Закрыт",
        DateTime: new Date("2023-12-04T08:45:00Z"),
      },
      {
        UserId: 5,
        Status: "Получен",
        DateTime: new Date("2023-12-05T12:00:00Z"),
      },
      {
        UserId: 6,
        Status: "Закрыт",
        DateTime: new Date("2023-12-06T14:30:00Z"),
      },
      {
        UserId: 7,
        Status: "Получен",
        DateTime: new Date("2023-12-07T15:45:00Z"),
      },
      {
        UserId: 8,
        Status: "Закрыт",
        DateTime: new Date("2023-12-08T16:20:00Z"),
      },
      {
        UserId: 9,
        Status: "Получен",
        DateTime: new Date("2023-12-09T17:10:00Z"),
      },
      {
        UserId: 10,
        Status: "Закрыт",
        DateTime: new Date("2023-12-10T18:00:00Z"),
      },
      {
        UserId: 11,
        Status: "Получен",
        DateTime: new Date("2023-12-11T19:15:00Z"),
      },
      {
        UserId: 12,
        Status: "Закрыт",
        DateTime: new Date("2023-12-12T20:30:00Z"),
      },
      {
        UserId: 13,
        Status: "Получен",
        DateTime: new Date("2023-12-13T21:00:00Z"),
      },
      {
        UserId: 14,
        Status: "Закрыт",
        DateTime: new Date("2023-12-14T22:45:00Z"),
      },
      {
        UserId: 15,
        Status: "Получен",
        DateTime: new Date("2023-12-15T09:30:00Z"),
      },
      {
        UserId: 16,
        Status: "Закрыт",
        DateTime: new Date("2023-12-16T10:15:00Z"),
      },
      {
        UserId: 17,
        Status: "Получен",
        DateTime: new Date("2023-12-17T11:00:00Z"),
      },
      {
        UserId: 18,
        Status: "Закрыт",
        DateTime: new Date("2023-12-18T12:30:00Z"),
      },
      {
        UserId: 19,
        Status: "Получен",
        DateTime: new Date("2023-12-19T13:15:00Z"),
      },
      {
        UserId: 20,
        Status: "Закрыт",
        DateTime: new Date("2023-12-20T14:00:00Z"),
      },
    ];

    try {
      const existingCallbacks = await Callback.findAll();

      if (existingCallbacks.length === 0) {
        await Callback.bulkCreate(callbacks);
        console.log("База данных успешно заполнена записями обратной связи.");
      } else {
        console.log(
          "База данных уже содержит записи. Новые записи не будут добавлены."
        );
      }
    } catch (error) {
      console.error("Ошибка при заполнении базы данных:", error);
    }
  }
}

module.exports = SeedCallbacks; // Экспортируем класс
