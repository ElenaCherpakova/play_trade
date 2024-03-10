import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardContent() {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: '13px', height: '350' }}>
      <CardMedia
        borderTop="13px"
        component="img"
        object-fit="fit"
        //object-fit="contain"
        alt="Pikachu V - SWSH061"
        height="350"
        image="https://m.media-amazon.com/images/I/51skd-tjunL._AC_.jpg"
      />
      <CardContent sx={{ p: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          Pikachu V - SWSH061
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
        <Typography gutterBottom variant="h7" component="div">
          $ 0.42
        </Typography>
      </CardContent>
      <CardActions justifyContent="space-around">
        <Button size="small" variant="contained">
          Buy Now
        </Button>
        <Button size="small" variant="contained">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
