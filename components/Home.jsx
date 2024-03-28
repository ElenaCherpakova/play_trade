"use client";
import React from "react";
import CardsHome from "/components/CardsHome";
import { useRouter } from "next/navigation";
import { Box, Button, Grid } from "@mui/material";

export default function Home() {
  const router = useRouter();
  return (
    //entire screen
    <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-between">
      {/* part with background image and button */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifycontent="center"
        flexGrow="1"
        flex="0.7"
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
        <Button
          variant="contained"
          color="accent"
          onClick={() => router.push("/market")}
          sx={{
            "position": "absolute",
            "top": "50%",
            "left": "50%",
            "transform": "translate(-50%, -50%)",
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
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="flex-end"
        flex="0.3"
        sx={{ height: { xs: "5vh", sm: "5vh" }, pt: 0 }}>
        <CardsHome />
      </Grid>
    </Box>
  );
}
