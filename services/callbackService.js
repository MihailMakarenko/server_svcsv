// services/callbackService.js
const Callback = require("../models/callback");
const User = require("../models/user"); // Импортируем модель User для валидации

class CallbackService {
  async getAllCallbacks() {
    return await Callback.findAll();
  }

  async getCallbackById(CallbackId) {
    return await Callback.findByPk(CallbackId);
  }

  async createCallback(callbackData) {
    const userExists = await User.findByPk(callbackData.UserId);
    if (!userExists) {
      throw new Error("Пользователь не найден");
    }
    return await Callback.create(callbackData);
  }

  async updateCallback(CallbackId, callbackData) {
    const callback = await this.getCallbackById(CallbackId);
    if (!callback) {
      throw new Error("Callback не найден");
    }
    Object.assign(callback, callbackData);
    return await callback.save();
  }

  async deleteCallback(CallbackId) {
    const callback = await this.getCallbackById(CallbackId);
    if (!callback) {
      throw new Error("Callback не найден");
    }
    await callback.destroy();
  }
}

module.exports = new CallbackService();
