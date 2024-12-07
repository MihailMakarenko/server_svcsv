// controllers/callbackController.js
const CallbackService = require("../services/callbackService");

class CallbackController {
  // Получить все обратные вызовы
  async getAllCallbacks(req, res) {
    try {
      const callbacks = await CallbackService.getAllCallbacks();
      res.status(200).json(callbacks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Получить обратный вызов по CallbackId
  async getCallbackById(req, res) {
    const { CallbackId } = req.params;
    try {
      const callback = await CallbackService.getCallbackById(CallbackId);
      if (!callback) {
        return res.status(404).json({ message: "Callback не найден" });
      }
      res.status(200).json(callback);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Создать новый обратный вызов
  async createCallback(req, res) {
    const { UserId, Status, DateTime } = req.body;

    try {
      const callback = await CallbackService.createCallback({
        UserId,
        Status,
        DateTime,
      });
      res.status(201).json(callback);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Обновить обратный вызов
  async updateCallback(req, res) {
    const { CallbackId } = req.params;
    const { UserId, Status, DateTime } = req.body;

    try {
      const updatedCallback = await CallbackService.updateCallback(CallbackId, {
        UserId,
        Status,
        DateTime,
      });
      res.status(200).json(updatedCallback);
    } catch (error) {
      res
        .status(error.message === "Callback не найден" ? 404 : 400)
        .json({ message: error.message });
    }
  }

  // Удалить обратный вызов
  async deleteCallback(req, res) {
    const { CallbackId } = req.params;

    try {
      await CallbackService.deleteCallback(CallbackId);
      res.status(204).send(); // Успешное удаление, но без содержимого
    } catch (error) {
      res
        .status(error.message === "Callback не найден" ? 404 : 500)
        .json({ message: error.message });
    }
  }
}

module.exports = new CallbackController();
