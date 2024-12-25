// services/mailService.js
const nodemailer = require("nodemailer");
const RegisterBookService = require("./registerBookService");
const User = require("../models/user");
const Tickets = require("../models/tickets"); // Убедитесь, что вы импортируете модель Tickets
const Trip = require("../models/trips");
const Route = require("../models/route");
const UserService = require("../services/userService");

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: "misha.makarenko2004@mail.ru", // Ваш адрес Mail.ru
    pass: "KBMG8YHwQAXueFkwhvUn", // Сгенерированный пароль для приложения
  },
});

// Функция для отправки уведомлений
const sendEmailNotification = async (email, trip, route, ticket) => {
  const mailOptions = {
    from: "misha.makarenko2004@mail.ru", // Тот же адрес, что и в auth
    to: email,
    subject: "Ваш автобус скоро отправляется",
    // text: `${ticket.TicketId}`,
    text: `Ваш автобус по маршруту ${route.StartCity} - ${
      route.FinishCity
    }, отправляется сегодня в ${
      trip.StartTime
    }, ваши места: ${ticket.Seats.join(", ")}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Сообщение успешно отправлено");
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error.message);
  }
};

const startSendingEmails = async (date) => {
  console.log("AAAA");
  try {
    const formattedDate = date.toISOString().split("T")[0];
    console.log(formattedDate);

    // Получаем записи по заданной дате
    const registerBooks = await RegisterBookService.getRigisterBookByDate(
      formattedDate
    );

    console.log(registerBooks);

    // Проходим по всем записям и их билетам
    for (const registerBook of registerBooks) {
      const trip = await Trip.findByPk(registerBook.TripId);
      const route = await Route.findByPk(trip.RouteId);
      console.log(route);
      for (const ticket of registerBook.tickets) {
        const user = await User.findByPk(ticket.UserId);

        // Шаг 3: Отправляем сообщение пользователю
        await sendEmailNotification(user.Email, trip, route, ticket);

        // Шаг 4: Обновляем запись о билете, что уведомление отправлено
        await Tickets.update(
          { NotificationSent: true },
          { where: { TicketId: ticket.TicketId } }
        );
      }
    }
  } catch (error) {
    console.error("Ошибка при уведомлении пользователей:", error);
  }
};

const scheduleEmailSending = () => {
  console.log("VVV");
  setInterval(async () => {
    await startSendingEmails(new Date());
  }, 10000); // Интервал в миллисекундах
};

const sendNewsletter = async (header, mainText) => {
  try {
    // Получаем список email-адресов пользователей, подписанных на рассылку
    const emails = await UserService.getEmailUserWhoGetNewsletter();

    // Отправляем уведомления всем пользователям
    for (const email of emails) {
      const mailOptions = {
        from: "misha.makarenko2004@mail.ru", // От кого
        to: email, // Кому
        subject: header, // Тема письма
        text: mainText, // Текст письма
      };

      try {
        // Отправка почты
        await transporter.sendMail(mailOptions);
        console.log(`Уведомление отправлено на ${email}`);
      } catch (sendError) {
        console.error(
          `Ошибка при отправке уведомления на ${email}:`,
          sendError.message
        );
        // Здесь можно добавить дополнительную логику, если нужно
      }
    }
  } catch (error) {
    console.error("Ошибка при получении email-адресов пользователей:", error);
  }
};

module.exports = { scheduleEmailSending, sendNewsletter };
