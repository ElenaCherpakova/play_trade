"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCardData } from "@/utils/fetchData";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import CardComponent from "@/components/CardComponent";

/**
 * @param {params} Object
 
*/
export default function Page({ params }) {
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(null);
  const router = useRouter();
  const id = params.id;

  //get card data
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const cardData = await fetchCardData(id);
          setData(cardData);
        } catch (error) {
          console.error;
          setOpenError(true);
          setErrorMessage(error.toString() || "unknown error");
        }
      };
      fetchData();
    }
  }, [id]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  return (
    <Box>
      {data && <CardComponent card={data} />}
      <Button variant="contained" color="primary" onClick={() => router.push(`/sell/edit/${id}`)}>
        Edit card
      </Button>
      <Button variant="contained" color="primary" onClick={() => router.push(`/market/seller/[id]`)}>
        Watch information about the seller
      </Button>
      <Button variant="contained" color="primary" onClick={() => router.push("/cart")}>
        Add card to cart
      </Button>
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
