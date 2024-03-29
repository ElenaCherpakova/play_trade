'use client'
import * as React from "react";
import { Typography, Button, Card, CardMedia, ThemeProvider, Breadcrumbs, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from 'next/navigation'; // Importing useRouter from next/navigation
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const IndividualCardPage = ({ params }) => {
  const [cardDetails, setCardDetails] = React.useState(null);
  const router = useRouter();
  const theme = useTheme();
  const id = params.id;

  React.useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await fetch(`/api/cards/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch card details');
        }
        const data = await response.json();
        setCardDetails(data); // Update to set the entire data object
       
      } catch (error) {
        console.error('Error fetching card details:', error);
        setCardDetails(null);
      }
      console.log(cardDetails)
    };

    if (id) {
      fetchCardDetails(id)
        .then(data => setCardDetails(data))
        .catch(error => console.error('Error fetching card details:', error));
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: theme.spacing(2) }}>
          <Link color="inherit" href="/" onClick={() => router.push('/')}>
            Home
          </Link>
          <Typography color="text.primary">Card Details</Typography>
        </Breadcrumbs>

        {/* Image and Details Section */}
        <div style={{ display: 'flex', marginTop: theme.spacing(2) }}>
          {/* Image Section */}
          <Card style={{ boxShadow: 'none', marginRight: theme.spacing(2) }}>
            <CardMedia
              component="img"
              image={cardDetails?.imageURL || ""}
              alt={cardDetails?.name || ""}
              style={{ width: 300, height: "auto" }}
            />
          </Card>
          {/* Details Section */}
          <div style={{ maxWidth: 600, paddingLeft: theme.spacing(2), borderRadius: theme.shape.borderRadius }}>
            <Typography variant="h4" gutterBottom>
              {cardDetails?.name || ""}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Price: {cardDetails?.price || ""}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Description: {cardDetails?.description || ""}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Conditions: {cardDetails?.conditions || ""}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Category: {cardDetails?.category || ""}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Quantity: {cardDetails?.quantity || ""}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Available: {cardDetails?.available || ""}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Created By: {cardDetails?.createdBy || ""}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Created At: {cardDetails?.createdAt || ""}
            </Typography>
            <Typography variant="body1" gutterBottom>
              __v: {cardDetails?.__v || ""}
            </Typography>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', marginTop: theme.spacing(2), gap: theme.spacing(1) }}>
          <Button
            variant="contained"
            color="accent"
            style={{ color: theme.palette.background.paper }}
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCartButtonClick}
          >
            Add to Cart
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditButtonClick}
          >
            Edit card
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSellerInfoButtonClick}
          >
            Watch information about the seller
          </Button>
        </div>
      </div>

    </ThemeProvider >
  );
};

export default IndividualCardPage;
