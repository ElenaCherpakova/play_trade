"use client";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
//import { create } from "zustand";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UserProfileEditPage({ user = {} }) {
  const { nickname = "", password = "", email = "", location = "", photo = "" } = user;
  const { data: session } = useSession();
  const router = useRouter();

  return (
    //entire screen
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        mt: 0, //margin -top
        mb: 0,
        p: 0, // padding
        width: "95%",
        backgroundPosition: "center top",
        backgroundSize: "cover",
        backgroundImage: {
          xs: 'url("/backgroundForEditPage.png")', // for small screens
          sm: 'url("/backgroundForEditPage.png")', // for medium screens
          md: 'url("/backgroundForEditPage.png")' // for large screens
        }
      }}>
      <Typography variant="h4" align="center" sx={{ flexGrow: 0, p: 0, mt: 0 }}>
        Welcome {session?.user?.name}!        
      </Typography>
      {/* left and right side of screen */}
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        sx={{
          mt: 2, //margin -top
          p: 2 // padding
        }}>
        {/* left side of screen */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            mt: 2,
            p: 2,
            width: "40%" // Adjust the width as needed
          }}>
          <Avatar src="/broken-image.jpg" sx={{ width: "80%", height: "auto" }} />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => router.push("/addphoto")}
            sx={{
              "mt": 2,
              "width": "50%",
              "borderRadius": "10px",
              "letterSpacing": "0.1em",
              ":hover": {
                backgroundColor: "accent.main"
              }
            }}>
            Edit Photo
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              "mt": 2,
              "width": "50%",
              "borderRadius": "10px",
              "letterSpacing": "0.1em",
              ":hover": {
                backgroundColor: "accent.main"
              }
            }}>
            Add Card to Sell
          </Button>
        </Box>
        {/* right side of screen */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          sx={{
            mt: 2,
            p: 2,
            width: "80%"
          }}>
          <TextField
            label="Nickname"
            defaultValue={user.nickname}
            InputProps={{
              sx: {
                "background": "linear-gradient(25deg, #D9D9D9 10%, #FFFFFF 100%)",
                "borderRadius": "10px",
                "letterSpacing": "0.2em",
                "& .MuiOutlinedInput-notchedOutline": {
                  //remove border
                  border: "none"
                }
              }
            }}
            sx={{ mb: 2 }} //margin bottom
          />
          <TextField
            label="Password"
            defaultValue={password}
            type="password"
            InputProps={{
              sx: {
                "background": "linear-gradient(45deg, #D9D9D9 30%, #FFFFFF 90%)",
                "borderRadius": "10px",
                "letterSpacing": "0.2em",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none"
                }
              }
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            defaultValue={email}
            InputProps={{
              sx: {
                "background": "linear-gradient(45deg, #D9D9D9 30%, #FFFFFF 90%)",
                "borderRadius": "10px",
                "letterSpacing": "0.2em",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none"
                }
              }
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Location"
            defaultValue={location}
            InputProps={{
              sx: {
                "background": "linear-gradient(45deg, #D9D9D9 30%, #FFFFFF 90%)",
                "borderRadius": "10px",
                "letterSpacing": "0.2em",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none"
                }
              }
            }}
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                "mt": 2,
                "width": "40%",
                "borderRadius": "10px",
                "letterSpacing": "0.1em",
                ":hover": {
                  backgroundColor: "accent.main"
                }
              }}>
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                "mt": 2, // Add a top margin
                "width": "40%", // Make the button full width
                "borderRadius": "10px",
                "letterSpacing": "0.1em",
                ":hover": {
                  backgroundColor: "accent.main"
                }
              }}>
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
