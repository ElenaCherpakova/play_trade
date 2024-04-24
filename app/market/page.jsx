"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Grid, Box, Snackbar, Alert, Typography, IconButton, Drawer, Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import { fetchAllCardsData } from "@/utils/fetchData";
import CardComponent from "../../components/CardComponent";
import Filter from "../../components/Filter";
import Loader from "@/components/loader/Loader";

export default function Market() {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCards, setTotalCards] = useState(0);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const filters = {
    conditions: searchParams.get("conditions") || "",
    priceFrom: searchParams.get("priceFrom") || "",
    priceTo: searchParams.get("priceTo") || "",
    category: searchParams.get("category") || "",
    availability: searchParams.get("availability") || "",
    search: searchParams.get("search") || ""
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const limit = 6;
        const page = filters.search && currentPage !== 1 ? 1 : currentPage;
        const data = await fetchAllCardsData(filters.search, filters, page, limit);
        setCards(data.cards);
        setTotalCards(data.total);
        setLoading(false);
      } catch (error) {
        console.error;
        setOpenError(true);
        setErrorMessage(error.toString() || "unknown error");
      }
    };

    fetchData();
  }, [
    filters.search,
    filters.conditions,
    filters.category,
    filters.priceFrom,
    filters.priceTo,
    currentPage,
    filters.availability
  ]);

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
            display={{ xs: "block", sm: "none" }}
            sx={{
              m: 0.5,
              position: "fixed",
              top: 70,
              left: 20
            }}>
            <FilterListIcon sx={{ fontSize: 40 }} onClick={() => setFilterOpen(true)} />
          </Box>
          {/* Filter Drawer shown on small screens */}
          <Drawer
            sx={{
              "& .MuiDrawer-paper": {
                width: "100%",
                maxWidth: "100%"
              }
            }}
            open={filterOpen}
            onClose={() => setFilterOpen(false)}
            ModalProps={{ keepMounted: true }}>
            <Box role="presentation">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 1
                }}>
                <IconButton onClick={() => setFilterOpen(false)} aria-label="close">
                  <CloseIcon sx={{ fontSize: "40px" }} />
                </IconButton>
              </Box>
              <Filter filtersParams={filters} />
            </Box>
            <Box sx={{ p: 2 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                  setFilterOpen(false);
                }}>
                Apply Filters
              </Button>
              <Typography variant="subtitle1" align="center" sx={{ width: "100%", mt: 2 }}>
                {`${totalCards} result${totalCards !== 1 ? "s" : ""} found`}
              </Typography>
            </Box>
          </Drawer>
          {/* Filter Box shown on larger screens */}
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              flex: 2,
              border: 1,
              borderColor: "grey.300",
              borderRadius: 2,
              p: 1,
              boxShadow: 3
            }}>
            <Filter filtersParams={filters} />
          </Box>
          <Box
            sx={{
              flex: 8,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "70vh"
            }}>
            {loading ? (
              <Loader />
            ) : (
              <>
                {cards.length > 0 ? (
                  <Grid container gap={5}>
                    {cards.map(card => (
                      <Grid
                        item
                        xs={12}
                        key={card._id}
                        md={4}
                        lg={3}
                        sx={{ display: "flex", justifyContent: "center" }}>
                        <CardComponent card={card} showButtons={session?.user?._id !== card?.createdBy} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="h6" align="center" sx={{ width: "100%" }}>
                    No matches found.
                  </Typography>
                )}
              </>
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
