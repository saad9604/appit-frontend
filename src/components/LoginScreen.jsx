import React, { useState } from 'react';
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
} from '@mui/material';
import backgroundImage from '../assets/unsplash.png';
import logo from '../assets/logo.png';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const LoginScreen = ({ email, setEmail }) => {
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendOTP = async () => {
    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    try {
      // const response = await axios.post('http://localhost:5000/send-otp', { email });
      const response = await axios.post('https://appit-backend-wb0d.onrender.com/send-otp', { email });


      setMessage(response.data.message);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      if (response.status === 200) {
        navigate('/otp');
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || 'Failed to send OTP. Please try again.';
      setMessage(errorMsg);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
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
      <Grid container spacing={10} alignItems="center" justifyContent="center">
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
              Access your account securely by signing in with your credentials.
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
                placeholder="Enter your email address"
                variant="outlined"
                size="small"
                value={email}
                type="email"
                onChange={handleEmailChange}
              />
              <Button
                variant="contained"
                onClick={handleSendOTP}
                sx={{
                  borderRadius: 10,
                  fontSize: '10px',
                  textTransform: 'none',
                  px: 2,
                  backgroundColor: 'black',
                  width: { xs: '100%', sm: '25%' },
                }}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </Box>
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
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginScreen;
