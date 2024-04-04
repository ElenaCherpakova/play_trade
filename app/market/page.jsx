"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Grid, Box, Snackbar, Alert, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { fetchAllCardsData } from "@/utils/fetchData";
import CardComponent from "../../components/CardComponent";
import Filter from "../../components/Filter";

export default function Market() {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCards, setTotalCards] = useState(0);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();
  const filters = {
    conditions: searchParams.get("conditions") || "",
    priceFrom: searchParams.get("priceFrom") || "",
    priceTo: searchParams.get("priceTo") || "",
    category: searchParams.get("category") || "",
    availability: searchParams.get("availability") || ""
  };
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const limit = 6;
        const page = searchTerm && currentPage !== 1 ? 1 : currentPage;
        const data = await fetchAllCardsData(searchTerm, filters, page, limit);
        setCards(data.cards);
        setTotalCards(data.total);
      } catch (error) {
        console.error;
        setOpenError(true);
        setErrorMessage(error.toString() || "unknown error");
      }
    };

    fetchData();
  }, [
    searchTerm,
    filters.conditions,
    filters.category,
    filters.priceFrom,
    filters.priceTo,
    currentPage,
    filters.availability
  ]);
  console.log(cards);


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  return (
    <>
      <Box display="flex" flexDirection="column" sx={{ m: 5 }}>
        <Box display="flex" sx={{ flexDirection: { xs: "column", sm: "row" } }}>
          <Box
            sx={{
              flex: 2,
              border: 1,
              borderColor: "grey.300",
              borderRadius: 2,
              p: 1,
              boxShadow: 3
            }}>
            <Filter />
          </Box>
          <Box sx={{ flex: 8, width: "100%" }}>
            {cards.length > 0 ? (
              <Grid container alignItems="center" sx={{ alignItems: "center", gap: 5, justifyContent: "center" }}>
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
            ) : (
              <Typography variant="h6" align="center">
                No matches found.
              </Typography>
            )}
          </Box>
        </Box>
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={Math.ceil(totalCards / 6)}
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
              shape="rounded"
            />
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
