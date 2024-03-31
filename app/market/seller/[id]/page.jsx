"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchSellerCards } from "@/utils/fetchData";
import CardComponent from "@/components/CardComponent";
import { Alert, Avatar, Box, Container, Grid, Paper, Snackbar, Typography } from "@mui/material";
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
  const [data, setData] = useState(null);
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
          setData(sellerData);
        } catch (error) {
          console.error;
          setOpenError(true);
          setErrorMessage(error.toString() || "unknown error");
        }
      };
      fetchData();
    }
  }, [userId]);

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
          display="flex"
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1, sm: 5 },
            justifyContent: { xs: "center", sm: "flex-start" },
            backgroundColor: "secondary.main",
            // justifyContent: "center",
            alignItems: "center",
            height: 150,
            px: 2
          }}>
          <Box>
            <Avatar alt="seller image" src={session?.user?.avatarImgURL} sx={{ width: 100, height: 100 }} />
          </Box>
          <Typography variant="h2">{user.name}</Typography>
        </Box>
        {/* <Box p={5}> */}
        <Grid container spacing={2}>
          <Grid item xs={2}></Grid>
          <Grid item xs>
            <Grid container spacing={2}>
              {data &&
                data.map(card => (
                  <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
                    <CardComponent key={card._id} card={card} showButtons={showButtons} />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
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
