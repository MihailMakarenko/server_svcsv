// controllers/feedbackController.js
const FeedbackService = require("../services/feedbackService"); // Импорт сервиса FeedbackService

class FeedbackController {
  // Получить отзывы по TicketId
  async getFeedbackByTicketId(req, res) {
    const { TicketId } = req.params;
    try {
      const feedbacks = await FeedbackService.getFeedbackByTicketId(TicketId);
      res.status(200).json(feedbacks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Добавить новый отзыв
  async addFeedback(req, res) {
    const { Rating, TicketId } = req.body;
    try {
      const feedback = await FeedbackService.addFeedback({ Rating, TicketId });
      res.status(201).json(feedback);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Обновить отзыв
  async updateFeedback(req, res) {
    const { FeedbackId } = req.params;
    const { Rating } = req.body;
    try {
      const feedback = await FeedbackService.updateFeedback(FeedbackId, {
        Rating,
      });
      res.status(200).json(feedback);
    } catch (error) {
      res
        .status(error.message === "Отзыв не найден" ? 404 : 400)
        .json({ message: error.message });
    }
  }

  // Удалить отзыв
  async deleteFeedback(req, res) {
    const { FeedbackId } = req.params;
    try {
      await FeedbackService.deleteFeedback(FeedbackId);
      res.status(204).send(); // Успешное удаление, но без содержимого
    } catch (error) {
      res
        .status(error.message === "Отзыв не найден" ? 404 : 500)
        .json({ message: error.message });
    }
  }
}

module.exports = new FeedbackController();
