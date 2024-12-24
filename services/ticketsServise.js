// services/ticketsService.js
const fs = require("fs");
const PDFDocument = require("pdfkit");
const Tickets = require("../models/tickets");
const User = require("../models/user");
const RegisterBook = require("../models/registerBook");
const UserService = require("./userService");
const RegisterBookService = require("./registerBookService");
const TripsService = require("./tripsService");
const RouteService = require("./routeService");
const BusService = require("./busesService");

const { where } = require("sequelize");

class TicketsService {
  async getAllTickets() {
    return await Tickets.findAll();
  }

  async getTicketById(TicketId) {
    console.log(TicketId);
    return await Tickets.findByPk(TicketId);
  }

  async createTicket(ticketData) {
    const userExists = await User.findByPk(ticketData.UserId);
    if (!userExists) {
      throw new Error("Пользователь не найден");
    }

    if (ticketData.RegisterId) {
      const registerBookExists = await RegisterBook.findByPk(
        ticketData.RegisterId
      );
      if (!registerBookExists) {
        throw new Error("Запись в реестре не найдена");
      }
    }

    return await Tickets.create(ticketData);
  }

  async updateTicket(TicketId, ticketData) {
    const ticket = await this.getTicketById(TicketId);
    if (!ticket) {
      throw new Error("Билет не найден");
    }

    Object.assign(ticket, ticketData);
    return await ticket.save();
  }

  async deleteTicket(TicketId) {
    const ticket = await this.getTicketById(TicketId);
    if (!ticket) {
      throw new Error("Билет не найден");
    }

    await ticket.destroy();
  }

  async getFullInformTicket(TicketId) {
    try {
      const ticket = await this.getTicketById(TicketId);

      // Проверяем, существует ли билет
      if (!ticket) {
        throw new Error(`Билет с ID ${TicketId} не найден.`);
      }

      const user = await UserService.getUserById(ticket.UserId);
      const registerBook = await RegisterBookService.getRegisterBookById(
        ticket.RegisterId
      );

      // Проверяем, существует ли книга регистрации
      if (!registerBook) {
        throw new Error(
          `Книга регистрации не найдена для билета с ID ${TicketId}.`
        );
      }

      const trip = await TripsService.getTripById(registerBook.TripId);

      // Проверяем, существует ли поездка
      if (!trip) {
        throw new Error(
          `Поездка не найдена для Книги регистрации с ID ${registerBook.RegisterId}.`
        );
      }

      const route = await RouteService.getRouteById(trip.RouteId);

      // Проверяем, существует ли маршрут
      if (!route) {
        throw new Error(`Маршрут не найден для Поездки с ID ${trip.TripId}.`);
      }

      const bus = await BusService.getBusById(registerBook.BusId);

      // Проверяем, существует ли автобус
      if (!bus) {
        throw new Error(
          `Автобус не найден для Книги регистрации с ID ${registerBook.RegisterId}.`
        );
      }

      return {
        StartCity: route.StartCity,
        FinishCity: route.FinishCity,
        StartTime: trip.StartTime,
        FinishTime: trip.FinishTime,
        DateTime: registerBook.DateTime,
        NameCompany: bus.NameCompany,
        BusNumber: bus.BusNumber,
        Seats: ticket.Seats,
        Status: ticket.Status,
      };
    } catch (error) {
      console.error("Ошибка при получении полной информации о билете:", error);
      throw error; // Пробрасываем ошибку дальше
    }
  }

  async getIdTicketsByUserId(UserId) {
    try {
      // Предположим, что у вас есть модель Ticket, которая соответствует таблице билетов
      const tickets = await Tickets.findAll({
        where: {
          UserId: UserId, // Фильтруем по ID пользователя
        },
      });

      return tickets; // Возвращаем все найденные билеты
    } catch (error) {
      console.error("Ошибка при получении билетов пользователя:", error);
      throw error; // Пробрасываем ошибку дальше
    }
  }

