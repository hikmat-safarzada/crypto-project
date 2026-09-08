const express = require("express");
const verifyToken = require("../middleware/auth.middleware")
const {buyAsset, sellAsset} = require("../controllers/transaction.controller");

const router = express.Router();

router.post("/buy", verifyToken, buyAsset);
router.post("/sell", verifyToken, sellAsset);

module.exports = router