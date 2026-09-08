const express = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const authRouter = require("./auth.route")
const priceRouter = require("./price.route")
const transactionRouter = require("./transaction.route")
const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/price", priceRouter)
app.use("/api/transaction", transactionRouter)
module.exports = app