"use client";
import React from "react";
import Link from "next/link";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function CardsHome() {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{ p: { xs: 2, sm: 0 }, flexDirection: { xs: "column", sm: "row" } }}>
      {["Magic", "Pokemon", "Digimon", "YuGiOh", "Sport Card"].map((cardType, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={index} sx={{ height: "100%" }}>
          <Link href={`/market?type=${encodeURIComponent(cardType)}`} style={{ textDecoration: "none"}}>
            <Card sx={{ display: "flex", flexDirection: "column", height: "200px", width: "60%" }}>
              <CardMedia
                component="img"
                sx={{ height: "80%", objectFit: "cover" }}
                image={`/cards/${cardType === "Sport Card" ? "sport" : cardType.toLowerCase().replace(/\s+/g, '')}.png`}
                alt={cardType}
              />
              <CardContent>
                <Typography variant="h8" component="div" style={{ textAlign: "center"}}>
                  {cardType}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}