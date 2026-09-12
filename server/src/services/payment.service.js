const Stripe = require("stripe");
const Payment = require("../models/Payment");

const User = require("../models/User");
const { config } = require("../config/config")

const stripe = new Stripe(config.stripe_secret);
const createCheckOutSession = async (userId, amount) => {
    if (!amount || amount < 0) {
        throw new Error("Invalid amount");
    }
    const session = await stripe.checkout.sessions.create({
        mode: "payment",

        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Trading Account Deposit"
                    },
                    unit_amount: Math.round(amount * 100)
                },
                quantity: 1
            }
        ],
        success_url: "http://localhost:3000/payment/success",
        cancel_url: "http://localhost:3000/payment/cancel"
    });

    const payment = await Payment.create({
        user: userId,
        amount,
        currency: "usd",
        stripeSessionId: session.id,
        status: "pending"
    })
    return {
        checkoutUrl: session.url,
        paymentId: payment._id
    }
}

const handlerStripeWebHook = async (rawBody, signature) => {
    const event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        config.webhook_secret
    );
    if (event.type == "checkout.session.completed") {
        const session = event.data.object;
        const payment = await Payment.findOne({
            stripeSessionId: session.id
        })
        if (!payment) {
            throw new Error("Payment not found");
        }
        if (payment.status == "completed") {
            return;
        }
        payment.status = "completed";
        await payment.save();
        const user = User.findOne(payment.user)
        user.balance += payment.amount;
        await user.save();
        console.log("NEW BALANCE:", user.balance);
    }
}

module.exports = { createCheckOutSession, handlerStripeWebHook };
