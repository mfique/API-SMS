import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Card,
    CardContent,
    CardActions,
    Button,
} from '@mui/material';
import {
    School as SchoolIcon,
    People as PeopleIcon,
    Book as BookIcon,
    Class as ClassIcon,
} from '@mui/icons-material';

const Dashboard = () => {
    const navigate = useNavigate();

    const modules = [
        {
            title: 'Students',
            description: 'Manage student records and information',
            icon: <PeopleIcon sx={{ fontSize: 40 }} />,
            path: '/students',
            color: '#2196f3',
            gradient: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
        },
        {
            title: 'Teachers',
            description: 'Handle teacher profiles and assignments',
            icon: <SchoolIcon sx={{ fontSize: 40 }} />,
            path: '/teachers',
            color: '#4caf50',
            gradient: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
        },
        {
            title: 'Courses',
            description: 'Manage course catalog and curriculum',
            icon: <BookIcon sx={{ fontSize: 40 }} />,
            path: '/courses',
            color: '#ff9800',
            gradient: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
        },
        {
            title: 'Sections',
            description: 'Organize class sections and schedules',
            icon: <ClassIcon sx={{ fontSize: 40 }} />,
            path: '/sections',
            color: '#9c27b0',
            gradient: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
        },
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
                py: 4,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper
                            sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                background: 'white',
                                borderRadius: '16px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            }}
                        >
                            <Typography
                                variant="h4"
                                component="h1"
                                gutterBottom
                                sx={{
                                    fontWeight: 700,
                                    color: '#1a237e',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                                }}
                            >
                                Dashboard
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ color: '#455a64', fontSize: '1.1rem' }}
                            >
                                Welcome to your School Management System dashboard. Select a module to get started.
                            </Typography>
                        </Paper>
                    </Grid>

                    {modules.map((module) => (
                        <Grid item xs={12} sm={6} md={3} key={module.title}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.3s ease',
                                    background: 'white',
                                    borderRadius: '16px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                                    },
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mb: 2,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: module.gradient,
                                                color: 'white',
                                                mr: 2,
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            }}
                                        >
                                            {module.icon}
                                        </Box>
                                        <Typography
                                            variant="h6"
                                            component="h2"
                                            sx={{
                                                fontWeight: 600,
                                                color: module.color,
                                            }}
                                        >
                                            {module.title}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: '#546e7a', mb: 2 }}
                                    >
                                        {module.description}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ p: 2, pt: 0 }}>
                                    <Button
                                        size="medium"
                                        onClick={() => navigate(module.path)}
                                        sx={{
                                            color: module.color,
                                            fontWeight: 600,
                                            '&:hover': {
                                                background: `${module.color}10`,
                                            },
                                        }}
                                    >
                                        View Details
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard; 