const Router = require("express");
const router = new Router();

const callbackController = require("../controllers/callbackController");

router.get("/withPagination", callbackController.getCallbackWithPagination);
router.get("/:UserId", callbackController.getCallbackByUserId);
router.put("/:CallbackId", callbackController.updateCallback);
router.post("/", callbackController.createCallback);
module.exports = router;
