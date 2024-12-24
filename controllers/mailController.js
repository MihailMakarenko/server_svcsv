// controllers/favouritesController.js
const MailService = require("../services/mailService");

class MailController {
  // Получить все избранные записи
  async sendMailToUser(req, res) {
    const { mainText, header } = req.body;
    // const { BusNumber, NameCompany, Model, Capacity } = req.body;
    try {
      const mail = await MailService.sendNewsletter(header, mainText);
      res.status(201).json(mail);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new MailController();
