"use client";
import { useEffect, useState } from "react";
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, Box, Container } from "@mui/material";
// import { SelectChangeEvent } from "@mui/material";
import CardComponent from "./CardComponent";
import SelectComponent from "./SelectComponent";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { fetchData } from "next-auth/client/_utils";
import { fetchAllCardsData } from "../utils/fetchData";

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
const CardsWithFilters = ({ id }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [openError, setOpenError] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedConditions, setSelectedConditions] = useState("");
  const [data, setData] = useState(null);
  //

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAllCardsData(id);
        // setData(cardData);
        setOpenError(false); // Reset error state if data is fetched successfully
      } catch (error) {
        // console.error(error); // Log the actual error
        setOpenError(true);
        setErrorMessage(error.message || "Unknown error");
      }
    };
    fetchData();
  }, []);

  const handleSelectCategoryChange = event => {
    const selectedCardCategory = event.target.value;
    setSelectedCategory(selectedCardCategory);
  };
  const handleSelectConditionsChange = event => {
    const selectedCardConditions = event.target.value;
    setSelectedConditions(selectedCardConditions);
  };

  // useEffect getAllCards
  // useEffect(() => {
  //   async function fetchCards() {
  //     try {
  //       const response = await fetch("/api/cards");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch cards");
  //       }
  //       const data = await response.json();
  //       setCards(data.data);
  //     } catch (error) {
  //       console.error("Error fetching cards:", error);
  //     }
  //   }

  //   fetchCards();
  // }, []);

  // useEffect for cards by category

  // useEffect for Conditions

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

  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box display="flex" sx={{ gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
          {/* <Box display="flex" flexDirection="column" xs={12} md={4} lg={5}> */}
          <Grid container direction="column" xs={12} md={3} lg={3} sx={{ p: 2 }}>
            <Grid item>
              {/* <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" margin={2} gap={2}> */}
              {/* <Box display="flex" flexDirection="column" margin={2} gap={2} alignItems={"flex-start"}> */}
              {/* Filters Section*/}
              <Typography variant="h4" align="center">
                Filters
              </Typography>
            </Grid>
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

          <Grid container alignItems="center" sx={{ alignItems: "center", gap: 1 }}>
            {cards.map(card => (
              <Grid
                item
                key={card._id}
                xs={12}
                md={4}
                lg={3}
                //   columns={{ xs: 12, sm: 8, md: 6 }}
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
