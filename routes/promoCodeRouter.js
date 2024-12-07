const Router = require("express");
const router = new Router();
const promoCodeController = require("../controllers/promoCodeController");

// 1. Создание нового промокода
router.post("/", promoCodeController.createPromoCode);

// 2. получение всех промокодов
router.get("/", promoCodeController.getAllPromoCodes);

// 3. Получение промокода по id
router.get("/:id", promoCodeController.getPromoCodeById);

// 4. Обновление промокода
router.put("/:id", promoCodeController.updatePromoCode); // Обновление по ID

// 5. Удаление промокода
router.delete("/:id", promoCodeController.deletePromoCode); // Удаление по ID

router.get("/getDiscount/:promocode", promoCodeController.getDiscountByCode);

module.exports = router;
