import React, { useState, useEffect } from "react";

import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { theme } from "/styles/theme.js";
import { Box, Breadcrumbs, Grid, Typography, Link, Paper, Divider, Button, useMediaQuery } from "@mui/material";
import CartItem from "./CartItem";

export default function Cart() {
  const { cartItems, removeItemFromCart, handleCheck, itemsCount, totalPrice } = useCartStore(
    state => ({
      cartItems: state.cartItems,
      removeItemFromCart: state.removeItemFromCart,
      handleCheck: state.handleCheck,
      itemsCount: state.itemsCount,
      totalPrice: state.totalPrice
    })
  );

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const [checkoutUrl, setCheckoutUrl] = useState(() => () => {});

  useEffect(() => {
    setCheckoutUrl(() => () => {
      router.push("/cart/checkout");
    });
  }, [router]);

  return (
    <Box sx={{ ml: theme.spacing(2) }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, mb: 3 }}>
        <Link color="inherit" href="/" onClick={() => router.push("/")}>
          Home
        </Link>
        <Link color="inherit" href="/market" onClick={() => router.push("/")}>
          Market
        </Link>
        <Typography color="text.primary">Shopping Cart</Typography>
      </Breadcrumbs>

      <Grid container spacing={2} direction={isSmallScreen ? "column-reverse" : "row"}>
        <Grid item xs={12} sm={8}>
          <Paper sx={{ mt: 3, mr: 3, ml: 3, padding: theme.spacing(2), marginBottom: theme.spacing(2) }}>
            <Grid container justifyContent="space-between" alignItems="flex-start">
              <Typography variant="body3" textAlign="left" fontWeight="bold">
                Shopping cart
              </Typography>
            </Grid>
            <Divider />
            {/* Check if items exist and map over them to render each item for future adding to the cart as well*/}
            {cartItems?.map((item, index) => (
              <CartItem
                key={item._id}
                item={item}
                index={index}
                handleCheck={handleCheck}
                removeItemFromCart={removeItemFromCart}
                cartItems={cartItems}
              />
            ))}
          </Paper>
        </Grid>
        {/* Subtotal section */}
        <Grid item xs={12} sm={4}>
          <Paper sx={{ mt: 3, mr: 3, ml: 3, padding: theme.spacing(2), marginBottom: theme.spacing(2) }}>
            <Typography variant="body3" textAlign="left" fontWeight="bold">
              Subtotal
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ mt: 3 }}>
              Items ({itemsCount})
            </Typography>
            <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
              Total Price: {totalPrice}
            </Typography>
            <Button
              disabled={cartItems.length === 0}
              variant="contained"
              color="accent"
              onClick={checkoutUrl}
              fullWidth
              size={theme.breakpoints.down("sm") ? "small" : "large"}>
              Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
