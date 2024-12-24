require("dotenv").config();
const express = require("express");
const sequelize = require("./db.js");
const cors = require("cors");
const router = require("./routes/indexRouter.js");
const passport = require("passport");
const SeedBuses = require("./seed/seedBus.js");
const SeedSchedule = require("./seed/seedSchedule");
const SeedRegisterBook = require("./seed/seedRegisterBook");
const SeedRoutes = require("./seed/seedRoutes");
const SeedTrips = require("./seed/seedTrips");
const SeedUser = require("./seed/seedUser.js");
const SeedTickets = require("./seed/seedTicket.js");
const SeedPromoCodes = require("./seed/seedPromocode.js");
const SeedFeedback = require("./seed/seedFeedback.js");
const { scheduleEmailSending } = require("./services/mailService.js"); // Импорт функции
const SeedCallbacks = require("./seed/seedCallback");

// нужно удалить от сюда тесты

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(passport.initialize());
require("./middleware/passport")(passport);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    // Вызов метода для заполнения базы данных
    const seedBus = new SeedBuses();
    await seedBus.seed();

    const seedPromoCodes = new SeedPromoCodes();
    await seedPromoCodes.seed();

    const seedRoutes = new SeedRoutes();
    await seedRoutes.seed();

    const seedTrips = new SeedTrips();
    await seedTrips.seed();

    const seedRegisterBook = new SeedRegisterBook();
    await seedRegisterBook.seed();

    const seedSchedule = new SeedSchedule();
    await seedSchedule.seed();

    const seedUser = new SeedUser();
    await seedUser.seed();

    const seedTickets = new SeedTickets();
    await seedTickets.seed();

    const seedFeedback = new SeedFeedback();
    await seedFeedback.seed();

    const seedCallbacks = new SeedCallbacks();
    seedCallbacks.seed();

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

    // const user = { Email: "misha.makarenko2004@yandex.ru" }; // Объект пользователя
    // const ticket = {
    //   StartSity: "Москва",
    //   FinishSity: "Санкт-Петербург",
    //   StartTime: "2023-12-10 12:00",
    //   Seats: ["1A", "1B", "1C"], // Убедитесь, что это массив
    // };

    // // Вызов функции с правильным синтаксисом
    // startSendingEmails(user, ticket);

    // scheduleEmailSending();
  } catch (e) {
    console.log("Ошибка при запуске приложения:", e);
  }
};

start();
