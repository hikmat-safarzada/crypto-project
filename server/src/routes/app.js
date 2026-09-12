const express = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const authRouter = require("./auth.route")
const priceRouter = require("./price.route")
const {handleWebHook} = require("../controllers/payment.controller")
const transactionRouter = require("./transaction.route")
const app = express()
const holdingRouter = require("./holding.route") 
const paymentRouter = require("./payment.route")
app.use(cors())
app.use(cookieParser())

app.post("/api/payment/webhook", express.raw({type: "application/json"}), handleWebHook);

app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/price", priceRouter)
app.use("/api/transaction", transactionRouter)
app.use("/api/holdings", holdingRouter)
app.use("/api/payment", paymentRouter)
module.exports = app