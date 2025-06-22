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


const jobData = [
    { id: 1, name: 'UI UX Designer', source: 'Appit Software', apps: 8, postedBy: 'Sai kiran', date: '16-08-2025' },
    { id: 2, name: 'Product Manager', source: 'Workisy, Appit software', apps: 9, postedBy: 'Aditi Sharma', date: '15-09-2025' },
    { id: 3, name: 'Front-end Developer', source: 'Appit Software', apps: 30, postedBy: 'Mark Johnson', date: '22-10-2025' },
    { id: 4, name: 'Data Analyst', source: 'Appit Software', apps: 19, postedBy: 'Anita Gupta', date: '05-11-2025' },
    { id: 5, name: 'Backend Developer', source: 'Workisy, Appit software', apps: 20, postedBy: 'Vikram Singh', date: '30-12-2025' },
];


export default function ApplicationTable() {
    const [applications, setApplications] = useState([]);

    const [search, setSearch] = React.useState(""); // Add search state

    useEffect(() => {
        fetch('http://localhost:5000/get-applications')
            .then(res => res.json())
            .then(data => {
                if (data.success) setApplications(data.jobs);
            });
    }, []);
    const filteredApps = applications.filter((app) =>
        app.name.toLowerCase().includes(search.toLowerCase())
    );
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
                        placeholder="Search"
                        size="small"
                        value={search} // Bind value to state
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
                                            defaultValue=""
                                            sx={{ minWidth: 160 }}
                                            renderValue={(selected) => {
                                                if (!selected) {
                                                    return <span style={{ color: '#aaa' }}>Select Action</span>;
                                                }
                                                return selected;
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