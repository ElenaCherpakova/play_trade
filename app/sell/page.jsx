"use client";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";

export default function Sell() {
  const { data: session } = useSession();
  console.log("session", session);

  let card = {
    name: "name",
    set: "",
    price: 1.99,
    currency: "CAD",
    shippingCost: 5,
    description: "good condition",
    conditions: "near mint",
    category: "Sport Card",
    imageURL: "",
    quantity: 1,
    available: "sold"
  };
  const addCard = async card => {
    console.log("card", card);
    const body = JSON.stringify(card);
    console.log("body", body);
    try {
      const response = await fetch("/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body
      });

      if (!response.ok) {
        throw new Error(data.error || "Somethind went wrong!");
      } else {
        const data = await response.json();
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => addCard(card)}>
        Add card
      </Button>
      <h2>Sell</h2>
    </div>
  );
}
