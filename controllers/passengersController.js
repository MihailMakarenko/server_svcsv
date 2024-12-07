// controllers/passengersController.js
const PassengersService = require("../services/passengersService");

class PassengersController {
  // Получить всех пассажиров
  async getAllPassengers(req, res) {
    try {
      const passengers = await PassengersService.getAllPassengers();
      res.status(200).json(passengers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Получить пассажира по PassengerId
  async getPassengerById(req, res) {
    const { PassengerId } = req.params;
    try {
      const passenger = await PassengersService.getPassengerById(PassengerId);
      if (!passenger) {
        return res.status(404).json({ message: "Пассажир не найден" });
      }
      res.status(200).json(passenger);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Создать нового пассажира
  async createPassenger(req, res) {
    const { FirstName, LastName, UserId } = req.body;

    try {
      const passenger = await PassengersService.createPassenger({
        FirstName,
        LastName,
        UserId,
      });
      res.status(201).json(passenger);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Обновить информацию о пассажире
  async updatePassenger(req, res) {
    const { PassengerId } = req.params;
    const { FirstName, LastName, UserId } = req.body;

    try {
      const updatedPassenger = await PassengersService.updatePassenger(
        PassengerId,
        {
          FirstName,
          LastName,
          UserId,
        }
      );
      res.status(200).json(updatedPassenger);
    } catch (error) {
      res
        .status(error.message === "Пассажир не найден" ? 404 : 400)
        .json({ message: error.message });
    }
  }

  // Удалить пассажира
  async deletePassenger(req, res) {
    const { PassengerId } = req.params;

    try {
      await PassengersService.deletePassenger(PassengerId);
      res.status(204).send(); // Успешное удаление, но без содержимого
    } catch (error) {
      res
        .status(error.message === "Пассажир не найден" ? 404 : 500)
        .json({ message: error.message });
    }
  }
}

module.exports = new PassengersController();
