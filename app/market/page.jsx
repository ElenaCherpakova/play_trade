"use client";

import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function Market() {
  const router = useRouter();
  return (
    <div>
      <h2>Market</h2>
      <Button variant="contained" color="primary" onClick={() => router.push("/sell")}>
        Sell item
      </Button>
    </div>
  );
}
