// services/promoCodeService.js
const PromoCode = require("../models/promoCode"); // Импорт модели PromoCode

class PromoCodeService {
  async getAllPromoCodes() {
    return await PromoCode.findAll();
  }

  async getPromoCodeById(PromoCodeId) {
    return await PromoCode.findByPk(PromoCodeId);
  }

  async createPromoCode(promoCodeData) {
    return await PromoCode.create(promoCodeData);
  }

  async updatePromoCode(PromoCodeId, promoCodeData) {
    const promoCode = await this.getPromoCodeById(PromoCodeId);
    if (!promoCode) {
      throw new Error("Промокод не найден");
    }
    Object.assign(promoCode, promoCodeData);
    return await promoCode.save();
  }

  async deletePromoCode(PromoCodeId) {
    const promoCode = await this.getPromoCodeById(PromoCodeId);
    if (!promoCode) {
      throw new Error("Промокод не найден");
    }
    await promoCode.destroy();
  }

  async getDiscondByCode(promocode) {
    try {
      const promo = await PromoCode.findOne({
        where: {
          Code: promocode,
        },
      });

      // Проверяем, найден ли промокод
      if (!promo) {
        return {
          success: false,
          message: "Промокод не найден.",
          discount: null,
        };
      }

      // Возвращаем успешный ответ с процентом скидки
      return {
        success: true,
        message: "Промокод найден.",
        discount: promo.PercentageDiscount,
      };
    } catch (error) {
      console.error("Ошибка при получении промокода:", error);
      return {
        success: false,
        message: "Ошибка при получении промокода.",
        error: error.message,
      };
    }
  }
}

module.exports = new PromoCodeService();
