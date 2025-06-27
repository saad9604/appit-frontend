import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField,
    InputAdornment, FormControl, Select, MenuItem, Checkbox, Snackbar, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';


export default function ApplicationTable({ setJobIDCopy, jobIDCopy, jobID, setJobID, viewButtonClicked, setApplicationDetailsClicked, setCurrentApplicantDetails, currentApplicantDetails }) {
    const [applications, setApplications] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedActions, setSelectedActions] = useState({});
    const [selectedRows, setSelectedRows] = useState([]); // State for selected row IDs
    const [isDeleteMode, setIsDeleteMode] = useState(false); // State to toggle delete mode
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [loading, setLoading] = useState(false); // Add loading state

    // Helper function to show snackbar messages
    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const getJobsApplications = async (jobIdToFetch) => {
        setLoading(true);
        try {
            // Using http://localhost:5000 for local development for job-specific applications
            const response = await fetch('https://appit-backend-wb0d.onrender.com/applications-by-job', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ job_id: jobIdToFetch }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                console.log(`Applications for job ID ${jobIdToFetch}:`, data.applications);
                setApplications(data.applications);
                showSnackbar(`Successfully loaded applications for Job ID: ${jobIdToFetch}`, "success");
            } else {
                console.error('Failed to fetch applications:', data.message);
                setApplications([]); // Clear applications if fetch fails
                showSnackbar(`Failed to fetch applications: ${data.message}`, "error");
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
            setApplications([]); // Clear applications on network error
            showSnackbar(`Error fetching applications: ${error.message}`, "error");
        } finally {
            setLoading(false);
        }
    }

    const getAllApplications = async () => {
        setLoading(true);
        try {
            // Using https://appit-backend-wb0d.onrender.com for all applications as per your original code
            const response = await fetch('https://appit-backend-wb0d.onrender.com/get-applications');
            const data = await response.json();

            if (data.success) {
                setApplications(data.jobs); // Still using 'jobs' as per your backend response structure
                showSnackbar("Successfully loaded all applications.", "success");
            } else {
                console.error("Failed to fetch applications:", data.message);
                setApplications([]); // Clear applications if fetch fails
                showSnackbar(`Failed to fetch all applications: ${data.message}`, "error");
            }
        } catch (error) {
            console.error("Error fetching applications:", error);
            setApplications([]); // Clear applications on network error
            showSnackbar(`Error fetching all applications: ${error.message}`, "error");
        } finally {
            setLoading(false);
        }
    }

    // Effect to fetch applications when jobID changes
    useEffect(() => {
        if (jobID) {
            console.log("Job ID is set, fetching applications for job ID:", jobID);
            getJobsApplications(jobID);
        } else {
            console.log("Job ID is not set, fetching all applications.");
            getAllApplications();
        }
        // Reset selection and delete mode when jobID changes
        setSelectedRows([]);
        setIsDeleteMode(false);
    }, [jobID]);


    const filteredApps = applications.filter((app) =>
        app.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleViewApplicant = async (appId) => {
        setApplicationDetailsClicked(true); // Signal to parent to show applicant details section
        try {
            // Using http://localhost:5000 for local development for applicant details
            const response = await fetch(`https://appit-backend-wb0d.onrender.com/get-applicant-details/${appId}`);
            const data = await response.json();

            if (data.success) {
                console.log("Fetched applicant details from API:", data.applicant);
                setCurrentApplicantDetails(data.applicant);
                showSnackbar("Applicant details loaded.", "info");
            } else {
                console.error("Failed to fetch applicant details from API:", data.message);
                setCurrentApplicantDetails(null); // Clear details on failure
                showSnackbar(`Failed to fetch applicant details: ${data.message}`, "error");
            }
        } catch (error) {
            console.error("Error during API call for applicant details:", error);
            setCurrentApplicantDetails(null);
            showSnackbar(`Error fetching applicant details: ${error.message}`, "error");
        }
    };

    const handleCheckboxChange = (event, id) => {
        if (event.target.checked) {
            setSelectedRows((prevSelected) => [...prevSelected, id]);
        } else {
            setSelectedRows((prevSelected) => prevSelected.filter((rowId) => rowId !== id));
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const allApplicationIds = filteredApps.map((app) => app.id);
            setSelectedRows(allApplicationIds);
        } else {
            setSelectedRows([]);
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedRows.length === 0) {
            showSnackbar("No applications selected for deletion.", "warning");
            return;
        }

        try {
            const response = await fetch('https://appit-backend-wb0d.onrender.com/delete-applications', { // New DELETE endpoint
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ application_ids: selectedRows }), // Send array of IDs
            });

            const data = await response.json();

            if (response.ok && data.success) {
                showSnackbar(`Successfully deleted ${data.deletedIds.length} application(s).`, "success");
                // Refresh the list from the server to reflect the actual deletion
                if (jobID) {
                    getJobsApplications(jobID);
                } else {
                    getAllApplications();
                }
                setSelectedRows([]); // Clear selection after successful deletion
                setIsDeleteMode(false); // Exit delete mode
            } else {
                console.error('Deletion failed:', data.message);
                showSnackbar(`Failed to delete applications: ${data.message || 'Server error.'}`, "error");
            }
        } catch (error) {
            console.error('Error during deletion:', error);
            showSnackbar(`Error connecting to server for deletion: ${error.message}`, "error");
        }
    };

    const handleRefresh = () => {
        if (jobID) {
            getJobsApplications(jobID);
        } else {
            getAllApplications();
        }
        setSearch("");
        setSelectedActions({});
        setSelectedRows([]);
        setIsDeleteMode(false);
        showSnackbar("Applications refreshed.", "info");
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
                    Applications
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
                        placeholder="Search by Application Name"
                        size="small"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{
                            borderRadius: 2,
                            width: 270,
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
                    >
                        Create New
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<FileDownloadIcon />}
                        sx={{ textTransform: 'none', borderRadius: 2, px: 2, fontWeight: 500 }}
                    >
                        Export
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={handleRefresh}
                        sx={{ textTransform: 'none', borderRadius: 2, px: 2, fontWeight: 500 }}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Reload'}
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                            if (isDeleteMode) {
                                handleDeleteSelected(); // If already in delete mode, perform deletion
                            } else {
                                setIsDeleteMode(true); // Enter delete mode
                            }
                        }}
                        sx={{
                            textTransform: 'none',
                            borderRadius: 2,
                            px: 2,
                            fontWeight: 500,
                            // Change color when delete mode is active and selections are made
                            color: isDeleteMode && selectedRows.length > 0 ? 'white' : 'inherit',
                            backgroundColor: isDeleteMode && selectedRows.length > 0 ? '#d32f2f' : 'inherit',
                            '&:hover': {
                                backgroundColor: isDeleteMode && selectedRows.length > 0 ? '#ef5350' : 'rgba(0, 0, 0, 0.04)',
                            }
                        }}
                        disabled={loading} // Disable delete button while loading
                    >
                        {isDeleteMode && selectedRows.length > 0 ? `Delete (${selectedRows.length})` : "Delete"}
                    </Button>
                    {isDeleteMode && (
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setIsDeleteMode(false);
                                setSelectedRows([]); // Clear selection when canceling
                            }}
                            sx={{ textTransform: 'none', borderRadius: 2, px: 2, fontWeight: 500 }}
                            disabled={loading} // Disable cancel button while loading
                        >
                            Cancel
                        </Button>
                    )}
                </Box>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="application table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#E6F1FD' }}>
                            {isDeleteMode && ( // Show checkbox column only in delete mode
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={selectedRows.length > 0 && selectedRows.length < filteredApps.length}
                                        checked={filteredApps.length > 0 && selectedRows.length === filteredApps.length}
                                        onChange={handleSelectAllClick}
                                        disabled={loading} // Disable checkbox while loading
                                    />
                                </TableCell>
                            )}
                            <TableCell>Application Name</TableCell>
                            <TableCell>Applied Job</TableCell>
                            <TableCell>Applied date</TableCell>
                            <TableCell>Mobile number</TableCell>
                            <TableCell>AI Score</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={isDeleteMode ? 7 : 6} align="center">
                                    Loading applications...
                                </TableCell>
                            </TableRow>
                        ) : filteredApps.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={isDeleteMode ? 7 : 6} align="center">
                                    No applications found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredApps.map((app, index) => (
                                <TableRow key={app.id}>
                                    {isDeleteMode && ( // Show checkbox only in delete mode
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectedRows.includes(app.id)}
                                                onChange={(event) => handleCheckboxChange(event, app.id)}
                                                disabled={loading} // Disable checkbox while loading
                                            />
                                        </TableCell>
                                    )}
                                    <TableCell>{app.name}</TableCell>
                                    <TableCell>{app.message}</TableCell>
                                    <TableCell>{new Date(app.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>{app.phone}</TableCell>
                                    <TableCell>90%</TableCell>
                                    <TableCell>
                                        <FormControl fullWidth size="small" variant="outlined">
                                            <Select
                                                displayEmpty
                                                value={selectedActions[app.id] || ""}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setSelectedActions(prev => ({
                                                        ...prev,
                                                        [app.id]: value
                                                    }));

                                                    if (value === "view") {
                                                        console.log("Viewing applicant details (from table row data):", app);
                                                        handleViewApplicant(app.id); // Pass the applicant's ID

                                                        if (setApplicationDetailsClicked) {
                                                            setApplicationDetailsClicked(true);
                                                        }
                                                    }
                                                }}
                                                sx={{ minWidth: 100 }}
                                                renderValue={(selected) => {
                                                    if (!selected) {
                                                        return <span style={{ color: '#aaa' }}>Select Action</span>;
                                                    }
                                                    switch (selected) {
                                                        case "view": return "View Applicant";
                                                        case "schedule": return "Schedule an interview";
                                                        case "hire": return "Hire now";
                                                        case "reject": return "Reject";
                                                        default: return selected;
                                                    }
                                                }}
                                                disabled={loading || isDeleteMode} // Disable dropdown while loading or in delete mode
                                            >
                                                <MenuItem value="">
                                                    <em>Select Action</em>
                                                </MenuItem>
                                                <MenuItem value="view">View Applicant</MenuItem>
                                                <MenuItem value="schedule">Schedule an interview</MenuItem>
                                                <MenuItem value="hire">Hire now</MenuItem>
                                                <MenuItem value="reject">Reject</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}