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

  async findCallbacks(userId) {
    const callbacks = await Callback.findAll({
      where: {
        UserId: userId,
        Status: "Получен",
      },
    });

    // Проверяем, есть ли найденные записи
    return callbacks.length > 0; // Вернет true, если записи найдены, и false, если нет
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

  async getCallbackWithPagination(page, limit) {
    console.log("Мы тут");
    const offset = (page - 1) * limit; // Вычисляем смещение

    try {
      const callbacksAll = await Callback.findAll({
        where: {
          Status: "Получен",
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        limit: limit,
        offset: offset,
      });

      // Извлекаем все UserId из полученных callbacks
      const userIds = callbacksAll.map((callback) => callback.UserId);

      // Получаем пользователей по UserId
      const users = await User.findAll({
        where: {
          UserId: userIds,
        },
        attributes: ["UserId", "FirstName", "LastName", "PhoneNumber"],
      });

      // Объединяем данные
      const callbacks = callbacksAll.map((callback) => {
        const user = users.find((user) => user.UserId === callback.UserId);
        return {
          ...callback.toJSON(), // Преобразуем callback в обычный объект
          user: user || null, // Добавляем информацию о пользователе, если она есть
        };
      });

      // Получаем общее количество записей
      const totalCount = await Callback.count({
        where: {
          Status: "Получен",
        },
      });

      return {
        callbacks,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      };
    } catch (error) {
      console.error("Ошибка при получении автобусов:", error);
      throw error; // Обработка или повторное выбрасывание ошибки
    }
  }
}

module.exports = new CallbackService();
