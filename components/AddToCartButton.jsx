import React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

const AddToCartButton = ({ card }) => {
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(card);
    console.log("Product added to cart");
    router.push(`/cart?id=${card.id}`); // Redirect to the shopping cart
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleAddToCart}>
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
