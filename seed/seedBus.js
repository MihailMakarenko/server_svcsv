// Файл: seedBus.js
const Buses = require("../models/buses"); // Путь к модели Buses

class SeedBuses {
  async seed() {
    const buses = [
      {
        BusNumber: "A123BC",
        NameCompany: "Company A",
        Model: "Model X",
        Capacity: 50,
      },
      {
        BusNumber: "B456DE",
        NameCompany: "Company B",
        Model: "Model Y",
        Capacity: 40,
      },
      {
        BusNumber: "C789FG",
        NameCompany: "Company C",
        Model: "Model Z",
        Capacity: 30,
      },
      {
        BusNumber: "D012HI",
        NameCompany: "Company D",
        Model: "Model W",
        Capacity: 54,
      },
      {
        BusNumber: "E345JK",
        NameCompany: "Company E",
        Model: "Model V",
        Capacity: 18,
      },
    ];

    try {
      const existingBuses = await Buses.findAll();

      if (existingBuses.length === 0) {
        await Buses.bulkCreate(buses);
        console.log("База данных успешно заполнена.");
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

module.exports = SeedBuses; // Убедитесь, что вы экспортируете класс правильно
