import { Order } from "@/models/Order";
import { mongooseConnect } from "@/mongodb_adapter/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from "micro";

const endpointSecret = process.env.WEBHOOK_SECRET;

export default async function handler(req,res) {
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
      console.log(data);
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId,{
          paid: true,
        })
        console.log(data)
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}


export const config = {
  api: {bodyParser:false,}
};
