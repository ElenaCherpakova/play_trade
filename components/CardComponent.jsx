"use client";
import Card from "@mui/material/Card";
import { CardActionArea, Box, Button, Typography, CardActions, CardContent, CardMedia } from "@mui/material";
import { useRouter } from "next/navigation";
import AddToCartButton from "./AddToCartButton";

/**
 *
 * @param {card} Object
 * @param {showButtons} Boolean
 */

export default function CardComponent({ card, showButtons = true }) {
  const router = useRouter();

  const buyNow = () => {
    console.log("buy now");
  };

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "none",
        maxWidth: 220,
        height: "100%",
        justifyContent: "space-between"
      }}>
      <CardActionArea component="button" onClick={id => router.push(`/market/item/${card._id}`)}>
        <CardMedia
          sx={{ objectFit: "cover", padding: 0, borderRadius: 1 }}
          component="img"
          image={card.imageURL}
          alt={card.name}
          height="300"
        />
        <CardContent sx={{ p: 0.5 }}>
          <Box sx={{ display: "flex" }}>
            <Typography gutterBottom variant="body2" component="div" flexGrow="1">
              {card.name}
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              {card.price} {card.currency}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      {showButtons && (
        <CardActions sx={{ p: 0.5 }}>
          <Button onClick={buyNow} variant="contained" color="secondary">
            Buy Now
          </Button>
          <AddToCartButton card={card} />
        </CardActions>
      )}
    </Card>
  );
}
