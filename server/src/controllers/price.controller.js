const Asset = require("../models/Asset")
const { getAssetPrice}  = require("../services/price.service")

const getPrice = async (req, res) => {
    try {
        const symbol = req.params.symbol.toUpperCase()
        const asset = await Asset.findOne({symbol})
        if(!asset){
            return res.status(404).json({
                message: `${symbol} not found`
            })
        }
        const price = await getAssetPrice(asset)
        res.status(200).json({
            symbol: req.params.symbol,
            price
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = getPrice