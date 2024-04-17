import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export async function POST(req) {
  const { data } = await req.json();
  const { amount } = data;

  try {
    const payIntent = await stripe.payIntents.create({
      amount: Number(amount) * 100,
      currency: "USD"
    });
    return NextResponse.json({ success: true, intent: payIntent?.client_secret }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 400 });
  }
}
