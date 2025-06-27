import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField,
    InputAdornment, Snackbar, Alert // Import Snackbar and Alert for notifications
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save'; // New icon for Save
import CancelIcon from '@mui/icons-material/Cancel'; // New icon for Cancel
import { useNavigate } from 'react-router-dom';

export default function ViewJobsTable({ setJobIDCopy ,jobIDCopy, jobID, setJobID, setViewButtonClicked, viewButtonClicked, setSelectedSection }) {
    const [hoveredRow, setHoveredRow] = useState(null);
    const [search, setSearch] = useState("");
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingJobId, setEditingJobId] = useState(null); // State to track which job is being edited
    const [editedJobData, setEditedJobData] = useState({}); // State to hold data of the job being edited
    const [snackbarOpen, setSnackbarOpen] = useState(false); // For Snackbar notification
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const navigate = useNavigate();

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://appit-backend-wb0d.onrender.com/get-jobs-with-application-count');
            const data = await res.json();
            if (data.success) {
                setJobs(data.jobs);
            } else {
                console.error("Failed to fetch jobs:", data.message);
                setSnackbarMessage("Failed to fetch jobs.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        } catch (err) {
            console.error("Error fetching jobs:", err);
            setSnackbarMessage("Error connecting to server.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        console.log('View button clicked:', viewButtonClicked);
    }, [viewButtonClicked]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter((job) =>
        job.job_title.toLowerCase().includes(search.toLowerCase())
    );

    const handleViewClick = (jobId) => {
        // Set the job ID
        setJobID(jobId);
        // Immediately set the section to 'Applications' since we intend to view them
        setSelectedSection('Applications');
        // No need for the `if(jobID)` check here, as we are explicitly setting it
        console.log("Navigating to applications for Job ID:", jobId);
    };

    const handleCopy = (job) => {
        // Format job info - choose format as needed (here, JSON.stringify)
        const jobText = `
        Job Title: ${job.job_title}
        Platform: ${job.platform}
        Applications: ${job.application_count}
        Posted By: ${job.email_address}
        Posted Date: ${new Date(job.created_at).toLocaleDateString('en-GB')}
            `.trim();

        navigator.clipboard.writeText(jobText)
            .then(() => {
                setSnackbarMessage("Job info copied to clipboard!");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
            })
            .catch((error) => {
                console.error("Copy failed:", error);
                setSnackbarMessage("Failed to copy job info.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            });
    };



    const handleEdit = (job) => {
        setEditingJobId(job.id);
        setEditedJobData({ ...job }); // Initialize edited data with current job data
        console.log("Editing job:", editedJobData);
    };

    const handleSaveEdit = async (jobId) => {
        console.log("Saving job with ID:", jobId, "New data:", editedJobData);

        try {
            const response = await fetch('http://localhost:5000/update-table', {
                method: 'POST', // Assuming your /update-table uses POST
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...editedJobData, id: jobId }),
            });

            const data = await response.json();

            if (response.ok) {
                setSnackbarMessage("Job updated successfully!");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                setEditingJobId(null); // Exit edit mode
                setEditedJobData({}); // Clear edited data
                fetchJobs(); // Refresh list
            } else {
                console.error("Update failed:", data);
                setSnackbarMessage("Failed to update job.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Error during update:", error);
            setSnackbarMessage("Error connecting to server for update.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };


    const handleCancelEdit = () => {
        setEditingJobId(null); // Exit edit mode
        setEditedJobData({}); // Clear edited data
    };

    const handleDelete = async (jobId) => {
        try {
            const response = await fetch(`http://localhost:5000/delete-job/${jobId}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSnackbarMessage("Job deleted successfully!");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                fetchJobs(); // Refresh the job list
            } else {
                setSnackbarMessage("Failed to delete job.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Error deleting job:", error);
            setSnackbarMessage("Error connecting to server for delete.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };


    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };


    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Button variant="contained" sx={{ borderRadius: 5, backgroundColor: '#055087' }}>
                    Career
                </Button>
                <Typography fontWeight="bold">{'>'}</Typography>
                <Button variant="contained" sx={{ borderRadius: 5, backgroundColor: '#055087' }}>
                    View Jobs
                </Button>
            </Box>

            {/* Filter Row */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    mb: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                        variant="contained"
                        startIcon={<FilterAltIcon />}
                        sx={{
                            backgroundColor: '#0066B2',
                            textTransform: 'none',
                            borderRadius: 2,
                            px: 2,
                            fontWeight: 500,
                        }}
                    >
                        Filters
                    </Button>

                    <TextField
                        variant="outlined"
                        placeholder="Search by Job name"
                        size="small"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{
                            borderRadius: 2,
                            width: 250,
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{
                            backgroundColor: '#0057D9',
                            textTransform: 'none',
                            borderRadius: 2,
                            px: 2,
                            fontWeight: 500,
                        }}
                        onClick={() => {
                            navigate('/postjob'); // Navigate to the Add Job page
                        }}
                    >
                        Post a job
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        sx={{ textTransform: 'none', borderRadius: 2, px: 2, fontWeight: 500 }}
                        onClick={fetchJobs}
                        disabled={loading || editingJobId !== null} // Disable reload during edit
                    >
                        {loading ? 'Loading...' : 'Reload'}
                    </Button>
                </Box>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="job table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#E6F1FD' }}>
                            <TableCell>Sl No</TableCell>
                            <TableCell>Job Name</TableCell>
                            <TableCell>Platform</TableCell> {/* Changed 'Source' to 'Platform' */}
                            <TableCell>Applications</TableCell>
                            <TableCell>Posted by</TableCell>
                            <TableCell>Posted date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredJobs.length === 0 && !loading ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">No jobs found.</TableCell>
                            </TableRow>
                        ) : (
                            filteredJobs.map((job, index) => (
                                <TableRow
                                    key={job.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onMouseEnter={() => setHoveredRow(job.id)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                >
                                    <TableCell>{String(index + 1).padStart(2, '0')}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
                                            {editingJobId === job.id ? (
                                                <TextField
                                                    value={editedJobData.job_title || ''}
                                                    onChange={(e) => setEditedJobData({ ...editedJobData, job_title: e.target.value })}
                                                    size="small"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            ) : (
                                                <Typography>{job.job_title}</Typography>
                                            )}

                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    ml: 0, // Adjust margin if needed
                                                    opacity: hoveredRow === job.id && editingJobId !== job.id ? 1 : 0, // Show only on hover, not in edit mode
                                                    transform: hoveredRow === job.id && editingJobId !== job.id ? 'translateY(0)' : 'translateY(10px)',
                                                    pointerEvents: hoveredRow === job.id && editingJobId !== job.id ? 'auto' : 'none',
                                                    transition: 'opacity 0.3s, transform 0.3s',
                                                }}
                                            >
                                                <Button
                                                    size="small"
                                                    startIcon={<ContentCopyIcon sx={{ fontSize: 16 }} />}
                                                    onClick={() => handleCopy(job)}
                                                    sx={{ textTransform: 'none', color: '#055087', p: 0 }}
                                                >
                                                    Copy
                                                </Button>
                                                <Button
                                                    size="small"
                                                    startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                                                    onClick={() => handleEdit(job)}
                                                    sx={{ textTransform: 'none', color: '#055087', p: 0 }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="small"
                                                    startIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
                                                    onClick={() => handleDelete(job.id)}
                                                    sx={{ textTransform: 'none', color: '#D32F2F', p: 0 }}
                                                >
                                                    Delete
                                                </Button>
                                            </Box>

                                            {/* Action buttons for edit mode */}
                                            {editingJobId === job.id && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        startIcon={<SaveIcon />}
                                                        onClick={() => handleSaveEdit(job.id)}
                                                        sx={{ textTransform: 'none', bgcolor: '#4CAF50', '&:hover': { bgcolor: '#388E3C' } }}
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        startIcon={<CancelIcon />}
                                                        onClick={handleCancelEdit}
                                                        sx={{ textTransform: 'none', color: '#F44336', borderColor: '#F44336', '&:hover': { bgcolor: '#FFEBEE' } }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Box>
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {editingJobId === job.id ? (
                                            <TextField
                                                value={editedJobData.platform || ''}
                                                onChange={(e) => setEditedJobData({ ...editedJobData, platform: e.target.value })}
                                                size="small"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        ) : (
                                            job.platform
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography>
                                                {String(job.application_count).padStart(2, '0')} Applications
                                            </Typography>
                                            <Typography
                                                component="span"
                                                sx={{
                                                    color: '#0057D9',
                                                    cursor: 'pointer',
                                                    fontSize: '0.875rem',
                                                    mt: 0.5,
                                                    width: 'fit-content'
                                                }}
                                                onClick={() => handleViewClick(job.id)}
                                            >
                                                (View)
                                            </Typography>
                                        </Box>
                                    </TableCell>

                                    <TableCell>
                                        {editingJobId === job.id ? (
                                            <TextField
                                                value={editedJobData.email_address || ''}
                                                onChange={(e) => setEditedJobData({ ...editedJobData, email_address: e.target.value })}
                                                size="small"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        ) : (
                                            job.email_address
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {job.created_at ? new Date(job.created_at).toLocaleDateString('en-GB') : 'N/A'}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}