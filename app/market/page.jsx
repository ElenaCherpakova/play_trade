"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Grid, Box, Snackbar, Alert } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { fetchAllCardsData } from "@/utils/fetchData";
import CardComponent from "../../components/CardComponent";
import SelectComponent from "../../components/SelectComponent";

export default function Market() {
  const [cards, setCards] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllCardsData(search);
        setCards(data);
      } catch (error) {
        console.error;
        setOpenError(true);
        setErrorMessage(error.toString() || "unknown error");
      }
    };

    fetchData();
  }, [search]);

  const category = [" ", "Magic", "Pokemon", "Digimon", "Yu-Gi-Oh!", "Sport Card"];

  const conditions = [" ", "near mint", "excellent", "very good", "poor"]; //Sport Card
  // const conditions1 = ["near mint", "lightly played", "moderately played", "heavily played", "damaged"]; //Other cards

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  return (
    <>
      <Box display="flex" flexDirection="column" sx={{ m: 5 }}>
        <Box display="flex" sx={{ gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
          <Box>
            <SelectComponent selectId="category" label="category" options={category} />
            <SelectComponent selectId="conditions" label="conditions" options={conditions} />
          </Box>
          <Grid container alignItems="center" sx={{ alignItems: "center", gap: 1, justifyContent: "center" }}>
            {cards.map(card => (
              <Grid
                item
                xs={12}
                key={card._id}
                md={4}
                lg={3}
                align="center"
                alignItems="center"
                justifyContent="center"
                sx={{ p: 0, m: 1 }}>
                <CardComponent card={card} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Stack spacing={2} alignItems="center">
          <Pagination count={10} shape="rounded" />
        </Stack>
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
    </>
  );
}
