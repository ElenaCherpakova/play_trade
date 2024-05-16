"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography
} from "@mui/material";

import useAuthUser from "../../../store/useAuthUser";

const ResetPasswordPage = ({ params }) => {
  const [formData, setFormData] = useState({ password: "" });

  const [showPassword, setShowPassword] = useState(false);
  const { verifyToken, resetPassword, email, verifyError, passwordResetSuccess } = useAuthUser();

  const router = useRouter();

  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (params.token) {
      verifyToken(params.token);
    }
  }, [params.token, verifyToken]);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/market");
    }
  }, [sessionStatus, router]);

  useEffect(() => {
    if (passwordResetSuccess) {
      router.push("/signin");
    }
  }, [passwordResetSuccess, router]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = e => {
    e.preventDefault();
    resetPassword(formData.password, email);
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
            Reset Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={verifyError?.length > 0}
              sx={{
                mt: 2,
                mb: 2
              }}>
              Reset Password
            </Button>
            {verifyError && (
              <>
                <Typography variant="caption" color="error">
                  {verifyError}
                </Typography>
                <Typography textAlign="center" variant="body2" sx={{ mt: 2 }}>
                  <Link href="/forget-password">Generate a reset password link</Link>
                </Typography>
              </>
            )}
          </Box>
        </Paper>
      </Container>
    )
  );
};

export default ResetPasswordPage;
