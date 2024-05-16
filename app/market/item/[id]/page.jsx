"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  Link,
  Snackbar,
  Typography
} from "@mui/material";

import CardComponent from "@/components/CardComponent";
import ConfirmationDialog from "@/components/DialogBox";
import Loader from "@/components/loader/Loader";
import useImageUpload from "@/hooks/useImageUpload";
import { useCartStore } from "@/store/cartStore";
import { theme } from "@/styles/theme";
import { fetchCardData, deleteCardData, fetchSellerData } from "@/utils/fetchData";

/**
 *
 * @param {*} params
 */

export default function Page({ params }) {
  const addToCart = useCartStore(state => state.addToCart);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cardDetails, setCardDetails] = useState(null);
  const [sellerName, setSellerName] = useState("Visit seller's page");
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [sellerItemsAvailable, setSellerItemsAvailable] = useState([]);
  const [sellerItemsSold, setSellerItemsSold] = useState([]);
  const id = params.id;
  const [loading, setLoading] = useState(true);
  const { handleImageDelete } = useImageUpload();

  // Function to convert currency code to symbol
  const getCurrencySymbol = currencyCode => {
    const currencySymbols = {
      USD: "$",
      CAD: "CA$"
    };
    return currencySymbols[currencyCode] || currencyCode;
  };
  // Fetch card data when id changes
  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const cardData = await fetchCardData(id);
          setCardDetails(cardData);
        } catch (error) {
          console.error(error);
          setOpenError(true);
          setErrorMessage(error.toString() || "unknown error");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id]);
  // Fetch seller data when cardDetails changes
  useEffect(() => {
    if (cardDetails) {
      setLoading(true);
      const id = cardDetails.createdBy;
      const fetchData = async () => {
        try {
          const sellerData = await fetchSellerData(id);
          setSellerName(sellerData.user.name);
        } catch (error) {
          console.error(error);
          setOpenError(true);
          setErrorMessage(error.toString() || "unknown error");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [cardDetails]);
  // const handleWishlistButtonClick = () => {
  //   router.push(`/sell/wishlist/${id}`);
  // }; // will add this route later

  const handleSellerInfoButtonClick = sellerId => {
    router.push(`/market/seller/${sellerId}`);
  };

  const handleAddToCartButtonClick = () => {
    addToCart(cardDetails);
    if (openError) {
      console.log(openError);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const { data: session } = useSession(); // get session data
  const currentUserId = session?.user?._id; // get current user id

  const handleEdit = () => {
    router.push(`/sell/edit/${id}`);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleDeleteButtonClick = id => {
    setCardToDelete(id);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const deleteImageResponse = await handleImageDelete(cardDetails.imagePublicId);
      if (deleteImageResponse.error) {
        console.error("Failed to delete image:", deleteImageResponse.error);
        throw new Error("Failed to delete the associated image. Please try again.");
      }
      await deleteCardData(cardToDelete);
      setSellerItemsAvailable(sellerItemsAvailable.filter(item => item._id !== cardToDelete));
      setSellerItemsSold(sellerItemsSold.filter(item => item._id !== cardToDelete));
    } catch (error) {
      setOpenError(true);
      setErrorMessage(error.toString() || "Unknown error occurred");
    }
    setOpenConfirmDialog(false);
    router.push("/sell");
  };

  return (
    <>
      <Box sx={{ ml: theme.spacing(2) }}>
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, mb: 3 }}>
          <Link color="inherit" href="/" onClick={() => router.push("/")}>
            Home
          </Link>
          <Link color="inherit" href="/market" onClick={() => router.push("/")}>
            Market
          </Link>
          <Typography color="text.primary">Card Details</Typography>
        </Breadcrumbs>

        {/* Image and Details Section */}
        {loading ? (
          <Loader /> // Show Loader component while loading card data
        ) : (
          <Grid container spacing={1} justifyContent="center" alignItems="stretch">
            {/* Image Section */}
            <Grid item xs={12} sm={6}>
              {cardDetails && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                    //gap: theme.spacing(2)
                  }}>
                  <CardComponent card={cardDetails} showButtons={false} showInformation={false} />
                  {currentUserId === cardDetails?.createdBy && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: theme.spacing(6),
                        mb: 2
                      }}>
                      <Button onClick={handleEdit}>Edit</Button>
                      <Button onClick={() => handleDeleteButtonClick(id)}>Delete</Button>
                    </Box>
                  )}
                  {currentUserId !== cardDetails?.createdBy && (
                    <Button
                      variant="contained"
                      color="accent"
                      onClick={handleAddToCartButtonClick}
                      style={{
                        color: theme.palette.background.paper,
                        marginBottom: theme.spacing(2)
                      }}
                      startIcon={<ShoppingCartIcon />}>
                      Add to cart
                    </Button>
                  )}
                </Box>
              )}
            </Grid>
            {/* Details Section */}
            <Grid item xs={12} sm={6}>
              {cardDetails && (
                <Box sx={{ width: "80%" }}>
                  <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                    {cardDetails && (
                      <Link
                        href={`/market/seller/${cardDetails.sellerId}`}
                        underline="none"
                        sx={{
                          "color": "accent.main",
                          "&:hover": { textDecoration: "underline" }
                        }}
                        onClick={e => {
                          e.preventDefault();
                          handleSellerInfoButtonClick(cardDetails.createdBy);
                        }}>
                        <b>{sellerName}</b>
                      </Link>
                    )}
                  </Typography>

                  <Typography variant="h4" gutterBottom>
                    {cardDetails.name}
                  </Typography>

                  <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                    <span style={{ width: 120, marginRight: 40 }}>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        style={{ fontWeight: "bold" }}>
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
                      <Typography
                        component="span"
                        variant="subtitle1"
                        style={{ fontWeight: "bold" }}>
                        Description:
                      </Typography>
                    </span>
                    <span style={{ flex: 1 }}>{cardDetails.description}</span>
                  </Typography>

                  <Divider
                    style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}
                  />

                  <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                    <span style={{ width: 120, marginRight: 40 }}>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        style={{ fontWeight: "bold" }}>
                        Conditions:
                      </Typography>
                    </span>
                    <span style={{ flex: 1 }}>{cardDetails.conditions}</span>
                  </Typography>

                  <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                    <span style={{ width: 120, marginRight: 40 }}>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        style={{ fontWeight: "bold" }}>
                        Category:
                      </Typography>
                    </span>
                    <span style={{ flex: 1 }}>{cardDetails.category}</span>
                  </Typography>

                  <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                    <span style={{ width: 120, marginRight: 40 }}>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        style={{ fontWeight: "bold" }}>
                        Quantity:
                      </Typography>
                    </span>
                    <span style={{ flex: 1 }}>{cardDetails.quantity}</span>
                  </Typography>

                  <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                    <span style={{ width: 120, marginRight: 40 }}>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        style={{ fontWeight: "bold" }}>
                        Availability:
                      </Typography>
                    </span>
                    <span style={{ flex: 1 }}>{cardDetails.available}</span>
                  </Typography>

                  <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                    <span style={{ width: 120, marginRight: 40 }}>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        style={{ fontWeight: "bold" }}>
                        Set:
                      </Typography>
                    </span>
                    <span style={{ flex: 1 }}>{cardDetails.set}</span>
                  </Typography>

                  <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                    <span style={{ width: 120, marginRight: 40 }}>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        style={{ fontWeight: "bold" }}>
                        Shipping Cost:
                      </Typography>
                    </span>
                    <span style={{ flex: 1 }}>{cardDetails.shippingCost}</span>
                  </Typography>

                  {/* Action Buttons */}
                  {/* <Box style={{ marginTop: theme.spacing(2), display: "flex", gap: theme.spacing(2) }}>
                  <Button
                    variant="contained"
                    color="accent"
                    onClick={handleAddToCartButtonClick}
                    style={{ color: theme.palette.background.paper }}
                    startIcon={<ShoppingCartIcon />}>
                    Add to cart
                  </Button> */}

                  {/* <Button variant="contained" color="primary" onClick={handleWishlistButtonClick}>
                    Add to Wishlist
                  </Button> */}
                  {/* </Box> */}
                </Box>
              )}
            </Grid>
          </Grid>
        )}
      </Box>
      <Snackbar
        open={openError}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>

      {/* Dialog component */}
      <ConfirmationDialog
        open={openConfirmDialog}
        handleConfirm={handleConfirmDelete}
        handleCancel={() => setOpenConfirmDialog(false)}
        message="Are you sure you would like to delete this card?"
      />
    </>
  );
}
