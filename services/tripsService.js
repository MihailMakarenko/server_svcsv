// services/tripsService.js
const Trips = require("../models/trips");
const Route = require("../models/route");

class TripsService {
  async getAllTrips() {
    return await Trips.findAll();
  }

  async getTripById(TripId) {
    return await Trips.findByPk(TripId);
  }

  async createTrip(tripData) {
    const routeExists = await Route.findByPk(tripData.RouteId);
    if (!routeExists) {
      throw new Error("Маршрут не найден");
    }

    return await Trips.create(tripData);
  }

  async updateTrip(TripId, tripData) {
    const trip = await this.getTripById(TripId);
    if (!trip) {
      throw new Error("Поездка не найдена");
    }

    Object.assign(trip, tripData);
    return await trip.save();
  }

  async deleteTrip(TripId) {
    const trip = await this.getTripById(TripId);
    if (!trip) {
      throw new Error("Поездка не найдена");
    }

    await trip.destroy();
  }

  async findByRouteId(routeId) {
    try {
      const trips = await Trips.findAll({
        where: {
          RouteId: routeId,
        },
        attributes: ["TripId", "StartTime", "FinishTime", "Price"], // Добавьте нужные поля
      });

      return trips || []; // Возвращаем массив поездок или пустой массив
    } catch (error) {
      console.error("Ошибка при поиске поездок по RouteId:", error);
      throw error; // Пробрасываем ошибку
    }
  }
}

module.exports = new TripsService();
