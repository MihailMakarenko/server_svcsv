// services/busesService.js
const Buses = require("../models/buses"); // Импорт модели Buses
const RegisterBookService = require("./registerBookService");
const TripsService = require("./tripsService");
const RouteService = require("./routeService");

class BusesService {
  async getAllBuses() {
    return await Buses.findAll();
  }

  async getBusById(BusId) {
    return await Buses.findByPk(BusId);
  }

  async createBus(busData) {
    return await Buses.create(busData);
  }

  async updateBus(BusId, busData) {
    const bus = await this.getBusById(BusId);
    if (!bus) {
      throw new Error("Автобус не найден");
    }
    Object.assign(bus, busData);
    return await bus.save();
  }

  async deleteBus(BusId) {
    const bus = await this.getBusById(BusId);
    if (!bus) {
      throw new Error("Автобус не найден");
    }
    await bus.destroy();
  }

  async getFreePlaceOnBus(startCity, finishCity, date) {
    try {
      const routeId = await RouteService.getRouteId(startCity, finishCity);
      console.log("RouteId:", routeId);

      if (!routeId) {
        console.log("Маршрут не найден.");
        return [];
      }

      // Получаем поездки по RouteId
      const trips = await TripsService.findByRouteId(routeId);
      console.log("Trips:", trips);

      if (!Array.isArray(trips) || trips.length === 0) {
        console.log("Поездки не найдены.");
        return [];
      }

      const tripData = trips.map((trip) => ({
        TripId: trip.dataValues.TripId,
        StartTime: trip.dataValues.StartTime,
        FinishTime: trip.dataValues.FinishTime,
        Price: trip.Price,
      }));

      console.log("Дата:", date);

      const registerBookPromises = tripData.map(async (trip) => {
        try {
          const registerBook =
            await RegisterBookService.getRegisterBookByTripIdDate(
              trip.TripId,
              date
            );
          console.log("Полученные:", registerBook);

          return {
            TripId: trip.TripId,
            StartTime: trip.StartTime,
            FinishTime: trip.FinishTime,
            Price: trip.Price,
            DateTime: registerBook.DateTime,
            BusId: registerBook.BusId,
            RegisterBookId: registerBook.RegisterBookId,
          };
        } catch (error) {
          console.log(
            `Ошибка при получении записи для TripId ${trip.TripId}:`,
            error.message
          );
          return null; // Возвращаем null, если запись не найдена
        }
      });

      const registerBooks = await Promise.all(registerBookPromises);

      // Фильтруем null значения
      const filteredArray = registerBooks.filter(
        (schedule) => schedule !== null
      );
      console.log("Данные о поездках:", filteredArray);

      const fullInformPromises = filteredArray.map(async (element) => {
        try {
          const bus = await this.getBusById(element.BusId);
          console.log("Полученные автобус:", bus);

          return {
            RegisterBookId: element.RegisterBookId,
            TripId: element.TripId,
            StartCity: startCity,
            FinishCity: finishCity,
            StartTime: element.StartTime.substring(0, 5),
            FinishTime: element.FinishTime.substring(0, 5),
            Price: element.Price,
            DateTime: element.DateTime,
            BusNumber: bus.BusNumber,
            NameCompany: bus.NameCompany,
            Model: bus.Model,
            Capacity: bus.Capacity,
          };
        } catch (error) {
          console.log(
            `Ошибка при получении автобуса для TripId ${element.TripId}:`,
            error.message
          );
          return null; // Возвращаем null, если запись не найдена
        }
      });

      const fullInfoArray = await Promise.all(fullInformPromises);

      // Фильтруем null значения из второго массива
      const finalArray = fullInfoArray.filter((info) => info !== null);

      return finalArray; // Возвращаем данные для дальнейшего использования
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      throw error; // Пробрасываем ошибку дальше, если нужно
    }
  }

  async getFullInfoWithOccupiedSeats(startCity, finishCity, date) {
    const getInform = await this.getFreePlaceOnBus(startCity, finishCity, date);

    console.log("Мы тут");

    const tripsWithAvailableSeats = await Promise.all(
      getInform.map(async (trip) => {
        console.log("Уже тут");
        // Предполагаем, что у вас есть способ получить registerBookId из trip
        const registerBookId = trip.RegisterBookId; // Замените на правильный способ получения RegisterBookId
        const TicketsService = require("./ticketsServise"); // Получаем занятые места
        const occupiedSeats = await TicketsService.getOccupiedSeats(
          registerBookId
        );

        console.log("AAAAA");
        console.log(occupiedSeats);

        // Рассчитываем количество свободных мест
        const availableSeats = trip.Capacity - occupiedSeats.length;

        return {
          ...trip, // Сохраняем оригинальную информацию о поездке
          OccupiedSeats: occupiedSeats, // Добавляем занятые места
          AvailableSeats: availableSeats, // Добавляем количество свободных мест
        };
      })
    );

    return tripsWithAvailableSeats; // Возвращаем обновленный массив с информацией о поездках
  }
}

module.exports = new BusesService();
