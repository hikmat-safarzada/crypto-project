const express = require("express");
const getPrice  = require("../controllers/price.controller");
const router = express.Router();

router.get("/:symbol", getPrice);

module.exports = router