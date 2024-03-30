"use client";

import { useRouter } from "next/navigation"; //new

import { Button, Box } from "@mui/material"; //new

import { CardsWithFilters } from "@/components/CardsWithFilters";

export default function Market() {
  //routing using next router (for OnClick event etc.)
  const router = useRouter(); //new

  // const card = {
  //   name: "Pikachu V - SWSH061",
  //   price: "$ 0.42",
  //   imageURL: "https://m.media-amazon.com/images/I/51skd-tjunL._AC_.jpg"
  // };
  return (
    //new
    <Box>
      <h2>Market</h2>
      <CardsWithFilters />
      <a>Here we will see all cards</a>
      <Button variant="outlined" color="primary" onClick={() => router.push("/market/item/[id]")}>
        view single card
      </Button>
      <Button variant="contained" color="primary" onClick={() => router.push("/sell")}>
        view cards
      </Button>
    </Box>
  );
}
