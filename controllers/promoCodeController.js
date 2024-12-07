// controllers/promoCodeController.js
const PromoCodeService = require("../services/promoCodeService"); // Импорт сервиса PromoCodeService

class PromoCodeController {
  // Получить все промокоды
  async getAllPromoCodes(req, res) {
    try {
      const promoCodes = await PromoCodeService.getAllPromoCodes();
      res.status(200).json(promoCodes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Получить промокод по PromoCodeId
  async getPromoCodeById(req, res) {
    const { PromoCodeId } = req.params;
    try {
      const promoCode = await PromoCodeService.getPromoCodeById(PromoCodeId);
      if (!promoCode) {
        return res.status(404).json({ message: "Промокод не найден" });
      }
      res.status(200).json(promoCode);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Создать новый промокод
  async createPromoCode(req, res) {
    const { PercentageDiscount } = req.body;
    try {
      const promoCode = await PromoCodeService.createPromoCode({
        PercentageDiscount,
      });
      res.status(201).json(promoCode);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Обновить промокод
  async updatePromoCode(req, res) {
    const { PromoCodeId } = req.params;
    const { PercentageDiscount } = req.body;
    try {
      const promoCode = await PromoCodeService.updatePromoCode(PromoCodeId, {
        PercentageDiscount,
      });
      res.status(200).json(promoCode);
    } catch (error) {
      res
        .status(error.message === "Промокод не найден" ? 404 : 400)
        .json({ message: error.message });
    }
  }

  // Удалить промокод
  async deletePromoCode(req, res) {
    const { PromoCodeId } = req.params;
    try {
      await PromoCodeService.deletePromoCode(PromoCodeId);
      res.status(204).send(); // Успешное удаление, но без содержимого
    } catch (error) {
      res
        .status(error.message === "Промокод не найден" ? 404 : 500)
        .json({ message: error.message });
    }
  }

  async getDiscountByCode(req, res) {
    const { promocode } = req.params;

    try {
      const result = await PromoCodeService.getDiscondByCode(promocode);

      console.log(result);
      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message,
          discount: result.discount,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Ошибка в контроллере при получении промокода:", error);
      return res.status(500).json({
        success: false,
        message: "Ошибка сервера. Пожалуйста, попробуйте позже.",
      });
    }
  }
}

module.exports = new PromoCodeController();
