"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { Box, Breadcrumbs, Typography, Link } from "@mui/material";

import CardForm from "@/components/CardForm";
import { theme } from "@/styles/theme";
import { createCardData } from "@/utils/fetchData";

const SellAddPage = () => {
  const router = useRouter();

  const [card, setCard] = useState({
    name: "",
    set: "",
    price: 0,
    currency: "",
    shippingCost: 0,
    description: "",
    conditions: "",
    category: "",
    imageURL: "",
    imagePublicId: "",
    quantity: 0,
    available: ""
  });

  const addCard = async formData => {
    try {
      const data = await createCardData(formData);
      // Navigate to the sell page upon successful card addition
      router.push(`/sell`);
      // // Navigate to the new page upon successful card addition
      // router.push(`/market/item/${data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ ml: theme.spacing(2) }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, mb: 3 }}>
        <Link color="inherit" href="/" onClick={() => router.push("/")}>
          Home
        </Link>
        <Link color="inherit" href="/profile" onClick={() => router.push("/")}>
          Profile
        </Link>
        <Link color="inherit" href="/sell" onClick={() => router.push("/")}>
          My Cards
        </Link>
        <Typography color="text.primary">Add Card</Typography>
      </Breadcrumbs>

      <CardForm cardValue={card} onSubmitForm={addCard} />
    </Box>
  );
};

export default SellAddPage;
