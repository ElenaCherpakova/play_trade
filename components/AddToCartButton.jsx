import React from "react";
import Button from "@mui/material/Button";
import { useCartStore } from "@/store/cart-store";
const AddToCartButton = ({ card }) => {
  const addToCart = useCartStore(state => state.addToCart);

  const handleAddToCart = () => {
    addToCart(card);
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleAddToCart}>
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
