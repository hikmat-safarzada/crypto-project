const express = require("express");
const {createCheckOut} = require("../controllers/payment.controller")
const verifyToken = require("../middleware/auth.middleware")
const router = express.Router();

router.post("/checkout", verifyToken, createCheckOut)

module.exports = router