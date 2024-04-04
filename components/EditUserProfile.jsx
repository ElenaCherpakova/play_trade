"use client";
import { React, useState, useEffect, useRef } from "react";
import useImageUpload from "../hooks/useImageUpload";
import { Box, TextField, Button, Typography, Paper, Grid, Avatar, Backdrop, CircularProgress } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { useSession, getSession } from "next-auth/react";
import { theme as importedTheme } from "/styles/theme.js";
import useAuthUser from "../store/useAuthUser";
import { trimAndValidate } from "@/utils/helpers";
export default function UserProfileEditPage() {
  const theme = useTheme();
  const updateProfile = useAuthUser(state => state.updateProfile);
  const { handleImageUpload, error: errorAvatarUpload } = useImageUpload();
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { data: session, update: updateSession, status } = useSession();
  const [userData, setUserData] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (session && status === "authenticated") {
        setUserData({
          name: session?.user?.name,
          email: session?.user?.email
        });
        setAvatarPreview(session?.user?.avatar);
      }
    };
    fetchData();
  }, [status, session]);

  console.log(userData);
  // console.log("erro", emailError);
  useEffect(() => {
    if (!selectedFile) {
      setAvatarPreview("");
      return;
    }
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setAvatarPreview(fileReader.result);
    };
    fileReader.readAsDataURL(selectedFile);
  }, [selectedFile]);

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsEditAvatar(true);
    }
  };

  const submitAvatar = async () => {
    try {
      setLoading(true);
      if (selectedFile) {
        await handleImageUpload(selectedFile, async imageURL => {
          setAvatarPreview(imageURL);

          await updateSession({
            ...session,
            user: { ...session.user, avatar: imageURL }
          });

          await updateProfile({ ...session.user, avatar: imageURL });

          setIsEditAvatar(false);
        });
      } else {
        setIsEditAvatar(false);
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;

    const { value: trimmedValue, error: newError } = trimAndValidate(name, value);
    setUserData(prevUserData => ({ ...prevUserData, [name]: trimmedValue }));

    setError(prevError => ({ ...prevError, [`${name}Error`]: newError }));
  };

  const handleValidation = () => {
    let isValid = true;
    const formErrors = {};

    const { value: trimmedName, error: nameError } = trimAndValidate("name", userData.name);
    if (nameError) {
      formErrors.nameError = nameError;
      isValid = false;
    }

    const { value: trimmedEmail, error: emailError } = trimAndValidate("email", userData.email);
    if (emailError) {
      formErrors.emailError = emailError;
      isValid = false;
    }
    setError(formErrors);
    return isValid;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const isValid = handleValidation();
    if (!isValid) return;
    try {
      await updateSession({
        ...session,
        user: { ...session.user, ...userData }
      });

      await updateProfile(userData);
      setIsEditing(prevState => !prevState);
    } catch (error) {
      setIsEditing(false);
    }
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
            mt: 5
          }}>
          Welcome {session?.user?.name}!
        </Typography>
        {/* left and right side of screen */}
        {errorAvatarUpload && (
          <Typography color="error" style={{ marginBottom: "10px" }}>
            {errorAvatarUpload}
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
                <Avatar src={avatarPreview} sx={{ width: 180, height: 180 }} />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  name="image"
                  style={{ display: "none" }}
                  accept="image/png, image/jpeg, image/jpg"
                />
                {isEditAvatar ? (
                  <Button
                    onClick={submitAvatar}
                    type="submit"
                    variant="contained"
                    color="secondary"
                    component="span"
                    sx={{
                      "letterSpacing": "0.1em",
                      "mt": 2,
                      "width": "50%",
                      "&:hover": {
                        backgroundColor: theme.palette.accent.main
                      }
                    }}>
                    Save Photo
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    variant="contained"
                    color="secondary"
                    component="span"
                    sx={{ mt: 2, width: "50%" }}>
                    Edit Photo
                  </Button>
                )}
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
                  component="form"
                  noValidate
                  autoComplete="off"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  sx={{
                    mt: 5,
                    p: 2,
                    width: "80%"
                  }}>
                  <TextField
                    onChange={handleChange}
                    name="name"
                    label="Nickname"
                    value={userData.name}
                    sx={{ mb: 2 }} //margin bottom
                    disabled={!isEditing}
                    required
                    error={Boolean(error.nameError)}
                    helperText={error.nameError}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={userData.email}
                    sx={{ mb: 2 }}
                    disabled={!isEditing}
                    onChange={handleChange}
                    required
                    error={Boolean(error.emailError)}
                    helperText={error.emailError}
                  />

                  <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      onClick={handleSubmit}
                      disabled={
                        isEditing &&
                        (Boolean(error.nameError) ||
                          Boolean(error.emailError) || 
                          !userData.name.trim() ||
                          !userData.email.trim()) 
                      }
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
      <Backdrop
        sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1, backdropFilter: "blur(2px)" }}
        open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
}
