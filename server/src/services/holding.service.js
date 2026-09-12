const Transaction = require("../models/Transaction");
const { getAssetPrice } = require("./price.service");

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

    const totalCost = buyTransactions.reduce((sum, transaction)=>{
        return sum + (transaction.quantity * transaction.priceAtTransaction)
    }, 0);

    const totalQuantity = buyTransactions.reduce((sum, transaction)=>{
        return sum + transaction.quantity
    }, 0)

    if(totalQuantity === 0) return 0;
    return totalCost / totalQuantity
}

const getUserHoldings = async (userId) => {
    const transactions = await Transaction.find({ user: userId }).populate("asset")

    const holdingsMap = {}

    transactions.forEach(transact => {
        const symbol = transact.asset.symbol;
        if(!holdingsMap[symbol]){
            holdingsMap[symbol] = {
                assetId: transact.asset._id,
                symbol: transact.asset.symbol,
                name: transact.asset.name,
                quantity: 0,
                type: transact.asset.type
            }
        }
        holdingsMap[symbol].quantity += transact.type === "buy" ? transact.quantity : -transact.quantity
    })
    return Object.values(holdingsMap).filter(h => h.quantity > 0)
}

const getPortfolio = async (userId) => {
    const holdings = await getUserHoldings(userId);
    const enrichedHoldings = await Promise.all(
        holdings.map(async (holding) => {
            const currentPrice = await getAssetPrice(holding);
            const avgBuyPrice = await calculateAverageBuyPrice({userId, assetId: holding.assetId})
            const currentValue = currentPrice * holding.quantity;
            const investedValue = avgBuyPrice * holding.quantity;
            const profitLoss = currentValue - investedValue;
            const profitLossPercent = investedValue > 0 ? (profitLoss / investedValue)*100 : 0;
            return {
                symbol: holding.symbol,
                name: holding.name,
                quantity: holding.quantity,
                currentPrice,
                avgBuyPrice,
                currentValue,
                investedValue,
                profitLoss,
                profitLossPercent
            }
        })
    )
    const totalCurrentValue = enrichedHoldings.reduce((sum, tx) => sum + tx.currentValue, 0);
    const totalInvestedValue = enrichedHoldings.reduce((sum, tx) => sum + tx.investedValue, 0);
    const totalProfitLoss = totalCurrentValue - totalInvestedValue
    
    return {
        holdings: enrichedHoldings,
        summary: {
            totalCurrentValue,
            totalInvestedValue,
            totalProfitLoss,
            totalProfitLossPercent : totalInvestedValue > 0 ? (totalProfitLoss / totalInvestedValue) * 100 : 0
        }
    }
}

module.exports = {getUserHoldingQuantity, calculateAverageBuyPrice,
    getUserHoldings, getPortfolio
}