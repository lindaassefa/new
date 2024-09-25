import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { apiCall } from './apiService'; // Adjust the path as necessary

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await apiCall('http://localhost:5001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: { email, password },
      });
      if (response.error) {
        throw new Error(response.error);
      }
      // Handle successful login
    } catch (error) {
      if (error.message.includes('NetworkError')) {
        setError('Network error: Please check your internet connection.');
      } else if (error.message.includes('Server error')) {
        setError('Server error: Please try again later.');
      } else {
        setError(`Login failed: ${error.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4">Login</Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" fullWidth variant="contained" color="primary">
        Login
      </Button>
    </form>
  );
};

export default Login;