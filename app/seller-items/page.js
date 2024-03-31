"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, Grid, Snackbar, Alert, ThemeProvider } from "@mui/material";
import { theme } from "@/styles/theme";
import CardComponent from "@/components/CardComponent";

const SellerItemsPage = () => {
    const router = useRouter();

    // Hardcoded seller items data for testing
    const sellerItems = [
        { id: 1, name: "Item 1", imageURL: "/images/pokemon.jpg", price: "$10" },
        { id: 2, name: "Item 2", imageURL: "/images/pokemon.jpg", price: "$20" },
        { id: 3, name: "Item 3", imageURL: "/images/pokemon.jpg", price: "$30" },
        { id: 4, name: "Item 4", imageURL: "/images/pokemon.jpg", price: "$60" }
    ];

    return (
        <ThemeProvider theme={theme}>
            <Box maxWidth={1200} ml={theme.spacing(2)}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={theme.spacing(2)}>
                    <Box>
                        <Typography variant="h4" gutterBottom>
                            Seller Profile
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Username: seller123
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Email: seller123@example.com
                        </Typography>
                    </Box>
                    <Button variant="contained" color="accent" onClick={() => router.push("/editProfile")}> {/*I'll update this route later*/}
                        Edit Profile
                    </Button>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={theme.spacing(2)}>
                    <Typography variant="h6" gutterBottom mb={theme.spacing(2)}>
                        Items Sold
                    </Typography>
                    <Button variant="outlined" color="primary" onClick={() => router.push("/sell")}>
                        Add New Card
                    </Button>
                </Box>
                <Grid container spacing={3}>
                    {sellerItems.map(item => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                            <CardComponent card={item} showButtons={false} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default SellerItemsPage;
