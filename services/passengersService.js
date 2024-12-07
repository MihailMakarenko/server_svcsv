// services/passengersService.js
const Passengers = require("../models/passengers");
const User = require("../models/user");

class PassengersService {
  async getAllPassengers() {
    return await Passengers.findAll();
  }

  async getPassengerById(PassengerId) {
    return await Passengers.findByPk(PassengerId);
  }

  async createPassenger(passengerData) {
    const userExists = await User.findByPk(passengerData.UserId);
    if (!userExists) {
      throw new Error("Пользователь не найден");
    }

    return await Passengers.create(passengerData);
  }

  async updatePassenger(PassengerId, passengerData) {
    const passenger = await this.getPassengerById(PassengerId);
    if (!passenger) {
      throw new Error("Пассажир не найден");
    }

    Object.assign(passenger, passengerData);
    return await passenger.save();
  }

  async deletePassenger(PassengerId) {
    const passenger = await this.getPassengerById(PassengerId);
    if (!passenger) {
      throw new Error("Пассажир не найден");
    }
    await passenger.destroy();
  }
}

module.exports = new PassengersService();
