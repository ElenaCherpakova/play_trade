"use client";
import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  Breadcrumbs,
  Link,
  ThemeProvider,
  Divider
} from "@mui/material";
import { useRouter } from "next/navigation";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { theme } from "@/styles/theme";

// Function to convert currency code to symbol
const getCurrencySymbol = currencyCode => {
  const currencySymbols = {
    USD: "$",
    CAD: "CA$"
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
          throw new Error("Failed to fetch card details");
        }
        const data = await response.json();
        setCardDetails(data.data); // Update to set the entire data object
      } catch (error) {
        console.error("Error fetching card details:", error);
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

  // const handleSellerInfoButtonClick = sellerId => {
  //   router.push(`/market/seller/${sellerId}`);
  // }; will add this route later

  const handleAddToCartButtonClick = () => {
    router.push("/cart");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box style={{ marginLeft: theme.spacing(2) }}>
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: "8px" }}>
          <Link color="inherit" href="/" onClick={() => router.push("/")}>
            Home
          </Link>
          <Typography color="text.primary">Card Details</Typography>
        </Breadcrumbs>

        {/* Image and Details Section */}
        <Box style={{ display: "flex", marginTop: theme.spacing(2) }}>
          {/* Image Section */}
          {cardDetails && (
            <Card style={{ boxShadow: "none", marginRight: theme.spacing(2) }}>
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
              <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                <span style={{ flex: 1 }}>
                  {cardDetails && (
                    <Link
                      href={`/market/seller/${cardDetails.sellerId}`}
                      underline="none"
                      sx={{
                        color: "accent.main",
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSellerInfoButtonClick(cardDetails.sellerId);
                      }}
                    >
                      Visit seller's page
                    </Link>

                  )}
                </span>
              </Typography>


              <Typography variant="h4" gutterBottom>
                {cardDetails.name}
              </Typography>

              <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                <span style={{ width: 120, marginRight: 40 }}>
                  <Typography component="span" variant="subtitle1" style={{ fontWeight: "bold" }}>
                    Price:
                  </Typography>
                </span>
                <span style={{ flex: 1 }}>
                  {getCurrencySymbol(cardDetails.currency)}
                  {cardDetails.price}
                </span>
              </Typography>
              <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                <span style={{ width: 120, marginRight: 40 }}>
                  <Typography component="span" variant="subtitle1" style={{ fontWeight: "bold" }}>
                    Description:
                  </Typography>
                </span>
                <span style={{ flex: 1 }}>{cardDetails.description}</span>
              </Typography>

              <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />

              <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                <span style={{ width: 120, marginRight: 40 }}>
                  <Typography component="span" variant="subtitle1" style={{ fontWeight: "bold" }}>
                    Conditions:
                  </Typography>
                </span>
                <span style={{ flex: 1 }}>{cardDetails.conditions}</span>
              </Typography>

              <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                <span style={{ width: 120, marginRight: 40 }}>
                  <Typography component="span" variant="subtitle1" style={{ fontWeight: "bold" }}>
                    Category:
                  </Typography>
                </span>
                <span style={{ flex: 1 }}>{cardDetails.category}</span>
              </Typography>

              <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                <span style={{ width: 120, marginRight: 40 }}>
                  <Typography component="span" variant="subtitle1" style={{ fontWeight: "bold" }}>
                    Quantity:
                  </Typography>
                </span>
                <span style={{ flex: 1 }}>{cardDetails.quantity}</span>
              </Typography>

              <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                <span style={{ width: 120, marginRight: 40 }}>
                  <Typography component="span" variant="subtitle1" style={{ fontWeight: "bold" }}>
                    Availability:
                  </Typography>
                </span>
                <span style={{ flex: 1 }}>{cardDetails.available}</span>
              </Typography>

              <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                <span style={{ width: 120, marginRight: 40 }}>
                  <Typography component="span" variant="subtitle1" style={{ fontWeight: "bold" }}>
                    Set:
                  </Typography>
                </span>
                <span style={{ flex: 1 }}>{cardDetails.set}</span>
              </Typography>

              <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                <span style={{ width: 120, marginRight: 40 }}>
                  <Typography component="span" variant="subtitle1" style={{ fontWeight: "bold" }}>
                    Shipping Cost:
                  </Typography>
                </span>
                <span style={{ flex: 1 }}>{cardDetails.shippingCost}</span>
              </Typography>

              {/* Action Buttons */}
              <Box style={{ marginTop: theme.spacing(2), display: "flex", gap: theme.spacing(2) }}>
                <Button
                  variant="contained"
                  color="accent"
                  onClick={handleAddToCartButtonClick}
                  style={{ color: theme.palette.background.paper }}
                  startIcon={<ShoppingCartIcon />}
                >
                  Add to cart
                </Button>

                <Button variant="contained" color="primary" onClick={handleEditButtonClick}>
                  Edit card
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default IndividualCardPage;
