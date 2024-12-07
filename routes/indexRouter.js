const Router = require("express");
const router = new Router();

const buses = require("./busesRouter");
const callback = require("./callbackRouter");
const favourites = require("./favouritesRouter");
const feedback = require("./feedbackRouter");
const passengers = require("./passengersRouter");
const promoCode = require("./promoCodeRouter");
const registerBook = require("./registerBookRouter");
const schedule = require("./scheduleRouter");
const tickets = require("./ticketsRouter");
const trips = require("./tripsRouter");
const user = require("./userRouter");
const busRouteRouter = require("./routeRouter");

router.use("/buses", buses);
router.use("/callback", callback);
router.use("/favourites", favourites);
router.use("/feedback", feedback);
router.use("/passengers", passengers);
router.use("/promoCode", promoCode);
router.use("/registerBook", registerBook);
router.use("/schedule", schedule);
router.use("/tickets", tickets);
router.use("/trips", trips);
router.use("/user", user);
router.use("/route", busRouteRouter);

module.exports = router;
