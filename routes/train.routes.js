const express = require("express");
const router = express.Router();
const trainController = require('../controllers/train.controller')

module.exports = router;

router.post("/getTrainsInfo", trainController.getTrainsInfo)
router.get("/getStops/:trainId",trainController.getStops)


