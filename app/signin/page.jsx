"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import useAuthUser from '../../store/useAuthUser';
import { useTheme } from '@mui/material/styles';
import { Container, Box, TextField, Button, Typography, CircularProgress, InputAdornment, IconButton, Divider, Link, Paper } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google'; 

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();
  const router = useRouter();
  const { login, googleLogin, isLoading, error } = useAuthUser();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (!session) return; 
    
    if (sessionStatus === 'authenticated') {
      router.replace('/market'); 
    } else if (sessionStatus === 'unauthenticated') {
      router.replace('/signin'); 
    }
  }, [sessionStatus, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterRedirect = () => {
    router.push('/signup'); 
  };


  const handleGoogleSignIn = async () => {
    googleLogin();
  };


  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: theme.spacing(6),
          borderRadius: theme.shape.borderRadius, 
        }}
      >
        <Typography  
          component="h1" 
          variant="h5"
          sx={{
            mt: 2,
            mb: 2,
            color: theme.palette.primary.main, 
            fontFamily: theme.typography.fontFamily,
          }}
          >
          Login Page
        </Typography>
        {error && <Typography color="error">Error: {error}</Typography>}
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
            type={showPassword ? 'text' : 'password'}
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
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              mt: 2,
              mb: 2,
              color: theme.palette.background.paper, 
              backgroundColor: theme.palette.primary.main, 
              '&:hover': {
                backgroundColor: theme.palette.accent.main, 
              },
              borderRadius: theme.shape.borderRadius, 
              fontFamily: theme.typography.fontFamily,
            }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Log In'}
          </Button>
          <Typography variant="body2" sx={{ mt: 0, mb: 2, textAlign: 'center', fontSize: '0.875rem' }}>
            Don't have an account?{' '}
            <Link href="#" onClick={handleRegisterRedirect} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
              Register
            </Link>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography sx={{ mx: 2, color: 'text.secondary' }}>or</Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>
          <Button
            onClick={handleGoogleSignIn}
            fullWidth
            variant="contained"
            startIcon={<GoogleIcon />}
            sx={{
              mt: 2,
              mb: 2,
              color: theme.palette.background.paper, 
              backgroundColor: theme.palette.primary.main, 
              '&:hover': {
                backgroundColor: theme.palette.accent.main, 
              },
              borderRadius: theme.shape.borderRadius, 
              fontFamily: theme.typography.fontFamily,
            }}
          >
            Sign in with Google
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignInPage;