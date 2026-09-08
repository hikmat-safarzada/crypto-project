const {createClient} = require("redis");
const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
})

redisClient.on("error", (err) => console.error("Redis error", err))

const connectRedis = async () => {
    await redisClient.connect();
    console.log("Redis connected successfully")
}

module.exports = {redisClient, connectRedis};