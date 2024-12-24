const { sequelize } = require("../db"); // Проверьте путь
const Feedback = require("../models/feedback"); // Проверьте путь
const Ticket = require("../models/tickets"); // Проверьте путь

class SeedFeedback {
  async seed() {
    const feedbacks = [
      { Rating: 5, TicketId: 1 },
      { Rating: 4, TicketId: 2 },
      { Rating: 3, TicketId: 3 },
      { Rating: 5, TicketId: 4 },
      { Rating: 2, TicketId: 5 },
      { Rating: 4, TicketId: 6 },
      { Rating: 3, TicketId: 7 },
      { Rating: 5, TicketId: 8 },
      { Rating: 1, TicketId: 9 },
      { Rating: 4, TicketId: 10 },
      { Rating: 2, TicketId: 11 },
      { Rating: 5, TicketId: 12 },
      { Rating: 3, TicketId: 13 },
      { Rating: 4, TicketId: 14 },
      { Rating: 2, TicketId: 15 },
      { Rating: 5, TicketId: 16 },
      { Rating: 3, TicketId: 17 },
      { Rating: 4, TicketId: 18 },
      { Rating: 1, TicketId: 19 },
      { Rating: 5, TicketId: 20 },
    ];

    try {
      const existingFeedbacks = await Feedback.findAll();

      if (existingFeedbacks.length === 0) {
        await Feedback.bulkCreate(feedbacks);
        console.log("База данных отзывов успешно заполнена.");
      } else {
        console.log(
          "База данных отзывов уже содержит записи. Новые записи не будут добавлены."
        );
      }
    } catch (error) {
      console.error("Ошибка при заполнении базы данных отзывов:", error);
    }
  }
}

module.exports = SeedFeedback;
