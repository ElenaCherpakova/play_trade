"use client";
import { React, useState } from "react";
import { Box, TextField, Button, Typography, Paper, Grid, Avatar } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { theme as importedTheme } from "/styles/theme.js";
import useAuthUser from "../store/useAuthUser";

export default function UserProfileEditPage(props) {
  const theme = useTheme();
  const updateProfile = useAuthUser(state => state.updateProfile);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/AllmageElena.jpeg"); // Default av
  const [isEditing, setIsEditing] = useState(false);
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const [err, setErr] = useState(null);
  const { data: session, update: updateSession } = useSession();

  const [userData, setUserData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || ""
  });

  if (!session) {
    return null;
  }
console.log("USERDATA", userData)
  const handleChange = e => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmitImage = async () => {
    console.log("submit image");
  };

  const handleSubmit = async () => {
    if (isEditing) {
      if (!userData.email || !userData.email.includes("@")) {
        setErr("Please enter an email");
        return;
      }
      if (!userData.name) {
        setErr("Please enter a name");
        return;
      }
      try {
        await updateSession({
          ...session.user,
          user: { ...session.user, ...userData }
        });

        await updateProfile(userData);

        setIsEditing(false);
        setErr(null);
      } catch (error) {
        setErr(error.message);
        setIsEditing(true);
      }
    } else {
      setIsEditing(true);
    }
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
          color="primary"
          sx={{
            flexGrow: 0,
            p: 0,
            mt: 0
          }}>
          Welcome {session?.user?.name}!
        </Typography>
        {/* left and right side of screen */}
        {err && (
          <Typography color="error" style={{ marginBottom: "10px" }}>
            {err}
          </Typography>
        )}
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
                <Avatar src={avatarPreview} sx={{ width: "50%", height: "30vh" }} />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmitImage}
                  sx={{
                    "letterSpacing": "0.1em",
                    "mt": 2,
                    "width": "50%",
                    "&:hover": {
                      backgroundColor: theme.palette.accent.main
                    }
                  }}>
                  {isEditAvatar ? "Save" : "Edit"} Photo
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
                    onChange={handleChange}
                    name="name"
                    label="Nickname"
                    defaultValue={userData.name}
                    sx={{ mb: 2 }} //margin bottom
                    disabled={!isEditing}
                    required
                  />
                  <TextField
                    label="Email"
                    name="email"
                    defaultValue={userData.email}
                    sx={{ mb: 2 }}
                    disabled={!isEditing}
                    onChange={handleChange}
                    required
                  />

                  <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleSubmit}
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
