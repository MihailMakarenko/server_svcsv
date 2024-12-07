const { sequelize } = require("../db"); // Убедитесь, что путь правильный
const PromoCode = require("../models/promoCode"); // Импорт модели PromoCode

class SeedPromoCodes {
  async seed() {
    const promoCodes = [
      {
        Code: "SUMMER2023",
        PercentageDiscount: 15,
      },
      {
        Code: "WINTER2023",
        PercentageDiscount: 20,
      },
      {
        Code: "SPRING2023",
        PercentageDiscount: 25,
      },
      {
        Code: "FALL2023",
        PercentageDiscount: 30,
      },
    ];

    try {
      const existingPromoCodes = await PromoCode.findAll();

      if (existingPromoCodes.length === 0) {
        await PromoCode.bulkCreate(promoCodes);
        console.log("База данных промокодов успешно заполнена.");
      } else {
        console.log(
          "База данных промокодов уже содержит записи. Новые записи не будут добавлены."
        );
      }
    } catch (error) {
      console.error("Ошибка при заполнении базы данных промокодов:", error);
    }
  }
}

module.exports = SeedPromoCodes;
