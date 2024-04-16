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

export default function CardComponent({
  card,
  showButtons = true,
  showInformation = true,
  showAddToCartButton = true
}) {
  const router = useRouter();

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
            <Box sx={{ display: "flex", textAlign: "left", gap: 2 }}>
              <Box flexGrow={1}>
                <Typography gutterBottom variant="body1" component="div" flexGrow="1">
                  <b>{card.name}</b>
                </Typography>
                <Typography gutterBottom variant="body2" component="div">
                  {card.category}
                </Typography>
                <Typography gutterBottom variant="body2" component="div">
                  {card.conditions}
                </Typography>
              </Box>
              <Box width="65px">
                <Typography gutterBottom variant="body1" component="div">
                  <b>
                    {card.price} {card.currency}
                  </b>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        )}
      </CardActionArea>
      {showButtons && (
        <CardActions sx={{ p: 0.5 }}>{showAddToCartButton && <AddToCartButton card={card} />}</CardActions>
      )}
    </Card>
  );
}
