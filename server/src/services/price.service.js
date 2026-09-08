const axios = require("axios");
const { redisClient } = require("../config/redisClient");
const Asset = require("../models/Asset")
const CACHE_DURATION = 60;

const getCryptoPrice = async (symbol) => {
    try {
        const cache_key = `crypto_${symbol}`

        const cached = await redisClient.get(cache_key);
        if (cached) {
            return JSON.parse(cached)
        }
        const asset = await Asset.findOne({ symbol, type: "crypto" })
        if (!asset || !asset.coinGeckoId) {
            throw new Error(`There is no Coin Gecko Id for ${symbol}`)
        }
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${asset.coinGeckoId}&vs_currencies=usd`
        )
        const price = response.data[asset.coinGeckoId].usd;
        await redisClient.set(cache_key, JSON.stringify(price), { EX: CACHE_DURATION })
        return price
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {getCryptoPrice}