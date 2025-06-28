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
// import Joblink from './JobLink.jsx/Joblink';
import Joblink from '../components/JobLink.jsx/Joblink';
import WbIncandescentOutlinedIcon from '@mui/icons-material/WbIncandescentOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import { useNavigate } from 'react-router-dom';
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




const ConfirmJob = ({ setSelectedSection, screeningQuestionsMap, form, setForm, handleChange, errors, setErrors, validate, backClicked, setBackClicked, setNextClicked }) => {
    const [selectedSkills, setSelectedSkills] = useState(skillsList);
    const [showSeo, setShowSeo] = useState(false); // <-- Add this
    const [customQuestion, setCustomQuestion] = useState(form.customQuestion || "");
    const [customidealAnswer, setCustomIdealAnswer] = useState("Yes");
    const [jobLinks, setJobLinks] = useState([]);
    const [open, setOpen] = useState(false); // Add this for modal control

    const selectedCategories = form.screeningCategories || ["Education", "Background Check", "Hybrid Word"];
    const handleCategoryClick = (categoryName) => {
        setForm((prev) => {
            const isSelected = prev.screeningCategories.some(item => item.category === categoryName);
            if (isSelected) {
                // If already selected, remove it
                return {
                    ...prev,
                    screeningCategories: prev.screeningCategories.filter(
                        (item) => item.category !== categoryName
                    ),
                };
            } else {
                // If not selected, add it with its question and default ideal answer
                let newQuestion = '';
                if (categoryName === "Custom Question") {
                    newQuestion = ""; // Initialize custom question as empty
                } else {
                    newQuestion = screeningQuestionsMap[categoryName];
                }

                return {
                    ...prev,
                    screeningCategories: [
                        ...(prev.screeningCategories || []),
                        {
                            category: categoryName,
                            question: newQuestion,
                            idealAnswer: "Yes", // Default ideal answer
                            mustHave: false, // Default must-have status
                        },
                    ],
                };
            }
        });
    };

    const navigate = useNavigate();

    const handleRemoveCategory = (categoryName) => {
        setForm((prev) => ({
            ...prev,
            screeningCategories: prev.screeningCategories.filter(
                (item) => item.category !== categoryName
            ),
        }));
    };

    const handleScreeningQuestionChange = (categoryName, field, value) => {
        setForm(prevForm => ({
            ...prevForm,
            screeningCategories: prevForm.screeningCategories.map(item =>
                item.category === categoryName ? { ...item, [field]: value } : item
            )
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
            setForm({
                jobTitle: '',
                company: '',
                workType: 'On-site',
                jobLocation: '',
                jobType: 'Full-time',
                description: '',
                metaTitle: '',
                url: '',
                metaDescription: '',
                filterOut: false,
                platform: "",
                customQuestion: "",
                selectedSkills: [],
                screeningCategories: [],
            });
            if (validate()) {
                console.log('Posting job with form data:', form);
                // const response = await axios.post('http://localhost:5000/post-job', form);
                const response = await axios.post('https://appit-backend-wb0d.onrender.com/post-job', form);

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
                    <Paper elevation={2} sx={{ p: 2, borderRadius: '8px' }}>
                        <Typography gutterBottom sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: 600,
                            letterSpacing: '0.21px',
                        }}
                        >
                            <KeyboardBackspaceIcon onClick={() => navigate('/postjob')} sx={{ cursor: 'pointer' }} />
                            Confirm Job Settings
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        <Typography variant="caption" color="text.secondary">
                            * indicates required
                        </Typography>
                        <Typography gutterBottom sx={{
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            letterSpacing: '0.21px', mt: 2, mb: 3

                        }}>Applicant Collections <HelpOutlinedIcon sx={{ fontSize: '16px' }} /></Typography>

                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap', // Allows wrapping on small screens
                                gap: '16px',
                                // You might want to add some width to this parent if it's very narrow
                                // e.g., width: '100%', maxWidth: '800px', margin: '0 auto'
                            }}
                        >
                            {/* Receive Applicants */}
                            <div
                                style={{
                                    flex: '1 1 calc(50% - 8px)', // Takes roughly half width on wider screens
                                    minWidth: '280px', // Ensures a minimum width before wrapping (adjust as needed)
                                    boxSizing: 'border-box',
                                }}
                            >
                                <label
                                    htmlFor="receiveApplications"
                                    style={{
                                        color: 'grey',
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        marginBottom: '4px',
                                    }}
                                >
                                    Receive applicants
                                </label>
                                <select
                                    id="receiveApplications"
                                    name="receiveApplications"
                                    value={form.receiveApplications || 'email'}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                    }}
                                >
                                    <option value="email">By email</option>
                                </select>
                                {errors.receiveApplications && (
                                    <div style={{ color: 'red', fontSize: '12px' }}>Required</div>
                                )}
                            </div>

                            {/* Email Address */}
                            <div
                                style={{
                                    flex: '1 1 calc(50% - 8px)', // Takes roughly half width on wider screens
                                    minWidth: '280px', // Ensures a minimum width before wrapping (adjust as needed)
                                    boxSizing: 'border-box',
                                }}
                            >
                                <label
                                    htmlFor="emailAddress"
                                    style={{
                                        color: 'grey',
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        marginBottom: '4px',
                                    }}
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="emailAddress"
                                    name="emailAddress"
                                    value={form.emailAddress || ''}
                                    onChange={handleChange}
                                    style={{
                                        width: '95%',
                                        padding: '8px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                    }}
                                />
                                {errors.emailAddress && (
                                    <div style={{ color: 'red', fontSize: '12px' }}>Required</div>
                                )}
                            </div>
                        </div>


                        <Box mt={3} mb={3}>
                            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                                Screening questions
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom  >We recommend adding 3 or more questions. Applicants must answer each question</Typography>

                        </Box>

                        <Box>
                            {/* Render a ScreeningQuestionCard for each selected category */}
                            {form.screeningCategories.map((item, index) => (
                                <ScreeningQuestionCard
                                    key={item.category + index}
                                    question={item.question}
                                    isCustom={item.category === "Custom Question"}
                                    customValue={item.category === "Custom Question" ? item.question : undefined}
                                    idealAnswer={item.idealAnswer}
                                    mustHave={item.mustHave}
                                    onRemove={() => handleRemoveCategory(item.category)}
                                    onCustomChange={(e) => handleScreeningQuestionChange(item.category, "question", e.target.value)}
                                    onIdealAnswerChange={(e) => handleScreeningQuestionChange(item.category, "idealAnswer", e.target.value)}
                                    onMustHaveChange={(e) => handleScreeningQuestionChange(item.category, "mustHave", e.target.checked)}
                                />
                            ))}
                        </Box>

                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Add screening questions:
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {screeningCategories.map((category) => {
                                        // Check if the current category name exists in any object's 'category' property
                                        const isSelected = form.screeningCategories.some(item => item.category === category);

                                        return (
                                            <Button
                                                key={category}
                                                variant={isSelected ? "contained" : "outlined"}
                                                color={isSelected ? "secondary" : "inherit"}
                                                startIcon={isSelected ? "✓" : "+"}
                                                onClick={() => handleCategoryClick(category)}
                                                sx={{
                                                    borderRadius: 5,
                                                    textTransform: 'none',
                                                    fontWeight: 500,
                                                    // Apply styles based on isSelected
                                                    background: isSelected ? "#222" : "transparent",
                                                    color: isSelected ? "#fff" : "#222",
                                                    borderColor: "#bbb",
                                                    px: 2,
                                                    py: 0.5,
                                                    minWidth: 0
                                                }}
                                            >
                                                {category}
                                            </Button>
                                        );
                                    })}
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
                                <Grid item size={{ xs: 12, sm: 6 }} mt={2}>
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        Select the platform you’d like to post this job on:
                                    </Typography>
                                </Grid>

                                {/* Radio group for platform selection */}
                                <Grid item size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                                    navigate('/postjob')
                                }} sx={{ textTransform: 'none', border: '1px solid #055087', borderRadius: '25px' }}>Back</Button>
                                <Button
                                    sx={{ textTransform: 'none', backgroundColor: "#055087", color: "#fff", borderRadius: '25px', padding: '5px 20px', ml: 2 }}
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
                        <Grid item>
                            <Paper elevation={2} sx={{ p: 2, borderRadius: '8px' }}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <WbIncandescentOutlinedIcon sx={{ fontSize: 28, color: '#888', transform: 'rotate(180deg)' }} />
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
            <Joblink open={open} onClose={() => setOpen(false)} jobLinks={jobLinks} setSelectedSection={setSelectedSection} />

        </Box>
    );
};

export default ConfirmJob;