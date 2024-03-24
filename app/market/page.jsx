"use client";

import { useRouter } from "next/navigation";

import { Button, Box } from "@mui/material";

export default function Market() {
  //routing using next router (for OnClick event etc.)
  const router = useRouter();

  return (
    <Box>
      <h2>Market</h2>
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
