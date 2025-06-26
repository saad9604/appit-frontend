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
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import logo from '../assets/logo.png'; // Assuming you have a logo image

const skillsList = [
  'Ux Research', 'Interaction Design', 'Visual Design', 'Information Architecture',
  'Prototyping', 'Usability Testing', 'Wireframing', 'User Interface Design',
  'User Journey Mapping', 'User Persona Development', 'Accessibility Design',
  'Content Strategy', 'Design Systems',
];

const PostPage = ({ setBackClicked, nextClicked, setNextClicked, form, setForm, handleChange, errors, setErrors, validate }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showSeo, setShowSeo] = useState(false); // <-- Add this

  const requiredFields = [
    'jobTitle', 'company', 'workType', 'jobLocation', 'jobType', 'description',
    'metaTitle', 'url', 'metaDescription'
  ];

  const handleClick = () => {
    if (validate()) {
      setBackClicked(false);
      setNextClicked(true);
    }
  }



  return (
    <Box sx={{ p: 5 }}>


      <Grid container spacing={1}>
        <Grid item size={{ xs: 12, md: 8 }}>

          <Paper elevation={4} sx={{ p: 3, borderRadius: '8px' }}>
            <Typography gutterBottom sx={{
              fontWeight: 600,
              letterSpacing: '0.21px'
            }}>
              Post a Job
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography gutterBottom sx={{
              fontWeight: 500,
              letterSpacing: '0.21px'
            }}>Job Details*</Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item size={{ xs: 12, md: 6 }}>
                <label>
                  Job Title <span style={{ color: 'red' }}>*</span>
                  <input
                    type="text"
                    name="jobTitle"
                    value={form.jobTitle}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                  {errors.jobTitle && <div style={{ color: 'red', fontSize: '12px' }}>Required</div>}
                </label>
              </Grid>

              <Grid item size={{ xs: 12, sm: 6 }}>
                <label>
                  Company
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                  {errors.company && <div style={{ color: 'red', fontSize: '12px' }}>Required</div>}
                </label>
              </Grid>
            </Grid>
              
            <Grid container spacing={2} sx={{ mt: 2 }}>
               <Grid item size={{ xs: 12, sm: 6 }}>
                <label>
                  Work Type
                  <select
                    name="workType"
                    value={form.workType}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  >
                    <option value="">Select</option>
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                  {errors.workType && <div style={{ color: 'red', fontSize: '12px' }}>Required</div>}
                </label>
              </Grid>

              <Grid item size={{ xs: 12, sm: 6 }}>
                <label>
                  Job Location <span style={{ color: 'red' }}>*</span>
                  <input
                    type="text"
                    name="jobLocation"
                    value={form.jobLocation}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                  {errors.jobLocation && <div style={{ color: 'red', fontSize: '12px' }}>Required</div>}
                </label>
              </Grid>
            </Grid>
             

              <Grid item size={{ xs: 12, sm: 6 }} sx={{ mt: 2 }}>
                <label>
                  Job Type
                  <select
                    name="jobType"
                    value={form.jobType}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  >
                    <option value="">Select</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                  {errors.jobType && <div style={{ color: 'red', fontSize: '12px' }}>Required</div>}
                </label>
              </Grid>
            


            <Box mt={3}>
              <Button
                variant="contained"
                sx={{
                  background: 'linear-gradient(90deg, #2931EF 0%, #C219C0 100%)',
                  borderRadius: '8px',
                  color: '#fff',
                  boxShadow: 'none',
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #2931EF 0%, #C219C0 100%)',
                    opacity: 0.95,
                  },
                }}
              >
                Write Description with AI
              </Button>
            </Box>

            <Box mt={3}>
              <Typography variant="subtitle1" gutterBottom>Description*</Typography>
              <TextField
                fullWidth
                multiline
                minRows={6}
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description && "Required"}
              />
            </Box>

            <Box mt={3} mb={3}>
              <Paper variant="outlined" sx={{ p: 0 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 2,
                    py: 1,
                    cursor: 'pointer',
                  }}
                  onClick={() => setShowSeo((prev) => !prev)}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    SEO Settings
                  </Typography>
                  <IconButton size="small">
                    <ExpandMoreIcon
                      sx={{
                        transform: showSeo ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                      }}
                    />
                  </IconButton>
                </Box>
                <Collapse in={showSeo}>
                  <Box sx={{ p: 2 }}>
                    <TextField
                      fullWidth
                      label="Meta Title"
                      name="metaTitle"
                      value={form.metaTitle}
                      onChange={handleChange}
                      required
                      margin="normal"
                      error={!!errors.metaTitle}
                      helperText={errors.metaTitle && "Required"}
                    />
                    <TextField
                      fullWidth
                      label="URL"
                      name="url"
                      value={form.url}
                      onChange={handleChange}
                      required
                      margin="normal"
                      error={!!errors.url}
                      helperText={errors.url && "Required"}
                    />
                    <TextField
                      fullWidth
                      label="Meta Description"
                      name="metaDescription"
                      value={form.metaDescription}
                      onChange={handleChange}
                      required
                      multiline
                      minRows={3}
                      margin="normal"
                      error={!!errors.metaDescription}
                      helperText={errors.metaDescription && "Required"}
                    />
                  </Box>
                </Collapse>
              </Paper>
            </Box>

            <Divider />

            <Grid container mt={2} >
              <Grid item size={{ xs: 12, md: 4 }}>
                <Button sx={{ textTransform: 'none' }}>Preview</Button>
              </Grid>
              <Grid item size={{ xs: 12, md: 8 }} justifyContent={'flex-end'} display="flex">
                <Button sx={{ textTransform: 'none' }}>Back</Button>
                <Button
                  sx={{ textTransform: 'none' }}
                  onClick={handleClick}
                >
                  Next
                </Button>
              </Grid>
            </Grid>


          </Paper>
        </Grid>

        {/* Sidebar - takes 4 columns on md and up, full width on xs */}
        <Grid item size={{ xs: 12, md: 4 }} sx={{
          position: { md: 'sticky' },
          top: { md: 16 }, // adjust as needed for your header
          alignSelf: 'flex-start',
          height: 'fit-content',
        }}>
          <Grid container spacing={2} direction="column">
            {/* Job Preview */}
            <Grid item>
              <Paper elevation={2} sx={{ p: 1, mb: 1, borderRadius: '8px' }}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item><img src={logo} width={60} /></Grid>
                  <Grid item>
                    <Typography variant="subtitle1">User Experience Designer</Typography>
                    <Typography variant="body2">APPIT Software Inc</Typography>
                    <Typography variant="body2">Telangana, India (On-site)</Typography>
                    <Typography variant="caption" sx={{ color: 'gray' }}>Save as Draft</Typography>
                  </Grid>
                </Grid>

              </Paper>
            </Grid>

            {/* Skills */}
            <Grid item>
              <Paper elevation={2} sx={{ p: 2, borderRadius: '8px' }}>
                <Typography variant="subtitle1" gutterBottom>Skills</Typography>
                <Autocomplete
                  multiple
                  freeSolo
                  options={skillsList}
                  value={form.selectedSkills}
                  onChange={(event, newValue) => setForm(prev => ({ ...prev, selectedSkills: newValue }))}
                  renderTags={() => null} // Hide default tags in input
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" placeholder="Add skills..." />
                  )}
                />
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {form.selectedSkills.map((option, index) => (
                    <Chip
                      key={option}
                      variant="outlined"
                      label={option}
                      onDelete={() =>
                        setForm(prev => ({
                          ...prev,
                          selectedSkills: prev.selectedSkills.filter((_, i) => i !== index)
                        }))
                      }
                    />
                  ))}
                </Box>
              </Paper>
            </Grid>

            <Grid item>
              <Paper elevation={2} sx={{ p: 2, borderRadius: '8px' }}>
                <Grid container spacing={1} direction="column">
                  <Grid item><TipsAndUpdatesIcon /></Grid>
                  <Grid item>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, fontSize: '0.95rem', color: 'gray' }}
                    >
                      Target your jobs to the right people
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '0.8rem', color: 'gray' }}
                    >
                      Include a job description and add required skills to target job seekers who match your criteria
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostPage;