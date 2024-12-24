// controllers/scheduleController.js
const { Op } = require("sequelize"); // Добавьте этот импорт в начало вашего файла
const ScheduleService = require("../services/scheduleService"); // Импорт сервиса ScheduleService

class ScheduleController {
  // 1. Создание новой
  async create(req, res) {
    console.log("Дошли до сюда");
    const {
      Monday,
      Tuesday,
      Wednesday,
      Thursday,
      Friday,
      Saturday,
      Sunday,
      TripId,
    } = req.body;

    try {
      const schedule = await ScheduleService.create({
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday,
        TripId,
      });
      return res.status(201).json(schedule); // 201 Создано
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при создании расписания", error });
    }
  }

  // 2. Получение по ID
  async getById(req, res) {
    const { id } = req.params;

    try {
      const schedule = await ScheduleService.getById(id);

      if (!schedule) {
        return res.status(404).json({ message: "Расписание не найдено" });
      }

      return res.json(schedule);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Ошибка при получении расписания", error });
    }
  }

  // 3. Обновление записи
  async update(req, res) {
    const { id } = req.params;
    const { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } =
      req.body;

    try {
      const updatedSchedule = await ScheduleService.update(id, {
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday,
      });
      return res.json(updatedSchedule);
    } catch (error) {
      return res
        .status(error.message === "Расписание не найдено" ? 404 : 500)
        .json({ message: error.message });
    }
  }

  // 4. Удаление записи
  async delete(req, res) {
    const { id } = req.params;

    try {
      await ScheduleService.delete(id);
      return res.status(204).send(); // 204 Нет содержимого
    } catch (error) {
      return res
        .status(error.message === "Расписание не найдено" ? 404 : 500)
        .json({ message: error.message });
    }
  }

  async getSchedulesByCities(req, res) {
    // const { startCity, finishCity } = req.params;

    const startCity = "Москва";
    const finishCity = "Санкт-Петербург";

    try {
      const response = await ScheduleService.getSchedulesByCities(
        startCity,
        finishCity
      );
      return res.status(200).send(response); // 204 Нет содержимого
    } catch (error) {
      return res
        .status(error.message === "Расписание не найдено" ? 404 : 500)
        .json({ message: error.message });
    }
  }

  async exportSchedulesToExcel(req, res) {
    const { startCity, finishCity } = req.query; // Получаем параметры запроса

    try {
      const excelBuffer = await ScheduleService.exportSchedulesToExcel(
        startCity,
        finishCity
      );

      // Устанавливаем заголовки для ответа
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=schedules.xlsx"
      );

      // Отправляем буфер в ответ
      res.send(excelBuffer);
    } catch (error) {
      console.error("Ошибка при загрузке расписания:", error);
      return res
        .status(500)
        .json({ message: "Ошибка при загрузке расписания" });
    }
  }
}

module.exports = new ScheduleController();
