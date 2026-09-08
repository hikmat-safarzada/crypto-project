const dotenv = require("dotenv").config()
const { connectDb } = require("../config/database")
const Asset = require("../models/Asset")
const assets = [
    { symbol: "BTC", name: "Bitcoin", type: "crypto", coinGeckoId: "bitcoin" },
    { symbol: "ETH", name: "Ethereum", type: "crypto", coinGeckoId: "ethereum" },
    { symbol: "BNB", name: "Binance Coin", type: "crypto", coinGeckoId: "binancecoin" },
    { symbol: "SOL", name: "Solana", type: "crypto", coinGeckoId: "solana" },
    { symbol: "XRP", name: "Ripple", type: "crypto", coinGeckoId: "ripple" },
    { symbol: "DOGE", name: "Dogecoin", type: "crypto", coinGeckoId: "dogecoin" },
    { symbol: "AAPL", name: "Apple Inc.", type: "stock" },
    { symbol: "TSLA", name: "Tesla Inc.", type: "stock" },
    { symbol: "MSFT", name: "Microsoft Corp.", type: "stock" },
    { symbol: "GOOGL", name: "Alphabet Inc.", type: "stock" },
    { symbol: "AMZN", name: "Amazon.com Inc.", type: "stock" },
    { symbol: "NVDA", name: "NVIDIA Corp.", type: "stock" }
]

const seedAssets = async () => {
    try {
        await connectDb()
        await Promise.all(assets.map(async (asset) => {
            const exists = await Asset.findOne({ symbol: asset.symbol })
            if (!exists) {
                await Asset.create(asset);
            }
        }))
        process.exit(0)
    } catch (error) {
        process.exit(1)
    }
}

seedAssets()