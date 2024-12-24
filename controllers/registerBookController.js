// controllers/registerBookController.js
const registerBookService = require("../services/registerBookService");
const RegisterBookService = require("../services/registerBookService");

class RegisterBookController {
  // Получить все записи
  async getAllRegisterBooks(req, res) {
    try {
      const registerBooks = await RegisterBookService.getAllRegisterBooks();
      res.status(200).json(registerBooks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Получить запись по RegisterBookId
  async getRegisterBookById(req, res) {
    const { RegisterBookId } = req.params;
    try {
      const registerBook = await RegisterBookService.getRegisterBookById(
        RegisterBookId
      );
      if (!registerBook) {
        return res.status(404).json({ message: "Запись не найдена" });
      }
      res.status(200).json(registerBook);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Создать новую запись
  async createRegisterBook(req, res) {
    const { DateTime, TripId, BusId } = req.body;

    try {
      const registerBook = await RegisterBookService.createRegisterBook({
        DateTime,
        TripId,
        BusId,
      });
      res.status(201).json(registerBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Обновить запись
  async updateRegisterBook(req, res) {
    const { RegisterBookId } = req.params;
    const { DateTime, TripId, BusId } = req.body;

    try {
      const updatedRegisterBook = await RegisterBookService.updateRegisterBook(
        RegisterBookId,
        {
          DateTime,
          TripId,
          BusId,
        }
      );
      res.status(200).json(updatedRegisterBook);
    } catch (error) {
      res
        .status(error.message === "Запись не найдена" ? 404 : 400)
        .json({ message: error.message });
    }
  }

  async removeFutureTripsById(req, res) {
    const { TripId } = req.params;

    // Проверка на наличие TripId
    if (!TripId) {
      return res.status(400).send({ error: "TripId не указан" });
    }

    try {
      await registerBookService.removeFutureTripsById(TripId);
      res.sendStatus(200); // Успешное выполнение
    } catch (error) {
      console.error("Ошибка при удалении записей:", error.message);
      res.status(500).send({ error: "Ошибка при удалении записей" });
    }
  }

  // Удалить запись
  async deleteRegisterBook(req, res) {
    const { RegisterBookId } = req.params;

    try {
      await RegisterBookService.deleteRegisterBook(RegisterBookId);
      res.status(204).send(); // Успешное удаление, но без содержимого
    } catch (error) {
      res
        .status(error.message === "Запись не найдена" ? 404 : 500)
        .json({ message: error.message });
    }
  }

  async fetchRegisterBooksByDate(req, res) {
    console.log("vrr");
    const { date } = req.query; // Получаем дату из параметров запроса
    console.log(date);
    if (!date) {
      return res.status(400).json({ error: "Дата не указана" });
    }

    try {
      const registerBooksWithTickets =
        await RegisterBookService.getRigisterBookByDate(date);
      return res.status(200).json(registerBooksWithTickets);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new RegisterBookController();
