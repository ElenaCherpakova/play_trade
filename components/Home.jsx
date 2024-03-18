"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";

export default function Home() {
  const router = useRouter();
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      onClick={() => router.push("/market")}
      sx={{
        "position": "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage: "url(/landing_page.jpeg)",
          backgroundSize: "cover", // Changed from "contain" to "cover" The background image is scaled to cover the entire area of the pseudo-element
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.7,
          zIndex: -1
        }
      }}>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" flexGrow={1}>
        <Typography variant="h2" color="primary" gutterBottom></Typography>
        <Button
          variant="contained"
          color="accent"
          sx={{
            "fontSize": {
              xs: "1em",
              sm: "1.5em",
              md: "2em",
              lg: "2.5em"
            },
            "fontWeight": "bold",
            "padding": {
              xs: "1px 16px",
              sm: "4px 24px",
              md: "4px 32px",
              lg: "6px 30px"
            },
            "letterSpacing": "3px",
            "borderRadius": "20px",
            "&:hover": {
              backgroundColor: "white"
            }
          }}>
          START
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" height="30vh" bgcolor="background.paper">
        <p>Future paginated cards will go here</p>
      </Box>
    </Box>
  );
}
