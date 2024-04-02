"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchSellerCards } from "@/utils/fetchData";
import CardComponent from "@/components/CardComponent";
import { Alert, Avatar, Box, Container, Grid, Paper, Snackbar, Tab, Tabs, Typography } from "@mui/material";
import { set } from "mongoose";

const user = {
  name: "Our new seller",
  email: "123456@gmail.com",
  address: "123 Fake St., Springfield, IL 62701",
  isSeller: true
};
const seller = {
  // userId: "123456",
  rating: 4.5,
  feedback: 100,
  numberOfSales: 2,
  location: 100
};
export default function Seller({ params }) {
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState("cards"); //for tabs
  const [cards, setCards] = useState([]); //for cards
  const router = useRouter();
  const theme = useTheme();
  const { data: session, status } = useSession();
  const showButtons = false;
  //for now fot testing, later it will be a seller id
  const userId = session?.user?._id;
  console.log("session", session);
  console.log("status", status);
  console.log("userId", userId);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const sellerData = await fetchSellerCards(userId);
          setCards(sellerData);
        } catch (error) {
          console.error;
          setOpenError(true);
          setErrorMessage(error.toString() || "unknown error");
        }
      };
      fetchData();
    }
  }, [userId]);
  const handleChangeActiveTab = (event, newValue) => {
    setActiveTab(newValue);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  return (
    <Container maxWidth="lg">
      <Box display="flex" flexDirection="column" mt={5} mb={5} gap={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            // justifyContent: { xs: "center", sm: "flex-start" },
            backgroundColor: "background.default",
            justifyContent: "center",
            alignItems: { xs: "center", sm: "flex-start" },
            height: 150,
            px: 2,
            borderRadius: 1
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 1, sm: 5 },
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Avatar alt="seller image" src={session?.user?.avatarImgURL} sx={{ width: 100, height: 100 }} />
            <Typography variant="h2">{user.name}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              width: "100%"
              // justifyContent: "center",
              // alignItems: "center"
            }}>
            <Grid container spacing={2}>
              <Grid item xs></Grid>
              <Grid item sm={1}>
                <Typography variant="body2">Rating: {seller.rating}</Typography>
              </Grid>
              <Grid item sm={1}>
                <Typography variant="body2">Sales: {seller.numberOfSales}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs value={activeTab} onChange={handleChangeActiveTab} centered aria-label="handle seller info">
            <Tab label="Cards" value="cards" />
            <Tab label="About" value="2" />
            <Tab label="Reviews" value="3" />
          </Tabs>
        </Box>
        {/* <Box p={5}> */}
        {activeTab === "cards" && (
          <Grid container spacing={2}>
            <Grid item xs={2}></Grid>
            <Grid item xs>
              <Grid container spacing={2}>
                {cards.map(card => (
                  <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
                    <CardComponent key={card._id} card={card} showButtons={showButtons} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
      <Snackbar
        open={openError}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      {/* </Box> */}
    </Container>
  );
}
