const mongoose = require("mongoose");
const transactionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
        required: true
    },
    type: {
        type: "String",
        enum: ["buy", "sell"]
    },
    quantity: {
        type: Number,
        required: true
    },
    priceAtTransaction: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Transaction", transactionSchema, "transactions")