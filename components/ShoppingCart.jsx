"use client";
import React, { useContext } from "react";
import { theme } from "/styles/theme.js";
import { Grid, Typography, Paper, Divider } from "@mui/material";
import { CartContext } from "/app/cart/page"; // Import the CartContext 
import { useRouter } from "next/navigation";

export default function ShoppingCart({ children }) {
  // State for cart items
  const { cartItems, addToCart } = useContext(CartContext);
  const router = useRouter();

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Paper sx={{ mt: 3, ml: 3, padding: theme.spacing(2), marginBottom: theme.spacing(2) }}>
          <Grid container justifyContent="space-between" alignItems="flex-start">
            <Typography variant="h2" textAlign="left">
              Shopping card
            </Typography>
          </Grid>
          <Divider />
          {/* Check if items exist and map over them to render each item */}
          {cartItems &&
            cartItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <Grid item>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1">{item.description}</Typography>
                  <Typography variant="body2">{`Price: ${item.price}`}</Typography>
                </Grid>
                {index < cartItems.length - 1 && <Divider />} {/* Don't render a divider after the last item */}
              </React.Fragment>
            ))}
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{ mt: 3, mr: 3, padding: theme.spacing(2), marginBottom: theme.spacing(2) }}>
          <Typography variant="h2">Subtotal</Typography>
           {children}   {/*render checkout button        */}
        </Paper>
      </Grid>
    </Grid>
  );
}