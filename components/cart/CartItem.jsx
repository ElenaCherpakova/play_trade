import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { theme } from "/styles/theme.js";
import {
  Grid,
  Typography,
  Divider,
  Checkbox,
  Button,
  TextField,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  Box
} from "@mui/material";
import Image from "next/image";

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
export default function CartItem({ item, index, handleCheck, removeItemFromCart, handleQuantityChange, cartItems }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const timeLeft = useCountdown(1 * 60, () => setOpen(true));
  {
    /* For the presentation should be changed for useCountdown(15 * 60, */
  }
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // handleClose is to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // handleCheckout - to navigate to the checkout page
  const handleCheckout = () => {
    router.push("/cart/checkout");
    handleClose();
  };

  //handleRemove - to remove the item from the cart
  const handleRemove = () => {
    removeItemFromCart(item._id);
    handleClose();
  };

  return (
    <React.Fragment key={item._id}>
      <Grid container sx={{ mt: 2, mb: 1, justifyContent: "flex-start" }} spacing={2}>
        {/* Checkbox, img, and Price */}
        <Grid item xs={12} sm={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box>
              <Checkbox checked={item.checked} onChange={() => handleCheck(index)} />
            </Box>
            <Image src={item.imageURL} alt={item.name} width={100} height={120} />
          </Grid>
          <Grid item xs={12} sx={{ mt: 1, pl: 5, display: "flex", textAlign: "center", textAlign: "center" }}>
            <Typography>Price:{item.price}</Typography>
          </Grid>
        </Grid>

        {/* Deal, Name, Description, Quantity */}
        <Grid item xs={12} sm={8} sx={{ display: "flex", flexDirection: "column" }}>
          {/* Countdown Deal */}
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", mt: 1, color: theme.palette.error.main }}>
            <WhatshotIcon color="error" />
            {`Your special deal reserved for ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {item.name}
          </Typography>
          <Typography variant="body2">{item.description}</Typography>
          {/* Quantity and Remove Button */}
          <Grid item xs={12} sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <TextField
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              value={item.quantity}
              onChange={e => handleQuantityChange(index, e.target.value)}
              size="small"
              sx={{ width: "5rem", mr: 2 }}
            />
            <Button onClick={() => removeItemFromCart(item._id)}>Remove</Button>
          </Grid>
        </Grid>
      </Grid>
      {index < cartItems.length - 1 && <Divider />} {/* Don't render a divider after the last item */}
      {/*Alert Box*/}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title" // for visually impaired users provide context about what the dialog is for
        aria-describedby="alert-dialog-description">
        <DialogContent>
          <Alert color="text.primary">
            Your time is up.
            <br />
            Would you like to proceed to checkout or remove your reserved item?
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemove} color="secondary">
            Remove
          </Button>
          <Button onClick={handleCheckout} color="accent" autoFocus>
            Checkout
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
