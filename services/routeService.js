// services/routeService.js
const { Op } = require("sequelize");
const Route = require("../models/route"); // Импорт модели Route

class RouteService {
  async getAllRoutes() {
    return await Route.findAll();
  }

  async getRouteById(RouteId) {
    return await Route.findByPk(RouteId);
  }

  async createRoute(routeData) {
    console.log(routeData);
    return await Route.create(routeData);
  }

  async updateRoute(RouteId, routeData) {
    const route = await this.getRouteById(RouteId);
    if (!route) {
      throw new Error("Маршрут не найден");
    }
    Object.assign(route, routeData);
    return await route.save();
  }

  async deleteRoute(RouteId) {
    const route = await this.getRouteById(RouteId);
    if (!route) {
      throw new Error("Маршрут не найден");
    }

    try {
      await route.destroy();
    } catch (error) {
      if (error.name === "SequelizeForeignKeyConstraintError") {
        throw new Error(
          "Маршрут не может быть удален, так как он используется"
        );
      }
      throw error; // Пробрасываем другие ошибки
    }
  }
  async getRouteId(startCity, finishCity) {
    try {
      const route = await Route.findOne({
        where: {
          StartCity: {
            [Op.iLike]: startCity, // Используем iLike для нечувствительности к регистру
          },
          FinishCity: {
            [Op.iLike]: finishCity, // Используем iLike для нечувствительности к регистру
          },
        },
      });

      if (route) {
        return route.RouteId; // Возвращаем RouteId, если маршрут найден
      } else {
        console.log("Маршрут не найден");
        return null; // Возвращаем null, если маршрут не найден
      }
    } catch (error) {
      console.error("Ошибка при поиске маршрута:", error);
      throw error; // Пробрасываем ошибку для обработки выше
    }
  }

  async getUniqueCities() {
    try {
      // Получение всех маршрутов
      const routes = await Route.findAll({
        attributes: ["StartCity", "FinishCity"],
        raw: true, // Возвращает данные в виде простого объекта
      });

      // Создаем множества для уникальных городов
      const startCities = new Set();
      const finishCities = new Set();

      // Заполняем множества
      routes.forEach((route) => {
        startCities.add(route.StartCity);
        finishCities.add(route.FinishCity);
      });

      // Преобразуем множества в массивы и возвращаем
      return {
        uniqueStartCities: Array.from(startCities),
        uniqueFinishCities: Array.from(finishCities),
      };
    } catch (error) {
      console.error("Ошибка при получении городов:", error);
      throw error; // Обработка ошибки
    }
  }

  async getRoutesWithPagination(page, limit) {
    const offset = (page - 1) * limit;
    try {
      const routes = await Route.findAll({
        limit: limit,
        offset: offset,
      });

      const totalCount = await Route.count();

      return {
        routes,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      };
    } catch (error) {
      console.error("Ошибка при получении маршрутов:", error);
      throw error; // Обработка или повторное выбрасывание ошибки
    }
  }
}

module.exports = new RouteService();