  async getTicketsByUserId(UserId) {
    try {
      // Получаем все билеты для данного пользователя
      const tickets = await this.getIdTicketsByUserId(UserId); // Предположим, что у вас есть этот метод

      // Проверяем, есть ли у пользователя билеты
      if (!tickets || tickets.length === 0) {
        throw new Error(`Билеты для пользователя с ID ${UserId} не найдены.`);
      }

      const ticketDetails = await Promise.all(
        tickets.map(async (ticket) => {
          const registerBook = await RegisterBookService.getRegisterBookById(
            ticket.RegisterId
          );

          // Проверяем, существует ли книга регистрации
          if (!registerBook) {
            throw new Error(
              `Книга регистрации не найдена для билета с ID ${ticket.TicketId}.`
            );
          }

          const trip = await TripsService.getTripById(registerBook.TripId);

          // Проверяем, существует ли поездка
          if (!trip) {
            throw new Error(
              `Поездка не найдена для Книги регистрации с ID ${registerBook.RegisterId}.`
            );
          }

          const route = await RouteService.getRouteById(trip.RouteId);

          // Проверяем, существует ли маршрут
          if (!route) {
            throw new Error(
              `Маршрут не найден для Поездки с ID ${trip.TripId}.`
            );
          }

          console.log("Мы туттт");
          console.log(registerBook.BusId);
          const bus = await BusService.getBusById(registerBook.BusId);
          console.log("B kfkf");

          // Проверяем, существует ли автобус
          if (!bus) {
            throw new Error(
              `Автобус не найден для Книги регистрации с ID ${registerBook.RegisterId}.`
            );
          }

          return {
            TicketId: ticket.TicketId,
            StartCity: route.StartCity,
            FinishCity: route.FinishCity,
            StartTime: trip.StartTime,
            FinishTime: trip.FinishTime,
            DateTime: registerBook.DateTime,
            NameCompany: bus.NameCompany,
            BusNumber: bus.BusNumber,
            Seats: ticket.Seats,
            Status: ticket.Status,
          };
        })
      );

      return ticketDetails;
    } catch (error) {
      console.error("Ошибка при получении билетов пользователя:", error);
      throw error; // Пробрасываем ошибку дальше
    }
  }

