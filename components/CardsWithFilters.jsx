"use client";
import { useState } from "react";
import { Grid, Paper, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import CardComponent from "./CardComponent";

// const currentCards = cards.slice(indexOfFirstItem, indexOfLastItem);
const card = {
  name: "Pikachu V - SWSH061",
  price: "$ 0.42",
  imageURL: "https://m.media-amazon.com/images/I/51skd-tjunL._AC_.jpg"
};

const [category, setCategory] = useState("");

// const handleChange = (event: SelectChangeEvent) => {
//   const newValue = event.target.value; // Assuming value is a string
//   setCategory(newValue);
// };
const CardsWithFilters = ({ cards }) => {
  return (
    <>
      <Grid container spacing={2}>
        {/* Filters Section*/}
        <Grid item xs={6} md={3}>
          <Paper>
            <Typography variant="h4" align="center">
              Filters
            </Typography>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="label">Category</InputLabel>
              <Select labelId="label" id="select" value={category} onChange={handleChange} label="Category">
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
