"use client";
import * as React from 'react';
import Card from "@mui/material/Card";
import { 
  CardActionArea, 
  Box, 
  Typography, 
  CardActions, 
  CardContent, 
  CardMedia, 
  CardHeader, 
  IconButton, 
  Menu, 
  MenuItem 
} from "@mui/material";
import { useRouter } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';

/**
 * @param {object} props
 * @param {object} props.card
 * @param {boolean} [props.showButtons]
 * @param {boolean} [props.showInformation]
 */

export default function CardComponent({ card, onEdit, onDelete, showButtons = true, showInformation = true, showEditDelete = false }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Card
      variant="outlined"
      sx={{       
        border: "none",
        maxWidth: 220,
        height: "100%",
        justifyContent: "space-between",
        position: "relative"
      }}>        
      
      {showEditDelete && (
        <>
          <CardHeader
            title={
              <Typography variant="h4">
                {card.category}
              </Typography>
            }
            action={
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            }
          />
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={onEdit}>
              Edit
            </MenuItem>
            <MenuItem onClick={onDelete}>
              Delete
            </MenuItem>
          </Menu>
        </>
      )}
      <CardActionArea
       sx={{ padding: 0, margin: 0, padding: 0, margin: 0, paddingBottom: '3.125em'  }} 
       component="button"
       onClick={id => router.push(`/market/item/${card._id}`)}
      >
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
                {/* <Typography gutterBottom variant="body2" component="div">
                  {card.category}
                </Typography> */}
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
        <CardActions sx={{ p: 0.5, position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <AddToCartButton card={card} />
        </CardActions>
      )}      
    </Card>
  );
}
