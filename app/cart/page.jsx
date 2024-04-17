"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Cart from "@/components/cart/Cart";

export default function page() {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  return(
  <Elements stripe={stripePromise}>
    <Cart />
  </Elements>)
}
