import { Box, Typography, Card, CardContent, Button, Avatar, Stack } from '@mui/material';

export default function DashboardHome() {
  return (
    <Box>
      {/* Welcome Card */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold">Welcome Back</Typography>
          <Typography color="text.secondary">{sessionStorage.userEmail}</Typography>
          <Typography sx={{ mt: 2 }}>Total Applications: <b>90</b></Typography>
        </CardContent>
      </Card>

      {/* Email & Contacts Cards */}
      {/* <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        <Card sx={{ flex: 1, borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">New Emails</Typography>
            <Typography color="text.secondary">View All Emails</Typography>
            <Stack direction="row" spacing={-1} sx={{ mt: 1 }}>
              <Avatar src="/avatar1.png" />
              <Avatar src="/avatar2.png" />
              <Avatar src="/avatar3.png" />
            </Stack>
            <Button variant="contained" sx={{ mt: 2, bgcolor: '#055087' }}>
              07 Unread Emails From Users
            </Button>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">New Contacts</Typography>
            <Typography color="text.secondary">View All Contacts</Typography>
            <Stack direction="row" spacing={-1} sx={{ mt: 1 }}>
              <Avatar sx={{ bgcolor: '#ccc' }}>SS</Avatar>
              <Avatar sx={{ bgcolor: '#ccc' }}>PN</Avatar>
              <Avatar sx={{ bgcolor: '#ccc' }}>SB</Avatar>
            </Stack>
            <Button variant="contained" sx={{ mt: 2, bgcolor: '#055087' }}>
              03 Pending Contacts From Users
            </Button>
          </CardContent>
        </Card>
      </Box> */}

      {/* Job Applications Summary */}
      <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">Job Applications</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Total 90 people applied for the job today
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {[
              { title: 'UI UX Designer', count: 21 },
              { title: 'Java Developer', count: 15 },
              { title: 'Administrator', count: 25 },
              { title: 'Support Engineer', count: 30 },
              { title: 'Product Engineer', count: 16 },
            ].map((job) => (
              <Box key={job.title} sx={{ bgcolor: '#055087', color: 'white', px: 3, py: 2, borderRadius: 2, minWidth: 180 }}>
                <Typography fontWeight="bold">{job.title}</Typography>
                <Typography fontSize={13}>{job.count} people applied for this job</Typography>
              </Box>
            ))}
            {/* <Button variant="outlined" sx={{ ml: 'auto', borderRadius: 2, height: 40 }}>view all</Button> */}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}