const {getPortfolio} = require("../services/holding.service")
const getMyPortfolio = async (req, res) => {
    try {
        const userId = req.user.id
        const portfolio = await getPortfolio(userId)
        res.status(200).json({
            portfolio
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = getMyPortfolio;