import { Order } from "@/models/Order";
import { mongooseConnect } from "@/mongodb_adapter/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from "micro";
const endpointSecret = "whsec_909aefe3a3591589035fc449c91243cdd6bd71f2de7309cae934325b15f22fe5";

export default async function handler(req, res) {
    await mongooseConnect();
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const data = event.data.object;
            const orderId = data.metadata.orderId;
            const paid = data.payment_status === 'paid';
            if(orderId && paid) {
                await Order.findByIdAndUpdate(orderId, {
                    paid: true,
                })
            }
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
            // ... handle other event types
            default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).send('ok');
}

export const config = {
    api: {bodyParser: false,}
}
