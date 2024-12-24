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

  async getCallbackByUserId(req, res) {
    const { UserId } = req.params;
    try {
      const callback = await CallbackService.findCallbacks(UserId);
      res.status(200).json(callback);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Создать новый обратный вызов
  async createCallback(req, res) {
    const { UserId } = req.body;
    const Status = "Получен";
    const DateTime = new Date();
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

    try {
      // Получаем текущую запись
      const currentCallback = await CallbackService.getCallbackById(CallbackId);

      if (!currentCallback) {
        return res.status(404).json({ message: "Callback не найден" });
      }

      // Обновляем только статус
      const updatedCallback = await CallbackService.updateCallback(CallbackId, {
        ...currentCallback, // Сохраняем все существующие данные
        Status: "Закрыт", // Меняем статус на "Закрыт"
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

  async getCallbackWithPagination(req, res) {
    try {
      const { Page = 1, Limit = 3 } = req.query;
      console.log(req.query);
      const callbaks = await CallbackService.getCallbackWithPagination(
        Page,
        Limit
      );
      res.status(200).json(callbaks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new CallbackController();
