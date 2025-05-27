import React, { useEffect, useState } from 'react';
import { FaSchool, FaChalkboardTeacher, FaUserGraduate, FaBook, FaSignOutAlt, FaLayerGroup, FaChartBar, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import axios from 'axios';
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

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  // Fetch stats from backend
  const [stats, setStats] = useState({
    schools: 0,
    teachers: 0,
    students: 0,
    courses: 0,
  });
  const [courses, setCourses] = useState([]);
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

  useEffect(() => {
    // Example: Replace with your real backend endpoints
    axios.get('http://localhost:8081/api/teachers?page=0&size=1').then(res => setStats(s => ({ ...s, teachers: res.data.totalElements || 0 })));
    axios.get('http://localhost:8081/api/students?page=0&size=1').then(res => setStats(s => ({ ...s, students: res.data.totalElements || 0 })));
    axios.get('http://localhost:8081/api/courses?page=0&size=1').then(res => setStats(s => ({ ...s, courses: res.data.totalElements || 0 })));
    // You can set schools stat as a constant or fetch if you have an endpoint
    setStats(s => ({ ...s, schools: 1 }));

    // Fetch preview lists
    axios.get('http://localhost:8081/api/courses?page=0&size=3').then(res => setCourses(res.data.content || []));
    axios.get('http://localhost:8081/api/sections?page=0&size=3').then(res => setSections(res.data.content || []));
  }, []);

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
    <div className="dashboard-root">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <FaSchool size={32} />
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="active"><FaChartBar /> Dashboard</a>
          <a href="/students"><FaUserGraduate /> Students</a>
          <a href="/teachers"><FaChalkboardTeacher /> Teachers</a>
          <a href="/courses"><FaBook /> Courses</a>
          <a href="/sections"><FaLayerGroup /> Sections</a>
          <a href="#"><FaUserCircle /> Assistant</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Top Bar */}
        <header className="dashboard-header">
          <div>
            <h2>Welcome to School Management System</h2>
          </div>
          <div className="dashboard-header-right">
            <span>School Year 2023 - 2024</span>
            <button className="logout-btn" onClick={onLogout || (() => {
              localStorage.clear();
              window.location.href = '/login';
            })}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </header>

        {/* Stat Cards */}
        <section className="dashboard-stats">
          <div className="stat-card" style={{ background: '#e0e7ff' }}>
            <div className="stat-icon"><FaLayerGroup /></div>
            <div>
              <div className="stat-value">{stats.sections || sections.length}</div>
              <div className="stat-label">Sections</div>
            </div>
          </div>
          <div className="stat-card" style={{ background: '#f1f5f9' }}>
            <div className="stat-icon"><FaChalkboardTeacher /></div>
            <div>
              <div className="stat-value">{stats.teachers}</div>
              <div className="stat-label">Teachers</div>
            </div>
          </div>
          <div className="stat-card" style={{ background: '#fef9c3' }}>
            <div className="stat-icon"><FaUserGraduate /></div>
            <div>
              <div className="stat-value">{stats.students}</div>
              <div className="stat-label">Students</div>
            </div>
          </div>
          <div className="stat-card" style={{ background: '#dcfce7' }}>
            <div className="stat-icon"><FaBook /></div>
            <div>
              <div className="stat-value">{stats.courses}</div>
              <div className="stat-label">Courses</div>
            </div>
          </div>
        </section>

        {/* Main Grid */}
        <section className="dashboard-grid">
          {/* Calendar Attendance */}
          <div className="dashboard-card calendar-card">
            <h4>Calendar Attendance</h4>
            <div className="calendar-years-bar">
              <div className="calendar-years-bar-bg">
                <div className="calendar-years-bar-highlight"></div>
              </div>
              <div className="calendar-years-labels">
                {[2019,2020,2021,2022,2023,2024,2025,2026].map(y => (
                  <span key={y} className={y === 2021 ? 'calendar-year-active' : ''}>{y}</span>
                ))}
              </div>
            </div>
            <div className="calendar-months-grid">
              {[
                ['January', 'February', 'March'],
                ['April', 'May', 'June'],
                ['July', 'August', 'September'],
                ['October', 'November', 'December'],
              ].map((row, i) => (
                <div key={i} className="calendar-months-row">
                  {row.map(month => (
                    <span
                      key={month}
                      className={
                        month === 'April'
                          ? 'calendar-month-active'
                          : 'calendar-month-other'
                      }
                    >
                      {month}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Educational Stage (bar chart) */}
          <div className="dashboard-card chart-card">
            <div className="edu-stage-header">
              <h4>School Performance</h4>
              <span className="edu-stage-meta">All data in Thousand 2023 - 2024</span>
            </div>
            <div className="edu-stage-content">
              <div className="edu-stage-legend">
                <div className="edu-stage-legend-row">
                  <span className="edu-dot edu-dot-primary"></span>
                  <span className="edu-label">Rwanda Coding Academy</span>
                  <span className="edu-value edu-value-primary">90</span>
                </div>
                <div className="edu-stage-legend-row">
                  <span className="edu-dot edu-dot-elementary"></span>
                  <span className="edu-label">King David</span>
                  <span className="edu-value edu-value-elementary">145</span>
                </div>
                <div className="edu-stage-legend-row">
                  <span className="edu-dot edu-dot-preschool"></span>
                  <span className="edu-label">BlueLakes</span>
                  <span className="edu-value edu-value-preschool">88</span>
                </div>
              </div>
              <div className="edu-stage-bar-chart">
                <div className="edu-bar edu-bar-primary" style={{height: '145px'}}></div>
                <div className="edu-bar edu-bar-elementary" style={{height: '116px'}}></div>
                <div className="edu-bar edu-bar-preschool" style={{height: '104px'}}></div>
                <div className="edu-stage-y-axis">
                  {[160, 140, 120, 100, 80, 60, 40, 20, 0].map(val => (
                    <span key={val} style={{bottom: `${(val/160)*100}%`}}>{val}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SectionList Preview */}
          <div className="dashboard-card activities-card">
            <div className="activities-header">
              <h4>Sections</h4>
              <button className="view-all-btn" onClick={() => navigate('/sections')}>View All</button>
            </div>
            <ul>
              {sections.length === 0 && <li>No sections found.</li>}
              {sections.map(section => (
                <li key={section.id}>
                  {section.sectionName} - Grade {section.grade} ({section.academicYear})
                </li>
              ))}
            </ul>
          </div>

          {/* CourseList Preview */}
          <div className="dashboard-card top-students-card">
            <div className="activities-header">
              <h4>Courses</h4>
              <button className="view-all-btn" onClick={() => navigate('/courses')}>View All</button>
            </div>
            <ul>
              {courses.length === 0 && <li>No courses found.</li>}
              {courses.map(course => (
                <li key={course.id}>
                  {course.courseCode} - {course.courseName}
                </li>
              ))}
            </ul>
          </div>

          {/* Activities & Events */}
          <div className="dashboard-card activities-card">
            <div className="activities-header">
              <h4>Activities & Events</h4>
              <button className="view-all-btn outlined-green" onClick={() => navigate('/events')}>View All</button>
            </div>
            <ul className="activities-list">
              {['Inter Class Competition', 'Kwibuka 31', 'Hackathon Pitching'].map((event, idx) => (
                <li key={event} className="activity-item">
                  {event}
                  {idx < 2 && <div className="activity-divider"></div>}
                </li>
              ))}
            </ul>
          </div>

          {/* Top Students */}
          <div className="dashboard-card top-students-card">
            <div className="top-students-list">
              {[
                { name: 'Mugisha Pacifique', percent: '99.88%', place: '1st', color: 'green' },
                { name: 'Niyitanga Honore', percent: '98.17%', place: '2nd', color: 'purple' },
                { name: 'Bagabo Bonny', percent: '97.32%', place: '3rd', color: 'yellow' },
              ].map((student, idx) => (
                <div key={student.name} className={`student-card student-card-${student.color}`}>
                  <div className="student-card-bg"></div>
                  <div className="student-icon"></div>
                  <div className="student-name">{student.name}</div>
                  <div className="student-percent">{student.percent}</div>
                  <div className={`student-place student-place-${student.color}`}>{student.place}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

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

export default Dashboard; 