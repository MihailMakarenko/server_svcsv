const Router = require("express");
const router = new Router();
const feedbackController = require("../controllers/feedbackController");

// 1. Создание нового отзыва
router.post("/", feedbackController.addFeedback);

// 2. Получение отзыва по ID
router.get("/:id", feedbackController.getFeedbackByTicketId);

// 3. Обновление отзыва
router.put("/:id", feedbackController.updateFeedback); // Обновление по ID

// 4. Удаление отзыва
router.delete("/:id", feedbackController.deleteFeedback); // Удаление по ID

module.exports = router;
