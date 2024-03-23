"use client";

import { useRouter } from "next/navigation";
import { Button, Box } from "@mui/material";

export default function Market() {
  const router = useRouter();
  return (
    <Box>
      <h2>Market</h2>
      <Button variant="contained" color="primary" onClick={() => router.push("/sell")}>
        Sell card
      </Button>
    </Box>
  );
}
