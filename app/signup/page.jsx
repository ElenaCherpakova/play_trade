"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography
} from "@mui/material";

import useAuthUser from "../../store/useAuthUser";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { register, isLoading, error } = useAuthUser();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    register(formData);
  };

  const handleLoginRedirect = () => {
    router.push("/signin");
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
          Sign up to PlayTrade
        </Typography>
        {error && (
          <Typography color="error" variant="caption">
            Error: {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Username"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
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
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
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
            disabled={isLoading}
            sx={{
              mt: 2,
              mb: 2
            }}>
            {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
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
  );
};

export default SignUpPage;
