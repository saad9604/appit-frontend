import React from 'react';
import { Box, Typography, Button, Chip, Grid, Paper, Divider } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
// Assuming your backend serves uploaded files from this base URL
// Adjust this if your actual upload URL is different
const ATTACHMENT_BASE_URL = 'https://appit-backend-wb0d.onrender.com/uploads/';
// If running locally, it might be:
// const ATTACHMENT_BASE_URL = 'http://localhost:5000/uploads/';

const ApplicationDetails = ({ setApplicationDetailsClicked, currentApplicantDetails }) => {
    // Use the data from currentApplicantDetails prop
    // Rename for convenience, but it refers to the prop
    const applicant = currentApplicantDetails;

    // Handle cases where applicant data might not be loaded yet
    if (!applicant) {
        return (
            <Box p={3} sx={{ background: '#fafafa', borderRadius: 3 }}>
                <Typography variant="h6" color="textSecondary">Loading applicant details...</Typography>
                <Button variant="text" sx={{ mt: 2, color: "black", fontWeight: "bold", textTransform: "none" }} onClick={() => setApplicationDetailsClicked(false)}><KeyboardBackspaceIcon/> Back to applications</Button>
            </Box>
        );
    }

    // Helper to format date
    const formattedAppliedDate = applicant.created_at
        ? new Date(applicant.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : 'N/A';

    // Construct resume URL
    const resumeDownloadUrl = applicant.attachment
        ? `${ATTACHMENT_BASE_URL}${applicant.attachment}`
        : null;


    // For questions and answers, your provided JSON `currentApplicantDetails` only has
    // `screening_categories` and `job_custom_question` from the job post,
    // not specific answers given by the applicant.
    // We'll display `job_custom_question` as one question.
    // If you had applicant-specific answers, they would need to be stored in the database
    // (e.g., in `appit_applications` or a related table) and retrieved by the API.
    const questionsAndAnswers = [];
    if (applicant.job_custom_question) {
        questionsAndAnswers.push({
            question: applicant.job_custom_question,
            answer: "Answer not provided in current data structure." // Placeholder
        });
    }
    // You can iterate over screening_categories if you want to imply questions,
    // but without answers from the applicant, it's just categories.
    // For now, I'll just show the custom question if it exists.
    // If you had a mechanism to store answers to screening categories, you'd add them here.


    return (
        <Box p={3} sx={{ background: '#fafafa', borderRadius: 3 }}>
            <Paper elevation={0} sx={{ p: 1, borderRadius: 3 }}>
                <Button variant="text" sx={{ mb: 2, color: "black", fontWeight: "bold", textTransform: "none" }} onClick={() => setApplicationDetailsClicked(false)}><KeyboardBackspaceIcon/> Back to applications</Button>
                <Divider />
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
                        <Typography><strong>Name :</strong> {applicant.name || 'N/A'}</Typography>
                        <Typography><strong>Applied for :</strong> {applicant.job_title || 'N/A'}</Typography>
                        <Typography><strong>Applied date :</strong> {formattedAppliedDate}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Typography><strong>Mail id :</strong> {applicant.email || 'N/A'}</Typography>
                        <Typography><strong>Mobile no :</strong> {applicant.phone || 'N/A'}</Typography>
                        {/* 'Experience' field is not in your provided JSON. You might need to add it to your DB if required. */}
                        <Typography><strong>Work Experience :</strong> N/A (Not in data)</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* Assuming job_location is the relevant location for the application/job */}
                        <Typography><strong>Location :</strong> {applicant.job_location || 'N/A'}</Typography>
                        <Typography>
                            <strong>Resume :</strong>
                            {resumeDownloadUrl ? (
                                <Button
                                    size="small"
                                    sx={{ ml: 1, backgroundColor:'#DFF0FF' ,color:"055087", fontWeight: 'bold', textTransform: 'none', padding: '4px 8px', border:'1px' }}
                                    href={resumeDownloadUrl}
                                    target="_blank" // Opens in a new tab
                                    rel="noopener noreferrer" // Security best practice
                                >
                                    Download Resume
                                </Button>
                            ) : (
                                <Typography component="span" sx={{ ml: 1, color: 'text.secondary' }}>No Resume</Typography>
                            )}
                        </Typography>
                    </Grid>
                </Grid>
                <Box mt={4}>
                    <Typography><strong>Skills:</strong></Typography>
                    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {applicant.selected_skills && applicant.selected_skills.length > 0 ? (
                            applicant.selected_skills.map((skill, index) => (
                                <Chip key={index} label={skill} size="small" />
                            ))
                        ) : (
                            <Typography variant="body2" color="textSecondary">No skills listed for this job.</Typography>
                        )}
                    </Box>
                </Box>

                {/* Displaying Screening Categories from Job Post */}
                <Box mt={4}>
                    <Typography><strong>Screening Categories (from Job Post) :</strong></Typography>
                    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {applicant.screening_categories && applicant.screening_categories.length > 0 ? (
                            applicant.screening_categories.map((category, index) => (
                                <Chip key={index} label={category} size="small" variant="outlined" />
                            ))
                        ) : (
                            <Typography variant="body2" color="textSecondary">No screening categories for this job.</Typography>
                        )}
                    </Box>
                </Box>

                {/* Displaying Custom Question from Job Post (if any) */}
                {applicant.job_custom_question && (
                    <Box mt={4}>
                        <Typography variant="h6" gutterBottom>Job Custom Question</Typography>
                        <Paper elevation={1} sx={{ p: 2, backgroundColor: '#e6f0ff', borderRadius: 2 }}>
                            <Typography variant="subtitle2">1. {applicant.job_custom_question}</Typography>
                            <Typography mt={1}>Ans :- Answer not provided in current data structure.</Typography>
                        </Paper>
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                            Note: Applicant's specific answers to questions are not available in the provided data structure.
                        </Typography>
                    </Box>
                )}


            </Paper>
            <Box mt={4} display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
                <Button variant="contained" sx={{ backgroundColor: '#055087', '&:hover': { backgroundColor: '#002b6b' } , textTransform: 'none' }}>
                    Schedule a interview
                </Button>
                <Button variant="outlined" sx={{ color: 'green', borderColor: 'green', '&:hover': { backgroundColor: '#e6ffe6' }, textTransform: 'none'  }}>
                    Hire now
                </Button>
                <Button variant="outlined" sx={{ color: 'red', borderColor: 'red', '&:hover': { backgroundColor: '#ffe6e6' }, textTransform: 'none'  }}>
                    Reject
                </Button>
            </Box>
        </Box>
    );
};

export default ApplicationDetails;