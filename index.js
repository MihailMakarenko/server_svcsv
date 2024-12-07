require("dotenv").config();
const express = require("express"); // Импорт модуля
const sequelize = require("./db.js"); // Импорт настроек БД
const cors = require("cors");
const router = require("./routes/indexRouter.js");
const models = require("./models/index.js");
const passport = require("passport");
const SeedBuses = require("./seed/seedBus.js");
const SeedSchedule = require("./seed/seedSchedule");
const SeedRegisterBook = require("./seed/seedRegisterBook"); // Импортируем класс SeedRegisterBook
const SeedRoutes = require("./seed/seedRoutes"); // Импортируем класс SeedRoutes
const SeedTrips = require("./seed/seedTrips"); // Импортируем класс SeedTrips
const SeedUser = require("./seed/seedUser.js");
const SeedTickets = require("./seed/seedTicket.js");
const SeedPromoCodes = require("./seed/seedPromocode.js"); // Убедитесь, что путь правильный

const PORT = process.env.PORT || 3000; // Порт, на котором работает сервер (по умолчанию 3000)

const app = express(); // Создаем объект express
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(passport.initialize());
require("./middleware/passport")(passport);

const start = async () => {
  try {
    await sequelize.authenticate(); // Подключение к БД
    await sequelize.sync(); // Сверка состояния БД со схемой БД

    // Вызов метода для заполнения базы данных
    const seedBus = new SeedBuses();
    await seedBus.seed(); // Здесь предполагается, что у вас есть метод seed

    const seedPromoCodes = new SeedPromoCodes();
    seedPromoCodes.seed();

    const seedRoutes = new SeedRoutes();
    await seedRoutes.seed(); // Вызов метода seed

    const seedTrips = new SeedTrips();
    await seedTrips.seed(); // Вызов метода seed

    const seedRegisterBook = new SeedRegisterBook();
    await seedRegisterBook.seed(); // Вызов метода seed

    const seedSchedule = new SeedSchedule();
    await seedSchedule.seed();

    const seedUser = new SeedUser();
    await seedUser.seed();

    const seedTickets = new SeedTickets();
    await seedTickets.seed();

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log("Ошибка при запуске приложения:", e);
  }
};

start();
