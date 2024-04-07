"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { TextField, Button } from "@mui/material";
import { theme as importedTheme } from "/styles/theme.js";
import { ThemeProvider, useTheme } from "@mui/material/styles";
export default function Profile() {
  const theme = useTheme();
  const { data: session } = useSession();
  const [isSeller, setIsSeller] = useState(session?.user?.isSeller || false);
  const [location, setLocation] = useState("");
  const [showLocationFrom, setShowLocationFrom] = useState(false);

  useEffect(() => {
    setIsSeller(session?.user?.isSeller || false);
  }, [session]);

  const handleBecomeSeller = async () => {
    try {
      const response = await fetch("/api/auth/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, type: 'seller' }) 
      });
      console.log("RESPONSE", response)
      if (response.ok) {
        setIsSeller(true);
        showLocationFrom(false);
      } else {
        console.log("Failed to become a seller");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <ThemeProvider theme={importedTheme}>
      <h2>Profile</h2>
      <Link href="/profile/update">Edit User Profile</Link>

      {!isSeller && !showLocationFrom && (
        <Button
          onClick={() => setShowLocationFrom(true)}
          variant="contained"
          color="secondary"
          sx={{
            "mt": 2, // Add a top margin
            "width": "40%", // Make the button full width
            "letterSpacing": "0.1em",
            "&:hover": {
              backgroundColor: theme.palette.accent.main
            }
          }}>
          Become a Seller
        </Button>
      )}
      {!isSeller && showLocationFrom && (
        <>
          <TextField
            onChange={e => setLocation(e.target.value)}
            name="location"
            label="location"
            placeholder="eg. Canada, Toronto"
            value={location}
            sx={{ mb: 2 }} //margin bottom
            required
          />
          <Button
            onClick={handleBecomeSeller}
            variant="contained"
            color="secondary"
            sx={{
              "mt": 2,
              "width": "40%",
              "letterSpacing": "0.1em",
              "&:hover": {
                backgroundColor: theme.palette.accent.main
              }
            }}>
            Become a Seller
          </Button>
        </>
      )}
    </ThemeProvider>
  );
}
