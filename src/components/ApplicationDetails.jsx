import React from 'react';
import { Box, Typography, Button, Chip, Grid, Paper, Divider } from '@mui/material';

const ApplicationDetails = ({ setApplicationDetailsClicked }) => {
    const applicant = {
        name: 'Ayesha Sharma',
        mail: 'ayesha.sharma@email.com',
        location: 'Hyderabad',
        appliedFor: 'UI UX Designer',
        mobile: '9876543210',
        appliedDate: '05/06/2025',
        experience: '3 years',
        resumeUrl: '#',
        skills: [
            'Ux Research', 'UI Design', 'Prototyping', 'User Testing', 'Interaction Design', 'Visual Design',
            'Information Architecture', 'Wireframing', 'Accessibility Design', 'Usability Testing',
            'Motion Design', 'Content Strategy', 'Design Systems', 'Branding',
            'Responsive Design', 'User Interface Specifications', 'Creative Direction', 'Collaboration Tools'
        ],
        questions: [
            'Do you have a Minimum of 1yr experience in ui ux designing ?',
            'Expected salary ?',
            'Are you proficient in design tools like Figma or Sketch?',
            'Can you provide a portfolio showcasing your work?'
        ],
        answers: ['Yes', '4Lpa', 'Yes', '4Lpa']
    };

    return (
        <Box p={3} sx={{ background: '#fafafa', borderRadius: 3 }}>

            <Paper elevation={0} sx={{ p: 1, borderRadius: 3 }}>
                <Button variant="text" sx={{ mb: 2 , color:"black", fontWeight:"bold", textTransform:"none"}} onClick={() => setApplicationDetailsClicked(false)}>{'<'} Back to applications</Button>
                <Divider/>
                <Grid container spacing={2} mt={2}>
                    <Grid item size={{ xs: 12, sm: 4 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
                        <Typography><strong>Name :</strong> {applicant.name}</Typography>
                        <Typography><strong>Applied for :</strong> {applicant.appliedFor}</Typography>
                        <Typography><strong>Applied date :</strong> {applicant.appliedDate}</Typography>

                    </Grid>

                    <Grid item size={{ xs: 12, sm: 4 }} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Typography><strong>Mail id :</strong> {applicant.mail}</Typography>
                        <Typography><strong>Mobile no :</strong> {applicant.mobile}</Typography>
                        <Typography><strong>Work Experience :</strong> {applicant.experience}</Typography>

                    </Grid>
                    <Grid item size={{ xs: 12, sm: 4 }} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Typography><strong>Location :</strong> {applicant.location}</Typography>
                        <Typography><strong>Resume :</strong> <Button variant="contained" size="small" sx={{ ml: 1 }} href={applicant.resumeUrl}>Download Resume</Button></Typography>
                    </Grid>
                </Grid>
                <Box mt={4}>
                    <Typography><strong>Skills :</strong></Typography>
                    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {applicant.skills.map((skill, index) => (
                            <Chip key={index} label={skill} size="small" />
                        ))}
                    </Box>
                </Box>

                <Box mt={4}>
                    <Typography variant="h6" gutterBottom>Answered Questions</Typography>
                    <Grid container spacing={2}>
                        {applicant.questions.map((question, i) => (
                            <Grid item size={{ xs: 12, sm: 6 }} key={i}>
                                <Paper elevation={1} sx={{ p: 2, backgroundColor: '#e6f0ff', borderRadius: 2 }}>
                                    <Typography variant="subtitle2">{i + 1}. {question}</Typography>
                                    <Typography mt={1}>Ans :- {applicant.answers[i]}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>


            </Paper>
            <Box mt={4} display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
                <Button variant="contained" sx={{ backgroundColor: '#003C96', '&:hover': { backgroundColor: '#002b6b' } }}>
                    Schedule a interview
                </Button>
                <Button variant="outlined" sx={{ color: 'green', borderColor: 'green', '&:hover': { backgroundColor: '#e6ffe6' } }}>
                    Hire now
                </Button>
                <Button variant="outlined" sx={{ color: 'red', borderColor: 'red', '&:hover': { backgroundColor: '#ffe6e6' } }}>
                    Reject
                </Button>
            </Box>
        </Box>
    );
};

export default ApplicationDetails;
