import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
export default function CardComponent() {
  return (
    <Card variant="outlined" style={{ border: "none", maxWidth: 220 }}>
      <CardActionArea>
        <CardMedia
          // style={{ objectFit: "contain" }}
          style={{ objectFit: "cover", padding: 10 }}
          component="img"
          image="https://m.media-amazon.com/images/I/51skd-tjunL._AC_.jpg"
          alt="Pikachu V - SWSH061"
        />
        <CardContent sx={{ p: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h8" component="div">
              Pikachu V - SWSH061
            </Typography>
            <Typography gutterBottom variant="h7" component="div">
              $ 0.42
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
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
