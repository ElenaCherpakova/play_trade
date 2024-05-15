"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  Paper,
  TextField,
  Typography
} from "@mui/material";

import useAuthUser from "../../store/useAuthUser";

const ForgetPasswordPage = () => {
  const [formData, setFormData] = useState({ email: "" });

  const router = useRouter();
  const { forgetPassword, isLoading, error } = useAuthUser();
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/market");
    }
  }, [sessionStatus, router]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    forgetPassword(formData);
  };

  const handleLoginRedirect = () => {
    router.push("/signin");
  };

  return (
    sessionStatus !== "authenticated" && (
      <Container component="main" maxWidth="xs">
        <Paper
          sx={theme => ({
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: theme.spacing(6)
          })}>
          <Typography
            variant="h5"
            color="primary"
            sx={{
              mt: 2,
              mb: 2
            }}>
            Forget Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              autoFocus
            />
            {error && (
              <Typography variant="caption" color="error">
                Error: {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
              sx={{
                mt: 2,
                mb: 2
              }}>
              {isLoading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
            <Typography variant="body2" textAlign="center">
              Already have an account?{" "}
              <Link href="#" onClick={handleLoginRedirect} variant="body2">
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    )
  );
};

export default ForgetPasswordPage;
