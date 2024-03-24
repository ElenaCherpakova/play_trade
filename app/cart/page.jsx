"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
export default function Cart() {
  const router = useRouter();
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => router.push("/cart/checkout")}>
        Checkout
      </Button>
    </div>
  );
}
