const Router = require("express");
const router = new Router();
const tripsController = require("../controllers/tripsController");

router.post("/", tripsController.createTrip);

module.exports = router;
