const mongoose = require("mongoose");
const assetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true,
        uppercase: true
    },
    type: {
        type: String,
        enum: ["crypto", "stock"],
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Asset", assetSchema, "assets")