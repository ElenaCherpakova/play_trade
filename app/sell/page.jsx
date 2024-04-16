"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Grid, Button, Typography, Container, Tab, Tabs, Snackbar, Alert } from "@mui/material";
import { theme } from "@/styles/theme";
import CardComponent from "@/components/CardComponent";
import { createCardData, fetchSellerCards } from "@/utils/fetchData";
import CardForm from "@/components/CardForm";
import { useSession } from "next-auth/react";

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
  // const [cards, setCards] = useState([]);
  const sellerID = session?.user?._id;

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

  useEffect(() => {
    if (id) {
      router.push(`/market/item/${id}`); //user should probably be redirected to /sell/carddetails or /sell page
    }
  }, [id, router]);

  //fetch data need to move to file in utils
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
    router.push("/market/item/[id]"); // will update later
  };

  return (
    <Container maxWidth="lg">
      <Box mt={theme.spacing(3)}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={theme.spacing(2)}>
          <Typography variant="h5" gutterBottom>
            Create new card
          </Typography>

          <Button variant="contained" color="primary" onClick={handleAddButtonClick}>
            Add new card
          </Button>
        </Box>

        <Box mt={2}>{add && <CardForm cardValue={card} onSubmitForm={addCard} />}</Box>

        <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="primary">
          <Tab label="Items Available" />
          <Tab label="Items Sold" />
        </Tabs>

        <Box mt={theme.spacing(2)}>
          <Grid container spacing={2}>
            {selectedTab === 0 &&
              sellerItemsAvailable.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <CardComponent
                    card={item}
                    buttonSet="seller"
                    showAddToCartButton={false}
                    onEdit={() => handleEditButtonClick(item.id)} // add more functionality later
                    onDelete={() => handleDeleteButtonClick(item.id)} // add more functionality later
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
                    showAddToCartButton={false}
                    onEdit={() => handleEditButtonClick(item.id)} // add more functionality later
                    onDelete={() => handleDeleteButtonClick(item.id)} // add more functionality later
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
