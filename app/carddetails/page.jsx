'use client'
import * as React from "react";
import { useRouter } from "next/navigation";
import { Typography, Button, Grid, Card, CardContent, CardMedia } from "@mui/material";

const CardDetailsPage = () => {
    // Hard-coded card details
    const carddetails = {
        name: "Pokemon Card",
        imageURL: "/images/pokemon.jpg",
        description: "This is a rare and powerful Pokemon card.",
        price: "$10",
    };

    const router = useRouter();

    // Function to handle the back button
    const handleBack = () => {
        router.back(); // Navigate back to the previous page
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleBack}>
                    Back to Listings
                </Button>
                {/* You can add more action buttons here, like "Add to Cart" or "Buy Now" */}
            </Grid>
            {/* Item Image */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card>
                    <CardMedia
                        component="img"
                        image="/images/pokemon.jpg"
                        alt={carddetails.name}
                    />
                </Card>
            </Grid>

            {/* Item Details */}
            <Grid item xs={12} sm={6} md={8} lg={9}>
                <Typography variant="h4" gutterBottom>
                    {carddetails.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Price: {carddetails.price}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Description: {carddetails.description}
                </Typography>
                {/* Additional details can be added here */}
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleBack}>
                        Add to cart
                    </Button>
                    {/* You can add more action buttons here, like "Add to Cart" or "Buy Now" */}
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleBack}>
                        Add to favourites
                    </Button>
                    {/* You can add more action buttons here, like "Add to Cart" or "Buy Now" */}
                </Grid>
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleBack}>
                    Add to cart
                </Button>
                {/* You can add more action buttons here, like "Add to Cart" or "Buy Now" */}
            </Grid>
        </Grid>
    );
};

export default CardDetailsPage;
