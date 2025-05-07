import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Grid,
    Paper,
    Box,
} from '@mui/material';
import {
    School as SchoolIcon,
    People as PeopleIcon,
    Book as BookIcon,
    Class as ClassIcon,
} from '@mui/icons-material';

const Welcome = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: 'Students',
            description: 'Manage student information, enrollment, and academic records',
            icon: <PeopleIcon sx={{ fontSize: 60 }} />,
            path: '/students',
            color: '#2196f3',
            gradient: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
        },
        {
            title: 'Teachers',
            description: 'Handle teacher profiles, assignments, and schedules',
            icon: <SchoolIcon sx={{ fontSize: 60 }} />,
            path: '/teachers',
            color: '#4caf50',
            gradient: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
        },
        {
            title: 'Courses',
            description: 'Organize course catalog, curriculum, and materials',
            icon: <BookIcon sx={{ fontSize: 60 }} />,
            path: '/courses',
            color: '#ff9800',
            gradient: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
        },
        {
            title: 'Sections',
            description: 'Manage class sections, schedules, and enrollments',
            icon: <ClassIcon sx={{ fontSize: 60 }} />,
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
                py: { xs: 4, md: 8 },
                px: { xs: 2, md: 4 },
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box 
                    sx={{ 
                        textAlign: 'center', 
                        mb: 1,
                    }}
                >
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                            color: '#1a237e',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            mb: 1
                        }}
                    >
                        Welcome to School Management System
                    </Typography>
                    <Typography
                        variant="h5"
                        color="text.secondary"
                        paragraph
                        sx={{ 
                            maxWidth: '800px', 
                            mx: 'auto', 
                            color: '#455a64',
                            fontSize: { xs: '1.1rem', md: '1.3rem' },
                            mb: 1
                        }}
                    >
                        A comprehensive platform for managing your educational institution
                    </Typography>
                </Box>

                <Grid 
                    container 
                    spacing={4}
                    sx={{ 
                        flexGrow: 1,
                        maxWidth: '1000px',
                        mx: 'auto',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Grid 
                        container 
                        spacing={4}
                        sx={{ 
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: '800px'
                        }}
                    >
                        {features.slice(0, 2).map((feature) => (
                            <Grid 
                                item 
                                xs={12} 
                                sm={6} 
                                key={feature.title}
                                sx={{ 
                                    display: 'flex',
                                    height: '300px',
                                    width: '45%',
                                    p: 2
                                }}
                            >
                                <Paper
                                    elevation={3}
                                    sx={{
                                        p: 3,
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        background: 'white',
                                        borderRadius: '16px',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                                        },
                                    }}
                                    onClick={() => navigate(feature.path)}
                                >
                                    <Box
                                        sx={{
                                            width: '100px',
                                            height: '100px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 3,
                                            background: feature.gradient,
                                            color: 'white',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>
                                    <Typography
                                        variant="h5"
                                        component="h2"
                                        gutterBottom
                                        sx={{
                                            fontWeight: 600,
                                            color: feature.color,
                                            fontSize: '1.5rem',
                                            textAlign: 'center',
                                            mb: 2
                                        }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        align="center"
                                        sx={{ 
                                            color: '#546e7a',
                                            fontSize: '1rem',
                                            lineHeight: 1.6,
                                            flexGrow: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {feature.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid 
                        container 
                        spacing={4}
                        sx={{ 
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: '800px'
                        }}
                    >
                        {features.slice(2, 4).map((feature) => (
                            <Grid 
                                item 
                                xs={12} 
                                sm={6} 
                                key={feature.title}
                                sx={{ 
                                    display: 'flex',
                                    height: '300px',
                                    width: '45%',
                                    p: 2
                                }}
                            >
                                <Paper
                                    elevation={3}
                                    sx={{
                                        p: 3,
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        background: 'white',
                                        borderRadius: '16px',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                                        },
                                    }}
                                    onClick={() => navigate(feature.path)}
                                >
                                    <Box
                                        sx={{
                                            width: '100px',
                                            height: '100px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 3,
                                            background: feature.gradient,
                                            color: 'white',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>
                                    <Typography
                                        variant="h5"
                                        component="h2"
                                        gutterBottom
                                        sx={{
                                            fontWeight: 600,
                                            color: feature.color,
                                            fontSize: '1.5rem',
                                            textAlign: 'center',
                                            mb: 2
                                        }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        align="center"
                                        sx={{ 
                                            color: '#546e7a',
                                            fontSize: '1rem',
                                            lineHeight: 1.6,
                                            flexGrow: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {feature.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Welcome; 