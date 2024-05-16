import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(req) {
  const amount = await req.json();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "USD"
    });
    return NextResponse.json(
      { success: true, intent: paymentIntent?.client_secret },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 400 });
  }
}
