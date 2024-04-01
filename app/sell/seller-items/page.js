"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography, Container, Tab, Tabs } from "@mui/material";
import { theme } from "@/styles/theme";
import CardComponent from "@/components/CardComponent";
import { DELETE } from "@/app/api/cards/[id]/route";


const SellerItemsPage = () => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState(0);

    // Hardcoded seller items data for testing
    const sellerItemsSold = [
        { id: 1, name: "Item 1", imageURL: "/images/pokemon.jpg", price: "$10" },
        { id: 2, name: "Item 2", imageURL: "/images/pokemon.jpg", price: "$20" },
        { id: 3, name: "Item 3", imageURL: "/images/pokemon.jpg", price: "$30" },
        { id: 4, name: "Item 4", imageURL: "/images/pokemon.jpg", price: "$60" }
    ];

    const sellerItemsAvailable = [
        { id: 1, name: "Item 1", imageURL: "/images/pokemon.jpg", price: "$10" },
        { id: 2, name: "Item 2", imageURL: "/images/pokemon.jpg", price: "$20" },
        { id: 3, name: "Item 3", imageURL: "/images/pokemon.jpg", price: "$30" },
        { id: 4, name: "Item 4", imageURL: "/images/pokemon.jpg", price: "$60" }
        // Add your available items here
    ];

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    // Handler for editing an item
    const handleEditItemClick = (itemId) => {
        router.push(`/sell/edit/${itemId}`);
    };

    // Handler for deleting an item
    const handleDeleteItemClick = async (itemId) => {
        try {
            const response = await DELETE(`/api/cards/${itemId}`); // Use DELETE function
            if (response.success) {
                // Item successfully deleted, perform any necessary UI updates
                console.log("Item deleted successfully.");
            } else {
                // Handle error scenario
                console.error(response.message);
            }
        } catch (error) {
            // Handle network or other errors
            console.error("An error occurred while deleting the item:", error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={theme.spacing(2)}>
                {/* Your seller profile info and rating */}
                <Typography variant="h5" gutterBottom>
                    Create new card
                </Typography>
                <Button variant="contained" color="primary" onClick={() => router.push("/sell")}>
                    Add card
                </Button>
            </Box>

            <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="primary">
                <Tab label="Items Sold" />
                <Tab label="Items Available" />
            </Tabs>

            <Box mt={theme.spacing(2)} gap={theme.spacing(2)} display="flex" flexWrap="wrap">
                {selectedTab === 0 && (
                    sellerItemsSold.map(item => (
                        <CardComponent
                            key={item.id}
                            card={item}
                            buttonSet="seller"
                            onEdit={() => handleEditItemClick(item.id)}
                            onDelete={() => handleDeleteItemClick(item.id)}
                        />
                    ))
                )}
                {selectedTab === 1 && (
                    sellerItemsAvailable.map(item => (
                        <CardComponent
                            key={item.id}
                            card={item}
                            buttonSet="seller"
                            onEdit={() => handleEditItemClick(item.id)}
                            onDelete={() => handleDeleteItemClick(item.id)}
                        />
                    ))
                )}
            </Box>

            {/* Seller reviews section */}
            <Box mt={theme.spacing(4)}>
                <Typography variant="h5" gutterBottom>
                    Seller Reviews
                </Typography>
                {/* Seller reviews content */}
            </Box>
        </Container>
    );
};

export default SellerItemsPage;
