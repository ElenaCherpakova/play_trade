"use client";
import { useEffect, useState } from "react";
import { Box, Button, Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/navigation";
import { createCardData } from "@/utils/fetchData";
import CardForm from "@/components/CardForm";

export default function Sell() {
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [add, setAdd] = useState(false);
  //create card for testing routes
  const [id, setId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (id) {
      router.push(`/market/item/${id}`);
    }
  }, [id]);
  //card object for adding card
  const card = {
    name: "",
    set: "",
    price: 0,
    currency: "",
    shippingCost: 0,
    description: "",
    conditions: "",
    category: "",
    imageURL: "",
    quantity: 0,
    available: ""
  };

  //fetch data need to move to file in utils
  const addCard = async formData => {
    try {
      const data = await createCardData(formData);
      setId(data._id);
    } catch (error) {
      console.log(error);
      setOpenError(true);
      setErrorMessage(error.toString() || "unknown error");
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  return (
    <Box>
      <Box>
        <Button variant="contained" color="primary" onClick={() => setAdd(true)}>
          Add card
        </Button>
        <Button variant="contained" color="primary" onClick={() => router.push("/market/item/[id]")}>
          Delete card
        </Button>
        {add && <CardForm cardValue={card} onSubmitForm={addCard} />}
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
    </Box>
  );
}
