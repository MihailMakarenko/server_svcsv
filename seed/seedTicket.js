// Файл: seedTickets.js
const { sequelize } = require("../db"); // Убедитесь, что путь правильный
const Tickets = require("../models/tickets"); // Импорт модели Tickets
const User = require("../models/user"); // Импорт модели User
const RegisterBook = require("../models/registerBook"); // Импорт модели RegisterBook

class SeedTickets {
  async seed() {
    // Сначала получаем существующих пользователей и записи регистрации
    const users = await User.findAll();
    const registerBooks = await RegisterBook.findAll();

    // Проверяем, есть ли пользователи и записи регистрации
    if (users.length === 0 || registerBooks.length === 0) {
      console.log(
        "Нет пользователей или записей регистрации для создания билетов."
      );
      return;
    }

    const tickets = [
      {
        Status: "Заказан",
        Promocode: "SUMMER2023",
        UserId: users[0].UserId,
        RegisterId: registerBooks[0].RegisterBookId,
        Seats: [1, 2],
      },
      {
        Status: "В пути",
        Promocode: null,
        UserId: users[1].UserId,
        RegisterId: registerBooks[1].RegisterBookId,
        Seats: [3, 4],
      },
      {
        Status: "Отменён",
        Promocode: "SUMMER2023",
        UserId: users[0].UserId,
        RegisterId: registerBooks[0].RegisterBookId,
        Seats: [5],
      },
      {
        Status: "Заказан",
        Promocode: "WINTER2023",
        UserId: users[2].UserId, // Используем третьего пользователя
        RegisterId: registerBooks[2].RegisterBookId, // Используем третью запись регистрации
        Seats: [6, 7],
      },
      {
        Status: "В пути",
        Promocode: null,
        UserId: users[0].UserId, // Используем четвертого пользователя
        RegisterId: registerBooks[3].RegisterBookId, // Используем четвертую запись регистрации
        Seats: [8, 9],
      },
      {
        Status: "Завершён",
        Promocode: "WINTER2023",
        UserId: users[1].UserId,
        RegisterId: registerBooks[1].RegisterBookId,
        Seats: [10],
      },
      {
        Status: "Отменён",
        Promocode: null,
        UserId: users[2].UserId,
        RegisterId: registerBooks[2].RegisterBookId,
        Seats: [11, 12],
      },
      {
        Status: "В пути",
        Promocode: "WINTER2023",
        UserId: users[0].UserId,
        RegisterId: registerBooks[3].RegisterBookId,
        Seats: [13, 14],
      },
      {
        Status: "Заказан",
        Promocode: "SPRING2023",
        UserId: users[0].UserId,
        RegisterId: registerBooks[0].RegisterBookId,
        Seats: [15],
      },
      {
        Status: "Завершён",
        Promocode: null,
        UserId: users[1].UserId,
        RegisterId: registerBooks[1].RegisterBookId,
        Seats: [16, 17],
      },
      {
        Status: "Заказан",
        Promocode: "SPRING2023",
        UserId: users[2].UserId,
        RegisterId: registerBooks[2].RegisterBookId,
        Seats: [18, 19, 20],
      },
      {
        Status: "Завершён",
        Promocode: null,
        UserId: users[0].UserId,
        RegisterId: registerBooks[3].RegisterBookId,
        Seats: [21],
      },
    ];

    try {
      const existingTickets = await Tickets.findAll();

      if (existingTickets.length === 0) {
        await Tickets.bulkCreate(tickets);
        console.log("База данных билетов успешно заполнена.");
      } else {
        console.log(
          "База данных билетов уже содержит записи. Новые записи не будут добавлены."
        );
      }
    } catch (error) {
      console.error("Ошибка при заполнении базы данных билетов:", error);
    }
  }
}

module.exports = SeedTickets;
