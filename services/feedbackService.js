// services/feedbackService.js
const Feedback = require("../models/feedback"); // Импорт модели Feedback

class FeedbackService {
  async getFeedbackByTicketId(TicketId) {
    return await Feedback.findAll({ where: { TicketId } });
  }

  async addFeedback(feedbackData) {
    return await Feedback.create(feedbackData);
  }

  async updateFeedback(FeedbackId, feedbackData) {
    const feedback = await Feedback.findByPk(FeedbackId);
    if (!feedback) {
      throw new Error("Отзыв не найден");
    }
    Object.assign(feedback, feedbackData);
    return await feedback.save();
  }

  async deleteFeedback(FeedbackId) {
    const feedback = await Feedback.findByPk(FeedbackId);
    if (!feedback) {
      throw new Error("Отзыв не найден");
    }
    await feedback.destroy();
  }
}

module.exports = new FeedbackService();
