"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { theme,useTheme } from "/styles/theme.js";
import { Grid, Typography, Paper, Divider, Box, Checkbox, Button, TextField } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import useMediaQuery from '@mui/material/useMediaQuery';


// Custom hook for countdown timer interval
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

// Function for counting down time
function CartItem({ item, index, handleCheck, removeItemFromCart, handleQuantityChange, cartItems }) {
  const isSmallScreen = useMediaQuery('(min-width:600px) and (max-width:920px)');
  const timeLeft = useCountdown(15 * 60, () => removeItemFromCart(item.id));
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;


  return (
    <React.Fragment key={item.id}>
      <Grid container mt={2} >
        {/* Checkbox and img */}
        <Grid item xs={12} sm={2} >
          <Box display="flex" alignItems="center">
            <Checkbox checked={item.checked} onChange={() => handleCheck(index)} />
            <img src={`/cards/${item.img}`} alt={item.name} style={{ width: 100, height: 120 }} />
          </Box>
        </Grid>
        {/* Name, Description, Deal, Quantity, */}
        <Grid item xs={12} sm={8}>
          <Box display="flex" flexDirection="column" alignItems="flex-start" sx={{ height: "100%",  ml: isSmallScreen ? 10 : 5 }}>
            <Typography variant="h6" fontWeight="fontWeightBold">
              {item.name}
            </Typography>
            <Typography variant="h3">{item.description}</Typography>
            <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
              <WhatshotIcon color="error" />
              <Typography
                variant="h4"
                fontWeight="fontWeightBold"
                style={{ color: theme.palette.error.main, marginLeft: theme.spacing(1) }}>
                {`Your special deal reserved for ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
              <TextField
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                value={item.quantity}
                onChange={e => handleQuantityChange(index, e.target.value)}
                size="small"
                sx={{ width: "75px", mr: 2 }}
              />
              <Button onClick={() => removeItemFromCart(item.id)}>Remove</Button>
            </Box>
          </Box>
        </Grid>
        {/* Price */}
        <Grid item xs={12} sm={2}>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Typography>Price: {item.price}</Typography>
          </Box>
        </Grid>
      </Grid>
      {index < cartItems.length - 1 && <Divider />} {/* Don't render a divider after the last item */}
    </React.Fragment>
  );
}

export default function Cart() {  
  const matches = useMediaQuery('(max-width:600px)');
  const router = useRouter();
  const [checkoutUrl, setCheckoutUrl] = useState(() => () => {});
  
  // TODO//const id = router.query ? router.query.id : null;//get id from query  for cart item

  // Declare cartItems variable
  // Remove the redundant declaration of 'cartItems'

  useEffect(() => {
    setCheckoutUrl(() => () => router.push("/cart/checkout"));
  }, [router]);

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
      quantity: 2
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
  const itemsCount = cartItems.reduce((total, item) => (item.checked ? total + item.quantity : total), 0);
  const totalPrice = cartItems.reduce((total, item) => (item.checked ? total + item.price * item.quantity : total), 0);

  // Remove item from cart
  const removeItemFromCart = itemId => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Changing qantity of the item in the cart
  const handleQuantityChange = (index, quantity) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = Number(quantity);
    setCartItems(newCartItems);
  };

  return (
    <Grid container spacing={2} direction={matches ? "column-reverse" : "row"}>
      <Grid item xs={12} sm={8}>
        <Paper sx={{ mt: 3, ml: 3, padding: theme.spacing(2), marginBottom: theme.spacing(2) }}>
          <Grid container justifyContent="space-between" alignItems="flex-start">
            <Typography variant="h2" textAlign="left">
              Shopping cart
            </Typography>
          </Grid>
          <Divider />
          {/* Check if items exist and map over them to render each item for future adding to the cart as well*/}
          {cartItems &&
            cartItems.map((item, index) => (
              <CartItem
                key={item.id}
                item={item}
                index={index}
                handleCheck={handleCheck}
                removeItemFromCart={removeItemFromCart}
                handleQuantityChange={handleQuantityChange}
                cartItems={cartItems}
              />
            ))}
        </Paper>
      </Grid>
      {/* Subtotal section */}
      <Grid item xs={12} sm={4}>
        <Paper sx={{ mt: 3, mr: 3, ml:3, padding: theme.spacing(2), marginBottom: theme.spacing(2) }}>
          <Typography variant={theme.breakpoints.down("sm") ? "h6" : "h2"}>Subtotal</Typography>
          <Divider />
          <Typography variant={theme.breakpoints.down("sm") ? "h6" : "h3"} sx={{ mt: 3 }}>
            Items ({itemsCount})
          </Typography>
          <Typography variant="h3" sx={{ mt: 3, mb: 2 }}>
            Total Price: {totalPrice.toFixed(2)}
          </Typography>
          <Button
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
  );
}
