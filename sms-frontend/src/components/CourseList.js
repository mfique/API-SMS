import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    TablePagination,
    Snackbar,
    Alert,
    Box,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { courseApi } from '../services/api';
import './EntityList.css';

const CourseList = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [formData, setFormData] = useState({
        courseCode: '',
        courseName: '',
        description: '',
        credits: '',
    });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const fetchCourses = async () => {
        try {
            const response = await courseApi.getAll(page, rowsPerPage);
            setCourses(response.data.content);
            setTotalElements(response.data.totalElements);
        } catch (error) {
            console.error('Error fetching courses:', error);
            showSnackbar('Error fetching courses', 'error');
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [page, rowsPerPage]);

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleOpen = (course = null) => {
        if (course) {
            setSelectedCourse(course);
            setFormData(course);
        } else {
            setSelectedCourse(null);
            setFormData({
                courseCode: '',
                courseName: '',
                description: '',
                credits: '',
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCourse(null);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        if (!formData.courseCode || !formData.courseName || !formData.credits) {
            showSnackbar('Please fill in all required fields', 'error');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            if (selectedCourse) {
                await courseApi.update(selectedCourse.id, formData);
                showSnackbar('Course updated successfully');
            } else {
                await courseApi.create(formData);
                showSnackbar('Course created successfully');
            }
            handleClose();
            fetchCourses();
        } catch (error) {
            console.error('Error saving course:', error);
            showSnackbar('Error saving course', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await courseApi.delete(id);
                showSnackbar('Course deleted successfully');
                fetchCourses();
            } catch (error) {
                console.error('Error deleting course:', error);
                showSnackbar('Error deleting course', 'error');
            }
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="entity-list-root">
            <button className="entity-list-back" onClick={() => navigate('/dashboard')}>
                &#8592; Back to Dashboard
            </button>
            <div className="entity-list-card">
                <div className="entity-list-header">
                    <span className="entity-list-title">Courses</span>
                    <Button
                        className="entity-list-btn"
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpen()}
                        style={{ background: '#6366f1' }}
                    >
                        Add New Course
                    </Button>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Course Code</TableCell>
                                <TableCell>Course Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Credits</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courses.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell>{course.courseCode}</TableCell>
                                    <TableCell>{course.courseName}</TableCell>
                                    <TableCell>{course.description}</TableCell>
                                    <TableCell>{course.credits}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleOpen(course)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(course.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={totalElements}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        {selectedCourse ? 'Edit Course' : 'Add New Course'}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            name="courseCode"
                            label="Course Code"
                            value={formData.courseCode}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            name="courseName"
                            label="Course Name"
                            value={formData.courseName}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            name="description"
                            label="Description"
                            value={formData.description}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <TextField
                            name="credits"
                            label="Credits"
                            type="number"
                            value={formData.credits}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSubmit} color="primary">
                            {selectedCourse ? 'Update' : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
};

export default CourseList; 