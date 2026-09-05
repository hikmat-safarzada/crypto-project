const express = require("express");
const dotenv = require("dotenv").config();
const { config } = require("./src/config/config");
const { connectDb } = require("./src/config/database");
const app = require("./src/routes/app");
connectDb()

app.listen(config.port, ()=>{
    console.log(`System works on ${config.port}`)
})