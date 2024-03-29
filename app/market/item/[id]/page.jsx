"use client";
import * as React from "react";
import { Box, Button, Typography, Card, CardActionArea, CardMedia, Breadcrumbs, Link, ThemeProvider } from "@mui/material";
import { useRouter } from "next/navigation";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { theme } from "@/styles/theme";

// Function to convert currency code to symbol
const getCurrencySymbol = (currencyCode) => {
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };
  return currencySymbols[currencyCode] || currencyCode;
};

const IndividualCardPage = ({ params }) => {
  const [cardDetails, setCardDetails] = React.useState(null);
  const router = useRouter();
  const { id } = params;

  React.useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await fetch(`/api/cards/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch card details');
        }
        const data = await response.json();
        setCardDetails(data.data); // Update to set the entire data object
      } catch (error) {
        console.error('Error fetching card details:', error);
        setCardDetails(null);
      }
    };

    if (id) {
      fetchCardDetails();
    }
  }, [id]);

  const handleEditButtonClick = () => {
    router.push(`/sell/edit/${id}`);
  };

  const handleSellerInfoButtonClick = () => {
    router.push(`/market/seller/${id}`);
  };

  const handleAddToCartButtonClick = () => {
    router.push("/cart");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box style={{ marginLeft: theme.spacing(2) }}>
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: '8px' }}>
          <Link color="inherit" href="/" onClick={() => router.push('/')}>
            Home
          </Link>
          <Typography color="text.primary">Card Details</Typography>
        </Breadcrumbs>

        {/* Image and Details Section */}
        <div style={{ display: 'flex', marginTop: theme.spacing(2)}}>
          {/* Image Section */}
          {cardDetails && (
            <Card style={{ boxShadow: 'none', marginRight: theme.spacing(2) }}>
              <CardActionArea type="button" onClick={() => router.push(`/market/item/${cardDetails.id}`)}>
                <CardMedia
                  component="img"
                  image={cardDetails.imageURL}
                  alt={cardDetails.name}
                  style={{ width: 300, height: "auto" }}
                />
              </CardActionArea>
            </Card>
          )}

          {/* Details Section */}
          {cardDetails && (
            <Box style={{ maxWidth: 600, paddingLeft: theme.spacing(2), borderRadius: theme.shape.borderRadius }}>
              <Typography variant="h4" gutterBottom>
                {cardDetails.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Price: {getCurrencySymbol(cardDetails.currency)}{cardDetails.price}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Description: {cardDetails.description}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Conditions: {cardDetails.conditions}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Category: {cardDetails.category}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Quantity: {cardDetails.quantity}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Availability: {cardDetails.available}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Set: {cardDetails.set}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Shipping Cost: {cardDetails.shippingCost}
              </Typography>
            </Box>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: theme.spacing(1), marginTop: theme.spacing(2) }}>
          <Button variant="contained" color="accent" onClick={handleAddToCartButtonClick} style={{ color: theme.palette.background.paper }}>
            <ShoppingCartIcon />
            Add to cart
          </Button>

          <Button variant="contained" color="primary" onClick={handleEditButtonClick}>
            Edit card
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSellerInfoButtonClick}>
            Watch information about the seller
          </Button>

        </div>
      </Box>
    </ThemeProvider>
  );
};

export default IndividualCardPage;
