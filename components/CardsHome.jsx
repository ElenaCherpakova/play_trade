"use client";
import React from "react";
import Link from "next/link";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function CardsHome() {
  const categories = ["Magic", "Pokemon", "Digimon", "Yu-Gi-Oh!", "Sport Card"];
  return (
    <Grid container display="flex" spacing={2} justifyContent="center" sx={{ p: { xs: 2, sm: 0 } }}>
      {categories.map((category, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={index} display="flex" justifyContent="center">
          <Link href={`/market?category=${encodeURIComponent(category)}`} passHref>
            <Card sx={{ display: "flex", flexDirection: "column", height: "150px", width: "fit-content" }}>
              <CardContent sx={{ p: 0 }}>
                <Typography sx={{ fontSize: "1rem", textAlign: "center", fontWeight: "bold" }}>{category}</Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{ height: "100%", objectFit: "contain" }}
                image={`/cards/${category === "Sport Card" ? "sport" : category.toLowerCase().replace(/\W+/g, "")}.png`}
                alt={category}
              />
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
