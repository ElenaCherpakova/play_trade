"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { TextField, Button } from "@mui/material";
import { theme as importedTheme } from "/styles/theme.js";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { Box, Backdrop, CircularProgress, Typography } from "@mui/material";
import useAuthUser from "@/store/useAuthUser";

export default function Profile() {
  const theme = useTheme();
  const { data: session, update: updateSession } = useSession();
  const updateProfile = useAuthUser(state => state.updateProfile);

  const [location, setLocation] = useState("");
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleBecomeSeller = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await updateProfile({ location, type: "seller" });

      if (data && data.isSeller && data.address) {
        updateSession({
          ...session,
          user: { ...session.user, isSeller: data.isSeller, address: data.address }
        });
        setShowLocationForm(false);
        setError("");
        setSuccess(data.message);
      } else {
        setError(data.message || "Failed to become a seller");
      }
    } catch (error) {
      setError(data.message || "An error occurred while updating");
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={importedTheme}>
      <Typography
        variant="h4"
        align="center"
        color="primary"
        sx={{
          flexGrow: 0,
          p: 0,
          mt: 5
        }}>
        Profile of {session?.user?.name}!
      </Typography>

      {!session?.user?.isSeller && !showLocationForm && (
        <Button
          onClick={() => setShowLocationForm(true)}
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
      )}
      {showLocationForm && (
        <Box component="form" onSubmit={handleBecomeSeller}>
          <TextField
            onChange={e => setLocation(e.target.value)}
            name="location"
            label="Location"
            placeholder="e.g., Canada, Toronto"
            value={location}
            sx={{ mb: 2 }}
            required
          />
          <Button
            type="submit"
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
        </Box>
      )}
      <Link href="/profile/update">Edit User Profile</Link>
      <Backdrop
        sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1, backdropFilter: "blur(2px)" }}
        open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
}
