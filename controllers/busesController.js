// controllers/busesController.js
const BusesService = require("../services/busesService"); // Импорт сервиса BusesService

class BusesController {
  // Получить все автобусы
  async getAllBuses(req, res) {
    try {
      const buses = await BusesService.getAllBuses();
      res.status(200).json(buses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Получить автобус по BusId
  async getBusById(req, res) {
    const { BusId } = req.params;
    try {
      const bus = await BusesService.getBusById(BusId);
      if (!bus) {
        return res.status(404).json({ message: "Автобус не найден" });
      }
      res.status(200).json(bus);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Создать новый автобус
  async createBus(req, res) {
    const { BusNumber, NameCompany, Model, Capacity } = req.body;
    try {
      const bus = await BusesService.createBus({
        BusNumber,
        NameCompany,
        Model,
        Capacity,
      });
      res.status(201).json(bus);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Обновить автобус
  async updateBus(req, res) {
    const { BusId } = req.params;
    const { BusNumber, NameCompany, Model, Capacity } = req.body;
    try {
      const bus = await BusesService.updateBus(BusId, {
        BusNumber,
        NameCompany,
        Model,
        Capacity,
      });
      res.status(200).json(bus);
    } catch (error) {
      res
        .status(error.message === "Автобус не найден" ? 404 : 400)
        .json({ message: error.message });
    }
  }

  // Удалить автобус
  async deleteBus(req, res) {
    const { BusId } = req.params;
    try {
      await BusesService.deleteBus(BusId);
      res.status(204).send(); // Успешное удаление, но без содержимого
    } catch (error) {
      res
        .status(error.message === "Автобус не найден" ? 404 : 500)
        .json({ message: error.message });
    }
  }

  async getFullInfoWithOccupiedSeats(req, res) {
    const { startCity, finishCity, date } = req.query;

    console.log("Aaaa");
    try {
      const response = await BusesService.getFullInfoWithOccupiedSeats(
        startCity,
        finishCity,
        date
      );
      res.status(200).send(response);
    } catch (error) {
      res
        .status(error.message === "Автобус не найден" ? 404 : 500)
        .json({ message: error.message });
    }
  }
}

module.exports = new BusesController();
