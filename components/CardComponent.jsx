import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function CardComponent({ card }) {
  return (
    <Card variant="outlined" style={{ border: "none", maxWidth: 220 }}>
      <CardActionArea>
        <Link href={`/market/item/${card._id}`}>
          {/* <Link href={`/card/${card._id}`}> */}
          <CardMedia
            // style={{ objectFit: "contain" }}
            style={{ objectFit: "cover", padding: 8 }}
            component="img"
            image={card.imageURL}
            alt={card.name}
          />
        </Link>
        <CardContent sx={{ p: 0.5 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="caption" component="div">
              {card.name}
            </Typography>
            <Typography gutterBottom variant="caption" component="div">
              {card.price}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ p: 0.5 }}>
        <Button size="small" variant="contained" color="secondary">
          Buy Now
        </Button>
        <Button size="small" variant="contained" color="secondary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
