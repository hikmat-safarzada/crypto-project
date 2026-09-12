const express = require("express")
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware");
const getMyPortfolio = require("../controllers/holding.controller");

router.get("/portfolio", verifyToken, getMyPortfolio)

module.exports = router