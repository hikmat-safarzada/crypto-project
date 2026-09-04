const config = {
    port: process.env.PORT,
    mongo_url: process.env.MONGO_URL,
    mongo_pass: process.env.MONGO_PASS,
    node_env: process.env.NODE_ENV,
    client_url: process.env.CLIENT_URL
}

module.exports = {config}