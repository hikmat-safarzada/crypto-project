const mongoose = require("mongoose");
const { config } = require("./config");

const connectDb = async () => {
    try {
        await mongoose.connect(config.mongo_url.replace("<db_password>", config.mongo_pass));
        console.log("DB connected successfully")
    } catch (error) {
        console.log("DB connection failed")
    }
}

module.exports = {connectDb}