import React, { useState } from 'react';
import {
    Modal, Box, Typography, TextField, Button, Avatar
} from '@mui/material';

export default function CreateUserModal({ open, onClose, onCreate }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState('');
    const createdAt = new Date().toISOString();

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        setAvatarUrl(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare user data
        const userData = {
            name,
            email,
            avatar: avatarUrl, // You may want to send the file or a base64 string for real uploads
        };

        try {
            const res = await fetch('http://localhost:5000/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await res.json();
            if (data.success) {
                onCreate({
                    ...data.user,
                    created_at: data.user.created_at || new Date().toISOString(),
                });
                setName('');
                setEmail('');
                setAvatar(null);
                setAvatarUrl('');
                onClose();
            } else {
                alert(data.message || 'Failed to add user');
            }
        } catch (err) {
            alert('Failed to add user');
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper', p: 4, borderRadius: 2, minWidth: 350
            }}>
                <Typography variant="h6" mb={2}>Create New User</Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button variant="contained" component="label">
                            Upload Avatar
                            <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
                        </Button>
                        {avatarUrl && <Avatar src={avatarUrl} sx={{ width: 56, height: 56, alignSelf: 'center' }} />}
                        <TextField
                            label="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            label="Created At"
                            value={new Date(createdAt).toLocaleString()}
                            disabled
                        />
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="submit" variant="contained">Create</Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}