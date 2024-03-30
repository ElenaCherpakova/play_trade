"use client";
// import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardActionArea, Container } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import AddToCartButton from "./AddToCartButton";

export default function CardComponent({ card, params }) {
  const router = useRouter();

  // const addToCart = () => {
  //   console.log("add to cart");
  // };
  const buyNow = () => {
    console.log("buy now");
  };
  console.log(params);
  // const id = params.id;
  return (
    <Card
      variant="outlined"
      style={{
        display: "flex",
        // justifyContent: "center",
        flexDirection: "column",
        border: "none",
        maxWidth: 220,
        height: "100%",
        justifyContent: "space-between"
      }}>
      <CardActionArea type="button" onClick={() => router.push(`/api/cards/${card._id}`)}>
        <CardMedia
          style={{ objectFit: "cover", padding: 0, objectFit: "cover", borderRadius: 8 }}
          component="img"
          image={card.imageURL}
          alt={card.name}
          height="300"
          // image={data.eventImage || data.image}
          // alt={eventDetails.value}
        />
        <CardContent sx={{ p: 0.5 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="caption" component="div">
              {card.name}
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography gutterBottom variant="caption" component="div">
                {card.price}
              </Typography>
              <Typography gutterBottom variant="caption" component="div">
                {card.currency}
              </Typography>
            </div>
          </div>
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
