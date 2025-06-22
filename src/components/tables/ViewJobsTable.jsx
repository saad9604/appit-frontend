import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField,
    InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ViewJobsTable() {
    const [hoveredRow, setHoveredRow] = useState(null);
    const [search, setSearch] = useState("");
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/get-jobs-with-application-count');
            const data = await res.json();
            if (data.success) {
                setJobs(data.jobs);
            }
        } catch (err) {
            // Handle error as needed
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter((job) =>
        job.job_title.toLowerCase().includes(search.toLowerCase())
    );

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
                    >
                        Post a job
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        sx={{ textTransform: 'none', borderRadius: 2, px: 2, fontWeight: 500 }}
                        onClick={fetchJobs}
                        disabled={loading}
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
                            <TableCell>Source</TableCell>
                            <TableCell>Applications</TableCell>
                            <TableCell>Posted by</TableCell>
                            <TableCell>Posted date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredJobs.map((job, index) => (
                            <TableRow
                                key={job.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onMouseEnter={() => setHoveredRow(job.id)}
                                onMouseLeave={() => setHoveredRow(null)}
                            >
                                <TableCell>{String(index + 1).padStart(2, '0')}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'column', alignItems: 'center', gap: 1 }}>
                                        {job.job_title}
                                        {hoveredRow === job.id && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                                                <ContentCopyIcon sx={{ fontSize: 18, color: '#055087', cursor: 'pointer' }} /><span>copy</span>
                                                <EditIcon sx={{ fontSize: 18, color: '#055087', cursor: 'pointer' }} /><span>edit</span>
                                                <DeleteIcon sx={{ fontSize: 18, color: '#D32F2F', cursor: 'pointer' }} /><span>Delete</span>
                                            </Box>
                                        )}
                                    </Box>
                                </TableCell>
                                <TableCell>{job.platform}</TableCell>
                                <TableCell>
                                    {String(job.application_count).padStart(2, '0')} Applications{' '}
                                    <Typography
                                        component="span"
                                        sx={{ color: '#0057D9', cursor: 'pointer', ml: 1 }}
                                    >
                                        (View)
                                    </Typography>
                                </TableCell>
                                <TableCell>{job.email_address}</TableCell>
                                <TableCell>
                                    {new Date(job.created_at).toLocaleDateString('en-GB')}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}