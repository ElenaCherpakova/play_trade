"use client";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function Profile() {
  const router = useRouter();
  return (
    <div>
      <p>
        Profile page Personal user profile Name, email, User pic(stretch goal), Location (for seller page), Default
        shipping address (for checkout)
      </p>
      <Button variant="contained" color="primary" onClick={() => router.push("/profile/edit")}>
        Edit profile
      </Button>
    </div>
  );
}
