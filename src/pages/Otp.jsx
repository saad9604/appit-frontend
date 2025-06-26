import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Paper, useMediaQuery } from '@mui/material';
import backgroundImage from '../assets/unsplash.png';
import logo from '../assets/logo.png';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
const Otp = ({email , setEmail}) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate(); // Initialize useNavigate hook


  const handleSendOTP = async () => {
  try {
    console.log(email, otp);
    const response = await axios.post('https://appit-backend-wb0d.onrender.com/verify-otp', { email, otp });

    if (response.status === 200) {
      sessionStorage.setItem('userEmail', email); // ✅ Store email
      setMessage('OTP verified successfully!');
      navigate('/dashboard');
    }
  } catch (error) {
    setMessage('Verification failed. Please check your OTP and try again.');
  }
};


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
        overflowY: 'hidden',
        paddingX:'5px'
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{
            minHeight: 400,
            p: { xs: 2, md: 4 },
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <Typography gutterBottom sx={{
              fontWeight: 600,
              fontSize: { xs: '32px', md: '48px' },
              lineHeight: { xs: '40px', md: '64px' }
            }}>
              Welcome Back to <br />
              <Box component="span" sx={{ color: '#0077cc' }}>Appit Software</Box>
            </Typography>

            <Typography sx={{ color: "black" }} variant="body2" gutterBottom>
              Please enter the One Time Password (OTP) sent to your registered email to login
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 2, my: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter your OTP"
                variant="outlined"
                size="small"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button variant="contained" onClick={handleSendOTP} sx={{
                borderRadius: 10,
                textTransform: 'none',
                px: 3,
                backgroundColor: 'black',
                width: { xs: '100%', sm: 'auto' }
              }}>
                Submit
              </Button>
            </Box>

            {message && (
              <Typography sx={{ mt: 2, color: 'green' }}>{message}</Typography>
            )}
          </Paper>
        </Grid>

        {!isMobile && (
          <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
            <Box>
              <Box component="img" src={logo} alt="Appit Logo" sx={{ width: 280, mb: 1 }} />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Otp;