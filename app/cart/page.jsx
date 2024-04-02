"use client";
import React, { createContext, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ShoppingCart from "@/components/ShoppingCart";
//import { createContext } from "react";

export const CartContext = createContext();

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  const addToCart = item => {
    setCartItems(prevItems => [...prevItems, item]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}> 
      <ShoppingCart>
        <Button variant="contained" color="accent" onClick={() => router.push("/cart/checkout")} fullWidth>
          Checkout
        </Button>
      </ShoppingCart>
    </CartContext.Provider>
  );
}