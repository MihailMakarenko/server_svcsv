const { sequelize } = require("../db"); // Убедитесь, что путь правильный
const Route = require("../models/route"); // Импорт модели Route

class SeedRoutes {
  async seed() {
    const routes = [
      { StartCity: "Москва", FinishCity: "Санкт-Петербург", Distance: 635.0 },
      { StartCity: "Казань", FinishCity: "Набережные Челны", Distance: 225.0 },
      { StartCity: "Екатеринбург", FinishCity: "Тюмень", Distance: 140.0 },
      { StartCity: "Новосибирск", FinishCity: "Кемерово", Distance: 220.0 },
      { StartCity: "Волгоград", FinishCity: "Астрахань", Distance: 400.0 },
    ];

    try {
      const existingRoutes = await Route.findAll();

      if (existingRoutes.length === 0) {
        await Route.bulkCreate(routes);
        console.log("База данных маршрутов успешно заполнена.");
      } else {
        console.log(
          "База данных маршрутов уже содержит записи. Новые записи не будут добавлены."
        );
      }
    } catch (error) {
      console.error("Ошибка при заполнении базы данных маршрутов:", error);
    }
  }
}

module.exports = SeedRoutes;
