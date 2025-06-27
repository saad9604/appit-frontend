import React, { useState, useEffect } from 'react';
import {
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, InputAdornment, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import CreateUserModal from '../modals/CreateUserModal';

export default function CreateUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

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
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditedUser({ ...user });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/update-user/${editingUserId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedUser)
      });
      const data = await res.json();

      if (data.success) {
        setUsers(prev => prev.map(u => u.id === editingUserId ? data.user : u));
        setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
      } else {
        setSnackbar({ open: true, message: 'Failed to update user', severity: 'error' });
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Server error on update', severity: 'error' });
    }

    setEditingUserId(null);
    setEditedUser({});
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditedUser({});
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/delete-user/${deleteUserId}`, {
        method: 'DELETE'
      });
      const data = await res.json();

      if (data.success) {
        setUsers(prev => prev.filter(u => u.id !== deleteUserId));
        setSnackbar({ open: true, message: 'User deleted successfully', severity: 'success' });
      } else {
        setSnackbar({ open: true, message: 'Failed to delete user', severity: 'error' });
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Server error on delete', severity: 'error' });
    }

    setDeleteUserId(null);
  };

  return (
    <Box>
      {/* Breadcrumb */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Button variant="contained" sx={{ borderRadius: 5, backgroundColor: '#055087' }}>Career</Button>
        <Typography fontWeight="bold">{'>'}</Typography>
        <Button variant="contained" sx={{ borderRadius: 5, backgroundColor: '#055087' }}>Create User</Button>
      </Box>

      {/* Filter Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" startIcon={<FilterAltIcon />} sx={{ backgroundColor: '#0066B2', textTransform: 'none', borderRadius: 2, px: 2, fontWeight: 500 }}>
            Filters
          </Button>
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            sx={{ borderRadius: 2, width: 250 }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ backgroundColor: '#0057D9', textTransform: 'none', borderRadius: 2, px: 2, fontWeight: 500 }}
            onClick={() => setOpenModal(true)}
          >
            Create New
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            sx={{ textTransform: 'none', borderRadius: 2, px: 2, fontWeight: 500 }}
            onClick={() => window.location.reload()}
          >
            Import Data
          </Button>
        </Box>
      </Box>

      {/* Table */}
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
              <TableRow><TableCell colSpan={6} align="center">Loading...</TableCell></TableRow>
            ) : users.length === 0 ? (
              <TableRow><TableCell colSpan={6} align="center">No users found.</TableCell></TableRow>
            ) : (
              users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{String(index + 1).padStart(2, '0')}</TableCell>
                  <TableCell>
                    <img src={user.avatar} alt={user.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                  </TableCell>
                  <TableCell>
                    {editingUserId === user.id ? (
                      <TextField
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                        size="small"
                      />
                    ) : user.name}
                  </TableCell>
                  <TableCell>
                    {editingUserId === user.id ? (
                      <TextField
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                        size="small"
                      />
                    ) : user.email}
                  </TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {editingUserId === user.id ? (
                      <>
                        <IconButton onClick={handleSave}><SaveIcon color="success" /></IconButton>
                        <IconButton onClick={handleCancelEdit}><CancelIcon color="error" /></IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEdit(user)}><EditIcon /></IconButton>
                        <IconButton onClick={() => setDeleteUserId(user.id)}><DeleteIcon color="error" /></IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Modal */}
      <CreateUserModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={handleCreateUser}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={Boolean(deleteUserId)} onClose={() => setDeleteUserId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this user?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteUserId(null)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
