import React from 'react';
import { Box, Grid, Typography, TextField, Button, Paper } from '@mui/material';
import backgroundImage from '../assets/unsplash.png';
import logo from '../assets/logo.png';

const LoginScreen = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Grid container spacing={12} alignItems="center" justifyContent="center">
        {/* Left Side - Login Box */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            sx={{
              minHeight: 360, // Increased height
              p: 4,
              borderRadius: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.2)', // More transparent
              backdropFilter: 'blur(6px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
                gutterBottom
                sx={{
                    fontWeight: 600, // SemiBold
                    fontSize: '48px',
                    lineHeight: '64px',
                    letterSpacing: 0,
                }}
                >
                Welcome Back to <br />
                <Box component="span" sx={{ color: '#0077cc' }}>
                    Appit Software
                </Box>
            </Typography>

            <Typography sx={{color:"black"}} variant="body2" color="text.secondary" gutterBottom>
              Access your account securely by signing in with your credentials.
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
            <TextField
                fullWidth
                placeholder="Enter your email address"
                variant="outlined"
                size="small"
            />
            <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 10, textTransform: 'none', whiteSpace: 'nowrap', px: 3 , backgroundColor:"black" }}
            >
                Login
            </Button>
            </Box>

          </Paper>
        </Grid>

        {/* Right Side - Logo */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            textAlign: 'center',
          }}
        >
          <Box>
            <Box
              component="img"
              src={logo}
              alt="Appit Logo"
              sx={{ width: 280, mb: 1 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginScreen;
