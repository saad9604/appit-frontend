import React from 'react';
import { Modal, Box, Typography, Button, Paper, InputAdornment, TextField, Stack, IconButton } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close'; // Import Close icon
import { useNavigate } from 'react-router-dom';
const Joblink = ({ open, onClose, jobLinks, setSelectedSection }) => {

  const navigate = useNavigate();
  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
  };

  const handleJobsView = () => {
    setSelectedSection('View Jobs');
    onClose();
    navigate('/dashboard');
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          minHeight: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 1300,
          background: 'rgba(0,0,0,0.15)'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, md: 5 },
            borderRadius: 4,
            minWidth: 440, // increased width
            maxWidth: 600,
            textAlign: 'center',
            mx: 'auto',
            position: 'relative' // for absolute positioning of close button
          }}
        >
          {/* Cross Icon Button */}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              color: '#888',
              zIndex: 2
            }}
          >
            <CloseIcon />
          </IconButton>
          <CheckCircleOutlineIcon sx={{ color: 'green', fontSize: 60, mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: 'green' }}>
            Job posted successfully
          </Typography>
          <Stack spacing={2} sx={{ my: 3 }}>
            {jobLinks.map((link, idx) => (
              <Box
                key={link}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '2px solid #e0e0e0',
                  borderRadius: 30,
                  px: 1,
                  py: 0.5,
                  background: '#fff',
                  maxWidth: 340,
                  mx: 'auto'
                }}
              >
                <TextField
                  value={link}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    readOnly: true,
                    sx: { fontSize: 18, pl: 1, flex: 1 },
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          onClick={() => handleCopy(link)}
                          sx={{
                            background: 'linear-gradient(to right, #2575fc, #6a11cb)',
                            color: '#fff',
                            borderRadius: 30,
                            px: 3,
                            py: 1,
                            textTransform: 'none',
                            fontWeight: 600,
                            ml: 1,
                            minWidth: 0
                          }}
                          startIcon={<ContentCopyIcon />}
                        >
                          copy
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Box>
            ))}
          </Stack>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(to right, #2575fc, #6a11cb)',
              borderRadius: 30,
              px: 5,
              py: 1.5,
              fontWeight: 600,
              fontSize: 18,
              textTransform: 'none',
              mt: 2
            }}
            onClick={handleJobsView}
          >
            View all Jobs
          </Button>
        </Paper>
      </Box>
    </Modal>
  );
};

export default Joblink;