const express = require("express");
const dotenv = require("dotenv").config();
const { config } = require("./src/config/config");
const { connectDb } = require("./src/config/database");
const app = require("./src/routes/app");
const { connectRedis } = require("./src/config/redisClient");
connectDb()
connectRedis()

app.listen(config.port, ()=>{
    console.log(`System works on ${config.port}`)
})