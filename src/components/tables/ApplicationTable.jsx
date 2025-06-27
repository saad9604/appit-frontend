import React, { useState, useEffect } from 'react';
import {
    Box, Drawer, CssBaseline, Toolbar, List, Divider, ListItem,
    ListItemButton, ListItemIcon, ListItemText, Typography, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField
    , InputAdornment, FormControl, Select, MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';


export default function ApplicationTable({setJobIDCopy ,jobIDCopy, jobID, setJobID, viewButtonClicked, setApplicationDetailsClicked, setCurrentApplicantDetails, currentApplicantDetails }) {
    const [applications, setApplications] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedActions, setSelectedActions] = useState({});

    const getJobsApplications = async (jobID) => {
        try {
            const response = await fetch('http://localhost:5000/applications-by-job', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ job_id: jobID }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                console.log(`Applications for job ID ${jobID}:`, data.applications);
                setApplications(data.applications);
            } else {
                console.error('Failed to fetch applications:', data.message);
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    }

    useEffect(() => {
        if (jobID) {
            console.log("Job ID is set, fetching applications for job ID:", jobID);
            getJobsApplications(jobID);
        } else {
            console.log("Job ID is not set, fetching all applications", jobID);
            fetch('https://appit-backend-wb0d.onrender.com/get-applications')
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setApplications(data.jobs);
                    } else {
                        console.error("Failed to fetch applications:", data.message);
                    }
                })
                .catch(error => console.error("Error fetching applications:", error));
        }
    }, [jobID]); // 👈 jobID added here



    const filteredApps = applications.filter((app) =>
        app.name.toLowerCase().includes(search.toLowerCase())
    );

    // Function to handle fetching and logging applicant details
    const handleViewApplicant = async (appId) => {
        try {
            // Make the API call to get specific applicant details
            const response = await fetch(`http://localhost:5000/get-applicant-details/${appId}`);

            // const response = await fetch(`https://appit-backend-wb0d.onrender.com/get-applicant-details/${appId}`);
            const data = await response.json();

            if (data.success) {
                console.log("Fetched applicant details from API:", data.applicant);
                setCurrentApplicantDetails(data.applicant);
                // If you need to store these details for display in this component:
                // setCurrentApplicantDetails(data.applicant);
            } else {
                console.error("Failed to fetch applicant details from API:", data.message);
            }
        } catch (error) {
            console.error("Error during API call for applicant details:", error);
        }
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
                        value={search} // Bind value to state
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
                        sx={{ textTransform: 'none', borderRadius: 2, px: 2, fontWeight: 500 }}
                    >
                        Reload
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        sx={{ textTransform: 'none', borderRadius: 2, px: 2, fontWeight: 500 }}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="job table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#E6F1FD' }}>
                            <TableCell>Application Name</TableCell>
                            <TableCell>Applied Job</TableCell>
                            <TableCell>Applied date</TableCell>
                            <TableCell>Mobile number</TableCell>
                            <TableCell>AI Score</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredApps.map((app, index) => (
                            <TableRow key={app.id}>
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
                                                    // 1. Console log the whole row data
                                                    console.log("Viewing applicant details (from table row data):", app);
                                                    // 2. Make the API call to get more comprehensive details
                                                    handleViewApplicant(app.id); // Pass the applicant's ID

                                                    // Trigger the parent component's state change for detail view
                                                    if (setApplicationDetailsClicked) {
                                                        setApplicationDetailsClicked(true);
                                                    }
                                                }
                                            }}

                                            sx={{ minWidth: 100 }} // Increase width if needed
                                            renderValue={(selected) => {
                                                if (!selected) {
                                                    return <span style={{ color: '#aaa' }}>Select Action</span>;
                                                }
                                                switch (selected) {
                                                    case "view":
                                                        return "View Applicant";
                                                    case "schedule":
                                                        return "Schedule an interview";
                                                    case "hire":
                                                        return "Hire now";
                                                    case "reject":
                                                        return "Reject";
                                                    default:
                                                        return selected;
                                                }
                                            }}
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
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}