// services/scheduleService.js
const Schedule = require("../models/schedule"); // Импорт модели Schedule
const RouteService = require("./routeService");
const TripsService = require("./tripsService");
const ExcelJS = require("exceljs");

class ScheduleService {
  async create(scheduleData) {
    return await Schedule.create(scheduleData);
  }

  async getById(id) {
    return await Schedule.findOne({ where: { ScheduleId: id } });
  }

  async update(id, scheduleData) {
    const schedule = await this.getById(id);
    if (!schedule) {
      throw new Error("Расписание не найдено");
    }
    await Schedule.update(scheduleData, { where: { ScheduleId: id } });
    return await this.getById(id);
  }

  async delete(id) {
    const schedule = await this.getById(id);
    if (!schedule) {
      throw new Error("Расписание не найдено");
    }
    await Schedule.destroy({ where: { ScheduleId: id } });
  }

  async getSchedulesByTripId(tripId) {
    try {
      const schedules = await Schedule.findAll({
        where: {
          TripId: tripId, // Ищем по TripId
        },
        attributes: [
          "ScheduleId",
          "ScheduleId",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ], // Указываем только нужные поля
      });

      // Преобразуем массив объектов Sequelize в обычные объекты
      const scheduleData = schedules.map((schedule) => schedule.get());

      return scheduleData; // Возвращаем массив расписаний
    } catch (error) {
      console.error("Ошибка при поиске расписания:", error);
      throw error; // Пробрасываем ошибку для обработки выше
    }
  }

