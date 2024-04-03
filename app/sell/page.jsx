"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography, Container, Tab, Tabs, Snackbar, Alert } from "@mui/material";
import { theme } from "@/styles/theme";
import CardComponent from "@/components/CardComponent";
import { createCardData } from "@/utils/fetchData";
import CardForm from "@/components/CardForm";

export default function Sell() {
  const router = useRouter();
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [add, setAdd] = useState(false);
  const [id, setId] = useState("");
  //create card for testing routes
  const [card, setCard] = useState({
    name: "",
    set: "",
    price: 0,
    currency: "",
    shippingCost: 0,
    description: "",
    conditions: "",
    category: "",
    imageURL: "",
    quantity: 0,
    available: ""
  });
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

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

  const handleEditButtonClick = () => {
    router.push(`/sell/edit/${id}`);
  };

  const handleDeleteButtonClick = () => {
    router.push("/market/item/[id]"); // will update later
  };

  const [sellerItemsSold, setSellerItemsSold] = useState([]);
  const [sellerItemsAvailable, setSellerItemsAvailable] = useState([]);

  useEffect(() => {
    // Fetch seller items data
    // I will replace this with the actual fetch logic when it's done
    // For demonstration purposes, I'm setting dummy data here
    setSellerItemsSold([
      { id: 1, name: "Item 1", imageURL: "/images/pokemon.jpg", price: "$10" },
      { id: 2, name: "Item 2", imageURL: "/images/pokemon.jpg", price: "$20" },
      { id: 3, name: "Item 3", imageURL: "/images/pokemon.jpg", price: "$30" },
      { id: 4, name: "Item 4", imageURL: "/images/pokemon.jpg", price: "$60" }
    ]);
    setSellerItemsAvailable([
      { id: 1, name: "Item 1", imageURL: "/images/pokemon.jpg", price: "$10" },
      { id: 2, name: "Item 2", imageURL: "/images/pokemon.jpg", price: "$20" },
      { id: 3, name: "Item 3", imageURL: "/images/pokemon.jpg", price: "$30" },
      { id: 4, name: "Item 4", imageURL: "/images/pokemon.jpg", price: "$60" }
    ]);
  }, []);

  return (
    <Container maxWidth="lg">
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={theme.spacing(2)}>
          <Typography variant="h5" gutterBottom>
            Create new card{" "}
          </Typography>

          <Button variant="contained" color="primary" onClick={handleAddButtonClick}>
            Add card
          </Button>
        </Box>

        <Box mt={2}>{add && <CardForm cardValue={card} onSubmitForm={addCard} />}</Box>

        <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="primary">
          <Tab label="Items Sold" />
          <Tab label="Items Available" />
        </Tabs>

        <Box mt={theme.spacing(2)} gap={theme.spacing(2)} display="flex" flexWrap="wrap">
          {selectedTab === 0 &&
            sellerItemsSold.map(item => (
              <CardComponent
                key={item.id}
                card={item}
                buttonSet="seller"
                onEdit={() => handleEditButtonClick(item.id)} // add more functionality later
                onDelete={() => handleDeleteButtonClick(item.id)}  // add more functionality later
              />
            ))}
          {selectedTab === 1 &&
            sellerItemsAvailable.map(item => (
              <CardComponent
                key={item.id}
                card={item}
                buttonSet="seller"
                onEdit={() => handleEditButtonClick(item.id)} // add more functionality later
                onDelete={() => handleDeleteButtonClick(item.id)}  // add more functionality later
              />
            ))}
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
