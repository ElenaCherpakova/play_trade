"use client";
import { React, useState, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  Alert,
  Box,
  Breadcrumbs,
  Typography,
  Grid,
  Backdrop,
  CircularProgress,
  Link,
  Snackbar
} from "@mui/material";

import AvatarSection from "./AvatarSection";
import FormSection from "./FormSection";

import useImageUpload from "@/hooks/useImageUpload";
import useAuthUser from "@/store/useAuthUser";
import { theme } from "@/styles/theme";
import { trimAndValidate } from "@/utils/helpers";

export default function UserProfileEditPage() {
  const updateProfile = useAuthUser(state => state.updateProfile);
  const { handleImageUpload, error: errorAvatarUpload } = useImageUpload();
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);
  const router = useRouter();
  const { data: session, update: updateSession, status } = useSession();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: ""
  });

  useEffect(() => {
    try {
      if (status === "authenticated") {
        setUserData({
          name: session?.user?.name,
          email: session?.user?.email,
          address: session?.user?.address
        });
        setAvatarPreview(session?.user?.avatar);
      }
    } catch (error) {
      setOpenError(true);
      setErrorMessage(error.toString() || "unknown error");
    }
  }, [session, status]);

  useEffect(() => {
    if (!selectedFile) return;

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
        const existingPublicId = session.user?.avatarPublicId;
        await handleImageUpload(
          selectedFile,
          async (imageURL, imagePublicId) => {
            setAvatarPreview(imageURL);

            await updateSession({
              ...session,
              user: {
                ...session.user,
                avatar: imageURL,
                avatarPublicId: imagePublicId
              }
            });

            const userDataWithAvatar = {
              ...session.user,
              avatar: imageURL,
              avatarPublicId: imagePublicId,
              type: "profile"
            };
            await updateProfile(userDataWithAvatar);
            setIsEditAvatar(false);
          },
          existingPublicId
        );
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

  const handleValidation = isSeller => {
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
    if (isSeller) {
      const { value: trimmedAddress, error: addressError } = trimAndValidate(
        "address",
        userData.address
      );
      if (addressError) {
        formErrors.addressError = addressError;
        isValid = false;
      }
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
      userData.type = "profile";
      await updateProfile(userData);
      setIsEditing(prevState => !prevState);
    } catch (error) {
      setIsEditing(false);
    }
  };

  if (!session) {
    return null;
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  return (
    <Box sx={{ ml: theme.spacing(2) }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, mb: 3 }}>
        <Link color="inherit" href="/" onClick={() => router.push("/")}>
          Home
        </Link>
        <Link color="inherit" href="/profile" onClick={() => router.push("/")}>
          Profile
        </Link>
        <Typography color="text.primary">Edit Profile</Typography>
      </Breadcrumbs>

      <Grid
        container
        spacing={3}
        sx={{
          mx: "auto",
          my: 5,
          width: "80%"
        }}>
        <Grid item xs={12} md={6} lg={3}>
          <AvatarSection
            avatarPreview={avatarPreview}
            handleAvatarChange={handleAvatarChange}
            isEditAvatar={isEditAvatar}
            fileInputRef={fileInputRef}
            submitAvatar={submitAvatar}
            theme={theme}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={9}>
          <Typography
            variant="h3"
            color="primary"
            gutterBottom
            sx={{
              flexGrow: 0,
              p: 0,
              textAlign: "left"
            }}>
            Update Your Profile
          </Typography>
          <FormSection
            handleChange={handleChange}
            userData={userData}
            isEditing={isEditing}
            handleSubmit={handleSubmit}
            error={error}
            theme={theme}
            isSeller={session.user.isSeller}
          />
        </Grid>
      </Grid>
      {errorAvatarUpload && (
        <Typography color="error" style={{ marginBottom: "10px" }}>
          {errorAvatarUpload}
        </Typography>
      )}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: theme => theme.zIndex.drawer + 1,
          backdropFilter: "blur(2px)"
        }}
        open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={openError}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
