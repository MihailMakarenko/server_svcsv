const Router = require("express");
const router = new Router();
const routeController = require("../controllers/routeController");

// 1. Создание нового маршрута
router.get("/getUniqueCities", routeController.getUniqueCities);

router.get(
  "/getRouteIdByCities/:StartCity/:FinishCity",
  routeController.getRouteIdByCities
);

router.get("/withPagination", routeController.getWithPagination);
router.post("/", routeController.createRoute);

// 2. получение всех маршрутов
router.get("/", routeController.getAllRoutes);

// 3. Получение маршрута по id
router.get("/:id", routeController.getRouteById);

// 4. Обновление маршрута
router.put("/:id", routeController.updateRoute); // Обновление по ID

// 5. Удаление маршрута
router.delete("/:id", routeController.deleteRoute); // Удаление по ID

module.exports = router;
