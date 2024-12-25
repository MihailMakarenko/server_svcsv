// controllers/routeController.js
const RouteService = require("../services/routeService"); // Импорт сервиса RouteService

class RouteController {
  // Получить все маршруты
  async getAllRoutes(req, res) {
    try {
      const routes = await RouteService.getAllRoutes();
      res.status(200).json(routes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Получить маршрут по RouteId
  async getRouteById(req, res) {
    const { RouteId } = req.params;
    try {
      const route = await RouteService.getRouteById(RouteId);
      if (!route) {
        return res.status(404).json({ message: "Маршрут не найден" });
      }
      res.status(200).json(route);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Создать новый маршрут
  async createRoute(req, res) {
    console.log("Мы дошли до сюда");
    console.log(req.body);
    const { StartCity, FinishCity, Distance } = req.body;
    try {
      const route = await RouteService.createRoute({
        StartCity,
        FinishCity,
        Distance,
      });
      res.status(201).json(route);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getWithPagination(req, res) {
    console.log("или тут");
    try {
      const { Page = 1, Limit = 8 } = req.query;
      const routes = await RouteService.getRoutesWithPagination(Page, Limit);
      res.status(200).json(routes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Обновить маршрут
  async updateRoute(req, res) {
    const { RouteId } = req.params;
    const { StartCity, FinishCity, Distance } = req.body;
    try {
      const route = await RouteService.updateRoute(RouteId, {
        StartCity,
        FinishCity,
        Distance,
      });
      res.status(200).json(route);
    } catch (error) {
      res
        .status(error.message === "Маршрут не найден" ? 404 : 400)
        .json({ message: error.message });
    }
  }

  // Удалить маршрут
  async deleteRoute(req, res) {
    const { id } = req.params;
    try {
      await RouteService.deleteRoute(id);
      res.status(204).send(); // Успешное удаление, но без содержимого
    } catch (error) {
      res
        .status(error.message === "Маршрут не найден" ? 404 : 500)
        .json({ message: error.message });
    }
  }

  async getUniqueCities(req, res) {
    try {
      console.log("AAAAAAAAA");
      const cities = await RouteService.getUniqueCities();
      res.status(200).json(cities);
    } catch (error) {
      console.error("Ошибка в контроллере:", error);
      res
        .status(500)
        .json({ message: "Ошибка при получении уникальных городов" });
    }
  }

  async getRouteIdByCities(req, res) {
    console.log("ХХАХА");
    console.log("Мы тут");
    const { StartCity, FinishCity } = req.params;
    try {
      const response = await RouteService.getRouteId(StartCity, FinishCity);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new RouteController();
