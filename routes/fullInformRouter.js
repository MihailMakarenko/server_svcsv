const Router = require("express");
const router = new Router();
const FullInformController = require("../controllers/fullInformForAdminContoller");

router.get("/", FullInformController.getFullInform);

// 1. Создание нового отзыва
// router.post("/", feedbackController.addFeedback);

// // router.get("/getByTicketId", feedbackController.getFeedbackByTicketId)

// // 2. Получение отзыва по ID
// router.get("/:id", feedbackController.getFeedbackByTicketId);

// // 3. Обновление отзыва
// router.put("/:id", feedbackController.updateFeedback); // Обновление по ID

// // 4. Удаление отзыва
// router.delete("/:id", feedbackController.deleteFeedback); // Удаление по ID

module.exports = router;
