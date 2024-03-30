"use client";
import { useEffect, useState } from "react";
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, Box, Container } from "@mui/material";
import CardComponent from "./CardComponent";
import SelectComponent from "./SelectComponent";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const CardsWithFilters = ({ id }) => {
  const [cards, setCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedConditions, setSelectedConditions] = useState("");

  const handleSelectCategoryChange = event => {
    const selectedCardCategory = event.target.value;
    setSelectedCategory(selectedCardCategory);
  };
  const handleSelectConditionsChange = event => {
    const selectedCardConditions = event.target.value;
    setSelectedConditions(selectedCardConditions);
  };

  // useEffect getAllCards
  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch("/api/cards");
        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }
        const data = await response.json();
        setCards(data.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    }

    fetchCards();
  }, []);

  const category = [" ", "Magic", "Pokemon", "Digimon", "Yu-Gi-Oh!", "Sport Card"];

  const conditions = [" ", "near mint", "excellent", "very good", "poor"]; //Sport Card
  const conditions1 = ["near mint", "lightly played", "moderately played", "heavily played", "damaged"]; //Other cards

  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box display="flex" sx={{ gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
          {/* Filters Section*/}
          <Grid container direction="column" xs={12} md={3} lg={3} sx={{ p: 2 }}>
            <Grid item>
              <Typography variant="h4" align="center">
                Filters
              </Typography>
            </Grid>
            <Grid item container direction="column">
              <SelectComponent selectId="category" label="category" options={category} />
              <SelectComponent selectId="conditions" label="conditions" options={conditions} />
            </Grid>
          </Grid>
          {/* Cards section */}
          <Grid container alignItems="center" sx={{ alignItems: "center", gap: 1 }}>
            {cards.map(card => (
              <Grid
                item
                key={card._id}
                xs={12}
                md={4}
                lg={3}
                align="center"
                alignItems="center"
                justifyContent="center"
                sx={{ p: 0, m: 1 }}>
                <CardComponent card={card} key={card._id} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Stack spacing={2} alignItems="center">
          <Pagination count={10} shape="rounded" />
        </Stack>
      </Box>
    </>
  );
};
export { CardsWithFilters };
