import React, { useState, useEffect } from 'react';
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
    Checkbox,
    RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'; // MUI icon as logo example
import axios from 'axios';
import HelpIcon from '@mui/icons-material/Help';

import logo from '../assets/logo.png'; // Assuming you have a logo image
import ScreeningCards from '../components/ScreeningCards';
import ScreeningQuestionCard from '../components/ScreeningCards';
import Joblink from './JobLink.jsx/Joblink';

const skillsList = [
    'Ux Research', 'Interaction Design', 'Visual Design', 'Information Architecture',
    'Prototyping', 'Usability Testing', 'Wireframing', 'User Interface Design',
    'User Journey Mapping', 'User Persona Development', 'Accessibility Design',
    'Content Strategy', 'Design Systems',
];

const screeningCategories = [
    "Education", "Background Check", "Hybrid Word", "Work Experience",
    "Expertise with skills", "Remote Collaboration", "Career Development",
    "Project Management", "Communication Skills", "Technical Proficiency",
    "Time Management", "Team Leadership", "Adaptability", "Custom Question"
];


const Confirm = ({ form, setForm, handleChange, errors, setErrors, validate, backClicked, setBackClicked, setNextClicked }) => {
    const [selectedSkills, setSelectedSkills] = useState(skillsList);
    const [showSeo, setShowSeo] = useState(false); // <-- Add this
    const [customQuestion, setCustomQuestion] = useState(form.customQuestion || "");
    const [customidealAnswer, setCustomIdealAnswer] = useState("Yes");
    const [jobLinks, setJobLinks] = useState([]);
    const [open, setOpen] = useState(false); // Add this for modal control

    const selectedCategories = form.screeningCategories || ["Education", "Background Check", "Hybrid Word"];
    const handleCategoryClick = (category) => {
        setForm((prev) => ({
            ...prev,
            screeningCategories: prev.screeningCategories?.includes(category)
                ? prev.screeningCategories.filter((c) => c !== category)
                : [...(prev.screeningCategories || []), category]
        }));
    };

    const handleRemoveCategory = (category) => {
        setForm((prev) => ({
            ...prev,
            screeningCategories: prev.screeningCategories.filter((c) => c !== category)
        }));
    };

    const handleCustomQuestionChange = (e) => {
        setCustomQuestion(e.target.value);
        setForm((prev) => ({
            ...prev,
            customQuestion: e.target.value,
        }));
    };

    const handleIdealAnswerChange = (e) => {
        console.log("Ideal Answer Changed:", e.target.value);
        setCustomIdealAnswer(e.target.value);
    };

    const postJob = async () => {
        try {
            if (validate()) {
                console.log('Posting job with form data:', form);
                const response = await axios.post('http://localhost:5000/post-job', form);
                console.log('Response from server:', response.data);
                if (response.data.success === true) {
                    console.log('Job posted successfully:', response.data);
                    setOpen(true); // Show modal on success
                }
            }
        } catch (error) {
            console.error('Failed to post job:', error);
        }
    };

    useEffect(() => {
        if (form.platform === "workisy") {
            setJobLinks(["https://workisy.com/jobs"]);
        } else if (form.platform === "appit") {
            setJobLinks(["https://www.appitsoftware.com/jobs"]);
        } else if (form.platform === "both") {
            setJobLinks([
                "https://workisy.com/jobs",
                "https://www.appitsoftware.com/jobs"
            ]);
        } else {
            setJobLinks([]);
        }
    }, [form.platform]);
    return (
        <Box sx={{ p: 3 }}>


            <Grid container spacing={1}>
                <Grid item size={{ xs: 12, md: 8 }}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                        <Typography gutterBottom sx={{
                            fontWeight: 600,
                            letterSpacing: '0.21px',
                        }}>
                            Confirm Job Settings
                        </Typography>
                        <Divider />
                        <Typography gutterBottom sx={{
                            fontWeight: 500,
                            letterSpacing: '0.21px', mt: 2
                        }}>Applicant Collections</Typography>

                        <Grid container spacing={2}> {/* Inner Grid for Job Details fields */}
                            <Grid item size={{ xs: 12, sm: 6 }}>
                                <FormControl fullWidth variant="standard" error={!!errors.receiveApplications}>
                                    <InputLabel>Receive Applications</InputLabel>
                                    <Select
                                        label="Receive Applications"
                                        name="receiveApplications"
                                        value={form.receiveApplications || "email"}
                                        onChange={handleChange}
                                        defaultValue={"email"}
                                    >
                                        <MenuItem value="email">Email</MenuItem>
                                    </Select>
                                    {errors.receiveApplications && (
                                        <Typography color="error" variant="caption">
                                            Required
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="emailAddress"
                                    type="email"
                                    value={form.emailAddress || ""}
                                    onChange={handleChange}
                                    error={!!errors.emailAddress}
                                    helperText={errors.emailAddress && "Required"}
                                    variant='standard'
                                />
                            </Grid>
                        </Grid>

                        <Box mt={3}>
                            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                                Screening questions
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>We recommend adding 3 or more questions. Applicants must answer each question</Typography>

                        </Box>

                        <Box>
                            {/* Render a ScreeningQuestionCard for each selected category */}
                            {selectedCategories.map((category) => (
                                <ScreeningQuestionCard
                                    question={category === "Custom Question" ? customQuestion : category}
                                    isCustom={category === "Custom Question"}
                                    key={category}
                                    onRemove={() => handleRemoveCategory(category)}
                                    customValue={customQuestion}
                                    onCustomChange={handleCustomQuestionChange}
                                    handleIdealAnswerChange={handleIdealAnswerChange}
                                    customidealAnswer={customidealAnswer}
                                    form={form}
                                    setForm={setForm}
                                />
                            ))}
                        </Box>

                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Add screening questions:
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {screeningCategories.map((category) => (
                                        <Button
                                            key={category}
                                            variant={selectedCategories.includes(category) ? "contained" : "outlined"}
                                            color={selectedCategories.includes(category) ? "secondary" : "inherit"}
                                            startIcon={selectedCategories.includes(category) ? "✓" : "+"}
                                            onClick={() => handleCategoryClick(category)}
                                            sx={{
                                                borderRadius: 5,
                                                textTransform: 'none',
                                                fontWeight: 500,
                                                background: selectedCategories.includes(category) ? "#222" : "transparent",
                                                color: selectedCategories.includes(category) ? "#fff" : "#222",
                                                borderColor: "#bbb",
                                                px: 2,
                                                py: 0.5,
                                                minWidth: 0
                                            }}
                                        >
                                            {category}
                                        </Button>
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid container mt={2} spacing={2}>
                            {/* Qualification setting title */}
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Qualification setting
                                </Typography>
                            </Grid>

                            {/* Checkbox, text, and tooltip in one row */}
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Checkbox
                                        checked={form.filterOut}
                                        onChange={e => setForm(prev => ({ ...prev, filterOut: e.target.checked }))}
                                    />
                                    <Typography variant="body2" sx={{ mr: 1 }}>
                                        Filter out and send rejections to applicants who don’t meet any must-have qualifications.
                                    </Typography>
                                    <IconButton size="small">
                                        <HelpIcon />
                                    </IconButton>
                                </Box>
                            </Grid>

                            <Grid container alignItems={"center"} spacing={2}>
                                {/* Platform selection title */}
                                <Grid item xs={12} mt={2}>
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        Select the platform you’d like to post this job on:
                                    </Typography>
                                </Grid>

                                {/* Radio group for platform selection */}
                                <Grid item xs={12}>
                                    <FormControl required error={!form.platform}>
                                        <RadioGroup
                                            row
                                            name="platform"
                                            value={form.platform}
                                            onChange={e => setForm(prev => ({ ...prev, platform: e.target.value }))}
                                        >
                                            <FormControlLabel value="workisy" control={<Radio />} label="Workisy" />
                                            <FormControlLabel value="appit" control={<Radio />} label="Appit Software" />
                                            <FormControlLabel value="both" control={<Radio />} label="Both" />
                                        </RadioGroup>
                                        {!form.platform && (
                                            <Typography color="error" variant="caption" sx={{ ml: 1 }}>
                                                Please select a platform.
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>

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
                                            value={form.metaTitle || ""}
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
                                            value={form.url || ""}
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
                                            value={form.metaDescription || ""}
                                            onChange={handleChange}
                                            required
                                            multiline
                                            minRows={3}
                                            margin="normal"

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
                                <Button onClick={() => {
                                    setNextClicked(false)
                                    setBackClicked(true);
                                }} sx={{ textTransform: 'none' }}>Back</Button>
                                <Button
                                    sx={{ textTransform: 'none' }}
                                    onClick={postJob}

                                >
                                    Post Job
                                </Button>
                            </Grid>
                        </Grid>


                    </Paper>
                </Grid>
                <Grid item size={{ xs: 12, md: 4 }} sx={{
                    position: { md: 'sticky' },
                    top: { md: 16 },
                    alignSelf: 'flex-start',
                    height: 'fit-content',
                }}>
                    <Grid container spacing={2} direction="column">
                        <Grid item>
                            <Paper elevation={2} sx={{ p: 1, mb: 1 }}>
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
                        <Grid item>
                            <Paper elevation={2} sx={{ p: 2 }}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <LightbulbOutlinedIcon sx={{ fontSize: 28, color: '#888' }} />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            Why use screening questions?
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ fontSize: '0.7rem' }}
                                        >
                                            Your job post is targeted to people who match your requirements, and you'll be notified of applicants who pass your screening questions.
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            Will my network know that I’m hiring?
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.7rem' }} >
                                            When you post your job, we’ll notify your network that you’re hiring to help increase your job post’s visibility. Your network can choose to share your job post to help you reach qualified candidates.
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            What information can applicants see about me and my job?
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.7rem' }} >
                                            When you post your job, you agree to share details about your job such as company size and location, as well as information around when you created your LinkedIn profile.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Joblink open={open} onClose={() => setOpen(false)} jobLinks={jobLinks} />        </Box>
    );
};

export default Confirm;