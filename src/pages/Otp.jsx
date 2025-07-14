import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  useMediaQuery,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import backgroundImage from '../assets/unsplash.png';
import logo from '../assets/logo.png';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Otp = ({ email, setEmail }) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSendOTP = async () => {
    setIsLoading(true);
    try {
      // const response = await axios.post('http://localhost:5000/verify-otp', { email, otp });
      const response = await axios.post('https://appit-backend-wb0d.onrender.com/verify-otp', { email, otp });


      if (response.status === 200) {
        const { token } = response.data;

        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('authToken', token);

        setMessage('OTP verified successfully!');
        setSnackbarMessage('Logged in successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Verification failed. Please check your OTP and try again.';
      setMessage('');
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
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
        paddingX: '5px',
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            sx={{
              minHeight: 400,
              p: { xs: 2, md: 4 },
              borderRadius: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
              gutterBottom
              sx={{
                fontWeight: 600,
                fontSize: { xs: '32px', md: '48px' },
                lineHeight: { xs: '40px', md: '64px' },
              }}
            >
              Welcome Back to <br />
              <Box component="span" sx={{ color: '#0077cc' }}>
                Appit Software
              </Box>
            </Typography>

            <Typography sx={{ color: 'black' }} variant="body2" gutterBottom>
              Please enter the One Time Password (OTP) sent to your registered email to login
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: 2,
                my: 2,
              }}
            >
              <TextField
                fullWidth
                placeholder="Enter your OTP"
                variant="outlined"
                size="small"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={isLoading || timeLeft === 0}
              />
              <Button
                variant="contained"
                onClick={handleSendOTP}
                sx={{
                  borderRadius: 10,
                  textTransform: 'none',
                  px: 3,
                  backgroundColor: 'black',
                  width: { xs: '100%', sm: 'auto' },
                }}
                disabled={isLoading || timeLeft === 0}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
              </Button>
            </Box>

            <Typography sx={{ fontSize: 14, mt: 1, color: timeLeft === 0 ? 'red' : 'black' }}>
              {timeLeft > 0
                ? `OTP expires in ${formatTime(timeLeft)}`
                : 'OTP expired. Please request a new one.'}
            </Typography>

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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Otp;
