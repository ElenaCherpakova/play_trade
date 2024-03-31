"use client";
// import * as React from "react";
import Card from "@mui/material/Card";
import { CardActionArea, Box, Button, Typography, CardActions, CardContent, CardMedia } from "@mui/material";
import { useRouter } from "next/navigation";
import AddToCartButton from "./AddToCartButton";

export default function CardComponent({ card }) {
  const router = useRouter();

  const buyNow = () => {
    console.log("buy now");
  };

  return (
    <Card
      variant="outlined"
      style={{
        display: "flex",
        flexDirection: "column",
        border: "none",
        maxWidth: 220,
        height: "100%",
        justifyContent: "space-between"
      }}>
      <CardActionArea component="button" onClick={id => router.push(`/market/item/${card._id}`)}>
        <CardMedia
          style={{ objectFit: "cover", padding: 0, objectFit: "cover", borderRadius: 8 }}
          component="img"
          image={card.imageURL}
          alt={card.name}
          height="300"
        />
        <CardContent sx={{ p: 0.5 }}>
          <Box style={{ display: "flex" }}>
            <Typography gutterBottom variant="body2" component="div" flexGrow="1">
              {card.name}
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              {card.price} {card.currency}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>

      <CardActions style={{ p: 0.5, justifyContent: "center" }}>
        <Button onClick={buyNow} variant="contained" color="secondary">
          Buy Now
        </Button>
        <AddToCartButton card={card} />
      </CardActions>
    </Card>
  );
}
