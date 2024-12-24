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
    console.log(busData);
    return await Buses.create(busData);
  }

  async getBusesWithPagination(page, limit) {
    console.log("Мы тут");
    const offset = (page - 1) * limit; // Вычисляем смещение

    try {
      const buses = await Buses.findAll({
        limit: limit,
        offset: offset,
      });

      // Получаем общее количество записей
      const totalCount = await Buses.count();

      return {
        buses,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      };
    } catch (error) {
      console.error("Ошибка при получении автобусов:", error);
      throw error; // Обработка или повторное выбрасывание ошибки
    }
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

  // async getFreePlaceOnBus(startCity, finishCity, date) {
  //   try {
  //     const routeId = await RouteService.getRouteId(startCity, finishCity);
  //     console.log("RouteId:", routeId);

  //     if (!routeId) {
  //       console.log("Маршрут не найден.");
  //       return [];
  //     }

  //     // Получаем поездки по RouteId
  //     const trips = await TripsService.findByRouteId(routeId);
  //     console.log("Trips:", trips);

  //     if (!Array.isArray(trips) || trips.length === 0) {
  //       console.log("Поездки не найдены.");
  //       return [];
  //     }

  //     const tripData = trips.map((trip) => ({
  //       TripId: trip.dataValues.TripId,
  //       StartTime: trip.dataValues.StartTime,
  //       FinishTime: trip.dataValues.FinishTime,
  //       Price: trip.Price,
  //     }));

  //     const registerBookPromises = tripData.map(async (trip) => {
  //       try {
  //         const registerBook =
  //           await RegisterBookService.getRegisterBookByTripIdDate(
  //             trip.TripId,
  //             date
  //           );
  //         console.log("Полученные:", registerBook);

  //         return {
  //           TripId: trip.TripId,
  //           StartTime: trip.StartTime,
  //           FinishTime: trip.FinishTime,
  //           Price: trip.Price,
  //           DateTime: registerBook.DateTime,
  //           BusId: registerBook.BusId,
  //           RegisterBookId: registerBook.RegisterBookId,
  //         };
  //       } catch (error) {
  //         console.log(
  //           `Ошибка при получении записи для TripId ${trip.TripId}:`,
  //           error.message
  //         );
  //         return null; // Возвращаем null, если запись не найдена
  //       }
  //     });

  //     const registerBooks = await Promise.all(registerBookPromises);

  //     // Фильтруем null значения
  //     const filteredArray = registerBooks.filter(
  //       (schedule) => schedule !== null
  //     );
  //     console.log("Данные о поездках:", filteredArray);

  //     const fullInformPromises = filteredArray.map(async (element) => {
  //       try {
  //         const bus = await this.getBusById(element.BusId);
  //         console.log("Полученные автобус:", bus);

  //         return {
  //           RegisterBookId: element.RegisterBookId,
  //           TripId: element.TripId,
  //           StartCity: startCity,
  //           FinishCity: finishCity,
  //           StartTime: element.StartTime.substring(0, 5),
  //           FinishTime: element.FinishTime.substring(0, 5),
  //           Price: element.Price,
  //           DateTime: element.DateTime,
  //           BusNumber: bus.BusNumber,
  //           NameCompany: bus.NameCompany,
  //           Model: bus.Model,
  //           Capacity: bus.Capacity,
  //         };
  //       } catch (error) {
  //         console.log(
  //           `Ошибка при получении автобуса для TripId ${element.TripId}:`,
  //           error.message
  //         );
  //         return null; // Возвращаем null, если запись не найдена
  //       }
  //     });

  //     const fullInfoArray = await Promise.all(fullInformPromises);

  //     // Фильтруем null значения из второго массива
  //     const finalArray = fullInfoArray.filter((info) => info !== null);

  //     const currentDateTime = new Date(); // Текущая дата и время

  //     // Получаем часы, минуты и секунды
  //     const hours = currentDateTime.getHours();
  //     const minutes = currentDateTime.getMinutes();
  //     const seconds = currentDateTime.getSeconds();

  //     // Форматируем время в строку
  //     const currentTime = `${hours}:${minutes}:${seconds}`;

  //     const currentDate = currentDateTime.toISOString().split("T")[0]; // Получаем текущую дату в формате YYYY-MM-DD

  //     const filteredRegisterBooks = registerBooks.filter((registerBook) => {
  //       const tripDate = registerBook.DateTime; // Дата отправления
  //       const tripStartTime = registerBook.StartTime; // Время отправления

  //       // Проверяем, если дата отправления меньше текущей даты
  //       if (tripDate > currentDate) {
  //         return true; // Если дата меньше, включаем в результат
  //       }

  //       // Если даты равны, сравниваем время
  //       if (tripDate === currentDate) {
  //         return curretTime < tripStartTime;
  //       }

  //       return false; // Если дата больше, не включаем
  //     });

  //     // Теперь filteredRegisterBooks содержит только те объекты, у которых полное время отправления меньше текущего

  //     return finalArray; // Возвращаем данные для дальнейшего использования
  //   } catch (error) {
  //     console.error("Ошибка при получении данных:", error);
  //     throw error; // Пробрасываем ошибку дальше, если нужно
  //   }
  // }

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

      const currentDateTime = new Date(); // Текущая дата и время
      const currentDate = currentDateTime.toISOString().split("T")[0]; // Получаем текущую дату в формате YYYY-MM-DD
      const currentHours = String(currentDateTime.getHours());
      const currentMinutes = String(currentDateTime.getMinutes());
      const currentTime = `${currentHours}:${currentMinutes}`; // Текущее время в формате HH:mm

      // const filteredRegisterBooks = finalArray.filter((registerBook) => {
      //   const tripDate = registerBook.DateTime; // Дата отправления
      //   const tripStartTime = registerBook.StartTime; // Время отправления

      //   // Проверяем, если дата отправления меньше текущей даты
      //   if (tripDate < currentDate) {
      //     return true; // Если дата меньше, включаем в результат
      //   }

      //   // Если даты равны, сравниваем время
      //   if (tripDate === currentDate) {
      //     return currentTime < tripStartTime; // Используем currentTime для сравнения
      //   }

      //   return false; // Если дата больше, не включаем
      // });

      // Теперь filteredRegisterBooks содержит только те объекты, у которых полное время отправления меньше текущего

      const filteredRegisterBooks = finalArray.filter((registerBook) => {
        const tripDate = registerBook.DateTime; // Дата отправления
        const tripStartTime = registerBook.StartTime; // Время отправления

        // Проверяем, если дата отправления больше текущей даты
        if (tripDate > currentDate) {
          return true; // Если дата больше, включаем в результат
        }

        // Если даты равны, сравниваем время
        if (tripDate === currentDate) {
          return currentTime < tripStartTime; // Используем currentTime для сравнения
        }

        return false; // Если дата меньше, не включаем
      });

      return filteredRegisterBooks; // Возвращаем данные для дальнейшего использования
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      throw error; // Пробрасываем ошибку дальше, если нужно
    }
  }

  async getFullInfoWithOccupiedSeats(startCity, finishCity, date) {
    const getInform = await this.getFreePlaceOnBus(startCity, finishCity, date);
    console.log(getInform);
    console.log("Мы тут");

    const tripsWithAvailableSeats = await Promise.all(
      getInform.map(async (trip) => {
        console.log("Уже тут");
        // Предполагаем, что у вас есть способ получить registerBookId из trip
        const registerBookId = trip.RegisterBookId;
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

  async getAllBusNumber() {
    const buses = await Buses.findAll({
      attributes: ["BusNumber"], // Select only the BusNumber
    });
    return buses.map((bus) => bus.BusNumber);
  }
}

module.exports = new BusesService();
