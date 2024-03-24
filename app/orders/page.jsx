"use client";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
export default function Orders() {
  const router = useRouter();
  return (
    <div>
      <p>
        Orders history Combined Buyer/Seller history of all orders with a way to filter by type (buy/sell), date,
        seller/buyer.
      </p>
      <Button variant="contained" color="primary" onClick={() => router.push("/orders/[id]")}>
        Order details
      </Button>
    </div>
  );
}
