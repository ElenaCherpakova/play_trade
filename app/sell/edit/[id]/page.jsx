"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Alert, Box, Snackbar } from "@mui/material";
import CardForm from "@/components/CardForm";

export default function Page({ params }) {
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(null);
  const router = useRouter();
  const id = params.id;
  useEffect(() => {
    if (id) {
      //fetch data need to move to file in utils
      const fetchCard = async () => {
        const response = await fetch(`/api/cards/${id}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setData(data.data);
      };
      fetchCard();
    }
  }, [id]);

  //fetch data need to move to file in utils
  const editCard = async editProperty => {
    const editCard = {
      ...data,
      ...editProperty
    };
    const body = JSON.stringify({ ...editCard });
    try {
      const response = await fetch(`/api/cards/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body
      });

      const data = await response.json();
      console.log(data);
      setData(data.data);
      router.push(`/market/item/${id}`);
    } catch (error) {
      console.log(error.message);
      console.error(error);
      setOpenError(true);
      setErrorMessage(error.message || "unknown error");
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
      {data && <CardForm cardValue={data} onSubmitForm={editCard} />}
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
