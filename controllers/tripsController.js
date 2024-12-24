// controllers/tripsController.js
const TripsService = require("../services/tripsService");

class TripsController {
  // Получить все поездки
  async getAllTrips(req, res) {
    try {
      const trips = await TripsService.getAllTrips();
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Получить поездку по TripId
  async getTripById(req, res) {
    const { TripId } = req.params;
    try {
      const trip = await TripsService.getTripById(TripId);
      if (!trip) {
        return res.status(404).json({ message: "Поездка не найдена" });
      }
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Создать новую поездку
  async createTrip(req, res) {
    console.log(req.body);
    const { RouteId, StartTime, FinishTime, Price } = req.body;

    try {
      const trip = await TripsService.createTrip({
        RouteId,
        StartTime,
        FinishTime,
        Price,
      });
      res.status(201).json(trip);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Обновить поездку
  async updateTrip(req, res) {
    const { TripId } = req.params;
    const { RouteId, StartTime, FinishTime, Price } = req.body;

    try {
      const updatedTrip = await TripsService.updateTrip(TripId, {
        RouteId,
        StartTime,
        FinishTime,
        Price,
      });
      res.status(200).json(updatedTrip);
    } catch (error) {
      res
        .status(error.message === "Поездка не найдена" ? 404 : 400)
        .json({ message: error.message });
    }
  }

  // Удалить поездку
  async deleteTrip(req, res) {
    const { TripId } = req.params;

    try {
      await TripsService.deleteTrip(TripId);
      res.status(204).send(); // Успешное удаление, но без содержимого
    } catch (error) {
      res
        .status(error.message === "Поездка не найдена" ? 404 : 500)
        .json({ message: error.message });
    }
  }
}

module.exports = new TripsController();
