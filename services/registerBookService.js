// services/registerBookService.js
const RegisterBook = require("../models/registerBook");
const Trip = require("../models/trips");
const Bus = require("../models/buses");

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
}

module.exports = new RegisterBookService();
