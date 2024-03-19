import React from "react";
import {
  Box,
  Button,
  InputLabel,
  FormControl,
  TextField,
  MenuItem,
  Select,
  Typography,
  Avatar,
  OutlinedInput,
  Paper,
  Grid
} from "@mui/material";
// import Image from "next/image";
/**
 *
 * @param {value} Object
 * @param {onSubmitForm} Function
 */
export default function CardForm({ value, onSubmitForm }) {
  const image = "plus-12700001_1920.png";
  return (
    <>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin={2}
        // width="75%"
        // height="100%"
        gap={2}

        // onSubmit={e => {
        //   e.preventDefault();
        //   handleSubmit(e);
        // }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {/* <Box
              // display="flex"
              gap={2}
              // alignItems="center"
            > */}
            <Paper
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}
              sx={{ overflow: "hidden", aspectRatio: "3/4" }}>
              {/*eslint-disable-next-line @next/next/no-img-element*/}
              <OutlinedInput
                fullWidth
                variant="outlined"
                type="file"
                name="eventImage"
                accept="image/png, image/jpeg, image/jpg"
              />
              {/* <Typography>Click Choose File to upload image</Typography> */}
              {/* <img
                src="/plus-1270001_1920.png"
                margin={value ? "auto" : "4px"}
                // height={value ? "100%" : "75%"}
                style={{
                  objectFit: "cover",
                  width: "-webkit-fill-available"
                }} 
                // fill
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="Card image"
                // style={{ objectFit: "contain" }}
              />*/}
            </Paper>
            {/* <OutlinedInput
              fullWidth
              variant="outlined"
              type="file"
              name="eventImage"
              accept="image/png, image/jpeg, image/jpg"
            /> */}
            {/* </Box> */}
          </Grid>
          <Grid item xs={8}>
            <Typography textAlign="center" variant="h3">
              {/* {value ? "Edit" : "Add"} sky event */}
              Edit/Add card
            </Typography>
            <FormControl required fullWidth>
              <InputLabel id="eventType">event type</InputLabel>
              <Select
                fullWidth
                name="event"
                labelId="eventType"
                id="events"
                label="event type"
                // defaultValue={value?.event || ""}
              >
                <MenuItem value="comet">Comet</MenuItem>
                <MenuItem value="asteroid">Asteroid</MenuItem>
                <MenuItem value="meteor_shower">Meteor Shower</MenuItem>
                <MenuItem value="solar_eclipse">Solar Eclipse</MenuItem>
                <MenuItem value="lunar_eclipse">Lunar Eclipse</MenuItem>
              </Select>
            </FormControl>
            <TextField
              required
              fullWidth
              name="name"
              label="event name"
              // defaultValue={value?.name || ""}
            />
            <TextField
              fullWidth
              name="date"
              type="date"
              label="event date"
              // defaultValue={dateValue}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              name="description"
              multiline
              rows={5}
              // defaultValue={value?.description || ""}
              label="description"
            />
          </Grid>
        </Grid>
        <Button fullWidth type="submit">
          Save
        </Button>
      </Box>
    </>
  );
}
