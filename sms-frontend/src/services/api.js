import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Student APIs
export const studentApi = {
    getAll: (page = 0, size = 10, sortBy = 'id', direction = 'asc') => 
        api.get(`/students?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`),
    getById: (id) => api.get(`/students/${id}`),
    create: (student) => api.post('/students', student),
    update: (id, student) => api.put(`/students/${id}`, student),
    delete: (id) => api.delete(`/students/${id}`),
};

// Teacher APIs
export const teacherApi = {
    getAll: (page = 0, size = 10) => api.get(`/teachers?page=${page}&size=${size}`),
    getById: (id) => api.get(`/teachers/${id}`),
    create: (data) => api.post('/teachers', data),
    update: (id, data) => api.put(`/teachers/${id}`, data),
    delete: (id) => api.delete(`/teachers/${id}`),
};

// Course APIs
export const courseApi = {
    getAll: (page = 0, size = 10) => api.get(`/courses?page=${page}&size=${size}`),
    getById: (id) => api.get(`/courses/${id}`),
    create: (data) => api.post('/courses', data),
    update: (id, data) => api.put(`/courses/${id}`, data),
    delete: (id) => api.delete(`/courses/${id}`),
};

// Section APIs
export const sectionApi = {
    getAll: (page = 0, size = 10) => api.get(`/sections?page=${page}&size=${size}`),
    getById: (id) => api.get(`/sections/${id}`),
    create: (data) => api.post('/sections', data),
    update: (id, data) => api.put(`/sections/${id}`, data),
    delete: (id) => api.delete(`/sections/${id}`),
};

export default api;