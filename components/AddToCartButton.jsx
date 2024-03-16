import Button from "@mui/material/Button";
// import useCartStore from "../store/cart";

const AddToCartButton = ({ card }) => {
  //   const addToCart = useCartStore(state => state.addToCart);

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
