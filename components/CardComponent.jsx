"use client";
import Card from "@mui/material/Card";
import { CardActionArea, Box, Button, Typography, CardActions, CardContent, CardMedia } from "@mui/material";
import { useRouter } from "next/navigation";
import AddToCartButton from "./AddToCartButton";

/**
 * @param {object} props
 * @param {object} props.card
 * @param {boolean} [props.showButtons]
 * @param {boolean} [props.showInformation]
 */

export default function CardComponent({ card, showButtons = true, showInformation = true }) {
  const router = useRouter();

  // const buyNow = () => {
  //   console.log("buy now");
  // };

  // const handleEdit = event => {
  //   event.stopPropagation(); // Prevents click event from bubbling up to CardActionArea
  //   onEdit(card.id);
  // };

  // const handleDelete = (event) => {
  //   event.stopPropagation(); // Prevents click event from bubbling up to CardActionArea
  //   onDelete(card.id);
  // };

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
        {showInformation && (
          <CardContent sx={{ p: 0.5 }}>
            <Box sx={{ display: "flex" }}>
              <Typography gutterBottom variant="body2" component="div" flexGrow="1">
                {card.name}
              </Typography>
              <Typography gutterBottom variant="body2" component="div">
                {card.category}
              </Typography>
              <Typography gutterBottom variant="body2" component="div">
                {card.conditions}
              </Typography>
              <Typography gutterBottom variant="body2" component="div">
                {card.price} {card.currency}
              </Typography>
            </Box>
          </CardContent>
        )}
      </CardActionArea>
      {showButtons && (
        <CardActions sx={{ p: 0.5 }}>
          {/* <Button disabled onClick={buyNow} variant="contained" color="secondary">
            Buy Now
          </Button> */}
          <AddToCartButton card={card} />
        </CardActions>
      )}
    </Card>
  );
}
