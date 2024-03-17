"use client";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CardComponent from "@/components/CardComponent";

export default function Sell() {
  const session = useSession();
  console.log("session", session);
  //create card for testing routes

  const cardToSave = {
    name: "name",
    set: "",
    price: 1.99,
    currency: "CAD",
    shippingCost: 5,
    description: "good condition",
    conditions: "near mint",
    category: "Sport Card",
    imageURL: "https://m.media-amazon.com/images/I/51skd-tjunL._AC_.jpg",
    quantity: 1,
    available: "sold"
  };
  const [id, setId] = useState("");
  const [card, setCard] = useState();
  const addCard = async card => {
    const body = JSON.stringify(card);

    try {
      const response = await fetch("/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body
      });

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong!");
      } else {
        const data = await response.json();
        console.log(data);
        setId(data.data._id);
        setCard(data.data);
      }
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };
  console.log("id", id);
  return (
    <Box>
      <Button variant="contained" color="primary" onClick={() => addCard(cardToSave)}>
        Add card
      </Button>
      {card && <CardComponent card={card} />}
      <Link href={`/sell/edit/${id}`}>edit card</Link>
    </Box>
  );
}
