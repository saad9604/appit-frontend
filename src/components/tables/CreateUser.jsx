import React, { useState, useEffect } from 'react';
import {
    Box, Button, Typography, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper, TextField,
    InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CreateUserModal from '../modals/CreateUserModal';
export default function CreateUser() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);


    useEffect(() => {
        fetch('http://localhost:5000/get-users')
            .then(res => res.json())
            .then(data => {
                if (data.success) setUsers(data.users);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleCreateUser = (newUser) => {
        setUsers(prev => [...prev, { ...newUser, id: Date.now() }]);
        // Optionally, send to backend here
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Button variant="contained" sx={{ borderRadius: 5, backgroundColor: '#055087' }}>
                    Career
                </Button>
                <Typography fontWeight="bold">{'>'}</Typography>
                <Button variant="contained" sx={{ borderRadius: 5, backgroundColor: '#055087' }}>
                    Create User
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
                        onClick={() => setOpenModal(true)}
                    >
                        Create New
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        sx={{ textTransform: 'none', borderRadius: 2, px: 2, fontWeight: 500 }}
                    >
                        Import Data
                    </Button>
                </Box>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="user table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#E6F1FD' }}>
                            <TableCell>ID</TableCell>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">Loading...</TableCell>
                            </TableRow>
                        ) : users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">No users found.</TableCell>
                            </TableRow>
                        ) : (
                            users.map((user, index) => (
                                <TableRow key={user.id}>
                                    <TableCell>{String(index + 1).padStart(2, '0')}</TableCell>
                                    <TableCell>
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            style={{ width: 40, height: 40, borderRadius: '50%' }}
                                        />
                                    </TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {/* Add operation buttons here */}
                                        <EditIcon />
                                        <DeleteIcon />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
             <CreateUserModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onCreate={handleCreateUser}
            />
        </Box>
    );
}