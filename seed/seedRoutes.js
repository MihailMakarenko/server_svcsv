const { sequelize } = require("../db"); // Убедитесь, что путь правильный
const Route = require("../models/route"); // Импорт модели Route

class SeedRoutes {
  async seed() {
    const routes = [
      { StartCity: "Минск", FinishCity: "Гомель", Distance: 300.0 },
      { StartCity: "Могилев", FinishCity: "Гродно", Distance: 250.0 },
      { StartCity: "Витебск", FinishCity: "Брест", Distance: 350.0 },
      { StartCity: "Гродно", FinishCity: "Лида", Distance: 60.0 },
      { StartCity: "Брест", FinishCity: "Пинск", Distance: 120.0 },
      { StartCity: "Могилев", FinishCity: "Бобруйск", Distance: 90.0 },
      { StartCity: "Минск", FinishCity: "Слуцк", Distance: 120.0 },
      { StartCity: "Гомель", FinishCity: "Речица", Distance: 50.0 },
      { StartCity: "Витебск", FinishCity: "Полоцк", Distance: 100.0 },
      { StartCity: "Могилев", FinishCity: "Осиповичи", Distance: 80.0 },
      { StartCity: "Брест", FinishCity: "Каменец", Distance: 80.0 },
      { StartCity: "Минск", FinishCity: "Новополоцк", Distance: 200.0 },
      { StartCity: "Гродно", FinishCity: "Ошмяны", Distance: 50.0 },
      { StartCity: "Слуцк", FinishCity: "Копыль", Distance: 70.0 },
      { StartCity: "Бобруйск", FinishCity: "Стерлитамак", Distance: 100.0 },
      { StartCity: "Пинск", FinishCity: "Лунинец", Distance: 90.0 },
      { StartCity: "Могилев", FinishCity: "Горки", Distance: 60.0 },
      { StartCity: "Минск", FinishCity: "Солигорск", Distance: 100.0 },
      { StartCity: "Гомель", FinishCity: "Жлобин", Distance: 70.0 },
      { StartCity: "Витебск", FinishCity: "Сенница", Distance: 80.0 },
      { StartCity: "Гродно", FinishCity: "Берестовица", Distance: 40.0 },
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
