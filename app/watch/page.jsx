"use client";
import { useRouter } from "next/navigation";

import { Button } from "@mui/material";

export default function Watch() {
  const router = useRouter();
  return (
    <div>
      Items I want to buy Buyer personal saved items for faster access to items on the market.
      Filterable, searchable.
      <Button variant="contained" color="primary" onClick={() => router.push("/market/item/[id]")}>
        View card
      </Button>
    </div>
  );
}
