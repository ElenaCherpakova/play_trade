// ItemCard.js

import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button } from '@mui/material';

const ItemCard = ({ item, onEdit, onDelete }) => {
    return (
        <Card variant="outlined">
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image={item.imageURL}
                    alt={item.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: {item.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Category: {item.category}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardContent>
                <Button size="small" color="primary" onClick={onEdit}>
                    Edit
                </Button>
                <Button size="small" color="secondary" onClick={onDelete}>
                    Delete
                </Button>
            </CardContent>
        </Card>
    );
};

export default ItemCard;
