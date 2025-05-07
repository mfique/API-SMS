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
import { sectionApi } from '../services/api';

const SectionList = () => {
    const navigate = useNavigate();
    const [sections, setSections] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);
    const [formData, setFormData] = useState({
        sectionName: '',
        grade: '',
        academicYear: '',
    });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const fetchSections = async () => {
        try {
            const response = await sectionApi.getAll(page, rowsPerPage);
            setSections(response.data.content);
            setTotalElements(response.data.totalElements);
        } catch (error) {
            console.error('Error fetching sections:', error);
            showSnackbar('Error fetching sections', 'error');
        }
    };

    useEffect(() => {
        fetchSections();
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

    const handleOpen = (section = null) => {
        if (section) {
            setSelectedSection(section);
            setFormData(section);
        } else {
            setSelectedSection(null);
            setFormData({
                sectionName: '',
                grade: '',
                academicYear: '',
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedSection(null);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        if (!formData.sectionName || !formData.grade || !formData.academicYear) {
            showSnackbar('Please fill in all required fields', 'error');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            if (selectedSection) {
                await sectionApi.update(selectedSection.id, formData);
                showSnackbar('Section updated successfully');
            } else {
                await sectionApi.create(formData);
                showSnackbar('Section created successfully');
            }
            handleClose();
            fetchSections();
        } catch (error) {
            console.error('Error saving section:', error);
            showSnackbar('Error saving section', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this section?')) {
            try {
                await sectionApi.delete(id);
                showSnackbar('Section deleted successfully');
                fetchSections();
            } catch (error) {
                console.error('Error deleting section:', error);
                showSnackbar('Error deleting section', 'error');
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
        <div style={{ padding: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}
                    sx={{ mr: 2 }}
                >
                    Back to Dashboard
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen()}
                >
                    Add New Section
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Section Name</TableCell>
                            <TableCell>Grade</TableCell>
                            <TableCell>Academic Year</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sections.map((section) => (
                            <TableRow key={section.id}>
                                <TableCell>{section.sectionName}</TableCell>
                                <TableCell>{section.grade}</TableCell>
                                <TableCell>{section.academicYear}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpen(section)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(section.id)}>
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
                    {selectedSection ? 'Edit Section' : 'Add New Section'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        name="sectionName"
                        label="Section Name"
                        value={formData.sectionName}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        name="grade"
                        label="Grade"
                        value={formData.grade}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        name="academicYear"
                        label="Academic Year"
                        value={formData.academicYear}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">
                        {selectedSection ? 'Update' : 'Create'}
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
    );
};

export default SectionList; 