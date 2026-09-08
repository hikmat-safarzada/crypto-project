const Transaction = require("../models/Transaction")

const getUserHoldingQuantity = async ({userId, assetId}) => {
    const transactions = await Transaction.find({ user: userId, asset: assetId });
    const totalQuantity = transactions.reduce((total, transaction) => {
        if (transaction.type == "buy") {
            return total + transaction.quantity
        }else if(transaction.type == "sell"){
            return total - transaction.quantity
        }
        return total;
    }, 0)
    return totalQuantity;
}

const calculateAverageBuyPrice = async ({userId, assetId}) => {
    const buyTransactions = await Transaction.find({
        user: userId,
        asset: assetId,
        type: "buy"
    })

    const totalCost 
}

module.exports = {getUserHoldingQuantity}