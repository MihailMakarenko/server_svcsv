const Router = require("express");
const router = new Router();
const ticketsController = require("../controllers/ticketsController");

// 1. Создание нового маршрута
router.post("/", ticketsController.createTicket);

// 2. Получение всех билетов
router.get("/", ticketsController.getAllTickets); // Этот маршрут должен быть после создания нового билета, чтобы избежать конфликта с POST

// 3. Получение билета по ID
router.get("/:id", ticketsController.getTicketById); // Этот маршрут должен идти перед более общими маршрутами

// 4. Обновление билета по ID
router.put("/:TicketId", ticketsController.updateTicket); // Правильно, так как он также специфичен для ID

// 5. Удаление билета по ID
router.delete("/:id", ticketsController.deleteTicket); // Правильно, так как он также специфичен для ID

// 6. Получение документа билета в формате docx по ID
router.get("/downloadPdfTicket/:id", ticketsController.getDocxTicket); // Этот маршрут должен идти в конце, так как он специфичен для ID

router.get("/getFullTicket/:id", ticketsController.getFullTicket);

router.get("/getTicketsForUser/:id", ticketsController.getFullTicketByUserId);

module.exports = router;
