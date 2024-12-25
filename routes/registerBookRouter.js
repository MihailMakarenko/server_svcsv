const Router = require("express");
const router = new Router();
const RegisterBookController = require("../controllers/registerBookController");

router.get("/", RegisterBookController.fetchRegisterBooksByDate);

router.delete("/Future/:TripId", RegisterBookController.removeFutureTripsById);

router.post("/addRegisterBook", RegisterBookController.addRegisterBook);

module.exports = router;
