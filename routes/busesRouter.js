const Router = require("express");
const router = new Router();
const busesController = require("../controllers/busesController");

// 1. Создание нового автобуса
router.post("/", busesController.createBus);
router.get("/getBusesOnDate", busesController.getFullInfoWithOccupiedSeats);
router.get("/withPagination", busesController.getWithPagination);

// router.get("/getAllBusNumber", busesController.getAllBusNumber);
// 2. Получение всех автобусов
router.get("/", busesController.getAllBuses);

// 3. Получение автобуса по ID
router.get("/:id", busesController.getBusById);

// 4. Обновление автобуса
router.put("/:id", busesController.updateBus); // Обновление по ID

// 5. Удаление автобуса
router.delete("/:id", busesController.deleteBus); // Удаление по ID

module.exports = router;
