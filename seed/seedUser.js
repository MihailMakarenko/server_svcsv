// Файл: seedUser.js
const { sequelize } = require("../db"); // Убедитесь, что путь правильный
const User = require("../models/user"); // Импорт модели User
const bcrypt = require("bcrypt"); // Импортируем bcrypt

class SeedUser {
  async seed() {
    const saltRounds = 10;

    // Массив пользователей с необработанными паролями
    const users = [
      {
        FirstName: "Иван",
        LastName: "Иванов",
        Email: "ivan@example.com",
        PhoneNumber: "+79000000001",
        isGetNotifications: true,
        Password: "password123", // Укажите обычный пароль
        Role: "user",
      },
      {
        FirstName: "Мария",
        LastName: "Петрова",
        Email: "maria@example.com",
        PhoneNumber: "+79000000002",
        isGetNotifications: false,
        Password: "password456", // Укажите обычный пароль
        Role: "admin",
      },
      {
        FirstName: "Сергей",
        LastName: "Сергеев",
        Email: "sergey@example.com",
        PhoneNumber: "+79000000003",
        isGetNotifications: true,
        Password: "password789", // Укажите обычный пароль
        Role: "user",
      },
    ];

    try {
      const existingUsers = await User.findAll();

      if (existingUsers.length === 0) {
        // Хешируем пароли перед созданием пользователей
        const usersWithHashedPasswords = await Promise.all(
          users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.Password, saltRounds);
            return { ...user, Password: hashedPassword };
          })
        );

        await User.bulkCreate(usersWithHashedPasswords);
        console.log("База данных пользователей успешно заполнена.");
      } else {
        console.log(
          "База данных пользователей уже содержит записи. Новые записи не будут добавлены."
        );
      }
    } catch (error) {
      console.error("Ошибка при заполнении базы данных пользователей:", error);
    }
  }
}

module.exports = SeedUser;
