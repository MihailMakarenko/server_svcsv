const { sequelize } = require("../db"); // Убедитесь, что путь правильный
const PromoCode = require("../models/promoCode"); // Импорт модели PromoCode

class SeedPromoCodes {
  async seed() {
    const promoCodes = [
      { Code: "SUMMER2023", PercentageDiscount: 15 },
      { Code: "WINTER2023", PercentageDiscount: 20 },
      { Code: "SPRING2023", PercentageDiscount: 25 },
      { Code: "FALL2023", PercentageDiscount: 30 },
      { Code: "FLASHSALE2023", PercentageDiscount: 10 },
      { Code: "BLACKFRIDAY", PercentageDiscount: 50 },
      { Code: "CYBERMONDAY", PercentageDiscount: 40 },
      { Code: "NEWYEAR2024", PercentageDiscount: 35 },
      { Code: "EASTER2023", PercentageDiscount: 20 },
      { Code: "VALENTINE2023", PercentageDiscount: 15 },
      { Code: "BACKTOSCHOOL", PercentageDiscount: 25 },
      { Code: "MEMORIALDAY", PercentageDiscount: 30 },
      { Code: "LABORDAY", PercentageDiscount: 20 },
      { Code: "HALLOWEEN2023", PercentageDiscount: 15 },
      { Code: "THANKSGIVING", PercentageDiscount: 10 },
      { Code: "AUTUMN2023", PercentageDiscount: 20 },
      { Code: "XMAS2023", PercentageDiscount: 25 },
      { Code: "WINTERSALE", PercentageDiscount: 30 },
      { Code: "SPRINGSALE", PercentageDiscount: 15 },
      { Code: "SUMMERCLEARANCE", PercentageDiscount: 40 },
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
