'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, Card, CardActionArea, CardMedia, Grid, Snackbar, Alert } from '@mui/material';

const SellerItemsPage = () => {
    const router = useRouter();
    const [sellerItems, setSellerItems] = useState([]);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch seller items when component mounts
    useEffect(() => {
        const fetchSellerItems = async () => {
            try {
                const response = await fetch('/api/seller/items');
                if (!response.ok) {
                    throw new Error('Failed to fetch seller items');
                }
                const data = await response.json();
                setSellerItems(data.data);
            } catch (error) {
                console.error('Error fetching seller items:', error);
                setOpenError(true);
                setErrorMessage(error.message || "Unknown error occurred.");
            }
        };
        fetchSellerItems();
    }, []);

    // Handler for editing an item
    const handleEditItemClick = (itemId) => {
        router.push(`/sell/edit/${itemId}`);
    };

    // Handler for deleting an item
    const handleDeleteItemClick = async (itemId) => {
        try {
            const response = await fetch(`/api/seller/items/${itemId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete item');
            }
            setSellerItems(prevItems => prevItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Error deleting item:', error);
            setOpenError(true);
            setErrorMessage(error.message || "Unknown error occurred.");
        }
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    return (
        <Box>
            <Typography variant="h3" gutterBottom>
                Items I Sell
            </Typography>
            <Button variant="contained" color="primary" onClick={() => router.push('/sell')}>
                Add New Item
            </Button>
            <Grid container spacing={3} style={{ marginTop: 20 }}>
                {sellerItems.map(item => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <Card variant="outlined" style={{ border: "none", maxWidth: 220, marginTop: '16px' }}>
                            <CardActionArea type="button" onClick={() => router.push(`/market/item/${item.id}`)}>
                                <CardMedia
                                    style={{ objectFit: "cover", padding: 8 }}
                                    component="img"
                                    image={item.imageURL}
                                    alt={item.name}
                                />
                            </CardActionArea>
                            <Button variant="contained" color="primary" onClick={() => handleEditItemClick(item.id)}>
                                Edit
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => handleDeleteItemClick(item.id)}>
                                Delete
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Snackbar
                open={openError}
                autoHideDuration={5000}
                onClose={handleCloseError}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SellerItemsPage;