  async getSchedulesByCities(startCity, finishCity) {
    try {
      // 1. Получаем RouteId по начальным и конечным городам
      const routeId = await RouteService.getRouteId(startCity, finishCity);
      console.log("RouteId:", routeId);

      if (!routeId) {
        console.log("Маршрут не найден.");
        return [];
      }

      // 2. Получаем поездки по RouteId
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
      }));

      console.log("Данные о поездках:", tripData);

      // 3. Получаем расписания для каждой поездки
      const schedulesPromises = tripData.map(async (trip) => {
        const schedules = await this.getSchedulesByTripId(trip.TripId);
        console.log("Полученные расписания:", schedules);

        const weeklySchedules = schedules.length > 0 ? schedules[0] : {};

        return {
          TripId: trip.TripId,
          StartTime: trip.StartTime,
          FinishTime: trip.FinishTime,
          Monday: weeklySchedules.Monday || false,
          Tuesday: weeklySchedules.Tuesday || false,
          Wednesday: weeklySchedules.Wednesday || false,
          Thursday: weeklySchedules.Thursday || false,
          Friday: weeklySchedules.Friday || false,
          Saturday: weeklySchedules.Saturday || false,
          Sunday: weeklySchedules.Sunday || false,
        };
      });

      // 4. Ожидаем завершения всех запросов
      const schedulesArray = await Promise.all(schedulesPromises);

      // 5. Выводим результат
      console.log("Все расписания:", schedulesArray);
      return schedulesArray; // Возвращаем все найденные расписания
    } catch (error) {
      console.error("Ошибка при получении расписаний:", error);
      throw error; // Пробрасываем ошибку
    }
  }

  // async exportSchedulesToExcel(startCity, finishCity) {
  //   try {
  //     const schedules = await this.getSchedulesByCities(startCity, finishCity);

  //     const workbook = new ExcelJS.Workbook();
  //     const worksheet = workbook.addWorksheet("Schedules");

  //     // Устанавливаем заголовки
  //     worksheet.columns = [
  //       { header: "Номер Маршрута", key: "TripId", width: 10 },
  //       { header: "Время отправления", key: "StartTime", width: 15 },
  //       { header: "Время прибытия", key: "FinishTime", width: 15 },
  //       { header: "Понедельник", key: "Monday", width: 10 },
  //       { header: "Вторник", key: "Tuesday", width: 10 },
  //       { header: "Среда", key: "Wednesday", width: 10 },
  //       { header: "Четврег", key: "Thursday", width: 10 },
  //       { header: "Пятница", key: "Friday", width: 10 },
  //       { header: "Суббота", key: "Saturday", width: 10 },
  //       { header: "Воскресенье", key: "Sunday", width: 10 },
  //     ];

  //     // Добавляем данные в рабочий лист
  //     schedules.forEach((schedule) => {
  //       worksheet.addRow({
  //         TripId: schedule.TripId,
  //         StartTime: schedule.StartTime,
  //         FinishTime: schedule.FinishTime,
  //         Monday: schedule.Monday ? "+" : "-",
  //         Tuesday: schedule.Tuesday ? "+" : "-",
  //         Wednesday: schedule.Wednesday ? "+" : "-",
  //         Thursday: schedule.Thursday ? "+" : "-",
  //         Friday: schedule.Friday ? "+" : "-",
  //         Saturday: schedule.Saturday ? "+" : "-",
  //         Sunday: schedule.Sunday ? "+" : "-",
  //       });
  //     });

  //     // Применяем стили к заголовкам
  //     worksheet.getRow(1).font = { bold: true };
  //     worksheet.getRow(1).fill = {
  //       gradient: {
  //         type: "linear",
  //         degree: 0,
  //         stops: [
  //           { position: 0, color: { argb: "FF0000FF" } },
  //           { position: 1, color: { argb: "FF0000FF" } },
  //         ],
  //       },
  //     };
  //     worksheet.getRow(1).alignment = { horizontal: "center" };

  //     // Генерируем буфер и возвращаем его как массив байтов
  //     const buffer = await workbook.xlsx.writeBuffer();
  //     console.log("Excel файл успешно сгенерирован.");
  //     return buffer; // Возвращаем массив байтов
  //   } catch (error) {
  //     console.error("Ошибка при экспорте расписаний в Excel:", error);
  //     throw error; // Пробрасываем ошибку
  //   }
  // }

  // async exportSchedulesToExcel(startCity, finishCity) {
  //   try {
  //     const schedules = await this.getSchedulesByCities(startCity, finishCity);

  //     const workbook = new ExcelJS.Workbook();
  //     const worksheet = workbook.addWorksheet("Schedules");

  //     // Устанавливаем заголовки
  //     worksheet.columns = [
  //       { header: "Номер Маршрута", key: "TripId", width: 10 },
  //       { header: "Время отправления", key: "StartTime", width: 15 },
  //       { header: "Время прибытия", key: "FinishTime", width: 15 },
  //       { header: "Понедельник", key: "Monday", width: 10 },
  //       { header: "Вторник", key: "Tuesday", width: 10 },
  //       { header: "Среда", key: "Wednesday", width: 10 },
  //       { header: "Четверг", key: "Thursday", width: 10 },
  //       { header: "Пятница", key: "Friday", width: 10 },
  //       { header: "Суббота", key: "Saturday", width: 10 },
  //       { header: "Воскресенье", key: "Sunday", width: 10 },
  //     ];

  //     // Добавляем данные в рабочий лист
  //     schedules.forEach((schedule) => {
  //       // Проверяем, есть ли хотя бы одно значение true
  //       if (
  //         schedule.Monday ||
  //         schedule.Tuesday ||
  //         schedule.Wednesday ||
  //         schedule.Thursday ||
  //         schedule.Friday ||
  //         schedule.Saturday ||
  //         schedule.Sunday
  //       ) {
  //         worksheet.addRow({
  //           TripId: schedule.TripId,
  //           StartTime: schedule.StartTime,
  //           FinishTime: schedule.FinishTime,
  //           Monday: schedule.Monday ? "+" : "-",
  //           Tuesday: schedule.Tuesday ? "+" : "-",
  //           Wednesday: schedule.Wednesday ? "+" : "-",
  //           Thursday: schedule.Thursday ? "+" : "-",
  //           Friday: schedule.Friday ? "+" : "-",
  //           Saturday: schedule.Saturday ? "+" : "-",
  //           Sunday: schedule.Sunday ? "+" : "-",
  //         });
  //       }
  //     });

  //     // Применяем стили к заголовкам
  //     worksheet.getRow(1).font = { bold: true };
  //     worksheet.getRow(1).fill = {
  //       gradient: {
  //         type: "linear",
  //         degree: 0,
  //         stops: [
  //           { position: 0, color: { argb: "FF0000FF" } },
  //           { position: 1, color: { argb: "FF0000FF" } },
  //         ],
  //       },
  //     };
  //     worksheet.getRow(1).alignment = { horizontal: "center" };

  //     // Генерируем буфер и возвращаем его как массив байтов
  //     const buffer = await workbook.xlsx.writeBuffer();
  //     console.log("Excel файл успешно сгенерирован.");
  //     return buffer; // Возвращаем массив байтов
  //   } catch (error) {
  //     console.error("Ошибка при экспорте расписаний в Excel:", error);
  //     throw error; // Пробрасываем ошибку
  //   }
  // }

  async exportSchedulesToExcel(startCity, finishCity) {
    try {
      const schedules = await this.getSchedulesByCities(startCity, finishCity);

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Schedules");

      // Устанавливаем заголовки
      worksheet.columns = [
        { header: "Номер Маршрута", key: "TripId" },
        { header: "Время отправления", key: "StartTime" },
        { header: "Время прибытия", key: "FinishTime" },
        { header: "Понедельник", key: "Monday" },
        { header: "Вторник", key: "Tuesday" },
        { header: "Среда", key: "Wednesday" },
        { header: "Четверг", key: "Thursday" },
        { header: "Пятница", key: "Friday" },
        { header: "Суббота", key: "Saturday" },
        { header: "Воскресенье", key: "Sunday" },
      ];

      // Добавляем данные в рабочий лист
      schedules.forEach((schedule) => {
        // Проверяем, есть ли активные дни
        const hasActiveDays =
          schedule.Monday ||
          schedule.Tuesday ||
          schedule.Wednesday ||
          schedule.Thursday ||
          schedule.Friday ||
          schedule.Saturday ||
          schedule.Sunday;

        if (hasActiveDays) {
          worksheet.addRow({
            TripId: schedule.TripId || "",
            StartTime: schedule.StartTime || "",
            FinishTime: schedule.FinishTime || "",
            Monday: schedule.Monday ? "+" : "-",
            Tuesday: schedule.Tuesday ? "+" : "-",
            Wednesday: schedule.Wednesday ? "+" : "-",
            Thursday: schedule.Thursday ? "+" : "-",
            Friday: schedule.Friday ? "+" : "-",
            Saturday: schedule.Saturday ? "+" : "-",
            Sunday: schedule.Sunday ? "+" : "-",
          });
        }
      });

      // Проверяем, добавлены ли данные
      if (worksheet.rowCount === 1) {
        console.log("Нет данных для добавления в Excel.");
        return null; // Возвращаем null, если нет данных
      }

      // Применяем стили к заголовкам
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffb4c6e7" },
      };
      worksheet.getRow(1).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      // Центрирование содержимого ячеек
      worksheet.eachRow((row) => {
        row.eachCell((cell) => {
          cell.alignment = { horizontal: "center", vertical: "middle" };
        });
      });

      // Автоматическое определение ширины колонок
      worksheet.columns.forEach((column) => {
        let maxWidth = 0;
        column.eachCell({ includeEmpty: true }, (cell) => {
          maxWidth = Math.max(
            maxWidth,
            cell.value ? cell.value.toString().length : 0
          );
        });
        column.width = maxWidth + 2; // Добавляем немного отступа
      });

      // Генерируем буфер и возвращаем его как массив байтов
      const buffer = await workbook.xlsx.writeBuffer();
      console.log("Excel файл успешно сгенерирован.");
      return buffer; // Возвращаем массив байтов
    } catch (error) {
      console.error("Ошибка при экспорте расписаний в Excel:", error);
      throw error; // Пробрасываем ошибку
    }
  }

  // async exportSchedulesToExcel(startCity, finishCity) {
  //   try {
  //     const schedules = await this.getSchedulesByCities(startCity, finishCity);

  //     const workbook = new ExcelJS.Workbook();
  //     const worksheet = workbook.addWorksheet("Schedules");

  //     // Устанавливаем заголовки
  //     worksheet.columns = [
  //       { header: "Номер Маршрута", key: "TripId" },
  //       { header: "Время отправления", key: "StartTime" },
  //       { header: "Время прибытия", key: "FinishTime" },
  //       { header: "Понедельник", key: "Monday" },
  //       { header: "Вторник", key: "Tuesday" },
  //       { header: "Среда", key: "Wednesday" },
  //       { header: "Четверг", key: "Thursday" },
  //       { header: "Пятница", key: "Friday" },
  //       { header: "Суббота", key: "Saturday" },
  //       { header: "Воскресенье", key: "Sunday" },
  //     ];

  //     // Добавляем данные в рабочий лист
  //     schedules.forEach((schedule) => {
  //       worksheet.addRow({
  //         TripId: schedule.TripId || "",
  //         StartTime: schedule.StartTime || "",
  //         FinishTime: schedule.FinishTime || "",
  //         Monday: schedule.Monday ? "+" : "-" || "",
  //         Tuesday: schedule.Tuesday ? "+" : "-" || "",
  //         Wednesday: schedule.Wednesday ? "+" : "-" || "",
  //         Thursday: schedule.Thursday ? "+" : "-" || "",
  //         Friday: schedule.Friday ? "+" : "-" || "",
  //         Saturday: schedule.Saturday ? "+" : "-" || "",
  //         Sunday: schedule.Sunday ? "+" : "-" || "",
  //       });
  //     });

  //     // Применяем стили к заголовкам
  //     worksheet.getRow(1).font = { bold: true };
  //     worksheet.getRow(1).fill = {
  //       type: "pattern",
  //       pattern: "solid",
  //       fgColor: { argb: "ffb4c6e7" },
  //     };
  //     worksheet.getRow(1).border = {
  //       top: {
  //         style: "thin",
  //       },
  //       left: {
  //         style: "thin",
  //       },
  //       bottom: {
  //         style: "thin",
  //       },
  //       right: {
  //         style: "thin",
  //       },
  //     };

  //     // Центрирование содержимого ячеек
  //     worksheet.eachRow((row) => {
  //       row.eachCell((cell) => {
  //         cell.alignment = { horizontal: "center", vertical: "middle" };
  //       });
  //     });

  //     // Автоматическое определение ширины колонок
  //     worksheet.columns.forEach((column) => {
  //       let maxWidth = 0;
  //       column.eachCell({ includeEmpty: true }, (cell) => {
  //         maxWidth = Math.max(
  //           maxWidth,
  //           cell.value ? cell.value.toString().length : 0
  //         );
  //       });
  //       column.width = maxWidth + 2; // Добавляем немного отступа
  //     });

  //     // Генерируем буфер и возвращаем его как массив байтов
  //     const buffer = await workbook.xlsx.writeBuffer();
  //     console.log("Excel файл успешно сгенерирован.");
  //     return buffer; // Возвращаем массив байтов
  //   } catch (error) {
  //     console.error("Ошибка при экспорте расписаний в Excel:", error);
  //     throw error; // Пробрасываем ошибку
  //   }
  // }
}

module.exports = new ScheduleService();
