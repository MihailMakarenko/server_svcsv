// controllers/ticketsController.js
const TicketsService = require("../services/ticketsServise");

class TicketsController {
  // Получить все билеты
  async getAllTickets(req, res) {
    try {
      const tickets = await TicketsService.getAllTickets();
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Получить билет по TicketId
  async getTicketById(req, res) {
    const { TicketId } = req.params;
    try {
      const ticket = await TicketsService.getTicketById(TicketId);
      if (!ticket) {
        return res.status(404).json({ message: "Билет не найден" });
      }
      res.status(200).json(ticket);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Создать новый билет
  async createTicket(req, res) {
    console.log("Уже тут");
    const { Status, Promocode, UserId, RegisterId, Seats } = req.body;

    try {
      const ticket = await TicketsService.createTicket({
        Status,
        Promocode,
        UserId,
        RegisterId,
        Seats,
      });
      res.status(201).json(ticket);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Обновить билет
  async updateTicket(req, res) {
    const { TicketId } = req.params;
    const { Status, Promocode, UserId, RegisterId } = req.body;

    try {
      const updatedTicket = await TicketsService.updateTicket(TicketId, {
        Status,
        Promocode,
        UserId,
        RegisterId,
      });
      res.status(200).json(updatedTicket);
    } catch (error) {
      res
        .status(error.message === "Билет не найден" ? 404 : 400)
        .json({ message: error.message });
    }
  }

  // Удалить билет
  async deleteTicket(req, res) {
    const { TicketId } = req.params;

    try {
      await TicketsService.deleteTicket(TicketId);
      res.status(204).send(); // Успешное удаление, но без содержимого
    } catch (error) {
      res
        .status(error.message === "Билет не найден" ? 404 : 500)
        .json({ message: error.message });
    }
  }

  // В контроллере
  async getDocxTicket(req, res) {
    try {
      const pdfBytes = await TicketsService.createPdf(12);
      console.log(pdfBytes);
      // Создание PDF
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=ticket.pdf");
      res.send(pdfBytes); // Отправляем PDF
    } catch (error) {
      console.error("Ошибка при создании PDF:", error);
      res.status(500).send("Ошибка при создании PDF");
    }
  }

  async getFullTicket(req, res) {
    const { id } = req.params;
    console.log(id);

    // Проверка на наличие TicketId
    if (!id) {
      return res.status(400).json({ message: "ID билета не указан" });
    }

    try {
      const ticket = await TicketsService.getFullInformTicket(id);
      res.status(200).json(ticket);
    } catch (error) {
      console.error("Ошибка при получении полной информации о билете:", error);
      res.status(500).json({ message: error.message });
    }
  }

  async getFullTicketByUserId(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID пользователя не указан" });
    }

    try {
      const tickets = await TicketsService.getTicketsByUserId(id);
      res.status(200).json(tickets);
    } catch (error) {
      console.error("Ошибка при получении полной информации о билете:", error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new TicketsController();
