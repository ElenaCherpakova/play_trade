"use client";
import { React, useState } from "react";
import { Box, TextField, Button, Typography, Paper, Grid, Avatar } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { theme as importedTheme } from "/styles/theme.js";

export default function UserProfileEditPage(props) {
  // const { nickname = "", password = "", email = "", location = "", photo = "" } = user;
  const { data: session } = useSession();
  const router = useRouter();
  const theme = useTheme();
  // for edit mode
  const [isEditing, setIsEditing] = useState(false);

  const handleButtonClick = () => {
    if (isEditing) {
    }

    // Toggle edit mode
    setIsEditing(!isEditing);
  };
  if (!session) {
    return null;
  }
  return (
    //entire screen
    <ThemeProvider theme={importedTheme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          mt: 0, //margin -top
          mb: 0,
          p: 0, // padding
          width: "95%"
        }}>
        <Typography
          variant="h4"
          align="center"
          color="primary"
          sx={{
            flexGrow: 0,
            p: 0,
            mt: 0
          }}>
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              {/* left side of screen */}
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  p: 2
                }}>
                <Avatar src="/broken-image.jpg" sx={{ width: "80%", height: "auto" }} />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => router.push("./addphoto")}
                  sx={{
                    "letterSpacing": "0.1em",
                    "mt": 2,
                    "width": "50%",
                    "&:hover": {
                      backgroundColor: theme.palette.accent.main
                    }
                  }}>
                  Edit Photo
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    "letterSpacing": "0.1em",
                    "mt": 2,
                    "width": "50%",
                    "&:hover": {
                      backgroundColor: theme.palette.accent.main
                    }
                  }}>
                  Add Card to Sell
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              {/* right side of screen */}
              <Paper
                padding={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
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
                    name="name"
                    label="Nickname"
                    defaultValue={session?.user?.name}
                    sx={{ mb: 2 }} //margin bottom
                  />
                  <TextField label="Password" name="password" defaultValue="" type="password" sx={{ mb: 2 }} />
                  <TextField label="Email" name="email" defaultValue={session?.user?.email} sx={{ mb: 2 }} />
                  <TextField label="Location" name="location" defaultValue="" sx={{ mb: 2 }} />
                  <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleButtonClick}
                      sx={{
                        "mt": 2,
                        "width": "40%",
                        "letterSpacing": "0.1em",
                        "&:hover": {
                          backgroundColor: theme.palette.accent.main
                        }
                      }}>
                      {isEditing ? "Save" : "Edit"}
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{
                        "mt": 2, // Add a top margin
                        "width": "40%", // Make the button full width
                        "letterSpacing": "0.1em",
                        "&:hover": {
                          backgroundColor: theme.palette.accent.main
                        }
                      }}>
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
