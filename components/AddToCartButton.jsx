import React, { useEffect } from "react";

import { useSession } from "next-auth/react";

import Button from "@mui/material/Button";

import { useCartStore } from "@/store/cartStore";

const AddToCartButton = ({ card }) => {
  const { data: session } = useSession();
  const addToCart = useCartStore(state => state.addToCart);
  const setUserId = useCartStore(state => state.setUserId);

  useEffect(() => {
    if (session?.user?._id) {
      setUserId(session.user._id);
    }
  }, [session, setUserId]);

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
