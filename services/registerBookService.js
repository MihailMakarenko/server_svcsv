// services/registerBookService.js
const RegisterBook = require("../models/registerBook");
const Trip = require("../models/trips");
const Bus = require("../models/buses");
const Tickets = require("../models/tickets");
const User = require("../models/user");

class RegisterBookService {
  async getAllRegisterBooks() {
    return await RegisterBook.findAll();
  }

  async getRegisterBookById(RegisterBookId) {
    return await RegisterBook.findByPk(RegisterBookId);
  }

  async createRegisterBook(registerBookData) {
    const tripExists = await Trip.findByPk(registerBookData.TripId);
    const busExists = await Bus.findByPk(registerBookData.BusId);

    if (!tripExists) {
      throw new Error("Поездка не найдена");
    }
    if (!busExists) {
      throw new Error("Автобус не найден");
    }

    return await RegisterBook.create(registerBookData);
  }

  async updateRegisterBook(RegisterBookId, registerBookData) {
    const registerBook = await this.getRegisterBookById(RegisterBookId);

    if (!registerBook) {
      throw new Error("Запись не найдена");
    }

    Object.assign(registerBook, registerBookData);
    return await registerBook.save();
  }

  async deleteRegisterBook(RegisterBookId) {
    const registerBook = await this.getRegisterBookById(RegisterBookId);

    if (!registerBook) {
      throw new Error("Запись не найдена");
    }

    await registerBook.destroy();
  }

  async getRegisterBookByTripIdDate(tripId, date) {
    try {
      const registerBook = await RegisterBook.findOne({
        where: {
          TripId: tripId,
          DateTime: date,
        },
      });

      if (!registerBook) {
        throw new Error("Запись не найдена");
      }

      return registerBook;
    } catch (error) {
      console.error(error);
      throw new Error("Ошибка при получении записи");
    }
  }

  async getRigisterBookByDate(date) {
    console.log("Мы тут");
    try {
      const registerBooks = await RegisterBook.findAll({
        where: {
          DateTime: date,
        },
      });

      if (registerBooks.length === 0) {
        throw new Error("Записи не найдены");
      }

      const registerBooksWithTickets = await Promise.all(
        registerBooks.map(async (registerBook) => {
          const tickets = await Tickets.findAll({
            where: {
              RegisterId: registerBook.RegisterBookId,
              NotificationSent: false,
            },
          });

          // Проходим по всем билетам и фильтруем по пользователям
          const filteredTickets = await Promise.all(
            tickets.map(async (ticket) => {
              const user = await User.findByPk(ticket.UserId);
              // Проверяем, согласен ли пользователь получать уведомления
              if (user && user.isGetNotifications) {
                return ticket.toJSON(); // Возвращаем билет, если пользователь получает уведомления
              }
              return null; // Вернем null, если пользователь не получает уведомления
            })
          );

          // Фильтруем null значения из массива билетов
          const validTickets = filteredTickets.filter(
            (ticket) => ticket !== null
          );

          return {
            ...registerBook.toJSON(),
            tickets: validTickets,
          };
        })
      );

      return registerBooksWithTickets;
    } catch (error) {
      console.error(error);
      throw new Error("Ошибка при получении записей");
    }
  }

  async removeFutureTripsById(tripId) {
    try {
      const currentDateTime = new Date();

      // Получаем все записи RegisterBook
      const registerBooks = await this.getAllRegisterBooks(); // Исправлено

      console.log();
      // Фильтруем записи по TripId и дате
      const futureBooks = registerBooks.filter((book) => {
        return (
          book.TripId == tripId && new Date(book.DateTime) >= currentDateTime
        );
      });

      console.log(futureBooks);

      // Удаляем найденные записи
      await Promise.all(
        futureBooks.map((book) => this.deleteRegisterBook(book.RegisterBookId))
      ); // Исправлено

      console.log(
        `Удалены записи RegisterBook для TripId ${tripId}, которые позже текущей даты.`
      );
    } catch (error) {
      console.error("Ошибка при удалении записей:", error.message);
    }
  }
}

module.exports = new RegisterBookService();
