"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography, Card, CardActionArea, CardMedia, Breadcrumbs, Link, ThemeProvider } from "@mui/material";
import { theme } from "@/styles/theme";
import { fetchCardData } from "@/utils/fetchData";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Page({ params }) {
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cardDetails, setCardDetails] = useState(null);
  const router = useRouter();
  const id = params.id;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const cardData = await fetchCardData(id);
          setCardDetails(cardData);
        } catch (error) {
          console.error(error);
          setOpenError(true);
          setErrorMessage(error.toString() || "unknown error");
        }
      };
      fetchData();
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
        <div style={{ display: 'flex', marginTop: theme.spacing(2) }}>
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