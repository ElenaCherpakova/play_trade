'use client'

import { useRouter } from "next/navigation";
import { useState } from 'react';
import useAuthUser from '../../store/useAuthUser';
import { useTheme } from '@mui/material/styles';
import { Container, Box, TextField, Button, Typography, CircularProgress, Link, InputAdornment, IconButton, Divider, Paper } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();
  const router = useRouter();
  const { register, isLoading, error } = useAuthUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    register(formData);
  };

  const handleLoginRedirect = () => {
    router.push('/signin'); 
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
          Sign up to PlayTrade
        </Typography>
        {error && <Typography color="error">Error: {error}</Typography>}
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
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="caption" display="block" gutterBottom>
            <Link href="#" disabled variant="caption" sx={{ float: 'right' }} underline="none">
              Forgot password?
            </Link>
          </Typography>
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
            {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography sx={{ mx: 2, color: 'text.secondary' }}>or</Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box> 
          <Button
            onClick={handleLoginRedirect}
            fullWidth
            variant="contained"
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
            Login with an existing aacount
          </Button> 
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUpPage;