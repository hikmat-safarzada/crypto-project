const Asset = require("../models/Asset")
const User = require("../models/User")
const Transaction = require("../models/Transaction")
const {getAssetPrice} = require("./price.service")
const { getUserHoldingQuantity } = require("./holding.service")
const executeTransaction = async({userId, symbol, quantity, type}) => {
    try {
        const asset = await Asset.findOne({symbol: symbol.toUpperCase()})
        if(!asset){
            throw new Error(`${symbol} hasn't found` );
        }

        const price = await getAssetPrice(asset)
        const totalPrice = price * quantity;

        const user = await User.findById(userId);
        if(!user){
            throw new Error("No user found");
        }
        if (type == "buy") {
            if(user.balance < totalPrice){
                throw new Error("Not enough balance");
            }
            user.balance -= totalPrice
        } else if(type == "sell"){
            const currentHolding = await getUserHoldingQuantity({userId, assetId: asset._id})
            if(currentHolding < quantity){
                throw new Error(`Not enough quantity`);
            }
            user.balance += totalPrice
        }else{
            throw new Error("Wrong operation");
        }
        await user.save();

        const transaction = await Transaction.create({
            user: userId,
            asset: asset._id,
            type,
            quantity,
            priceAtTransaction: price
        })
        return {transaction, newBalance: user.balance}
    } catch (error) {
        throw new Error(error.message);
    }
}

const getUserTransactionHistory = async (userId) => {
    const transactions = await Transaction.find({user: userId}).populate("asset").sort({createdAt: -1})

    return transactions.map((tx) => ({
        id: tx._id,
        symbol: tx.asset.symbol,
        name: tx.asset.name,
        quantity: tx.quantity,
        type: tx.type,
        priceAtTransaction: tx.priceAtTransaction,
        totalValue: tx.quantity * tx.priceAtTransaction,
        date: tx.createdAt
    }))
}

module.exports = {executeTransaction, getUserTransactionHistory}