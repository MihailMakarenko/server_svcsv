// controllers/userController.js
const userService = require("../services/userService");
const UserService = require("../services/userService"); // Импорт сервиса UserService
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserController {
  // Получить список пользователей
  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Получить пользователя по UserId
  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await UserService.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Добавить нового пользователя
  async createUser(req, res) {
    const {
      FirstName,
      LastName,
      Email,
      PhoneNumber,
      isGetNotifications,
      Password,
      Role,
      isGetNewsletter,
    } = req.body;

    try {
      const user = await UserService.createUser({
        FirstName,
        LastName,
        Email,
        PhoneNumber,
        Password,
        isGetNotifications,
        Role: "user",
        isGetNewsletter,
      });
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Ошибка регистрации пользователя" });
    }
  }

  // Обновить пользователя
  async updateUser(req, res) {
    console.log("Запрос на обновление пользователя");
    const { id } = req.params;
    const {
      FirstName,
      LastName,
      Email,
      PhoneNumber,
      isGetNotifications,
      isGetNewsletter,
    } = req.body;
    console.log(isGetNotifications);
    try {
      // Получаем текущие данные пользователя
      const currentUser = await UserService.getUserById(id);
      if (!currentUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Обновляем только переданные поля
      const updatedData = {
        FirstName: FirstName !== undefined ? FirstName : currentUser.FirstName,
        LastName: LastName !== undefined ? LastName : currentUser.LastName,
        Email: Email !== undefined ? Email : currentUser.Email,
        PhoneNumber:
          PhoneNumber !== undefined ? PhoneNumber : currentUser.PhoneNumber,
        isGetNotifications:
          isGetNotifications !== undefined
            ? isGetNotifications
            : currentUser.isGetNotifications,
        isGetNewsletter:
          isGetNewsletter !== undefined
            ? isGetNewsletter
            : currentUser.isGetNewsletter,
      };

      // Если пароль изменен, хэшируем его

      // Обновляем пользователя в базе данных
      const updatedUser = await UserService.updateUser(id, updatedData);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Ошибка при обновлении пользователя:", error);
      res.status(400).json({ message: error.message });
    }
  }

  // Удалить пользователя
  async deleteUser(req, res) {
    const { UserId } = req.params;
    try {
      await UserService.deleteUser(UserId);
      res.status(204).send(); // Успешное удаление, но без содержимого
    } catch (error) {
      res
        .status(error.message === "User not found" ? 404 : 500)
        .json({ message: error.message });
    }
  }

  // Логин
  async login(req, res) {
    const Email = req.query.Email; // Используем req.query
    const Password = req.query.Password;
    console.log(Email, Password);

    try {
      const candidate = await UserService.findUserByEmail(Email);
      if (candidate) {
        const passwordResult = await UserService.comparePasswords(
          Password,
          candidate.Password
        );
        if (passwordResult) {
          const token = jwt.sign(
            {
              Email: candidate.Email,
              userId: candidate.UserId,
              role: candidate.Role,
            },
            process.env.SECRET_KEY,
            { expiresIn: "10h" }
          );
          return res.status(200).json({
            token: `Bearer ${token}`,
            name: candidate.FirstName,
            idUser: candidate.UserId,
          });
        } else {
          return res.status(401).json({ message: "Пароли не совпадают" });
        }
      } else {
        return res
          .status(404)
          .json({ message: "Пользователь с таким email не найден" });
      }
    } catch (err) {
      console.error("Ошибка при входе:", err);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }

  async notificaaton(req, res) {
    try {
      const response = await userService.getEmailUserWhoGetNewsletter();
      console.log("aaa");
      console.log(response);
      return res.json(response); // Отправка ответа клиенту
    } catch (error) {
      console.error("Ошибка при получении пользователей:", error);
      return res.status(500).json({ error: "Ошибка сервера" });
    }
  }
}

module.exports = new UserController();
