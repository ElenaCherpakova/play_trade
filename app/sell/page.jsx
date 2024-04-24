"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Grid, Button, Typography, Container, Tab, Tabs, Snackbar, Alert } from "@mui/material";
import { theme } from "@/styles/theme";
import { createCardData, fetchSellerCards, deleteCardData, editCardData } from "@/utils/fetchData";
import { useSession } from "next-auth/react";
import CardForm from "@/components/CardForm";
import CardComponent from "@/components/CardComponent";
import ConfirmationDialog from "@/components/DialogBox";

export default function Sell() {
  const router = useRouter();
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [add] = useState(false);
  const [id, setId] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [sellerItemsSold, setSellerItemsSold] = useState([]);
  const [sellerItemsAvailable, setSellerItemsAvailable] = useState([]);
  const { data: session } = useSession();
  const sellerID = session?.user?._id;
  const [cardToDelete, setCardToDelete] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  //fetch cards data and filter them based on availability
  useEffect(() => {
    if (!sellerID) return;
    const fetchData = async () => {
      try {
        const fetchedData = await fetchSellerCards(sellerID);

        // Check if fetchedData.cards is an array before calling filter on it
        let allCards = [];
        if (Array.isArray(fetchedData.cards)) {
          allCards = fetchedData.cards;
        } else {
          console.error("fetchedData.cards is not an array:", fetchedData.cards);
        }
        //filter cards based on availability
        const soldCards = allCards.filter(card => card.available !== "available");
        const availableCards = allCards.filter(card => card.available === "available");
        setSellerItemsSold(soldCards);
        setSellerItemsAvailable(availableCards);
      } catch (error) {
        console.error("Error fetching cards", error);
        setOpenError(true);
        setErrorMessage(error.toString() || "Unknown error occurred");
      }
    };
    fetchData();
  }, [sellerID, session]);

  // Redirect to item page when id changes
  useEffect(() => {
    if (id) {
      router.push(`/market/item/${id}`);
    }
  }, [id, router]);

  // This useEffect only watches for changes in sellerItemsAvailable and sellerItemsSold
  useEffect(() => {}, [sellerItemsAvailable, sellerItemsSold]);

  // Add a new card
  const addCard = async formData => {
    try {
      const data = await createCardData(formData);
      setId(data._id);
    } catch (error) {
      setOpenError(true);
      setErrorMessage(error.toString() || "unknown error");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const handleAddButtonClick = () => {
    router.push("/sell/add");
  };

  const handleEditButtonClick = id => {
    router.push(`/sell/edit/${id}`);
  };

  const handleDeleteButtonClick = id => {
    setCardToDelete(id);
    setOpenConfirmDialog(true);
  };
  //delete from alert box
  const handleConfirmDelete = async () => {
    try {
      await deleteCardData(cardToDelete);
      setSellerItemsAvailable(sellerItemsAvailable.filter(item => item._id !== cardToDelete));
      setSellerItemsSold(sellerItemsSold.filter(item => item._id !== cardToDelete));
    } catch (error) {
      console.error(error);
      setOpenError(true);
      setErrorMessage(error.message || "Unknown error occurred");
    }
    setOpenConfirmDialog(false);
  };

  return (
    <Container maxWidth="lg">
      <Box mt={theme.spacing(3)}>
        <Typography variant="h5" gutterBottom>
          My Cards
        </Typography>
        <Box mt={2}>{add && <CardForm cardValue={card} onSubmitForm={addCard} />}</Box>

        <Grid container justifyContent="space-between" alignItems="center" mt={theme.spacing(2)}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="primary">
              <Tab label="Items Available" />
              <Tab label="Items Sold" />
            </Tabs>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} container justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleAddButtonClick} sx = {{mr:7}}>
              Add new card
            </Button>
          </Grid>
        </Grid>

        <Box mt={theme.spacing(2)}>
          <Grid container spacing={2}>
            {selectedTab === 0 &&
              sellerItemsAvailable.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <CardComponent
                    card={item}
                    buttonSet="seller"
                    showButtons={false}
                    showEditDelete={true}
                    onEdit={() => handleEditButtonClick(item._id)}
                    onDelete={() => handleDeleteButtonClick(item._id)}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%"
                    }}
                  />
                </Grid>
              ))}
            {selectedTab === 1 &&
              sellerItemsSold.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <CardComponent
                    card={item}
                    buttonSet="seller"
                    showButtons={false}
                    showEditDelete={true}
                    onEdit={() => handleEditButtonClick(item._id)}
                    onDelete={() => handleDeleteButtonClick(item._id)}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%"
                    }}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
        <ConfirmationDialog
          open={openConfirmDialog}
          handleConfirm={handleConfirmDelete}
          handleCancel={() => setOpenConfirmDialog(false)}
          message="Are you sure you would like to delete this card?"
        />
        <Snackbar
          open={openError}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}
