const express = require("express");
const router = express.Router();

const authController = require('../controllers/auth.controller');


const verifyAuthentication = require("../middlewares/auth");

router.post("/register",authController.register );
router.post("/login",authController.login );

// router.get("/users", verifyAuthentication, );

module.exports = router;
