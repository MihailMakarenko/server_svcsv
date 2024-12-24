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
        Password: "password123",
        Role: "user",
      },
      {
        FirstName: "Мария",
        LastName: "Петрова",
        Email: "maria@example.com",
        PhoneNumber: "+79000000002",
        isGetNotifications: false,
        Password: "password456",
        Role: "admin",
      },
      {
        FirstName: "Сергей",
        LastName: "Сергеев",
        Email: "sergey@example.com",
        PhoneNumber: "+79000000003",
        isGetNotifications: true,
        Password: "password789",
        Role: "user",
      },
      {
        FirstName: "Анна",
        LastName: "Сидорова",
        Email: "anna@example.com",
        PhoneNumber: "+79000000004",
        isGetNotifications: true,
        Password: "password101",
        Role: "user",
      },
      {
        FirstName: "Дмитрий",
        LastName: "Кузнецов",
        Email: "dmitry@example.com",
        PhoneNumber: "+79000000005",
        isGetNotifications: false,
        Password: "password202",
        Role: "admin",
      },
      {
        FirstName: "Ольга",
        LastName: "Федорова",
        Email: "olga@example.com",
        PhoneNumber: "+79000000006",
        isGetNotifications: true,
        Password: "password303",
        Role: "user",
      },
      {
        FirstName: "Алексей",
        LastName: "Лебедев",
        Email: "aleksey@example.com",
        PhoneNumber: "+79000000007",
        isGetNotifications: false,
        Password: "password404",
        Role: "user",
      },
      {
        FirstName: "Марина",
        LastName: "Денисова",
        Email: "marina@example.com",
        PhoneNumber: "+79000000008",
        isGetNotifications: true,
        Password: "password505",
        Role: "user",
      },
      {
        FirstName: "Екатерина",
        LastName: "Тихонова",
        Email: "ekaterina@example.com",
        PhoneNumber: "+79000000009",
        isGetNotifications: false,
        Password: "password606",
        Role: "admin",
      },
      {
        FirstName: "Игорь",
        LastName: "Павлов",
        Email: "igor@example.com",
        PhoneNumber: "+79000000010",
        isGetNotifications: true,
        Password: "password707",
        Role: "user",
      },
      {
        FirstName: "Виктория",
        LastName: "Сергеевна",
        Email: "victoria@example.com",
        PhoneNumber: "+79000000011",
        isGetNotifications: false,
        Password: "password808",
        Role: "user",
      },
      {
        FirstName: "Андрей",
        LastName: "Морозов",
        Email: "andrey@example.com",
        PhoneNumber: "+79000000012",
        isGetNotifications: true,
        Password: "password909",
        Role: "user",
      },
      {
        FirstName: "Наталья",
        LastName: "Коваленко",
        Email: "natalia@example.com",
        PhoneNumber: "+79000000013",
        isGetNotifications: false,
        Password: "password010",
        Role: "admin",
      },
      {
        FirstName: "Петр",
        LastName: "Савинов",
        Email: "petr@example.com",
        PhoneNumber: "+79000000014",
        isGetNotifications: true,
        Password: "password111",
        Role: "user",
      },
      {
        FirstName: "Татьяна",
        LastName: "Иванова",
        Email: "tatiana@example.com",
        PhoneNumber: "+79000000015",
        isGetNotifications: false,
        Password: "password212",
        Role: "user",
      },
      {
        FirstName: "Станислав",
        LastName: "Романов",
        Email: "stanislav@example.com",
        PhoneNumber: "+79000000016",
        isGetNotifications: true,
        Password: "password313",
        Role: "admin",
      },
      {
        FirstName: "Ксения",
        LastName: "Громова",
        Email: "kseniya@example.com",
        PhoneNumber: "+79000000017",
        isGetNotifications: false,
        Password: "password414",
        Role: "user",
      },
      {
        FirstName: "Евгений",
        LastName: "Петров",
        Email: "evgeniy@example.com",
        PhoneNumber: "+79000000018",
        isGetNotifications: true,
        Password: "password515",
        Role: "user",
      },
      {
        FirstName: "Елена",
        LastName: "Ларина",
        Email: "elena@example.com",
        PhoneNumber: "+79000000019",
        isGetNotifications: false,
        Password: "password616",
        Role: "admin",
      },
      {
        FirstName: "Илья",
        LastName: "Фролов",
        Email: "ilya@example.com",
        PhoneNumber: "+79000000020",
        isGetNotifications: true,
        Password: "password717",
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
