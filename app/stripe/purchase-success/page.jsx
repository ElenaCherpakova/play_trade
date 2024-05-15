import React from "react";

import { Container, Typography } from "@mui/material";

export default function SuccessPage() {
  return (
    <Container maxWidth="sm" style={{ marginTop: "100px", textAlign: "center" }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="subtitle1">
        Your transaction has been processed successfully. Thank you for your purchase!
      </Typography>
    </Container>
  );
}
