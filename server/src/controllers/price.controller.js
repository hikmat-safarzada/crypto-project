const {getCryptoPrice}  = require("../services/price.service")

const getPrice = async (req, res) => {
    try {
        const price = await getCryptoPrice(req.params.symbol.toUpperCase());
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