"use client";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CardComponent from "@/components/CardComponent";
import CardForm from "@/components/CardForm";

export default function Sell() {
  const [add, setAdd] = useState(false);

  //create card for testing routes

  const [id, setId] = useState("");
  const card = {
    name: "",
    set: "",
    price: 0,
    currency: "",
    shippingCost: 0,
    description: "",
    conditions: "",
    category: "",
    imageURL: "",
    quantity: 0,
    available: ""
  };
  const router = useRouter();
  useEffect(() => {
    if (id) {
      router.push(`/market/item/${id}`);
    }
  }, [id]);

  const addCard = async card => {
    const body = JSON.stringify(card);

    try {
      const response = await fetch("/api/cards", {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data"
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
      }
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  return (
    <Box>
      {/* <CardForm /> */}
      <Button variant="contained" color="primary" onClick={() => setAdd(true)}>
        Add card
      </Button>
      {/* {card && <CardComponent card={card} />} */}
      {add && <CardForm cardValue={card} onSubmitForm={addCard} />}
    </Box>
  );
}
