const Router = require("express");
const router = new Router();
const scheduleController = require("../controllers/scheduleController");
const { setLineHeight } = require("pdf-lib");

// 1. Создание нового пользователя
router.post("/", scheduleController.create);

// // 2. получение всех пользователей
// // router.get("/", scheduleController.g);

// // 3. Получение пользователя по id
// router.get("/:id", scheduleController.getUserById);

// // 4. Обновление пользователя
router.put("/:id", scheduleController.update); // Обновление по ID

// // 5. Удаление пользователя
// router.delete("/:id", scheduleController.deleteUser); // Удаление по ID

router.get("/getSchedulesByCities", scheduleController.getSchedulesByCities);

router.get("/downloadSchedule", scheduleController.exportSchedulesToExcel);

module.exports = router;
