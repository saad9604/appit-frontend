import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  InputLabel,
  FormControl,
  IconButton,
  Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';

import logo from '../assets/logo.png'; // Assuming you have a logo image
import Post from '../components/Post';

const skillsList = [
  'Ux Research', 'Interaction Design', 'Visual Design', 'Information Architecture',
  'Prototyping', 'Usability Testing', 'Wireframing', 'User Interface Design',
  'User Journey Mapping', 'User Persona Development', 'Accessibility Design',
  'Content Strategy', 'Design Systems',
];

const PostJob = () => {
  const [selectedSkills, setSelectedSkills] = useState(skillsList);
  const [showSeo, setShowSeo] = useState(false); // <-- Add this


  return (
    <Box sx={{ p: 3 }}>
      <Post/>
    </Box>
  );
};

export default PostJob;