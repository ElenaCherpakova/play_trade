"use client";
import { useEffect, useState } from "react";
import { Grid, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
// import { SelectChangeEvent } from "@mui/material";
import CardComponent from "./CardComponent";
import { create } from "zustand";

// const currentCards = cards.slice(indexOfFirstItem, indexOfLastItem);
const card = {
  name: "Pikachu V - SWSH061",
  price: "$ 0.42",
  imageURL: "https://m.media-amazon.com/images/I/51skd-tjunL._AC_.jpg"
};

// const handleChange = (event: SelectChangeEvent) => {
//   const newValue = event.target.value; // Assuming value is a string
//   setCategory(newValue);
// };
const CardsWithFilters = ({ cards }) => {
  const [errorMessage, setErrorMessage] = useState("");

  //   const [selectedCategory, setSelectedCategory] = useState("");
  //   const [selectedConditions, setSelectedConditions] = useState("");

  //   const handleSelectCategoryChange = event => {
  //     const selectedCardCategory = event.target.value;
  //     setSelectedCategory(selectedCardCategory);
  //   };
  //   const handleSelectConditionsChange = event => {
  //     const selectedCardConditions = event.target.value;
  //     setSelectedConditions(selectedCardConditions);
  //   };
  //Use the Store
  const useSelectStore = create(set => ({
    selectStates: {},
    setSelectState: (selectId, state) =>
      set(prevState => ({
        selectStates: {
          ...prevState.selectStates,
          [selectId]: state
        }
      }))
  }));
  // useEffect for Conditions

  //   useEffect(() => {
  //     const fetchConditions = async () => {
  //       if (selectedCategory === "Sport Card") {
  //         try {
  //           await getSportCardConditions(dispatchSportCardConditions);
  //         } catch (error) {
  //           setErrorMessage("");
  //           setErrorMessage("Error loading sport card conditions");
  //         }
  //       } else {
  //         try {
  //           await getGameCardConditions(dispatchGameCardConditions);
  //         } catch (error) {
  //           setErrorMessage("");
  //           setErrorMessage("Error loading game card conditions");
  //         }
  //       }
  //     };
  //     fetchConditions();
  //   }, [selectedCategory]);

  return (
    <>
      <Grid container spacing={2}>
        {/* Filters Section*/}

        <Grid item xs={6} md={3}>
          <Paper>
            <Typography variant="h4" align="center">
              Filters
            </Typography>
            <Box display="flex" flexDirection="column" padding="1rem">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
              </FormControl>
            </Box>
          </Paper>
        </Grid>
        {/* Cards Section*/}
        <Grid item xs={6} md={9}>
          <Paper>
            <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
              Cards
            </Typography>
            <Grid
              container
              //   direction="row"
              alignItems="center"
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}>
              {/* {cards.map((card, idx) => ( */}
              <Grid
                item
                //    key={idx}
                xs={4}
                align="center"
                sx={{ p: 2 }}>
                <CardComponent card={card} />
                {/* {Object.values(currentCards).map((pet, idx) => (
                  <Col className="mb-4 ps-0 pe-0" key={idx}>
                    <div>
                      <CardComponent key={idx} card={card} />
                    </div>
                  </Col>
                ))} */}
              </Grid>
              {/* ))} */}
              <Grid item xs={4} align="center" sx={{ p: 2 }}>
                <CardComponent card={card} />
              </Grid>
              <Grid item xs={4} align="center" sx={{ p: 2 }}>
                <CardComponent card={card} />
              </Grid>
              <Grid item xs={4} align="center" sx={{ p: 2 }}>
                <CardComponent card={card} />
              </Grid>
              <Grid item xs={4} align="center" sx={{ p: 2 }}>
                <CardComponent card={card} />
              </Grid>
              <Grid item xs={4} align="center" sx={{ p: 2 }}>
                <CardComponent card={card} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export { CardsWithFilters };
