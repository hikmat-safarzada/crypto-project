const config = {
    port: process.env.PORT,
    mongo_url: process.env.MONGO_URL,
    mongo_pass: process.env.MONGO_PASS,
    node_env: process.env.NODE_ENV,
    client_url: process.env.CLIENT_URL,
    jwt_secret: process.env.JWT_SECRET,
    finnhub_key: process.env.FINNHUB_KEY,
    stripe_secret: process.env.STRIPE_SECRET_KEY,
    webhook_secret: process.env.STRIPE_WEBHOOK_SECRET
}

module.exports = {config}