  async getWeather(city) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${city}&format=json`
    );
    const data = await response.json();

    if (data.length > 0) {
      const lat = data[0].lat;
      const lon = data[0].lon;

      const accessKey = "05f70fe6-5482-4782-8d9d-717c1aa58982";
      const headers = {
        "X-Yandex-Weather-Key": accessKey,
      };

      const weatherResponse = await fetch(
        `https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}`,
        { headers }
      );
      if (!weatherResponse.ok) {
        throw new Error(
          `Ошибка: ${weatherResponse.status} ${weatherResponse.statusText}`
        );
      }
      const weatherData = await weatherResponse.json();
      console.log(weatherData.fact);

      return {
        temperature: weatherData.fact.temp,
        isRain: weatherData.fact.is_thunder, // Вы можете использовать is_thunder или добавить другое поле, если это необходимо
      };
    } else {
      console.error(`Город ${city} не найден`);
      return null;
    }
  }

  async createPdf(ticketId) {
    console.log("ent");
    console.log(ticketId);
    try {
      // Получаем информацию о билете
      const userTicket = await this.getFullInformTicket(ticketId);

      // Проверяем, существует ли билет
      if (!userTicket) {
        throw new Error(`Билет с ID ${ticketId} не найден.`);
      }

      // Создаем новый Promise для генерации PDF
      return new Promise(async (resolve, reject) => {
        let weatherInfo = {
          temperature: "Нет информации",
          isRain: "Нет информации",
        };

        console.log(userTicket);
        console.log(new Date().toISOString().split("T")[0]);
        // Проверяем, совпадает ли дата отправления с текущей датой
        if (userTicket.DateTime === new Date().toISOString().split("T")[0]) {
          weatherInfo = await this.getWeather(userTicket.FinishCity); // Получаем информацию о погоде
          console.log("273");
          console.log(weatherInfo);
        }

        const doc = new PDFDocument({ margin: 50 });
        let buffers = [];

        // Сбор данных в массив
        doc.on("data", (chunk) => buffers.push(chunk));
        doc.on("end", () => {
          const pdfBytes = Buffer.concat(buffers);
          console.log("Created PDF bytes:", pdfBytes.length);
          resolve(pdfBytes); // Возвращаем PDF байты
        });

        // Установка шрифта с поддержкой кириллицы
        doc.font("./fonts/Roboto/Roboto-Black.ttf");

        // Заголовок
        doc
          .fillColor("#007BFF")
          .fontSize(32)
          .text(`Билет`, { align: "center", underline: true });
        doc.moveDown(1);

        // ID билета
        doc
          .fillColor("#333")
          .fontSize(18)
          .text(`ID билета: ${ticketId}`, { align: "center" });
        doc.moveDown(1);

        // Горизонтальная линия
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke("#007BFF");
        doc.moveDown(1.5);

        // Заголовок информации о билете
        doc
          .fillColor("#007BFF")
          .fontSize(24)
          .text("Информация о билете", { align: "center" });
        doc.moveDown(0.5);

        // Другая горизонтальная линия
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke("#333");
        doc.moveDown(1.5);

        // Добавление деталей о билете
        const details = [
          { label: "Статус:", value: userTicket.Status || "Не указано" },
          { label: "Промокод:", value: userTicket.Promocode || "Не указан" },
          {
            label: "Город отправления:",
            value: userTicket.StartCity || "Не указан",
          },
          {
            label: "Город назначения:",
            value: userTicket.FinishCity || "Не указан",
          },
          {
            label: "Время отправления:",
            value: userTicket.StartTime || "Не указано",
          },
          {
            label: "Время прибытия:",
            value: userTicket.FinishTime || "Не указано",
          },
          {
            label: "Дата отправления:",
            value: userTicket.DateTime || "Не указано",
          },
          {
            label: "Перевозчик:",
            value: userTicket.NameCompany || "Не указана",
          },
          {
            label: "Номер автобуса:",
            value: userTicket.BusNumber || "Не указан",
          },
          {
            label: "Места:",
            value: userTicket.Seats.join(", ") || "Не указаны",
          },
          {
            label: "Температура в городе прибытия:",
            value: weatherInfo.temperature + " Градусов по цельсию",
          },
          { label: "Дождь:", value: weatherInfo.isRain ? "Да" : "Нет" }, // Добавлено поле о дожде
        ];

        details.forEach(({ label, value }) => {
          doc
            .fontSize(14)
            .fillColor("#333")
            .text(`${label}`, { continued: true })
            .fillColor("#555")
            .text(` ${value}`, { indent: 20 });
          doc.moveDown(0.5); // Отступ между пунктами
        });

        // Горизонтальная линия внизу
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke("#333");
        doc.moveDown(1.5);

        // Нижний колонтитул
        doc
          .fillColor("#555")
          .fontSize(12)
          .text("Спасибо за выбор нашего сервиса!", { align: "center" });

        // Добавление QR-кода (по желанию)
        if (userTicket.QRCode) {
          doc
            .addPage()
            .fontSize(20)
            .text("Ваш QR-код для доступа:", { align: "center" });
          doc.image(userTicket.QRCode, {
            fit: [200, 200],
            align: "center",
            valign: "center",
          });
        }

        // Завершение документа
        doc.end();
      });
    } catch (error) {
      console.error("Ошибка при создании PDF:", error);
      throw error; // Пробрасываем ошибку
    }
  }

  async getOccupiedSeats(registerBookId) {
    console.log("Brstrst");
    const tickets = await Tickets.findAll({
      where: {
        RegisterId: registerBookId,
        Status: "Заказан",
      },
    });

    // Собираем все занятые места из билетов
    const occupiedSeats = tickets.reduce((acc, ticket) => {
      return acc.concat(ticket.Seats); // Объединяем массивы мест
    }, []);

    // Сортируем места в порядке возрастания
    const sortedOccupiedSeats = occupiedSeats.sort((a, b) => a - b);

    return sortedOccupiedSeats; // Возвращаем массив занятых мест
  }

  async getTicketsByRegisterBook(registerBook) {
    const tickets = await Tickets.findAll({
      where: {
        RegisterId: registerBookId,
        NotificationSent: false,
      },
    });
    return tickets;
  }
}

module.exports = new TicketsService();
