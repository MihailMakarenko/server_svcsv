// controllers/feedbackController.js
// const FeedbackService = require("../services/feedbackService");

const RouteService = require("../services/routeService");
const TripsService = require("../services/tripsService");
const ScheduleService = require("../services/scheduleService");

class FullInformController {
  // async getFullInform(req, res) {
  //   console.log("Мыыы");
  //   try {
  //     const { page = 1, limit = 8 } = req.query; // Получаем параметры пагинации из запроса
  //     const routes = await RouteService.getAllRoutes();
  //     console.log("Тестируем");

  //     const startIndex = (page - 1) * limit;
  //     const endIndex = startIndex + limit;

  //     const trips = await TripsService.getAllTrips();
  //     console.log(trips);

  //     const allInform = await Promise.all(
  //       trips.map(async (trip) => {
  //         const routeDetail = await RouteService.getRouteById(trip.RouteId);
  //         const scheduleDetail = await ScheduleService.getSchedulesByTripId(
  //           trip.RouteId
  //         );

  //         return {
  //           routeId: trip.RouteId,
  //           startCity: routeDetail.StartCity,
  //           finishCity: routeDetail.FinishCity,
  //           distance: routeDetail.Distance,
  //           startTime: trip.StartTime.slice(0, 5),
  //           finishTime: trip.FinishTime.slice(0, 5),
  //           price: trip.Price,
  //           monday: scheduleDetail[0].Monday,
  //           tuesday: scheduleDetail[0].Tuesday,
  //           wednesday: scheduleDetail[0].Wednesday,
  //           thursday: scheduleDetail[0].Thursday,
  //           friday: scheduleDetail[0].Friday,
  //           saturday: scheduleDetail[0].Saturday,
  //           sunday: scheduleDetail[0].Sunday,
  //         };
  //       })
  //     );

  //     const endData = allInform.slice(startIndex, endIndex);

  //     return res.status(200).json({
  //       totalCount: Math.ceil(allInform.length / limit), // Общее количество элементов
  //       filteredRoutes: endData, // Элементы для текущей страницы
  //     });
  //   } catch (error) {
  //     console.error("Ошибка при получении маршрутов:", error.message);
  //     return res.status(500).json({ message: "Ошибка сервера" });
  //   }
  // }

  async getFullInform(req, res) {
    console.log("Мыыы");
    try {
      const { page = 1, limit = 8 } = req.query; // Получаем параметры пагинации из запроса
      const routes = await RouteService.getAllRoutes();
      console.log("Тестируем");

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      const trips = await TripsService.getAllTrips();
      // console.log(trips);

      const allInform = await Promise.all(
        trips.map(async (trip) => {
          const routeDetail = await RouteService.getRouteById(trip.RouteId);
          const scheduleDetail = await ScheduleService.getSchedulesByTripId(
            trip.TripId
          );

          // Проверяем наличие расписания
          const schedule =
            scheduleDetail && scheduleDetail.length > 0
              ? scheduleDetail[0]
              : {};

          // Устанавливаем значения по умолчанию для дней
          const monday = schedule.Monday || false;
          const tuesday = schedule.Tuesday || false;
          const wednesday = schedule.Wednesday || false;
          const thursday = schedule.Thursday || false;
          const friday = schedule.Friday || false;
          const saturday = schedule.Saturday || false;
          const sunday = schedule.Sunday || false;

          // Проверяем, есть ли хотя бы один день, установленный в true
          if (
            monday ||
            tuesday ||
            wednesday ||
            thursday ||
            friday ||
            saturday ||
            sunday
          ) {
            return {
              scheduleId: schedule.ScheduleId,
              tripId: trip.TripId,
              routeId: trip.RouteId,
              startCity: routeDetail.StartCity,
              finishCity: routeDetail.FinishCity,
              distance: routeDetail.Distance,
              startTime: trip.StartTime.slice(0, 5),
              finishTime: trip.FinishTime.slice(0, 5),
              price: trip.Price,
              monday,
              tuesday,
              wednesday,
              thursday,
              friday,
              saturday,
              sunday,
            };
          }
          return null; // Возвращаем null, если ни один день не установлен
        })
      );

      // Убираем null значения и фильтруем результат
      const filteredInform = allInform.filter((item) => item !== null);

      console.log(filteredInform);
      const endData = filteredInform.slice(startIndex, endIndex);

      return res.status(200).json({
        totalCount: Math.ceil(filteredInform.length / limit), // Общее количество элементов
        filteredRoutes: endData, // Элементы для текущей страницы
      });
    } catch (error) {
      console.error("Ошибка при получении маршрутов:", error.message);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new FullInformController();
