import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import Link from "next/link";

const getCurrentYear = () => {
  const date = new Date().getFullYear();
  return date;
};

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#14213D",
        padding: "1rem"
      }}>
      <Grid container justifyContent="space-between">
        <Grid item xs={12}>
          {/* Copyright text */}
          <Typography variant="body2" color="#FFFFFF">{` © ${getCurrentYear()}  PLAYTRADE`}</Typography>
        </Grid>
        <Grid item xs={12}>
          {/* List of links */}
          <Typography variant="body2" color="#FFFFFF" textAlign="right">
            <Link href="/about" style={{ marginRight: "1rem" }}>
              About
            </Link>
            <Link href="/team" style={{ marginRight: "1rem" }}>
              Our Team
            </Link>
            <Link href="/messages">Contact Us</Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
