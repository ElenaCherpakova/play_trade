import Button from "@mui/material/Button";

const AddToCartButton = ({ card }) => {
  const handleAddToCart = () => {
    // addToCart(card);
    console.log("Product added to cart");
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleAddToCart}>
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
