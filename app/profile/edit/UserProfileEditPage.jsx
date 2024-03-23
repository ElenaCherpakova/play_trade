"use client";
import { React, useState } from "react";
import { Box, TextField, Button, Typography, Paper, Grid, Avatar } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { theme as importedTheme } from "/styles/theme.js";

export default function UserProfileEditPage({ user = {} }) {
  const { nickname = "", password = "", email = "", location = "", photo = "" } = user;
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
          sx={{
            color: theme.palette.primary.main,
            fontFamily: theme.typography.fontFamily,
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
                    "fontFamily": theme.typography.fontFamily,
                    "letterSpacing": "0.1em",
                    "mt": 2,
                    "width": "50%",
                    "borderRadius": theme.shape.borderRadius,
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
                    "fontFamily": theme.typography.fontFamily,
                    "letterSpacing": "0.1em",
                    "mt": 2,
                    "width": "50%",
                    "borderRadius": theme.shape.borderRadius,
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
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: theme.spacing(2),
                  borderRadius: theme.shape.borderRadius
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
                    label="Nickname"
                    defaultValue={user.nickname}
                    InputProps={{
                      sx: {
                        fontFamily: theme.typography.fontFamily,
                        borderRadius: theme.shape.borderRadius
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
                        fontFamily: theme.typography.fontFamily,
                        borderRadius: theme.shape.borderRadius
                      }
                    }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Email"
                    defaultValue={email}
                    InputProps={{
                      sx: {
                        fontFamily: theme.typography.fontFamily,
                        borderRadius: theme.shape.borderRadius
                      }
                    }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Location"
                    defaultValue={location}
                    InputProps={{
                      sx: {
                        fontFamily: theme.typography.fontFamily,
                        borderRadius: theme.shape.borderRadius
                      }
                    }}
                    sx={{ mb: 2 }}
                  />
                  <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleButtonClick}
                      sx={{
                        "fontFamily": theme.typography.fontFamily,
                        "mt": 2,
                        "width": "40%",
                        "borderRadius": theme.shape.borderRadius,
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
                        "fontFamily": theme.typography.fontFamily,
                        "mt": 2, // Add a top margin
                        "width": "40%", // Make the button full width
                        "borderRadius": theme.shape.borderRadius,
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
