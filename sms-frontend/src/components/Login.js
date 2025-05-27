import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForm.css';
import { FaSchool } from 'react-icons/fa';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/auth/login', formData);
            if (response.data === 'Login successful') {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('username', formData.username);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-logo"><FaSchool /></div>
                <h2>Welcome Back</h2>
                {error && <div className="auth-error">{error}</div>}
                <input
                    type="text"
                    name="username"
                    placeholder="Username or Email"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Sign In</button>
                <div className="auth-links">
                    <Link to="/signup">Don't have an account? Sign Up</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;