"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, Breadcrumbs, Button, Modal, TextField, Link, Paper, Typography, Avatar, Grid, Snackbar, Alert } from "@mui/material";
import { theme } from "@/styles/theme";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import useAuthUser from "@/store/useAuthUser";
import Loader from "@/components/loader/Loader";

export default function Profile() {
  const { data: session, update: updateSession, status } = useSession();
  const updateProfile = useAuthUser(state => state.updateProfile);

  const [location, setLocation] = useState("");
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [sessionLoading, setSessionLoading] = useState(true);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    avatar: "",
    userRole: ""
  });

  useEffect(() => {
    if (status === "authenticated" && session) {
      setUserData({
        name: session?.user?.name,
        email: session?.user?.email,
        avatar: session?.user?.avatar,
        userRole: session?.user?.isSeller ? "Seller" : "Buyer",
        location: session?.user?.address
      });
      setLoading(false);
    } else if (status === "loading") {
      setLoading(true);
    }
  }, [session, status]);

  const handleBecomeSeller = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await updateProfile({ location, type: "seller" });
      if (data && data.isSeller && data.address) {
        await updateSession({
          ...session,
          user: { ...session.user, isSeller: data.isSeller, address: data.address }
        });
        setUserData(prev => ({
          ...prev,
          userRole: "Seller",
          location: data.address
        }));

        setShowLocationForm(false);
      } else {
        setErrorMessage(data.message || "Failed to become a seller");
      }
    } catch (error) {
      setOpenError(true);
      setErrorMessage(error.toString() || "An error occurred while updating");
    }
    setLoading(false);
  };
  const handleClose = () => {
    setOpenError(false);
  };

  return (
    <Box sx={{ ml: theme.spacing(2) }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, mb: 3 }}>
        <Link color="inherit" href="/" onClick={() => router.push("/")}>
          Home
        </Link>
        <Typography color="text.primary">Profile</Typography>
      </Breadcrumbs>

      {loading ? (
        <Loader />
      ) : (
        <Grid
          container
          spacing={3}
          sx={{
            mx: "auto",
            my: 5,
            width: "80%"
          }}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 240
              }}>
              <Avatar src={userData.avatar} alt="user image" sx={{ width: 180, height: 180 }} />
              <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
                {userData.name}
              </Typography>
              <Typography variant="subtitle1">{session?.user?.isSeller ? "Seller" : "Buyer"}</Typography>
              <Button
                onClick={() => router.push("/profile/update")}
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  letterSpacing: "0.1em",
                  mt: 3
                }}>
                Edit profile
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Typography
              variant="h3"
              color="primary"
              gutterBottom
              sx={{
                flexGrow: 0,
                p: 0,
                textAlign: "left"
              }}>
              Personal Profile
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 5 }}>
              <EmailIcon sx={{ fontSize: 35 }} color="primary" />
              <Typography variant="subtitle1" color="primary" gutterBottom m="0">
                {userData.email}
              </Typography>
            </Box>
            {userData.location && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <LocationOnIcon sx={{ fontSize: 35 }} color="primary" />
                <Typography variant="subtitle1" color="primary" m="0">
                  {userData.location}
                </Typography>
              </Box>
            )}
            {!session?.user?.isSeller && !showLocationForm && (
              <Button
                onClick={() => setShowLocationForm(true)}
                variant="contained"
                color="accent"
                sx={{
                  "mt": 5,
                  "width": "20rem",
                  "letterSpacing": "0.2em",
                  "&:hover": {
                    backgroundColor: theme.palette.accent.main
                  }
                }}>
                Start selling now
              </Button>
            )}
            <Modal
              open={showLocationForm}
              onClose={() => setShowLocationForm(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Paper
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  p: 7,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2
                }}
                component="form"
                onSubmit={handleBecomeSeller}>
                <Typography variant="h5" color="primary">
                  Add your location
                </Typography>
                <TextField
                  onChange={e => setLocation(e.target.value)}
                  fullWidth
                  name="location"
                  label="Location"
                  placeholder="e.g., Canada, Toronto"
                  value={location}
                  sx={{ mb: 2 }}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="accent"
                  fullWidth
                  mt="2"
                  sx={{
                    "letterSpacing": "0.1em",
                    "&:hover": {
                      backgroundColor: theme.palette.accent.main
                    }
                  }}>
                  Become a Seller
                </Button>
              </Paper>
            </Modal>
          </Grid>
        </Grid>
      )}

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
