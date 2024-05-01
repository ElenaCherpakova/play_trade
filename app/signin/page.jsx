"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import useAuthUser from "../../store/useAuthUser";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider,
  Link,
  Paper
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { login, googleLogin, isLoading, error } = useAuthUser();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (!session) return;
    if (sessionStatus === "authenticated") {
      router.replace("/market");
    }
  }, [sessionStatus, router, session]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    login(formData);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterRedirect = () => {
    router.push("/signup");
  };

  const handleGoogleSignIn = async () => {
    googleLogin();
  };

  return (
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
          component="h1"
          variant="h5"
          color="primary"
          sx={{
            mt: 2,
            mb: 2
          }}>
          Login Page
        </Typography>
        {error && (
          <Typography variant="caption" color="error">
            Error: {error}
          </Typography>
        )}
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
                  <IconButton aria-label="toggle password visibility" onClick={toggleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Typography variant="body2" textAlign="center" gutterBottom>
            Forgot password?{" "}
            <Link href="/forget-password" disabled variant="body2">
              Reset here
            </Link>
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            color="primary"
            sx={{
              mt: 2,
              mb: 1
            }}>
            {isLoading ? <CircularProgress size={24} /> : "Log In"}
          </Button>
          <Typography variant="body2" textAlign="center">
            Don&quot;t have an account?{" "}
            <Link href="#" onClick={handleRegisterRedirect} variant="body2">
              Register
            </Link>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography sx={{ mx: 2, color: "text.secondary" }}>OR</Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>
          <Button
            onClick={handleGoogleSignIn}
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<GoogleIcon />}
            sx={{
              mt: 2,
              mb: 2
            }}>
            Sign in with Google
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignInPage;
