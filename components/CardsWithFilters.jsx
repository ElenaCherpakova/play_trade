"use client";
import { useEffect, useState } from "react";
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, Box, Container } from "@mui/material";
// import { SelectChangeEvent } from "@mui/material";
import CardComponent from "./CardComponent";
import SelectComponent from "./SelectComponent";
// const currentCards = cards.slice(indexOfFirstItem, indexOfLastItem);
// const card = {
//   name: "Pikachu V - SWSH061",
//   price: "$ 0.42",
//   imageURL: "https://m.media-amazon.com/images/I/51skd-tjunL._AC_.jpg"
// };

// const handleChange = (event: SelectChangeEvent) => {
//   const newValue = event.target.value; // Assuming value is a string
//   setCategory(newValue);
// };
const CardsWithFilters = ({ card }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [cards, setCards] = useState([]);

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

  //   const value = [10, 20, 30, 40, 50, 60];
  const category = [" ", "Magic", "Pokemon", "Digimon", "Yu-Gi-Oh!", "Sport Card"];
  //   if (this.category === "Sport Card") {
  //     return ["near mint", "excellent", "very good", "poor"].includes(value.toLowerCase());
  //   } else {
  //     return ["near mint", "lightly played", "moderately played", "heavily played", "damaged"].includes(
  //       value.toLowerCase()
  //     );
  //   }
  const conditions = [" ", "near mint", "excellent", "very good", "poor"]; //Sport Card
  const conditions1 = ["near mint", "lightly played", "moderately played", "heavily played", "damaged"];

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

  // useEffect for Conditions

  useEffect(() => {
    const fetchConditions = async () => {
      if (selectedCategory === "Sport Card") {
        try {
          await getSportCardConditions(dispatchSportCardConditions);
        } catch (error) {
          setErrorMessage("");
          setErrorMessage("Error loading sport card conditions");
        }
      } else {
        try {
          await getGameCardConditions(dispatchGameCardConditions);
        } catch (error) {
          setErrorMessage("");
          setErrorMessage("Error loading game card conditions");
        }
      }
    };
    fetchConditions();
  }, [selectedCategory]);

  return (
    // <Container maxWidth="lg" container display="flex" flexDirection="row" spacing={2}>
    <Box container display="flex" sx={{ flexDirection: { xs: "column", sm: "row" } }}>
      <Grid container direction="column" xs={3}>
        <Grid item>
          {/* <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" margin={2} gap={2}> */}
          {/* <Box display="flex" flexDirection="column" margin={2} gap={2} alignItems={"flex-start"}> */}
          {/* Filters Section*/}
          <Typography variant="h4" align="center">
            Filters
          </Typography>
        </Grid>
        {/* <Grid container spacing={2} flexDirection="column">
          <Grid item xs={6} md={3} display="flex" flexDirection="column" padding="1rem"> */}
        {/* <Paper> */}
        {/* <Box display="flex" flexDirection="column" padding="1rem"> */}
        <Grid item container direction="column">
          <SelectComponent selectId="category" label="category" options={category} />
          <SelectComponent selectId="conditions" label="conditions" options={conditions} />
        </Grid>
      </Grid>
      {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="label">Category</InputLabel>
                <Select
                  labelId="label"
                  id="select"
                  value={selectedCategory}
                  onChange={handleSelectCategoryChange}
                  label="Category">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Magic</MenuItem>
                  <MenuItem value={20}>Pokemon</MenuItem>
                  <MenuItem value={30}>Digimon</MenuItem>
                  <MenuItem value={30}>Yu-Gi-Oh!</MenuItem>
                  <MenuItem value={30}>Sport Card</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="label">Conditions</InputLabel>
                <Select
                  labelId="label"
                  id="select"
                  value={selectedConditions}
                  onChange={handleSelectConditionsChange}
                  label="Conditions">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>near mint</MenuItem>
                  <MenuItem value={20}>excellent</MenuItem>
                  <MenuItem value={30}>very good</MenuItem>
                  <MenuItem value={30}>poor</MenuItem>
                </Select>
              </FormControl> */}

      <Grid container alignItems="center" columns={{ xs: 4, sm: 8, md: 12 }}>
        {cards.map(card => (
          <Grid
            item
            // margin={1}
            // gap={1}
            key={card._id}
            xs={4}
            //   align="center"
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{ padding: "0", margin: "1" }}>
            <CardComponent card={card} key={card._id} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export { CardsWithFilters };
