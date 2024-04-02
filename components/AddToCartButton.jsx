import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { CartContext } from "/app/cart/page";

const AddToCartButton = ({ card }) => {
  const { addToCart } = useContext(CartContext);//consuming the addToCart function from the CartContext
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(card);
    console.log("Product added to cart");
    router.push('/cart'); // Redirect to the shopping cart
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleAddToCart}>
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
