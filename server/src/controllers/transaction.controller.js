const {executeTransaction, getUserTransactionHistory} = require("../services/transaction.service")
const buyAsset = async (req, res) => {
    try {
        const {symbol, quantity} = req.body;
        const userId = req.user.id;

        const result = await executeTransaction({userId, symbol, quantity, type: "buy"})
        res.status(200).json({
            message: "Transaction successfull",
            transaction: result.transaction,
            newBalance: result.newBalance
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const sellAsset = async (req, res) => {
    try {
        const {symbol, quantity} = req.body;
        const userId = req.user.id;

        const result = await executeTransaction({userId, symbol, quantity, type: "sell"})
        res.status(200).json({
            message: "Transaction successfull",
            transaction: result.transaction,
            newBalance: result.newBalance
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getHistory = async (req, res) => {
    try {
        const userId = req.user.id
        const history = await getUserTransactionHistory(userId);
        res.status(200).json({
            transactions: history
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {buyAsset, sellAsset, getHistory}