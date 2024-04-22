"use client";
import React from "react";
import CardsHome from "/components/CardsHome";
import { useRouter } from "next/navigation";
import { Box, Button, useTheme, Grid } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const theme = useTheme(); // Access the theme

  return (
    <Grid container direction="column">
      <Grid item xs={12} sm={12} md={6}>
        <Box
          height="100vh"
          position="relative"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          sx={{
            margin: 0,
            padding: 0,
            "&::before": {
              content: '""',
              position: "absolute",
              zIndex: -1
            }
          }}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: -1
            }}>
            <img
              src="/landing_page.jpeg"
              alt="Landing page with a background image of characters from different card games"
              style={{ objectFit: "cover", width: "100%", height: "100%", opacity: 0.75}}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              position: "relative",
              height: "100%",
            }}>
            <Button
              variant="contained"
              color="accent"
              onClick={() => router.push("/market")}
              sx={{
                position: "absolute",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: theme.typography.h4.fontSize,
                padding: theme.spacing(1),
                letterSpacing: "10px",
                fontWeight: "bold",
                paddingLeft: theme.spacing(2),
                borderRadius: theme.shape.borderRadius, // Use the theme border radius
                "&:hover": {
                  backgroundColor: theme.palette.background.paper
                }
              }}>
              START
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%", pt: 0, mt: 1, mb: 1 }}
        >
            <CardsHome />
        </Box>
      </Grid>
    </Grid>
  );
}