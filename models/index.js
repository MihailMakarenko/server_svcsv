// Импорт sequelize и моделей
const sequelize = require("../db");

const User = require("./user");
const Callback = require("./callback");
const Favourites = require("./favourites");
const Schedule = require("./schedule");
const Buses = require("./buses");
const Trips = require("./trips");
const RegisterBook = require("./registerBook");
const Tickets = require("./tickets");
const Passengers = require("./passengers");
const Feedback = require("./feedback");
const PromoCode = require("./promoCode");
const Route = require("./route");

// Установите связи между моделями

// 1. Пользователи и обратные звонки (Callbacks)
User.hasMany(Callback, { foreignKey: "UserId", onDelete: "CASCADE" });
Callback.belongsTo(User, { foreignKey: "UserId" });

// 2. Пользователи и избранное (Favourites)
User.hasMany(Favourites, { foreignKey: "UserId", onDelete: "CASCADE" });
Favourites.belongsTo(User, { foreignKey: "UserId" });

// 3. Избранное и поездки (Trips)
Trips.hasMany(Favourites, { foreignKey: "TripId", onDelete: "CASCADE" });
Favourites.belongsTo(Trips, { foreignKey: "TripId" });

// 4. Расписание (Schedule) и поездки (Trips)
// 4. Расписание (Schedule) и поездки (Trips)
Schedule.belongsTo(Trips, { foreignKey: "TripId", onDelete: "SET NULL" });
Trips.hasMany(Schedule, { foreignKey: "TripId", onDelete: "CASCADE" });

// 5. Поездки (Trips) и регистрация (RegisterBook)
Trips.hasMany(RegisterBook, { foreignKey: "TripId", onDelete: "CASCADE" });
RegisterBook.belongsTo(Trips, { foreignKey: "TripId" });

// 6. Автобусы (Buses) и регистрация (RegisterBook)
Buses.hasMany(RegisterBook, { foreignKey: "BusId", onDelete: "CASCADE" });
RegisterBook.belongsTo(Buses, { foreignKey: "BusId" });

// 7. Регистрация (RegisterBook) и билеты (Tickets)

// 8. Билеты (Tickets) и отзывы (Feedback)
Tickets.hasMany(Feedback, { foreignKey: "TicketId", onDelete: "CASCADE" });
Feedback.belongsTo(Tickets, { foreignKey: "TicketId" });

// 9. Билеты (Tickets) и промокоды (PromoCode)
// Ассоциация: Один промокод может быть связан со многими билетами
PromoCode.hasMany(Tickets, {
  foreignKey: "Promocode", // Поле в таблице Tickets
  sourceKey: "Code", // Поле в таблице PromoCode
});

Tickets.belongsTo(PromoCode, {
  foreignKey: "Promocode", // Поле в таблице Tickets
  targetKey: "Code", // Поле в таблице PromoCode
});

// 10. Маршруты (Route) и поездки (Trips)
Route.hasMany(Trips, { foreignKey: "RouteId", onDelete: "CASCADE" });
Trips.belongsTo(Route, { foreignKey: "RouteId" });

// 11. Билеты (Tickets) и пассажиры (Passengers) через связь многие-ко-многим
Tickets.belongsToMany(Passengers, {
  through: "Tickets_Passengers",
  foreignKey: "TicketId",
  onDelete: "CASCADE",
});
Passengers.belongsToMany(Tickets, {
  through: "Tickets_Passengers",
  foreignKey: "PassengerId",
  onDelete: "CASCADE",
});

// Экспорт всех моделей
module.exports = {
  User,
  Callback,
  Favourites,
  Schedule,
  Buses,
  Trips,
  RegisterBook,
  Tickets,
  Passengers,
  Feedback,
  PromoCode,
  Route,
};
