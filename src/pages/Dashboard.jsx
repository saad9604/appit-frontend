import React, { useState } from 'react';
import {
    Box, Drawer, CssBaseline, Toolbar, List, Divider, ListItem,
    ListItemButton, ListItemIcon, ListItemText, Typography, Button
} from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


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
import DashboardHome from '../components/DashboardHome';
import ApplicationDetails from '../components/ApplicationDetails';
import { useNavigate } from 'react-router-dom';

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
                    fontWeight: "semibold",
                    color: 'white',
                }}
            >
                {title}
            </Typography>
        </Box>

        {expanded && (
            <List dense>
                {items.map((item, idx) => (
                    <React.Fragment key={item}>
                        <ListItem disablePadding>
                            <ListItemButton
                                sx={{
                                    pl: 4,
                                    borderRadius: 2,
                                }}
                                onClick={() => onItemClick(item)}
                            >
                                <ListItemText primary={item} />
                            </ListItemButton>
                        </ListItem>
                        <Divider sx={{ bgcolor: '#7BCAFE', height: "0.5px", mx: 4 }} />
                    </React.Fragment>
                ))}
            </List>
        )}
    </>
);

export default function Dashboard({
    selectedSection, setSelectedSection, screeningQuestionsMap,
    backClicked, setBackClicked, nextClicked, setNextClicked,
    form, setForm, handleChange, errors, setErrors, validate
}) {
    const [expandedSection, setExpandedSection] = useState('Dashboard');
    // Initialize jobID to null, indicating no job is selected by default
    const [jobID, setJobID] = useState(null);
    const [applicationDetailsClicked, setApplicationDetailsClicked] = useState(false);
    const [currentApplicantDetails, setCurrentApplicantDetails] = useState(null);

    const handleSectionClick = (section) => {
        setExpandedSection(prev => (prev === section ? '' : section));
    };

    const navigate = useNavigate();

    // Function to handle clicking 'View' on a job in ViewJobsTable
    // This will set the jobID and switch the view to ApplicationsTable
    const handleViewApplicationsForJob = (id) => {
        setJobID(id); // Set the specific job ID
        setSelectedSection('Applications'); // Switch to the Applications section
        setApplicationDetailsClicked(false); // Ensure application details are not shown
    };

    // Function to reset jobID and go to general applications view
    const handleGoToAllApplications = () => {
        setJobID(null); // Clear the job ID
        setSelectedSection('Applications'); // Ensure we are in the Applications section
        setApplicationDetailsClicked(false); // Ensure application details are not shown
    };

    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);



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

                {/* Dashboard as a button */}
                <List dense>
                    <ListItem disablePadding>
                        <ListItemButton
                            sx={{
                                borderRadius: 2,
                                mb: 1,
                                px: 2,
                                py: 1,
                                color: 'white',
                                backgroundColor: '#055087',
                                '&:hover': {
                                    backgroundColor: '#055087',
                                    color: 'white',
                                },
                            }}
                            onClick={() => {
                                setExpandedSection('Dashboard');
                                setSelectedSection('Dashboard');
                                setJobID(null); // Clear jobID when going to Dashboard home
                                setApplicationDetailsClicked(false);
                            }}
                        >
                            <ListItemIcon>
                                <DashboardIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Dashboard"
                                primaryTypographyProps={{ sx: { color: 'white' } }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />

                <DrawerSection
                    title="Career"
                    icon={<WorkIcon sx={{ color: 'white' }} />}
                    items={['Add Jobs', 'View Jobs', 'Applications']}
                    expanded={expandedSection === 'Career'}
                    onSectionClick={handleSectionClick}
                    onItemClick={(item) => {
                        if (item === 'Add Jobs') {
                            navigate('/postjob');
                        } else if (item === 'Applications') {
                            handleGoToAllApplications(); // Special handler for "All Applications"
                        } else {
                            setSelectedSection(item);
                            setJobID(null); // Clear jobID when navigating to 'View Jobs' directly
                            setApplicationDetailsClicked(false);
                        }
                    }}
                    selectedSection={selectedSection}
                />


                <DrawerSection
                    title="Workisy"
                    icon={<PeopleIcon sx={{ color: 'white' }} />}
                    items={['Users', 'Data Base', 'Contact']}
                    expanded={expandedSection === 'Workisy'}
                    onSectionClick={handleSectionClick}
                    onItemClick={(item) => {
                        setSelectedSection(item);
                        setJobID(null); // Clear jobID when changing sections
                        setApplicationDetailsClicked(false);
                    }}
                    selectedSection={selectedSection}
                />

                <DrawerSection
                    title="Appit Software"
                    icon={<FolderIcon sx={{ color: 'white' }} />}
                    items={['Blogs', 'Job Applications', 'Contact']}
                    expanded={expandedSection === 'Appit Software'}
                    onSectionClick={handleSectionClick}
                    onItemClick={(item) => {
                        setSelectedSection(item);
                        setJobID(null); // Clear jobID when changing sections
                        setApplicationDetailsClicked(false);
                    }}
                    selectedSection={selectedSection}
                />

                <DrawerSection
                    title="User creation"
                    icon={<AddBoxIcon sx={{ color: 'white' }} />}
                    items={['Create User']}
                    expanded={expandedSection === 'User creation'}
                    onSectionClick={handleSectionClick}
                    onItemClick={(item) => {
                        setSelectedSection(item);
                        setJobID(null); // Clear jobID when changing sections
                        setApplicationDetailsClicked(false);
                    }}
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
                        <ListItemButton onClick={() => setLogoutDialogOpen(true)}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Log Out" />
                        </ListItemButton>
                    </ListItem>

                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {/* Render components based on selectedSection */}
                {selectedSection === '' || selectedSection === 'Dashboard' ? (
                    <DashboardHome />
                ) : selectedSection === 'View Jobs' ? (
                    // Pass the handler to ViewJobsTable
                    <ViewJobsTable
                        setJobID={handleViewApplicationsForJob} // This will now set jobID and switch section
                        setSelectedSection={setSelectedSection} // Still needed for general section control
                    />
                ) : selectedSection === 'Applications' ? (
                    // Pass jobID and other props to ApplicationTable
                    applicationDetailsClicked ? (
                        <ApplicationDetails
                            setApplicationDetailsClicked={setApplicationDetailsClicked}
                            setCurrentApplicantDetails={setCurrentApplicantDetails}
                            currentApplicantDetails={currentApplicantDetails}
                        />
                    ) : (
                        <ApplicationTable
                            jobID={jobID} // Pass the jobID state here
                            setApplicationDetailsClicked={setApplicationDetailsClicked}
                            setCurrentApplicantDetails={setCurrentApplicantDetails}
                            currentApplicantDetails={currentApplicantDetails}
                        // You might want a way to "go back" from specific job applications
                        // For example, a button in ApplicationTable that calls setJobID(null)
                        />
                    )
                ) : selectedSection === 'Create User' ? (
                    <CreateUser />
                ) : selectedSection === 'Add Jobs' ? (
                    // Your existing Post/Confirm logic
                    backClicked ? (
                        <Post setBackClicked={setBackClicked} nextClicked={nextClicked} setNextClicked={setNextClicked} form={form} setForm={setForm} handleChange={handleChange} errors={errors} setErrors={setErrors} validate={validate} />
                    ) : nextClicked ? (
                        <Confirm setSelectedSection={setSelectedSection} screeningQuestionsMap={screeningQuestionsMap} setNextClicked={setNextClicked} setBackClicked={setBackClicked} backClicked={backClicked} form={form} setForm={setForm} handleChange={handleChange} errors={errors} setErrors={setErrors} validate={validate} />
                    ) : (
                        <Post setBackClicked={setBackClicked} nextClicked={nextClicked} setNextClicked={setNextClicked} form={form} setForm={setForm} handleChange={handleChange} errors={errors} setErrors={setErrors} validate={validate} />
                    )
                ) : null} {/* Fallback for unhandled sections */}
            </Box>
            <Dialog
                open={logoutDialogOpen}
                onClose={() => setLogoutDialogOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        padding: 2,
                    }
                }}
            >
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setLogoutDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            sessionStorage.clear();
                            navigate('/');
                        }}
                        sx={{
                            backgroundColor: '#055087',
                            '&:hover': {
                                backgroundColor: '#033f68',
                            }
                        }}
                        variant="contained"
                    >
                        Yes, Log Out
                    </Button>
                </DialogActions>
            </Dialog>


        </Box>
    );
}