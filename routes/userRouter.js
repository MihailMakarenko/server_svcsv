const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const roleCheck = require("../middleware/roleCheck");

router.get("/login", userController.login);
// 1. Создание нового пользователя
router.post("/", userController.createUser);

// 2. получение всех пользователей
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  roleCheck("admin"),
  userController.getAllUsers
);

// 3. Получение пользователя по id
router.get("/:id", userController.getUserById);

// 4. Обновление пользователя
router.put("/:id", userController.updateUser); // Обновление по ID

// 5. Удаление пользователя
router.delete("/:id", userController.deleteUser); // Удаление по ID

module.exports = router;
