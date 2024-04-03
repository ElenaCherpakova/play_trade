"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ShoppingCart from "@/components/ShoppingCart";

export default function Cart() {
  const router = useRouter();

  return (
    <ShoppingCart>
      <Button variant="contained" color="accent" onClick={() => router.push("/cart/checkout")} fullWidth>
        Checkout
      </Button>
    </ShoppingCart>
  );
}
