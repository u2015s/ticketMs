const express = require("express");
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const verifyAuthentication = require("../middlewares/auth");

module.exports = router;

router.get("/:userId", verifyAuthentication,bookingController.getBookings)
router.post("/bookTicket", verifyAuthentication,bookingController.bookTicket)
router.post("/checkSeatInfo", verifyAuthentication,bookingController.getSeatAvail)


