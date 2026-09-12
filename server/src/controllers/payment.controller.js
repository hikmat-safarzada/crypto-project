const {createCheckOutSession, handlerStripeWebHook} = require("../services/payment.service")
const createCheckOut = async (req, res) => {
    try {
        const userId = req.user.id;
        const {amount} = req.body
        const result = await createCheckOutSession(userId, amount)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const handleWebHook = async (req, res) => {
    try {
        const signature = req.headers["stripe-signature"]
        await handlerStripeWebHook(req.body, signature);
        res.status(200).json({
            received:true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {createCheckOut, handleWebHook}