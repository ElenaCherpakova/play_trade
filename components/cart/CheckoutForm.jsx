"use client";
import React, { useState } from "react";

import {
  useStripe,
  useElements,
  CardElement,
  LinkAuthenticationElement
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

import { Backdrop, Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useCartStore } from "@/store/cartStore";

const CheckoutForm = () => {
  const { totalPrice, clearCart } = useCartStore(state => ({
    clearCart: state.clearCart,
    totalPrice: state.totalPrice
  }));

  const router = useRouter();
  const theme = useTheme();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    if (!stripe || !elements) {
      setError("Stripe has not fully loaded yet. Try again in a moment.");
      return;
    }

    setLoading(true);
    const cardElement = elements?.getElement("card");

    try {
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(totalPrice)
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      const res = await stripe?.confirmCardPayment(data?.intent, {
        payment_method: { card: cardElement }
      });
      if (res.error) {
        if (res.error.type === "card_error" || res.error.type === "Validation_error") {
          setError(res.error.message);
          setLoading(false);
          return;
        } else {
          setError("An unknown error occurred. Please try again");
        }
      }
      const status = res?.paymentIntent?.status;
      if (status === "succeeded") {
        router.push("/stripe/purchase-success");
        clearCart();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
        width: "100%",
        maxWidth: 480
      }}>
      <Paper
        sx={{
          p: 2,
          mt: 3,
          width: "100%"
        }}>
        <CardElement />
        {loading ? (
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: theme => theme.zIndex.drawer + 1,
              backdropFilter: "blur(2px)"
            }}
            open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Button type="submit" disabled={!stripe} fullWidth sx={{ mt: 4 }}>
            Pay ${totalPrice}
          </Button>
        )}
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default CheckoutForm;
