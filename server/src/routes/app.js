const express = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const router = require("./auth.route")
const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", router)

module.exports = app