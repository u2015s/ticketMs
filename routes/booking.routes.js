const express = require("express");
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
module.exports = router;

router.get("/:userId", bookingController.getBookings)
router.post("/bookTicket", bookingController.bookTicket)
router.post("/checkSeatInfo", bookingController.getSeatAvail)


