const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { config } = require("./src/config/config");
const { connectDb } = require("./src/config/database");

const app = express();
connectDb()
app.use(cors())
app.use(express.json())

app.listen(config.port, ()=>{
    console.log(`System works on ${config.port}`)
})