import React, { useState } from 'react';
import {
  Box, Drawer, CssBaseline, Toolbar, List, Divider, ListItem,
  ListItemButton, ListItemIcon, ListItemText, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField
  , InputAdornment, FormControl, Select, MenuItem
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import FolderIcon from '@mui/icons-material/Folder';
import AddBoxIcon from '@mui/icons-material/AddBox';
import logo from '../assets/logo.png';

import Post from '../components/Post';
import Confirm from '../components/Confirm';
import CreateUser from '../components/tables/CreateUser';
import ViewJobsTable from '../components/tables/ViewJobsTable';
import ApplicationTable from '../components/tables/ApplicationTable';
import Collapse from '@mui/material/Collapse';

const drawerWidth = 240;

const DrawerSection = ({ title, icon, items, expanded, onSectionClick, onItemClick, selectedSection }) => (
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
        cursor: 'pointer'
      }}
      onClick={() => onSectionClick(title)}
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

    {expanded && (
      
      <List dense>

        {items.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{
              pl: 4,
              backgroundColor: selectedSection === item ? '#e0e0e0' : 'inherit',
              borderRadius: 2,
            }}
              onClick={() => onItemClick(item)}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    )}
  </>
);

export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState('');
  const [expandedSections, setExpandedSections] = useState({ Dashboard: true }); // allow multiple open
  const [nextClicked, setNextClicked] = useState(false);
  const [backClicked, setBackClicked] = useState(false);
  const [viewButtonClicked, setViewButtonClicked] = useState(false);
  const [errors, setErrors] = useState({});
  const handleSectionClick = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  const requiredFields = [
    'jobTitle', 'company', 'workType', 'jobLocation', 'jobType', 'description',
    'metaTitle', 'url', 'metaDescription'
  ];
  const [form, setForm] = useState({
    jobTitle: '',
    company: '',
    workType: 'On-site',
    jobLocation: '',
    jobType: 'Full-time',
    description: '',
    metaTitle: '',
    url: '',
    metaDescription: '',
    filterOut: false,
    platform: "",
    customQuestion: "",
    selectedSkills: [],
    screeningCategories: ["Education", "Background Check", "Hybrid Word"], // <-- add this
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    console.log('Validating form:', form);
    requiredFields.forEach(field => {
      if (!form[field] || form[field].trim() === '') {
        newErrors[field] = true;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


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
          expanded={!!expandedSections['Dashboard']}
          onSectionClick={handleSectionClick}
          onItemClick={setSelectedSection}
          selectedSection={selectedSection}
        />

        <DrawerSection
          title="Career"
          icon={<WorkIcon sx={{ color: 'white' }} />}
          items={['Add Jobs', 'View Jobs', 'Applications']}
          expanded={!!expandedSections['Career']}
          onSectionClick={handleSectionClick}
          onItemClick={setSelectedSection}
          selectedSection={selectedSection}
        />

        <DrawerSection
          title="Workisy"
          icon={<PeopleIcon sx={{ color: 'white' }} />}
          items={['Users', 'Data Base', 'Contact']}
          expanded={!!expandedSections['Workisy']}
          onSectionClick={handleSectionClick}
          onItemClick={setSelectedSection}
          selectedSection={selectedSection}
        />

        <DrawerSection
          title="Appit Software"
          icon={<FolderIcon sx={{ color: 'white' }} />}
          items={['Blogs', 'Job Applications', 'Contact']}
          expanded={!!expandedSections['Appit Software']}
          onSectionClick={handleSectionClick}
          onItemClick={setSelectedSection}
          selectedSection={selectedSection}
        />

        <DrawerSection
          title="User creation"
          icon={<AddBoxIcon sx={{ color: 'white' }} />}
          items={['Create User']}
          expanded={!!expandedSections['User creation']}
          onSectionClick={handleSectionClick}
          onItemClick={setSelectedSection}
          selectedSection={selectedSection}
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
        {(selectedSection === 'View Jobs' && <ViewJobsTable setViewButtonClicked={setViewButtonClicked} viewButtonClicked={viewButtonClicked} />) ||
          (selectedSection === 'Applications' && <ApplicationTable />) ||
          (selectedSection === 'Create User' && <CreateUser />) ||
          (selectedSection === 'Add Jobs' && (
            backClicked
              ? <Post setBackClicked={setBackClicked} nextClicked={nextClicked} setNextClicked={setNextClicked} form={form} setForm={setForm} handleChange={handleChange} errors={errors} setErrors={setErrors} validate={validate} />
              : nextClicked
                ? <Confirm setNextClicked={setNextClicked} setBackClicked={setBackClicked} backClicked={backClicked} form={form} setForm={setForm} handleChange={handleChange} errors={errors} setErrors={setErrors} validate={validate} />
                : <Post setBackClicked={setBackClicked} nextClicked={nextClicked} setNextClicked={setNextClicked} form={form} setForm={setForm} handleChange={handleChange} errors={errors} setErrors={setErrors} validate={validate} />
          ))
        }


      </Box>
    </Box>
  );
}
