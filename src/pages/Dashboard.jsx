import React, { useState } from 'react';
import {
  Box, Drawer, CssBaseline, Toolbar, List, Divider, ListItem,
  ListItemButton, ListItemIcon, ListItemText, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField
, InputAdornment} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import FolderIcon from '@mui/icons-material/Folder';
import AddBoxIcon from '@mui/icons-material/AddBox';
import logo from '../assets/logo.png';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';



const drawerWidth = 240;

const DrawerSection = ({ title, icon, items, onItemClick }) => (
  <>
    <Box
      sx={{
        backgroundColor: '#055087',
        color: 'white',
        px: 2,
        py: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        borderRadius: 3,
        mt: 2,
      }}
    >
      {icon}
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 600,
          color: 'white',
        }}
      >
        {title}
      </Typography>
    </Box>
    <List dense>
      {items.map((item) => (
        <ListItem key={item} disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => onItemClick(item)}>
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </>
);

const jobData = [
  { id: 1, name: 'UI UX Designer', source: 'Appit Software', apps: 8, postedBy: 'Sai kiran', date: '16-08-2025' },
  { id: 2, name: 'Product Manager', source: 'Workisy, Appit software', apps: 9, postedBy: 'Aditi Sharma', date: '15-09-2025' },
  { id: 3, name: 'Front-end Developer', source: 'Appit Software', apps: 30, postedBy: 'Mark Johnson', date: '22-10-2025' },
  { id: 4, name: 'Data Analyst', source: 'Appit Software', apps: 19, postedBy: 'Anita Gupta', date: '05-11-2025' },
  { id: 5, name: 'Backend Developer', source: 'Workisy, Appit software', apps: 20, postedBy: 'Vikram Singh', date: '30-12-2025' },
];

function ViewJobsTable() {
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
          >
            Post a job
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            sx={{ textTransform: 'none', borderRadius: 2, px: 2, fontWeight: 500 }}
          >
            Reload
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
            {jobData.map((job, index) => (
              <TableRow
                key={job.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{String(index + 1).padStart(2, '0')}</TableCell>
                <TableCell>{job.name}</TableCell>
                <TableCell>{job.source}</TableCell>
                <TableCell>
                  {String(job.apps).padStart(2, '0')} Applications{' '}
                  <Typography
                    component="span"
                    sx={{ color: '#0057D9', cursor: 'pointer', ml: 1 }}
                  >
                    (View)
                  </Typography>
                </TableCell>
                <TableCell>{job.postedBy}</TableCell>
                <TableCell>{job.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function ApplicationTable() {
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
            startIcon={<RefreshIcon />}
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
            startIcon={<RefreshIcon />}
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
            {jobData.map((job, index) => (
              <TableRow
                key={job.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{String(index + 1).padStart(2, '0')}</TableCell>
                <TableCell>{job.name}</TableCell>
                <TableCell>{job.source}</TableCell>
                <TableCell>
                  {String(job.apps).padStart(2, '0')} Applications{' '}
                  <Typography
                    component="span"
                    sx={{ color: '#0057D9', cursor: 'pointer', ml: 1 }}
                  >
                    (View)
                  </Typography>
                </TableCell>
                <TableCell>{job.postedBy}</TableCell>
                <TableCell>{job.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function CreateUser() {
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
            startIcon={<RefreshIcon />}
            sx={{ textTransform: 'none', borderRadius: 2, px: 2, fontWeight: 500 }}
          >
            Import Data
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="job table">
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
            {jobData.map((job, index) => (
              <TableRow
                key={job.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{String(index + 1).padStart(2, '0')}</TableCell>
                <TableCell>{job.name}</TableCell>
                <TableCell>{job.source}</TableCell>
                <TableCell>
                  {String(job.apps).padStart(2, '0')} Applications{' '}
                  <Typography
                    component="span"
                    sx={{ color: '#0057D9', cursor: 'pointer', ml: 1 }}
                  >
                    (View)
                  </Typography>
                </TableCell>
                <TableCell>{job.postedBy}</TableCell>
                <TableCell>{job.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState('');

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            borderRight: '1px solid #ccc',
            padding: '20px',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ justifyContent: 'center', p: 7 }}>
          <Box
            component="img"
            src={logo}
            alt="Appit Logo"
            sx={{ width: 90 }}
          />
        </Toolbar>
        <Divider />

        <DrawerSection
          title="Dashboard"
          icon={<DashboardIcon sx={{ color: 'white' }} />}
          items={[]}
          onItemClick={setSelectedSection}
        />

        <DrawerSection
          title="Career"
          icon={<WorkIcon sx={{ color: 'white' }} />}
          items={['Add Jobs', 'View Jobs', 'Applications']}
          onItemClick={setSelectedSection}
        />

        <DrawerSection
          title="Workisy"
          icon={<PeopleIcon sx={{ color: 'white' }} />}
          items={['Users', 'Data Base', 'Contact']}
          onItemClick={setSelectedSection}
        />

        <DrawerSection
          title="Appit Software"
          icon={<FolderIcon sx={{ color: 'white' }} />}
          items={['Blogs', 'Job Applications', 'Contact']}
          onItemClick={setSelectedSection}
        />

        <DrawerSection
          title="User creation"
          icon={<AddBoxIcon sx={{ color: 'white' }} />}
          items={['Create User']}
          onItemClick={setSelectedSection}
        />

        <Divider sx={{ my: 2 }} />

        <List dense>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {(selectedSection === 'View Jobs' && <ViewJobsTable />) ||
         (selectedSection === 'Applications' && <ApplicationTable />) ||
         (selectedSection === 'Create User' && <CreateUser />)}
      </Box>
    </Box>
  );
}
