import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import Link from "next/link";

const getCurrentYear = () => {
  const date = new Date().getFullYear();
  return date;
};

const Footer = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        width: "100%",
        height: "auto",
        padding: "1rem",
        bgcolor: "primary.main"
      }}>
      <Grid item xs={12} sm={6} container justifyContent="flex-start" alignItems="center">
        {/* Copyright text */}
        <Typography
          variant="body2"
          color="background.paper"
          marginLeft="1rem">{` © ${getCurrentYear()}  PLAYTRADE`}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} container justifyContent="flex-end" alignItems="center">
        {/* List of links */}

        <ul style={{ listStyle: "none", margin: 0, display: "flex" }}>
          <li style={{ marginRight: "1rem" }}>
            <Link href="/about">
              {/* <Typography component="span" variant="body1" color="primary" underline="none" cursor="pointer"> */}
              {/* <Box component="span" cursor="pointer" color="#FFFFFF" sx={{ textDecoration: "none" }}> */}
              About
              {/* </Box> */}
              {/* </Typography> */}
            </Link>
          </li>
          <li style={{ marginRight: "1rem" }}>
            <Link href="/team">Our Team</Link>
          </li>
          <li style={{ marginRight: "1rem" }}>
            <Link href="/messages">Contact Us</Link>
          </li>
        </ul>
      </Grid>
    </Grid>
  );
};

export default Footer;
