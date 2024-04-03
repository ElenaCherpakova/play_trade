"use client";
import React, { useState, useEffect } from "react";
import { theme } from "/styles/theme.js";
import { Grid, Typography, Paper, Divider, Box, Checkbox } from "@mui/material";
import { useRouter } from "next/navigation";
import WhatshotIcon from "@mui/icons-material/Whatshot";

// Custom hook for countdown timer
function useCountdown(initialTime, onEnd) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(timeLeft => {
        if (timeLeft === 0) {
          onEnd();
          return 0;
        } else {
          return timeLeft - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onEnd]);

  return timeLeft;
}

export default function ShoppingCart({ children }) {
  const router = useRouter();
  //const id = router.query ? router.query.id : null;//get id from query  for cart item

  // Hardcoded cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Destiny ",
      description:
        " You can reveal the top card of your Deck, and if it is a Normal Spell Card, send it to the Graveyard, otherwise place it on the bottom of your Deck",
      price: 1.15,
      img: "magic.png",
      checked: false,
      quantity: 1 
    },
    {
      id: 2,
      name: "Gatomon",
      description: "When one of your other Digimon is deleted, this Digimon gets +3000 DP for the turn.",
      price: 0.1,
      img: "yugioh.png",
      checked: false,
      quantity: 1 
    }
    // Add more items as needed
  ]);

  //check if cartItems is empty and count in the cart
  const handleCheck = index => {
    const newCartItems = [...cartItems];
    newCartItems[index].checked = !newCartItems[index].checked;
    setCartItems(newCartItems);
  };

  //Subtotal section
  const itemsCount = cartItems.filter(item => item.checked).length;
  const totalPrice = cartItems.reduce((total, item) => (item.checked ? total + item.price : total), 0);

  // Remove item from cart
  const removeItemFromCart = itemId => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Paper sx={{ mt: 3, ml: 3, padding: theme.spacing(2), marginBottom: theme.spacing(2) }}>
          <Grid container justifyContent="space-between" alignItems="flex-start">
            <Typography variant="h2" textAlign="left">
              Shopping cart
            </Typography>
          </Grid>
          <Divider />
          {/* Check if items exist and map over them to render each item for future adding to the cart as well*/}
          {cartItems &&
            cartItems.map((item, index) => {
              const timeLeft = useCountdown(15 * 60, () =>
                setCartItems(prevItems => prevItems.filter(prevItem => prevItem.id !== item.id))
              );
              const minutes = Math.floor(timeLeft / 60);
              const seconds = timeLeft % 60;

              return (
                <React.Fragment key={item.id}>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {/* Image and Checkbox */}
                    <Grid item xs={12} sm={3}>
                      <Box display="flex" alignItems="center">
                        <Checkbox checked={item.checked} onChange={() => handleCheck(index)} />
                        <img src={`/cards/${item.img}`} alt={item.name} style={{ width: 100, height: 120 }} />
                      </Box>
                    </Grid>
                    {/* Description */}
                    <Grid item xs={12} sm={7}>
                      <Box display="flex" flexDirection="column" alignItems="flex-start" sx={{ height: "100%", pl: 3 }}>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="h3">{item.description}</Typography>
                        <Box display="flex" alignItems="center">
                          <WhatshotIcon color="error" />
                          <Typography
                            variant="h3"
                            style={{ color: theme.palette.error.main, marginLeft: theme.spacing(1) }}>
                            {`Your special deal reserved for ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
                          </Typography>                          
                        </Box>
                      </Box>
                    </Grid>
                    {/* Price */}
                    <Grid item xs={12} sm={2}>
                      <Box display="flex" justifyContent="flex-end">
                        <Typography variant="h6">{`Price: ${item.price}`}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  {index < cartItems.length - 1 && <Divider />} {/* Don't render a divider after the last item */}
                </React.Fragment>
              );
            })}
        </Paper>
      </Grid>
      {/* Subtotal section */}
      <Grid item xs={4}>
        <Paper sx={{ mt: 3, mr: 3, padding: theme.spacing(2), marginBottom: theme.spacing(2) }}>
          <Typography variant="h2">Subtotal</Typography>
          <Divider />
          <Typography variant="h3" sx={{ mt: 3 }}>
            Items ({itemsCount})
          </Typography>
          <Typography variant="h3" sx={{ mt: 3, mb: 2 }}>
            Total Price: {totalPrice}
          </Typography>
          {children} {/* Render the children (checkbox)passed to the ShoppingCart component */}
        </Paper>
      </Grid>
    </Grid>
  );
}
